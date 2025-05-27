import React, { useState } from 'react';
import { tauUnits, scenarioModifiers, difficultyModifiers } from '../data/tauUnits';
import { militaryDoctrine, tauMilitaryRoles, realismScaling } from '../data/militaryDoctrine';
import './ArmyComposer.css';

function ArmyComposer({ scenario, difficulty, faction, onArmyGenerated }) {
  const [compositionMode, setCompositionMode] = useState('easy-create');
  const [customChoices, setCustomChoices] = useState({
    hqChoice: '',
    troopsCount: 2,
    elitesCount: 1,
    fastAttackCount: 0,
    heavySupportCount: 1,
    includeNamedCharacter: false,
    useRealWorldDoctrine: true
  });

  const generateArmy = (useCustomChoices = false) => {
    const army = {
      faction: faction,
      scenario: scenario.name,
      difficulty: difficulty,
      units: [],
      totalPoints: 0,
      loreJustification: ''
    };

    const scenarioMods = scenarioModifiers[scenario.context] || scenarioModifiers.general;
    const difficultyMods = difficultyModifiers[difficulty];
    const doctrineSettings = realismScaling[difficulty];
    const scenarioDoctrine = militaryDoctrine.scenarioDoctrine[scenario.context] || militaryDoctrine.scenarioDoctrine.assault;
    
    // Helper function to categorize units by military role
    const getMilitaryRole = (unit) => {
      for (const [role, roleData] of Object.entries(tauMilitaryRoles)) {
        if (roleData.units.includes(unit.id)) {
          return role;
        }
      }
      return 'infantry'; // Default fallback
    };

    // Helper function to calculate target points for each military role
    const calculateDoctrineTargets = (totalPoints, useRealDoctrine) => {
      if (!useRealDoctrine) {
        // Traditional 40k composition
        return {
          command: { min: totalPoints * 0.05, max: totalPoints * 0.15 },
          infantry: { min: totalPoints * 0.30, max: totalPoints * 0.60 },
          armor: { min: totalPoints * 0.20, max: totalPoints * 0.50 },
          support: { min: totalPoints * 0.05, max: totalPoints * 0.25 }
        };
      }

      // Real-world doctrine composition
      const doctrine = scenarioDoctrine.composition;
      return {
        command: { 
          min: totalPoints * (doctrine.command.min / 100), 
          max: totalPoints * (doctrine.command.max / 100) 
        },
        infantry: { 
          min: totalPoints * (doctrine.infantry.min / 100), 
          max: totalPoints * (doctrine.infantry.max / 100) 
        },
        armor: { 
          min: totalPoints * (doctrine.armor.min / 100), 
          max: totalPoints * (doctrine.armor.max / 100) 
        },
        support: { 
          min: totalPoints * (doctrine.support.min / 100), 
          max: totalPoints * (doctrine.support.max / 100) 
        }
      };
    };

    // Enhanced unit scoring with military doctrine considerations
    const scoreUnitWithDoctrine = (unit, currentComposition, targets, useRealDoctrine) => {
      let score = scoreUnit(unit); // Base score
      
      if (!useRealDoctrine) return score;
      
      const unitRole = getMilitaryRole(unit);
      const currentRolePoints = currentComposition[unitRole] || 0;
      const roleTarget = targets[unitRole];
      
      // Bonus for filling needed roles
      if (currentRolePoints < roleTarget.min) {
        score += 5; // Strong bonus for filling minimum requirements
      } else if (currentRolePoints < roleTarget.max) {
        score += 2; // Moderate bonus for staying within optimal range
      } else {
        score -= 3; // Penalty for exceeding optimal ratio
      }
      
      // Special doctrine bonuses
      if (scenarioDoctrine.priorityRoles.some(role => unit.loreRoles?.includes(role))) {
        score += 3; // Bonus for scenario-specific roles
      }
      
      // Command structure realism
      if (unitRole === 'command') {
        const commandRatio = currentRolePoints / (army.totalPoints || 1);
        if (commandRatio < militaryDoctrine.commandStructure.minCommandRatio) {
          score += 4; // Need more command
        } else if (commandRatio > militaryDoctrine.commandStructure.maxCommandRatio) {
          score -= 4; // Too much command
        }
      }
      
      return score;
    };

    // Helper function to get unit by ID
    const getUnitById = (id) => {
      const allUnits = [
        ...tauUnits.hq,
        ...tauUnits.troops,
        ...tauUnits.elites,
        ...tauUnits.fastAttack,
        ...tauUnits.heavySupport,
        ...tauUnits.namedCharacters
      ];
      return allUnits.find(unit => unit.id === id);
    };

    // Filter units based on faction restrictions
    const filterUnitsByFaction = (units, faction) => {
      return units.filter(unit => {
        if (unit.restrictions?.includes('farsight_enclaves_only') && faction !== 'farsight_enclaves') {
          return false;
        }
        if (unit.restrictions?.includes('not_farsight_enclaves') && faction === 'farsight_enclaves') {
          return false;
        }
        return true;
      });
    };

    // Score units based on synergy, scenario, and difficulty
    const scoreUnit = (unit) => {
      let score = 0;
      
      // Base synergy with subfaction
      const synergy = unit.subfactionSynergy[faction] || 'medium';
      const synergyScores = { none: 0, low: 1, medium: 2, high: 3, very_high: 4 };
      score += synergyScores[synergy];

      // Scenario preference
      if (scenarioMods.prioritize.includes(unit.id)) score += 3;
      if (scenarioMods.avoid.includes(unit.id)) score -= 2;

      // Character preference for scenario
      if (unit.keywords?.includes('Character') && scenarioMods.characterPreference.includes(unit.id)) {
        score += 2;
      }

      // Difficulty considerations
      if (difficultyMods.competitiveOnly && unit.competitiveLevel === 'very_high') {
        score += 2;
      } else if (difficultyMods.preferBasicUnits && unit.competitiveLevel === 'high') {
        score -= 1;
      }

      // Competitive level bonus for higher difficulties
      const competitiveScores = { low: 0, medium: 1, high: 2, very_high: 3 };
      if (difficulty === 'hard' || difficulty === 'extreme') {
        score += competitiveScores[unit.competitiveLevel] || 0;
      }

      return score;
    };

    // Select best unit from category
    const selectBestUnit = (units, excludeIds = [], unitCounts = {}) => {
      const availableUnits = filterUnitsByFaction(units, faction).filter(unit => {
        // Exclude units already used (for first instance)
        if (excludeIds.includes(unit.id)) return false;
        
        // Rule of Three: Maximum 3 of each datasheet in matched play
        const currentCount = unitCounts[unit.id] || 0;
        if (currentCount >= 3) return false;
        
        return true;
      });
      
      if (availableUnits.length === 0) return null;
      
      const scoredUnits = availableUnits.map(unit => ({
        ...unit,
        score: scoreUnit(unit)
      }));
      
      scoredUnits.sort((a, b) => b.score - a.score);
      return scoredUnits[0];
    };

    if (useCustomChoices) {
      // Custom army composition logic - Point-aware generation with Rule of Three
      const usedUnitIds = [];
      const unitCounts = {}; // Track how many of each datasheet we have
      const TARGET_POINTS = 2000;
      const MINIMUM_POINTS = 1900; // Allow some flexibility

      // Helper function to add unit and update tracking
      const addUnit = (unit) => {
        if (!unit) return false;
        
        army.units.push({ ...unit, selectedOptions: [] });
        army.totalPoints += unit.points;
        unitCounts[unit.id] = (unitCounts[unit.id] || 0) + 1;
        
        // Only add to excludeIds for first instance (for HQ uniqueness)
        if (!usedUnitIds.includes(unit.id)) {
          usedUnitIds.push(unit.id);
        }
        
        return true;
      };

      // Phase 1: Add mandatory/preferred units
      
      // Add HQ
      if (customChoices.hqChoice) {
        const hqUnit = getUnitById(customChoices.hqChoice);
        if (hqUnit) {
          addUnit(hqUnit);
        }
      } else {
        const bestHQ = selectBestUnit(tauUnits.hq, usedUnitIds, unitCounts);
        if (bestHQ) {
          addUnit(bestHQ);
        }
      }

      // Add Named Character if requested
      if (customChoices.includeNamedCharacter && difficultyMods.namedCharacters) {
        const namedChar = selectBestUnit(tauUnits.namedCharacters, usedUnitIds, unitCounts);
        if (namedChar && army.totalPoints + namedChar.points <= TARGET_POINTS - 200) {
          addUnit(namedChar);
        }
      }

      // Phase 2: Add minimum required units from each category
      const minimumCounts = {
        troops: Math.max(2, customChoices.troopsCount), // Always at least 2 troops
        elites: customChoices.elitesCount,
        fastAttack: customChoices.fastAttackCount,
        heavySupport: customChoices.heavySupportCount
      };

      // Add minimum troops first (mandatory)
      for (let i = 0; i < Math.min(minimumCounts.troops, 2); i++) {
        const troopUnit = selectBestUnit(tauUnits.troops, [], unitCounts);
        if (troopUnit && army.totalPoints + troopUnit.points <= TARGET_POINTS - 300) {
          addUnit(troopUnit);
        }
      }

      // Phase 3: Distribute remaining points according to preferences
      const categories = [
        { units: tauUnits.troops, requestedCount: Math.max(0, minimumCounts.troops - 2), name: 'troops' },
        { units: tauUnits.elites, requestedCount: minimumCounts.elites, name: 'elites' },
        { units: tauUnits.fastAttack, requestedCount: minimumCounts.fastAttack, name: 'fastAttack' },
        { units: tauUnits.heavySupport, requestedCount: minimumCounts.heavySupport, name: 'heavySupport' }
      ];

      // Sort categories by user preference (higher counts first)
      categories.sort((a, b) => b.requestedCount - a.requestedCount);

      // Add units from each category based on preference and points available
      for (const category of categories) {
        let addedFromCategory = 0;
        const maxToAdd = category.requestedCount;
        
        while (addedFromCategory < maxToAdd && army.totalPoints < MINIMUM_POINTS) {
          const unit = selectBestUnit(category.units, [], unitCounts);
          if (unit && army.totalPoints + unit.points <= TARGET_POINTS) {
            addUnit(unit);
            addedFromCategory++;
          } else {
            break; // Can't add more from this category
          }
        }
      }

      // Phase 4: Fill remaining points intelligently with diverse units
      let maxAttempts = 20; // Prevent infinite loops
      while (army.totalPoints < MINIMUM_POINTS && maxAttempts > 0) {
        let bestUnit = null;
        let bestScore = -1;
        let bestCategory = null;

        // Look for the best unit across all categories that fits
        for (const category of categories) {
          const unit = selectBestUnit(category.units, [], unitCounts);
          if (unit && army.totalPoints + unit.points <= TARGET_POINTS) {
            const score = scoreUnit(unit);
            const pointsEfficiency = score / Math.max(unit.points / 100, 1); // Prefer efficient units
            
            if (pointsEfficiency > bestScore) {
              bestScore = pointsEfficiency;
              bestUnit = unit;
              bestCategory = category.name;
            }
          }
        }

        if (bestUnit) {
          addUnit(bestUnit);
        } else {
          break; // Can't add anything else
        }
        
        maxAttempts--;
      }

      // Phase 5: Final fill - try to get closer to 2000 points with smaller/cheaper units
      maxAttempts = 10;
      while (army.totalPoints < TARGET_POINTS - 50 && maxAttempts > 0) {
        // Look for any unit that can still fit
        let foundUnit = false;
        
        for (const category of categories) {
          const unit = selectBestUnit(category.units, [], unitCounts);
          if (unit && army.totalPoints + unit.points <= TARGET_POINTS) {
            addUnit(unit);
            foundUnit = true;
            break;
          }
        }
        
        if (!foundUnit) break;
        maxAttempts--;
      }

    } else {
      // Easy-create: Automatic army generation with Rule of Three and Military Doctrine
      const usedUnitIds = [];
      const unitCounts = {}; // Track how many of each datasheet we have
      const TARGET_POINTS = 2000;
      const MINIMUM_TARGET = 1980; // Much more aggressive target
      
      // Calculate military doctrine targets
      const doctrineTargets = calculateDoctrineTargets(TARGET_POINTS, customChoices.useRealWorldDoctrine);
      let currentComposition = { command: 0, infantry: 0, armor: 0, support: 0 };

      // Helper function to add unit and update tracking
      const addUnit = (unit) => {
        if (!unit) return false;
        
        army.units.push({ ...unit, selectedOptions: [] });
        army.totalPoints += unit.points;
        unitCounts[unit.id] = (unitCounts[unit.id] || 0) + 1;
        
        // Update military composition tracking
        const unitRole = getMilitaryRole(unit);
        currentComposition[unitRole] += unit.points;
        
        // Only add to excludeIds for first instance (for HQ uniqueness)
        if (!usedUnitIds.includes(unit.id)) {
          usedUnitIds.push(unit.id);
        }
        
        return true;
      };

      // Enhanced unit selection with doctrine scoring
      const selectBestUnitWithDoctrine = (units, excludeIds = [], unitCounts = {}) => {
        const availableUnits = filterUnitsByFaction(units, faction).filter(unit => {
          if (excludeIds.includes(unit.id)) return false;
          const currentCount = unitCounts[unit.id] || 0;
          if (currentCount >= 3) return false;
          return true;
        });
        
        if (availableUnits.length === 0) return null;
        
        const scoredUnits = availableUnits.map(unit => ({
          ...unit,
          score: scoreUnitWithDoctrine(unit, currentComposition, doctrineTargets, customChoices.useRealWorldDoctrine)
        }));
        
        scoredUnits.sort((a, b) => b.score - a.score);
        return scoredUnits[0];
      };

      // Phase 1: Establish command structure (mandatory HQ)
      const bestHQ = selectBestUnitWithDoctrine(tauUnits.hq, usedUnitIds, unitCounts);
      if (bestHQ) {
        addUnit(bestHQ);
      }

      // Phase 2: Add named character for major operations (doctrine-based)
      if (difficultyMods.namedCharacters && army.totalPoints >= militaryDoctrine.commandStructure.namedCharacterThreshold) {
        const namedChar = selectBestUnitWithDoctrine(tauUnits.namedCharacters, usedUnitIds, unitCounts);
        if (namedChar && army.totalPoints + namedChar.points <= TARGET_POINTS - 100) {
          addUnit(namedChar);
        }
      }

      // Phase 3: Build doctrine-compliant force structure
      let attempts = 20;
      while (army.totalPoints < MINIMUM_TARGET && attempts > 0) {
        // Determine what type of unit we need most based on doctrine
        let neededRole = null;
        let highestNeed = 0;
        
        for (const [role, target] of Object.entries(doctrineTargets)) {
          const current = currentComposition[role] || 0;
          const needScore = Math.max(0, target.min - current) + 
                          (current < target.max ? (target.max - current) * 0.5 : 0);
          
          if (needScore > highestNeed) {
            highestNeed = needScore;
            neededRole = role;
          }
        }
        
        // Select units based on needed role
        let selectedUnit = null;
        
        if (neededRole === 'command') {
          selectedUnit = selectBestUnitWithDoctrine(tauUnits.hq, [], unitCounts);
        } else if (neededRole === 'infantry') {
          selectedUnit = selectBestUnitWithDoctrine(tauUnits.troops, [], unitCounts);
        } else if (neededRole === 'armor') {
          const armorUnits = [...tauUnits.elites, ...tauUnits.heavySupport];
          selectedUnit = selectBestUnitWithDoctrine(armorUnits, [], unitCounts);
        } else if (neededRole === 'support') {
          selectedUnit = selectBestUnitWithDoctrine(tauUnits.fastAttack, [], unitCounts);
        }
        
        // Fallback to any good unit if specific role selection fails
        if (!selectedUnit || army.totalPoints + selectedUnit.points > TARGET_POINTS) {
          const allCategories = [tauUnits.troops, tauUnits.elites, tauUnits.heavySupport, tauUnits.fastAttack];
          for (const category of allCategories) {
            selectedUnit = selectBestUnitWithDoctrine(category, [], unitCounts);
            if (selectedUnit && army.totalPoints + selectedUnit.points <= TARGET_POINTS) {
              break;
            }
          }
        }
        
        if (selectedUnit && army.totalPoints + selectedUnit.points <= TARGET_POINTS) {
          addUnit(selectedUnit);
        } else {
          break;
        }
        
        attempts--;
      }

      // Phase 4: Final optimization (same as before)
      let maxAttempts = 10;
      while (army.totalPoints < TARGET_POINTS - 20 && maxAttempts > 0) {
        let foundSomething = false;
        
        // Try equipment first
        if (difficultyMods.optimizedLoadouts) {
          for (const unit of army.units) {
            if (unit.equipment?.options && (!unit.selectedOptions || unit.selectedOptions.length === 0)) {
              const availableOptions = unit.equipment.options.filter(opt => 
                army.totalPoints + opt.cost <= TARGET_POINTS
              );
              
              if (availableOptions.length > 0) {
                const bestOption = availableOptions.reduce((max, opt) => 
                  opt.cost > max.cost ? opt : max
                );
                
                unit.selectedOptions = [bestOption];
                unit.optionsPoints = bestOption.cost;
                army.totalPoints += bestOption.cost;
                foundSomething = true;
                break;
              }
            }
          }
        }
        
        // Try smaller units if equipment doesn't work
        if (!foundSomething) {
          const allCategories = [tauUnits.fastAttack, tauUnits.elites, tauUnits.troops, tauUnits.heavySupport];
          
          for (const category of allCategories) {
            const unit = selectBestUnitWithDoctrine(category, [], unitCounts);
            if (unit && army.totalPoints + unit.points <= TARGET_POINTS) {
              addUnit(unit);
              foundSomething = true;
              break;
            }
          }
        }
        
        if (!foundSomething) break;
        maxAttempts--;
      }

      // Add doctrine information to army
      if (customChoices.useRealWorldDoctrine) {
        army.militaryDoctrine = {
          scenario: scenarioDoctrine.name,
          description: scenarioDoctrine.description,
          realWorldAnalog: scenarioDoctrine.realWorldAnalog,
          composition: currentComposition,
          targets: doctrineTargets,
          adherence: doctrineSettings.description
        };
      }
    }

    // Add equipment optimizations based on difficulty
    if (difficultyMods.optimizedLoadouts) {
      army.units.forEach(unit => {
        if (unit.equipment?.options && (!unit.selectedOptions || unit.selectedOptions.length === 0)) {
          // Add competitive equipment based on scenario and faction
          const competitiveOptions = getCompetitiveLoadout(unit, scenario.context, faction, difficulty);
          if (competitiveOptions.length > 0) {
            unit.selectedOptions = competitiveOptions;
            unit.optionsPoints = competitiveOptions.reduce((sum, opt) => sum + opt.cost, 0);
            army.totalPoints += unit.optionsPoints || 0;
          }
        }
      });
    }

    // Generate lore justification
    army.loreJustification = generateLoreJustification(army, scenario, faction, difficulty);

    onArmyGenerated(army);
  };

  const getCompetitiveLoadout = (unit, context, subfaction, difficulty) => {
    const options = [];
    
    // Simplified competitive loadout logic
    if (unit.id === 'crisis_suits') {
      if (subfaction === 'farsight_enclaves') {
        options.push({ name: 'Fusion blaster', cost: 5 });
        options.push({ name: 'Shield drone x2', cost: 20 });
      } else if (context === 'defensive') {
        options.push({ name: 'Missile pod', cost: 10 });
        options.push({ name: 'Gun drone x2', cost: 15 });
      }
    }
    
    if (unit.id === 'hammerhead' && subfaction === 'bork_an') {
      options.push({ name: 'Smart missile system', cost: 15 });
    }

    return options;
  };

  const generateLoreJustification = (army, scenario, subfaction, difficulty) => {
    const factionNames = {
      tau_empire: 'T\'au Sept',
      farsight_enclaves: 'Farsight Enclaves',
      bork_an: 'Bork\'an Sept',
      vior_la: 'Vior\'la Sept',
      sacea: 'Sa\'cea Sept'
    };

    const contextDescriptions = {
      defensive: 'defensive positions',
      assault: 'aggressive assault operations',
      siege: 'siege warfare',
      excavation: 'archaeological excavation',
      research: 'research facility operations'
    };

    let justification = `The ${factionNames[subfaction]} has deployed this force for ${contextDescriptions[scenario.context] || 'general operations'}. `;

    // Add military doctrine explanation if enabled
    if (army.militaryDoctrine) {
      justification += `\n\n🎯 **Military Doctrine:** ${army.militaryDoctrine.scenario}\n`;
      justification += `${army.militaryDoctrine.description} `;
      justification += `This composition follows ${army.militaryDoctrine.realWorldAnalog.toLowerCase()}, `;
      justification += `with ${army.militaryDoctrine.adherence.toLowerCase()}.\n\n`;
      
      // Add composition breakdown
      justification += '**Force Composition Analysis:**\n';
      const total = army.totalPoints;
      const comp = army.militaryDoctrine.composition;
      
      justification += `• Command Elements: ${Math.round((comp.command / total) * 100)}% (${comp.command}pts) - ${tauMilitaryRoles.command.realWorldRole}\n`;
      justification += `• Infantry Forces: ${Math.round((comp.infantry / total) * 100)}% (${comp.infantry}pts) - ${tauMilitaryRoles.infantry.realWorldRole}\n`;
      justification += `• Armored Units: ${Math.round((comp.armor / total) * 100)}% (${comp.armor}pts) - ${tauMilitaryRoles.armor.realWorldRole}\n`;
      justification += `• Support Elements: ${Math.round((comp.support / total) * 100)}% (${comp.support}pts) - ${tauMilitaryRoles.support.realWorldRole}\n\n`;
    }

    const hasNamedCharacter = army.units.some(unit => unit.keywords?.includes('Epic Hero'));
    const hasBattlesuits = army.units.some(unit => unit.keywords?.includes('Battlesuit'));
    const hasFireWarriors = army.units.some(unit => unit.keywords?.includes('Fire Warrior'));

    if (hasNamedCharacter) {
      justification += 'The presence of a legendary commander indicates the critical importance of this mission. ';
    }

    if (subfaction === 'farsight_enclaves' && hasBattlesuits) {
      justification += 'True to Farsight doctrine, the force emphasizes elite battlesuit formations for close-range engagement. ';
    } else if (subfaction === 'bork_an') {
      justification += 'Leveraging Bork\'an\'s technological superiority, the force is optimized for long-range engagement. ';
    } else if (hasFireWarriors && hasBattlesuits) {
      justification += 'The balanced composition reflects T\'au combined arms doctrine, integrating Fire Warrior flexibility with battlesuit superiority. ';
    }

    if (difficulty === 'extreme') {
      justification += 'This represents a maximum-effort deployment with the sect\'s most experienced warriors and advanced equipment.';
    } else if (difficulty === 'hard') {
      justification += 'The force includes veteran units and optimized equipment for competitive advantage.';
    }

    return justification;
  };

  const availableHQChoices = filterUnitsByFaction(tauUnits.hq, faction);

  return (
    <div className="army-composer">
      <h2>Army Composition</h2>
      <div className="scenario-summary">
        <p><strong>Scenario:</strong> {scenario.name}</p>
        <p><strong>Difficulty:</strong> {difficulty}</p>
        <p><strong>Subfaction:</strong> {faction}</p>
      </div>

      <div className="composition-mode-selector">
        <button 
          className={compositionMode === 'easy-create' ? 'active' : ''}
          onClick={() => setCompositionMode('easy-create')}
        >
          🎯 Easy Create
        </button>
        <button 
          className={compositionMode === 'custom' ? 'active' : ''}
          onClick={() => setCompositionMode('custom')}
        >
          ⚙️ Custom Composition
        </button>
      </div>

      {compositionMode === 'easy-create' && (
        <div className="easy-create">
          <div className="easy-create-info">
            <h3>Easy Create Mode</h3>
            <p>
              Automatically generates a lore-appropriate, competitive army based on your 
              selected scenario, difficulty, and subfaction. All unit selections and 
              equipment choices will be optimized for you.
            </p>
            <ul>
              <li>✅ Scenario-appropriate unit selection</li>
              <li>✅ Subfaction synergies maximized</li>
              <li>✅ Difficulty-scaled competitiveness</li>
              <li>✅ Lore-justified composition</li>
              <li>✅ Equipment automatically optimized</li>
            </ul>
          </div>
          <button 
            className="generate-army-btn"
            onClick={() => generateArmy(false)}
          >
            Generate Army Automatically
          </button>
        </div>
      )}

      {compositionMode === 'custom' && (
        <div className="custom-composition">
          <h3>Custom Army Composition</h3>
          <p className="custom-description">
            Design your army's tactical focus by setting unit type preferences. The generator will 
            prioritize your choices while ensuring the army reaches 2000 points with lore-appropriate 
            unit selection and equipment optimization.
          </p>
          
          <div className="custom-info-box">
            <h4>🎯 How Custom Generation Works:</h4>
            <ul>
              <li><strong>Unit Preferences:</strong> Set minimum numbers for each battlefield role</li>
              <li><strong>Point Allocation:</strong> Generator fills to 2000pts respecting your preferences</li>
              <li><strong>Tactical Balance:</strong> Additional units added based on scenario needs</li>
              <li><strong>Lore Compliance:</strong> All selections remain subfaction-appropriate</li>
            </ul>
          </div>

          <div className="composition-form">
            <div className="form-section">
              <h4>⚔️ Command Structure</h4>
              <div className="form-group">
                <label htmlFor="hq-choice">HQ Choice:</label>
                <select
                  id="hq-choice"
                  value={customChoices.hqChoice}
                  onChange={(e) => setCustomChoices(prev => ({ ...prev, hqChoice: e.target.value }))}
                >
                  <option value="">Auto-select best HQ</option>
                  {availableHQChoices.map(unit => (
                    <option key={unit.id} value={unit.id}>
                      {unit.name} ({unit.points}pts)
                    </option>
                  ))}
                </select>
              </div>

              {difficultyModifiers[difficulty].namedCharacters && (
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={customChoices.includeNamedCharacter}
                      onChange={(e) => setCustomChoices(prev => ({ ...prev, includeNamedCharacter: e.target.checked }))}
                    />
                    Include Named Character (Epic Hero)
                  </label>
                  <small>Adds a legendary commander for narrative weight</small>
                </div>
              )}
            </div>

            <div className="form-section">
              <h4>🏗️ Force Structure Preferences</h4>
              <p className="structure-note">
                <em>Minimum unit counts per battlefield role. Additional units will be added to reach 2000 points.</em>
              </p>
              
              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={customChoices.useRealWorldDoctrine}
                    onChange={(e) => setCustomChoices(prev => ({ ...prev, useRealWorldDoctrine: e.target.checked }))}
                  />
                  🎯 Use Real-World Military Doctrine
                </label>
                <small>
                  Applies realistic force composition ratios based on modern combined arms doctrine. 
                  Units will be selected to match real military force structures for the selected scenario.
                </small>
              </div>
              
              <div className="unit-counts">
                <div className="form-group">
                  <label htmlFor="troops-count">
                    🛡️ Troops Units (Minimum):
                    <span className="role-description">Core infantry and battleline units</span>
                  </label>
                  <select
                    id="troops-count"
                    value={customChoices.troopsCount}
                    onChange={(e) => setCustomChoices(prev => ({ ...prev, troopsCount: parseInt(e.target.value) }))}
                  >
                    <option value={2}>2 Units (Balanced core)</option>
                    <option value={3}>3 Units (Infantry heavy)</option>
                    <option value={4}>4 Units (Horde army)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="elites-count">
                    ⭐ Elites Units (Minimum):
                    <span className="role-description">Specialist battlesuits and veterans</span>
                  </label>
                  <select
                    id="elites-count"
                    value={customChoices.elitesCount}
                    onChange={(e) => setCustomChoices(prev => ({ ...prev, elitesCount: parseInt(e.target.value) }))}
                  >
                    <option value={0}>0 Units (Focus elsewhere)</option>
                    <option value={1}>1 Unit (Balanced)</option>
                    <option value={2}>2 Units (Elite focus)</option>
                    <option value={3}>3 Units (Battlesuit army)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="fast-attack-count">
                    ⚡ Fast Attack Units (Minimum):
                    <span className="role-description">Mobile units and flankers</span>
                  </label>
                  <select
                    id="fast-attack-count"
                    value={customChoices.fastAttackCount}
                    onChange={(e) => setCustomChoices(prev => ({ ...prev, fastAttackCount: parseInt(e.target.value) }))}
                  >
                    <option value={0}>0 Units (Static force)</option>
                    <option value={1}>1 Unit (Balanced mobility)</option>
                    <option value={2}>2 Units (Mobile focus)</option>
                    <option value={3}>3 Units (Speed army)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="heavy-support-count">
                    🚀 Heavy Support Units (Minimum):
                    <span className="role-description">Vehicles and heavy weapons</span>
                  </label>
                  <select
                    id="heavy-support-count"
                    value={customChoices.heavySupportCount}
                    onChange={(e) => setCustomChoices(prev => ({ ...prev, heavySupportCount: parseInt(e.target.value) }))}
                  >
                    <option value={0}>0 Units (Infantry focus)</option>
                    <option value={1}>1 Unit (Balanced firepower)</option>
                    <option value={2}>2 Units (Fire support focus)</option>
                    <option value={3}>3 Units (Vehicle army)</option>
                  </select>
                </div>
              </div>
            </div>

            <button 
              className="generate-army-btn"
              onClick={() => generateArmy(true)}
            >
              🎲 Generate Custom Army (2000pts)
            </button>
          </div>
        </div>
      )}

      <div className="composer-notes">
        <h4>📋 Composition Notes:</h4>
        <ul>
          <li>All armies are built to 2000 points (targeting 1980-2000 range)</li>
          <li>🎯 <strong>Rule of Three:</strong> Maximum 3 of each datasheet (matched play rules)</li>
          <li>🏛️ <strong>Military Doctrine:</strong> Optional real-world force composition ratios for realistic armies</li>
          <li>Unit selection prioritizes lore-appropriate choices</li>
          <li>Equipment is optimized based on difficulty level</li>
          <li>Subfaction abilities and synergies are considered</li>
          <li>Tactical Drones removed (now integrated as equipment/wargear)</li>
          <li>⚡ <strong>Aggressive Point Allocation:</strong> Maximizes point usage with equipment and additional units</li>
        </ul>
        
        <div className="doctrine-info">
          <h4>🎯 Military Doctrine Features:</h4>
          <ul>
            <li><strong>Realistic Ratios:</strong> Command 8-15%, Infantry 35-55%, Armor 15-35%, Support 10-25%</li>
            <li><strong>Scenario Adaptation:</strong> Force composition adapts to mission type (defensive, assault, siege, etc.)</li>
            <li><strong>Command Structure:</strong> Proper span of control and leadership ratios</li>
            <li><strong>Combined Arms:</strong> Balanced integration of different unit types</li>
            <li><strong>Real-World Analogs:</strong> Based on modern military doctrine and proven tactics</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const filterUnitsByFaction = (units, faction) => {
  return units.filter(unit => {
    if (unit.restrictions?.includes('farsight_enclaves_only') && faction !== 'farsight_enclaves') {
      return false;
    }
    if (unit.restrictions?.includes('not_farsight_enclaves') && faction === 'farsight_enclaves') {
      return false;
    }
    return true;
  });
};

export default ArmyComposer; 