import React, { useState } from 'react';
import { tauUnits, scenarioModifiers, difficultyModifiers } from '../data/tauUnits';
import './ArmyComposer.css';

function ArmyComposer({ scenario, difficulty, faction, onArmyGenerated }) {
  const [compositionMode, setCompositionMode] = useState('easy-create');
  const [customChoices, setCustomChoices] = useState({
    hqChoice: '',
    troopsCount: 2,
    elitesCount: 1,
    fastAttackCount: 0,
    heavySupportCount: 1,
    includeNamedCharacter: false
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
    const selectBestUnit = (units, excludeIds = []) => {
      const availableUnits = filterUnitsByFaction(units, faction).filter(unit => !excludeIds.includes(unit.id));
      if (availableUnits.length === 0) return null;
      
      const scoredUnits = availableUnits.map(unit => ({
        ...unit,
        score: scoreUnit(unit)
      }));
      
      scoredUnits.sort((a, b) => b.score - a.score);
      return scoredUnits[0];
    };

    if (useCustomChoices) {
      // Custom army composition logic - Point-aware generation
      const usedUnitIds = [];
      const TARGET_POINTS = 2000;
      const MINIMUM_POINTS = 1900; // Allow some flexibility

      // Phase 1: Add mandatory/preferred units
      
      // Add HQ
      if (customChoices.hqChoice) {
        const hqUnit = getUnitById(customChoices.hqChoice);
        if (hqUnit) {
          army.units.push({ ...hqUnit, selectedOptions: [] });
          army.totalPoints += hqUnit.points;
          usedUnitIds.push(hqUnit.id);
        }
      } else {
        const bestHQ = selectBestUnit(tauUnits.hq, usedUnitIds);
        if (bestHQ) {
          army.units.push({ ...bestHQ, selectedOptions: [] });
          army.totalPoints += bestHQ.points;
          usedUnitIds.push(bestHQ.id);
        }
      }

      // Add Named Character if requested
      if (customChoices.includeNamedCharacter && difficultyMods.namedCharacters) {
        const namedChar = selectBestUnit(tauUnits.namedCharacters, usedUnitIds);
        if (namedChar && army.totalPoints + namedChar.points <= TARGET_POINTS - 200) {
          army.units.push({ ...namedChar, selectedOptions: [] });
          army.totalPoints += namedChar.points;
          usedUnitIds.push(namedChar.id);
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
        const troopUnit = selectBestUnit(tauUnits.troops, usedUnitIds);
        if (troopUnit && army.totalPoints + troopUnit.points <= TARGET_POINTS - 300) {
          army.units.push({ ...troopUnit, selectedOptions: [] });
          army.totalPoints += troopUnit.points;
        }
      }

      // Phase 3: Distribute remaining points according to preferences
      const categories = [
        { units: tauUnits.troops, requestedCount: minimumCounts.troops - 2, name: 'troops' },
        { units: tauUnits.elites, requestedCount: minimumCounts.elites, name: 'elites' },
        { units: tauUnits.fastAttack, requestedCount: minimumCounts.fastAttack, name: 'fastAttack' },
        { units: tauUnits.heavySupport, requestedCount: minimumCounts.heavySupport, name: 'heavySupport' }
      ];

      // Sort categories by user preference (higher counts first)
      categories.sort((a, b) => b.requestedCount - a.requestedCount);

      // Add units from each category based on preference and points available
      for (const category of categories) {
        let addedFromCategory = 0;
        const maxToAdd = Math.max(category.requestedCount, 1); // At least try to add one from each requested category
        
        while (addedFromCategory < maxToAdd && army.totalPoints < MINIMUM_POINTS) {
          const unit = selectBestUnit(category.units, usedUnitIds);
          if (unit && army.totalPoints + unit.points <= TARGET_POINTS) {
            army.units.push({ ...unit, selectedOptions: [] });
            army.totalPoints += unit.points;
            usedUnitIds.push(unit.id);
            addedFromCategory++;
          } else {
            break; // Can't add more from this category
          }
        }
      }

      // Phase 4: Fill remaining points intelligently
      while (army.totalPoints < MINIMUM_POINTS) {
        let bestUnit = null;
        let bestScore = -1;
        let bestCategory = null;

        // Look for the best unit across all categories that fits
        for (const category of categories) {
          const unit = selectBestUnit(category.units, usedUnitIds);
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
          army.units.push({ ...bestUnit, selectedOptions: [] });
          army.totalPoints += bestUnit.points;
          usedUnitIds.push(bestUnit.id);
        } else {
          // Try adding duplicates of existing units if no new units fit
          const existingUnits = army.units.filter(u => !u.keywords?.includes('Epic Hero'));
          if (existingUnits.length > 0) {
            const cheapestExisting = existingUnits.reduce((min, unit) => 
              unit.points < min.points ? unit : min
            );
            
            if (army.totalPoints + cheapestExisting.points <= TARGET_POINTS) {
              army.units.push({ ...cheapestExisting, selectedOptions: [] });
              army.totalPoints += cheapestExisting.points;
            } else {
              break; // Can't add anything else
            }
          } else {
            break;
          }
        }
      }

      // Phase 5: Add additional troops if we still have significant points remaining
      while (army.totalPoints < TARGET_POINTS - 100) {
        const additionalTroop = selectBestUnit(tauUnits.troops, []);
        if (additionalTroop && army.totalPoints + additionalTroop.points <= TARGET_POINTS) {
          army.units.push({ ...additionalTroop, selectedOptions: [] });
          army.totalPoints += additionalTroop.points;
        } else {
          break;
        }
      }

    } else {
      // Easy-create: Automatic army generation
      const usedUnitIds = [];

      // Add HQ (mandatory)
      const bestHQ = selectBestUnit(tauUnits.hq, usedUnitIds);
      if (bestHQ) {
        army.units.push({ ...bestHQ, selectedOptions: [] });
        army.totalPoints += bestHQ.points;
        usedUnitIds.push(bestHQ.id);
      }

      // Add Named Character for hard/extreme difficulty
      if (difficultyMods.namedCharacters) {
        const namedChar = selectBestUnit(tauUnits.namedCharacters, usedUnitIds);
        if (namedChar && army.totalPoints + namedChar.points <= 1800) {
          army.units.push({ ...namedChar, selectedOptions: [] });
          army.totalPoints += namedChar.points;
          usedUnitIds.push(namedChar.id);
        }
      }

      // Add core troops (minimum 2 units)
      for (let i = 0; i < 2; i++) {
        const troopUnit = selectBestUnit(tauUnits.troops, usedUnitIds);
        if (troopUnit && army.totalPoints + troopUnit.points <= 1900) {
          army.units.push({ ...troopUnit, selectedOptions: [] });
          army.totalPoints += troopUnit.points;
        }
      }

      // Fill remaining points with best units
      const remainingCategories = [tauUnits.elites, tauUnits.heavySupport, tauUnits.fastAttack];
      
      while (army.totalPoints < 1800) {
        let bestUnit = null;
        let bestScore = -1;

        for (const category of remainingCategories) {
          const unit = selectBestUnit(category, usedUnitIds);
          if (unit && army.totalPoints + unit.points <= 2000) {
            const score = scoreUnit(unit);
            if (score > bestScore) {
              bestScore = score;
              bestUnit = unit;
            }
          }
        }

        if (bestUnit) {
          army.units.push({ ...bestUnit, selectedOptions: [] });
          army.totalPoints += bestUnit.points;
          usedUnitIds.push(bestUnit.id);
        } else {
          break;
        }
      }
    }

    // Add equipment optimizations based on difficulty
    if (difficultyMods.optimizedLoadouts) {
      army.units.forEach(unit => {
        if (unit.equipment?.options) {
          // Add competitive equipment based on scenario and faction
          const competitiveOptions = getCompetitiveLoadout(unit, scenario.context, faction, difficulty);
          unit.selectedOptions = competitiveOptions;
          unit.optionsPoints = competitiveOptions.reduce((sum, opt) => sum + opt.cost, 0);
          army.totalPoints += unit.optionsPoints || 0;
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
          <li>All armies are built to 2000 points</li>
          <li>Unit selection prioritizes lore-appropriate choices</li>
          <li>Equipment is optimized based on difficulty level</li>
          <li>Subfaction abilities and synergies are considered</li>
        </ul>
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