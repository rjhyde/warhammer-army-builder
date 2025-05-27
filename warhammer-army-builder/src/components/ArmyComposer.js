import React, { useState } from 'react';
import { getFactionData } from '../data/factionRegistry';
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

  // Get faction data dynamically
  const getFactionUnitsAndData = (selectedFaction) => {
    // Determine the main faction from subfaction
    let mainFaction;
    if (['tau_sept', 'farsight_enclaves', 'bork_an', 'vior_la', 'sacea'].includes(selectedFaction)) {
      mainFaction = 'tau_empire';
    } else if (['ultramarines', 'blood_angels', 'dark_angels', 'imperial_fists', 'iron_hands', 'salamanders'].includes(selectedFaction)) {
      mainFaction = 'space_marines';
    } else {
      // If it's already a main faction
      mainFaction = selectedFaction;
    }

    const factionData = getFactionData(mainFaction);
    if (!factionData) {
      console.error(`No faction data found for ${mainFaction}`);
      return null;
    }

    return {
      units: factionData.units,
      scenarioModifiers: factionData.scenarioModifiers,
      difficultyModifiers: factionData.difficultyModifiers,
      militaryDoctrine: factionData.militaryDoctrine,
      militaryRoles: factionData.militaryRoles,
      mainFaction,
      subfaction: selectedFaction
    };
  };

  const generateArmy = (useCustomChoices = false) => {
    const factionData = getFactionUnitsAndData(faction);
    if (!factionData) {
      console.error('Failed to get faction data');
      return;
    }

    const { units, scenarioModifiers, difficultyModifiers, militaryDoctrine, militaryRoles } = factionData;

    const army = {
      faction: faction,
      mainFaction: factionData.mainFaction,
      scenario: scenario.name,
      difficulty: difficulty,
      units: [],
      totalPoints: 0,
      loreJustification: ''
    };

    const scenarioMods = scenarioModifiers[scenario.context] || scenarioModifiers.general || {
      prioritize: [],
      avoid: [],
      characterPreference: [],
      bonusUnits: []
    };
    const difficultyMods = difficultyModifiers[difficulty];
    
    // Use scenario doctrine if available, otherwise fall back to basic structure
    const scenarioDoctrine = militaryDoctrine.scenarioDoctrine?.[scenario.context] || 
                            militaryDoctrine.combatDoctrines?.[scenario.context] ||
                            { composition: { command: { min: 5, max: 15 }, infantry: { min: 30, max: 60 }, armor: { min: 20, max: 50 }, support: { min: 5, max: 25 } } };
    
    // Helper function to categorize units by military role
    const getMilitaryRole = (unit) => {
      for (const [role, roleData] of Object.entries(militaryRoles)) {
        if (roleData.units && roleData.units.includes(unit.id)) {
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
      if (scenarioDoctrine.priorityRoles?.some(role => unit.loreRoles?.includes(role))) {
        score += 3; // Bonus for scenario-specific roles
      }
      
      // Command structure realism (if doctrine has command structure)
      if (unitRole === 'command' && militaryDoctrine.commandStructure) {
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
        ...units.hq,
        ...units.troops,
        ...units.elites,
        ...units.fastAttack,
        ...units.heavySupport,
        ...units.namedCharacters
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
      const synergy = unit.subfactionSynergy?.[faction] || 'medium';
      const synergyScores = { none: 0, low: 1, medium: 2, high: 3, very_high: 4 };
      score += synergyScores[synergy];

      // Scenario preference - handle both T'au and Space Marine structures
      if (scenarioMods.prioritize?.includes(unit.id)) {
        score += 3;
      } else if (scenarioMods.bonusUnits?.includes(unit.id)) {
        score += 3; // Space Marine bonus units
      }
      
      if (scenarioMods.avoid?.includes(unit.id)) {
        score -= 2;
      }

      // Character preference for scenario
      if (unit.keywords?.includes('Character') && scenarioMods.characterPreference?.includes(unit.id)) {
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
        const bestHQ = selectBestUnit(units.hq, usedUnitIds, unitCounts);
        if (bestHQ) {
          addUnit(bestHQ);
        }
      }

      // Add Named Character if requested
      if (customChoices.includeNamedCharacter && difficultyMods.namedCharacters) {
        const namedChar = selectBestUnit(units.namedCharacters, usedUnitIds, unitCounts);
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
        const troopUnit = selectBestUnit(units.troops, [], unitCounts);
        if (troopUnit && army.totalPoints + troopUnit.points <= TARGET_POINTS - 300) {
          addUnit(troopUnit);
        }
      }

      // Phase 3: Distribute remaining points according to preferences
      const categories = [
        { units: units.troops, requestedCount: Math.max(0, minimumCounts.troops - 2), name: 'troops' },
        { units: units.elites, requestedCount: minimumCounts.elites, name: 'elites' },
        { units: units.fastAttack, requestedCount: minimumCounts.fastAttack, name: 'fastAttack' },
        { units: units.heavySupport, requestedCount: minimumCounts.heavySupport, name: 'heavySupport' }
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

        // Look for the best unit across all categories that fits
        for (const category of categories) {
          const unit = selectBestUnit(category.units, [], unitCounts);
          if (unit && army.totalPoints + unit.points <= TARGET_POINTS) {
            const score = scoreUnit(unit);
            const pointsEfficiency = score / Math.max(unit.points / 100, 1); // Prefer efficient units
            
            if (pointsEfficiency > bestScore) {
              bestScore = pointsEfficiency;
              bestUnit = unit;
              // category.name tracked but not used
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
      const bestHQ = selectBestUnitWithDoctrine(units.hq, usedUnitIds, unitCounts);
      if (bestHQ) {
        addUnit(bestHQ);
      }

      // Phase 2: Add named character for major operations (doctrine-based)
      const namedCharacterThreshold = militaryDoctrine.commandStructure?.namedCharacterThreshold || 500;
      if (difficultyMods.namedCharacters && army.totalPoints >= namedCharacterThreshold) {
        const namedChar = selectBestUnitWithDoctrine(units.namedCharacters, usedUnitIds, unitCounts);
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
          selectedUnit = selectBestUnitWithDoctrine(units.hq, [], unitCounts);
        } else if (neededRole === 'infantry') {
          selectedUnit = selectBestUnitWithDoctrine(units.troops, [], unitCounts);
        } else if (neededRole === 'armor') {
          const armorUnits = [...units.elites, ...units.heavySupport];
          selectedUnit = selectBestUnitWithDoctrine(armorUnits, [], unitCounts);
        } else if (neededRole === 'support') {
          selectedUnit = selectBestUnitWithDoctrine(units.fastAttack, [], unitCounts);
        }
        
        // Fallback to any good unit if specific role selection fails
        if (!selectedUnit || army.totalPoints + selectedUnit.points > TARGET_POINTS) {
          const allCategories = [units.troops, units.elites, units.heavySupport, units.fastAttack];
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
          const allCategories = [units.fastAttack, units.elites, units.troops, units.heavySupport];
          
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
        const realismDescription = militaryDoctrine.realismScaling?.[difficulty]?.description || 
                                 getDifficultyDescription(difficulty, army.mainFaction);
                                 
        army.militaryDoctrine = {
          scenario: scenarioDoctrine.name || scenario.name,
          description: scenarioDoctrine.description || scenario.description,
          realWorldAnalog: scenarioDoctrine.realWorldAnalog || 'Combined arms doctrine',
          composition: currentComposition,
          targets: doctrineTargets,
          adherence: realismDescription
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
    army.loreJustification = generateLoreJustification(army, scenario, faction, difficulty, militaryRoles);

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

  const generateLoreJustification = (army, scenario, subfaction, difficulty, militaryRoles) => {
    const factionNames = {
      // T'au Empire subfactions
      tau_sept: 'T\'au Sept',
      farsight_enclaves: 'Farsight Enclaves',
      bork_an: 'Bork\'an Sept',
      vior_la: 'Vior\'la Sept',
      sacea: 'Sa\'cea Sept',
      
      // Space Marine chapters
      ultramarines: 'Ultramarines',
      blood_angels: 'Blood Angels',
      dark_angels: 'Dark Angels',
      imperial_fists: 'Imperial Fists',
      iron_hands: 'Iron Hands',
      salamanders: 'Salamanders',
      
      // Fallback main factions
      tau_empire: 'T\'au Empire',
      space_marines: 'Adeptus Astartes'
    };

    const factionName = factionNames[subfaction] || factionNames[army.mainFaction] || subfaction;
    let justification = `**${factionName} Force Deployment Analysis**\n\n`;
    
    justification += `**Mission:** ${scenario.name}\n`;
    justification += `**Force Size:** ${army.totalPoints} points (${army.units.length} units)\n`;
    justification += `**Operational Difficulty:** ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}\n\n`;

    // Add faction-specific tactical doctrine
    if (army.mainFaction === 'tau_empire') {
      justification += `**T'au Tactical Doctrine:**\n`;
      justification += `This force follows the principles of the Greater Good, emphasizing combined arms warfare and technological superiority. `;
      justification += `Fire Warrior teams provide flexible firepower, while battlesuits deliver precision strikes and heavy weapons support.\n\n`;
    } else if (army.mainFaction === 'space_marines') {
      justification += `**Adeptus Astartes Tactical Doctrine:**\n`;
      justification += `This force follows the tenets of the Codex Astartes, emphasizing tactical flexibility and combined arms warfare. `;
      justification += `Space Marine squads provide versatile infantry backbone, while elite units deliver decisive strikes at critical moments.\n\n`;
    }

    // List key units with tactical roles
    justification += `**Key Force Elements:**\n`;
    army.units.forEach(unit => {
      const role = unit.loreRoles?.[0] || 'Combat Unit';
      justification += `• ${unit.name}: ${role} (${unit.points}pts)\n`;
    });

    // Military doctrine composition if used
    if (army.militaryDoctrine) {
      const total = army.totalPoints;
      const comp = army.militaryDoctrine.composition;
      
      justification += `\n**Military Doctrine Composition:**\n`;
      justification += `• Command Elements: ${Math.round((comp.command / total) * 100)}% (${comp.command}pts) - ${militaryRoles.command?.description || 'Command structure'}\n`;
      justification += `• Infantry Forces: ${Math.round((comp.infantry / total) * 100)}% (${comp.infantry}pts) - ${militaryRoles.line_infantry?.description || 'Main battle line'}\n`;
      
      if (comp.armor) {
        justification += `• Armored Units: ${Math.round((comp.armor / total) * 100)}% (${comp.armor}pts) - ${militaryRoles.elite_assault?.description || 'Heavy assault'}\n`;
      }
      if (comp.support) {
        justification += `• Support Elements: ${Math.round((comp.support / total) * 100)}% (${comp.support}pts) - ${militaryRoles.fire_support?.description || 'Fire support'}\n`;
      }
      
      justification += `\n${army.militaryDoctrine.adherence}\n`;
    }

    return justification;
  };

  // Helper function to get faction-agnostic difficulty descriptions
  const getDifficultyDescription = (difficulty, factionType) => {
    const descriptions = {
      easy: {
        title: 'Basic Operations',
        description: 'Straightforward deployment with standard tactical formations and basic equipment loadouts'
      },
      medium: {
        title: 'Standard Campaign', 
        description: 'Balanced force composition with mix of standard and specialized units, moderate tactical complexity'
      },
      hard: {
        title: 'Elite Operations',
        description: 'Veteran formations with specialized equipment, complex tactical coordination and elite unit deployment'
      },
      extreme: {
        title: 'Maximum Effort Deployment',
        description: 'Legendary commanders leading elite forces with optimized equipment in the most demanding scenarios'
      }
    };

    return descriptions[difficulty]?.description || 'Standard military operations';
  };

  // Get faction data for render
  const factionData = getFactionUnitsAndData(faction);
  if (!factionData) {
    return <div>Error: Cannot load faction data</div>;
  }

  const { units, difficultyModifiers } = factionData;
  const difficultyMods = difficultyModifiers[difficulty];
  const availableHQChoices = filterUnitsByFaction(units.hq, faction);

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

              {difficultyMods.namedCharacters && (
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