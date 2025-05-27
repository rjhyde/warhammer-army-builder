import React, { useState } from 'react';
import { getFactionData } from '../data/factionRegistry';
import { selectWargear } from '../data/wargearSelection';
import { selectSpaceMarineWargear } from '../data/spaceMarineWargear';
import { leaderAttachmentRules as tauLeaderRules } from '../data/tauUnits';
import { leaderAttachmentRules as spaceMarineLeaderRules } from '../data/spaceMarineUnits';
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

  // Enhanced wargear selection function
  const selectOptimalWargear = (unit, scenarioContext, difficultyLevel, factionType) => {
    let wargearResult = { selectedOptions: [], description: 'Standard equipment only' };
    
    // Determine which wargear system to use based on faction
    if (factionType === 'tau_empire' || ['tau_sept', 'farsight_enclaves', 'bork_an', 'vior_la', 'sacea'].includes(factionType)) {
      wargearResult = selectWargear(unit, scenarioContext, difficultyLevel);
    } else if (factionType === 'space_marines' || ['ultramarines', 'blood_angels', 'dark_angels', 'imperial_fists', 'iron_hands', 'salamanders'].includes(factionType)) {
      // Extract chapter from faction
      const chapter = ['ultramarines', 'blood_angels', 'dark_angels', 'imperial_fists', 'iron_hands', 'salamanders'].includes(factionType) 
        ? factionType 
        : 'ultramarines';
      wargearResult = selectSpaceMarineWargear(unit, scenarioContext, difficultyLevel, chapter);
    }

    // Convert string options to proper option objects with costs
    const processedOptions = wargearResult.selectedOptions.map(option => {
      if (typeof option === 'string') {
        // Try to extract cost from option string patterns like "Equipment (+5pts)"
        const costMatch = option.match(/\(.*?(\+\d+)pts?\)/);
        const cost = costMatch ? parseInt(costMatch[1]) : 0;
        const cleanName = option.replace(/\s*\(.*?\)/, ''); // Remove cost text
        
        return {
          name: cleanName,
          cost: cost
        };
      }
      return option;
    });

    return {
      selectedOptions: processedOptions,
      description: wargearResult.description,
      tacticalRationale: wargearResult.tacticalRationale || `Equipment optimized for ${scenarioContext} operations`
    };
  };

  // Calculate total equipment cost
  const calculateEquipmentCost = (selectedOptions) => {
    return selectedOptions.reduce((total, option) => {
      return total + (option.cost || 0);
    }, 0);
  };

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

    // Enhanced unit selection that accounts for Rule of Three
    const selectBestUnit = (units, excludeIds = [], unitCounts = {}) => {
      const availableUnits = filterUnitsByFaction(units, faction).filter(unit => {
        // Rule of Three: max 3 of any datasheet
        const currentCount = unitCounts[unit.id] || 0;
        if (currentCount >= 3) return false;
        
        // Character uniqueness: only one of each character
        if (unit.keywords?.includes('Character') && excludeIds.includes(unit.id)) {
          return false;
        }
        
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

    // Enhanced equipment processing with proper replacement handling
    const processUnitEquipment = (unit, selectedWargear) => {
      let finalEquipment = [...unit.equipment.base];
      const equipmentChanges = [];

      // Apply wargear selections with proper replacement logic
      selectedWargear.selectedOptions.forEach(option => {
        // Handle both string and object options
        const optionName = typeof option === 'string' ? option : (option.name || option);
        const optionLower = optionName.toLowerCase();
        
        // T'AU EMPIRE REPLACEMENTS
        if (unit.id === 'hammerhead') {
          if (optionLower.includes('ion cannon')) {
            // Replace railgun with ion cannon
            const railgunIndex = finalEquipment.findIndex(item => item.toLowerCase().includes('railgun'));
            if (railgunIndex !== -1) {
              finalEquipment[railgunIndex] = 'Ion cannon';
              equipmentChanges.push('Railgun → Ion cannon');
            }
          }
          if (optionLower.includes('smart missile system')) {
            // Replace gun drones with smart missile system
            finalEquipment = finalEquipment.filter(item => !item.toLowerCase().includes('gun drone'));
            finalEquipment.push('Smart missile system');
            equipmentChanges.push('Gun drones → Smart missile system');
          }
          if (optionLower.includes('accelerator burst cannon')) {
            // Replace gun drones with accelerator burst cannon
            finalEquipment = finalEquipment.filter(item => !item.toLowerCase().includes('gun drone'));
            finalEquipment.push('Accelerator burst cannon');
            equipmentChanges.push('Gun drones → Accelerator burst cannon');
          }
        }

        else if (unit.id === 'piranhas') {
          if (optionLower.includes('fusion blaster')) {
            // Replace burst cannon with fusion blaster
            const burstIndex = finalEquipment.findIndex(item => item.toLowerCase().includes('burst cannon'));
            if (burstIndex !== -1) {
              finalEquipment[burstIndex] = 'Fusion blaster';
              equipmentChanges.push('Burst cannon → Fusion blaster');
            }
          }
          if (optionLower.includes('seeker missiles')) {
            finalEquipment.push('Seeker missiles x2');
            equipmentChanges.push('Added seeker missiles');
          }
        }

        else if (unit.id === 'broadside_suits') {
          if (optionLower.includes('high-yield missile pod')) {
            // Replace heavy rail rifle with high-yield missile pod
            const railIndex = finalEquipment.findIndex(item => item.toLowerCase().includes('heavy rail rifle'));
            if (railIndex !== -1) {
              finalEquipment[railIndex] = 'High-yield missile pod';
              equipmentChanges.push('Heavy rail rifle → High-yield missile pod');
            }
          }
          if (optionLower.includes('seeker missiles')) {
            finalEquipment.push('Seeker missiles x2');
            equipmentChanges.push('Added seeker missiles');
          }
          if (optionLower.includes('velocity tracker')) {
            finalEquipment.push('Velocity tracker');
            equipmentChanges.push('Added velocity tracker');
          }
        }

        // SPACE MARINE REPLACEMENTS
        else if (unit.id === 'intercessor_squad') {
          if (optionLower.includes('auto bolt rifle')) {
            // Replace all bolt rifles with auto bolt rifles
            finalEquipment = finalEquipment.map(item => 
              item.toLowerCase().includes('bolt rifle') ? 'Auto bolt rifle' : item
            );
            equipmentChanges.push('Bolt rifles → Auto bolt rifles (squad)');
          }
          else if (optionLower.includes('stalker bolt rifle')) {
            // Replace all bolt rifles with stalker bolt rifles
            finalEquipment = finalEquipment.map(item => 
              item.toLowerCase().includes('bolt rifle') ? 'Stalker bolt rifle' : item
            );
            equipmentChanges.push('Bolt rifles → Stalker bolt rifles (squad)');
          }
          if (optionLower.includes('sergeant') && optionLower.includes('power')) {
            finalEquipment.push(optionName.split(': ')[1] || optionName);
            equipmentChanges.push('Sergeant upgrade added');
          }
        }

        else if (unit.id === 'tactical_squad') {
          if (optionLower.includes('heavy bolter') || optionLower.includes('lascannon') || 
              optionLower.includes('missile launcher') || optionLower.includes('multi-melta')) {
            // Heavy weapon replaces one marine's boltgun
            const boltgunIndex = finalEquipment.findIndex(item => 
              item.toLowerCase().includes('bolt rifle') || item.toLowerCase().includes('boltgun')
            );
            if (boltgunIndex !== -1) {
              const heavyWeapon = optionName.includes('Sergeant:') ? optionName : optionName.split(' ')[0] + ' ' + optionName.split(' ')[1];
              finalEquipment[boltgunIndex] = heavyWeapon;
              equipmentChanges.push(`Boltgun → ${heavyWeapon} (1 model)`);
            }
          }
          if (optionLower.includes('plasma gun') || optionLower.includes('meltagun') || 
              optionLower.includes('flamer')) {
            // Special weapon replaces another marine's boltgun
            const boltgunIndex = finalEquipment.findIndex((item, index) => 
              (item.toLowerCase().includes('bolt rifle') || item.toLowerCase().includes('boltgun')) &&
              !equipmentChanges.some(change => change.includes(`Boltgun → ${item}`))
            );
            if (boltgunIndex !== -1) {
              const specialWeapon = optionName.includes('Sergeant:') ? optionName : optionName;
              finalEquipment[boltgunIndex] = specialWeapon;
              equipmentChanges.push(`Boltgun → ${specialWeapon} (1 model)`);
            }
          }
          if (optionLower.includes('sergeant') && optionLower.includes('power')) {
            finalEquipment.push(optionName.split(': ')[1] || optionName);
            equipmentChanges.push('Sergeant upgrade added');
          }
        }

        else if (unit.id === 'heavy_intercessor_squad') {
          if (optionLower.includes('executor heavy bolter')) {
            // Replace heavy bolt rifle with executor heavy bolter (1 model)
            const heavyBoltIndex = finalEquipment.findIndex(item => item.toLowerCase().includes('heavy bolt rifle'));
            if (heavyBoltIndex !== -1) {
              finalEquipment[heavyBoltIndex] = 'Executor heavy bolter';
              equipmentChanges.push('Heavy bolt rifle → Executor heavy bolter (1 model)');
            }
          }
          if (optionLower.includes('sergeant') && optionLower.includes('power')) {
            finalEquipment.push(optionName.split(': ')[1] || optionName);
            equipmentChanges.push('Sergeant upgrade added');
          }
        }

        else if (unit.id === 'inceptor_squad') {
          if (optionLower.includes('plasma exterminator')) {
            // Replace assault bolters with plasma exterminators (all models)
            finalEquipment = finalEquipment.map(item => 
              item.toLowerCase().includes('assault bolter') ? 'Plasma exterminator x2' : item
            );
            equipmentChanges.push('Assault bolters → Plasma exterminators (squad)');
          }
        }

        else if (unit.id === 'devastator_squad') {
          // Devastators replace boltguns with heavy weapons
          if (optionLower.includes('heavy bolter') || optionLower.includes('lascannon') || 
              optionLower.includes('missile launcher') || optionLower.includes('multi-melta')) {
            const boltgunIndex = finalEquipment.findIndex(item => item.toLowerCase().includes('boltgun'));
            if (boltgunIndex !== -1) {
              finalEquipment[boltgunIndex] = optionName;
              equipmentChanges.push(`Boltgun → ${optionName} (1 model)`);
            } else {
              finalEquipment.push(optionName);
              equipmentChanges.push(`Added ${optionName}`);
            }
          }
        }

        // GENERAL ADDITIONS (not replacements)
        else {
          // For Fire Warriors, Stealth Suits, Pathfinders, etc. - additions, not replacements
          if (!optionLower.includes('replaces') && !optionLower.includes('→')) {
            finalEquipment.push(optionName);
            equipmentChanges.push(`Added ${optionName}`);
          }
        }
      });

      return {
        equipment: finalEquipment,
        changes: equipmentChanges
      };
    };

    // 10th Edition Leader Embedding System
    const getLeaderAttachmentRules = (factionType) => {
      if (factionType === 'tau_empire' || ['tau_sept', 'farsight_enclaves', 'bork_an', 'vior_la', 'sacea'].includes(factionType)) {
        return tauLeaderRules;
      } else if (factionType === 'space_marines' || ['ultramarines', 'blood_angels', 'dark_angels', 'imperial_fists', 'iron_hands', 'salamanders'].includes(factionType)) {
        return spaceMarineLeaderRules;
      }
      return {};
    };

    const findCompatibleUnitsForLeader = (leader, allUnits) => {
      const leaderRules = getLeaderAttachmentRules(faction);
      const leaderAttachment = leaderRules[leader.id];
      
      if (!leaderAttachment || !leaderAttachment.canAttachTo) {
        console.log(`No attachment rules found for leader: ${leader.name}`);
        return [];
      }

      const compatibleUnits = [];
      
      // Search through all unit categories for compatible units
      Object.values(allUnits).forEach(category => {
        if (Array.isArray(category)) {
          category.forEach(unit => {
            if (leaderAttachment.canAttachTo.includes(unit.id)) {
              compatibleUnits.push(unit);
            }
          });
        }
      });

      console.log(`Leader ${leader.name} can attach to: ${compatibleUnits.map(u => u.name).join(', ')}`);
      return compatibleUnits;
    };

    const ensureLeaderHasCompatibleUnit = (army, leader, allUnits) => {
      const compatibleUnits = findCompatibleUnitsForLeader(leader, allUnits);
      
      if (compatibleUnits.length === 0) {
        console.warn(`Leader ${leader.name} has no compatible units to attach to`);
        return false;
      }

      // Check if army already has a compatible unit that doesn't have a leader
      const existingCompatibleUnit = army.units.find(unit => 
        compatibleUnits.some(comp => comp.id === unit.id) && !unit.attachedLeader
      );

      if (existingCompatibleUnit) {
        // Attach leader to existing unit
        existingCompatibleUnit.attachedLeader = {
          id: leader.id,
          name: leader.name,
          bonuses: leader.leaderAttachment?.bonuses || []
        };
        console.log(`Attached ${leader.name} to existing ${existingCompatibleUnit.name}`);
        return true;
      }

      return false; // Will need to add a compatible unit
    };

    const needsCompatibleUnitForLeader = (leader, army, allUnits) => {
      const compatibleUnits = findCompatibleUnitsForLeader(leader, allUnits);
      
      if (compatibleUnits.length === 0) return false;

      // Check if army has any compatible units without leaders
      const hasCompatibleUnit = army.units.some(unit => 
        compatibleUnits.some(comp => comp.id === unit.id) && !unit.attachedLeader
      );

      return !hasCompatibleUnit;
    };

    if (useCustomChoices) {
      // Custom army composition logic - Point-aware generation with Rule of Three
      const usedUnitIds = [];
      const unitCounts = {}; // Track how many of each datasheet we have
      const TARGET_POINTS = 2000;
      const MINIMUM_POINTS = 1900; // Allow some flexibility

      // Enhanced helper function to add unit with wargear selection
      const addUnit = (unit) => {
        if (!unit) return false;
        
        // Select optimal wargear for this unit
        const wargearSelection = selectOptimalWargear(unit, scenario.context, difficulty, factionData.mainFaction);
        const equipmentCost = calculateEquipmentCost(wargearSelection.selectedOptions);
        const totalUnitCost = unit.points + equipmentCost;
        
        // Create enhanced unit with selected wargear
        const enhancedUnit = {
          ...unit,
          selectedOptions: wargearSelection.selectedOptions,
          optionsPoints: equipmentCost,
          tacticalRationale: wargearSelection.tacticalRationale,
          wargearDescription: wargearSelection.description
        };
        
        // Process equipment
        const equipmentResult = processUnitEquipment(enhancedUnit, wargearSelection);
        enhancedUnit.equipment = equipmentResult.equipment;
        enhancedUnit.equipmentChanges = equipmentResult.changes;
        
        army.units.push(enhancedUnit);
        army.totalPoints += totalUnitCost;
        unitCounts[unit.id] = (unitCounts[unit.id] || 0) + 1;
        
        // Only add to excludeIds for first instance (for HQ uniqueness)
        if (!usedUnitIds.includes(unit.id)) {
          usedUnitIds.push(unit.id);
        }
        
        console.log(`Added ${unit.name} with wargear: ${wargearSelection.selectedOptions.map(opt => opt.name).join(', ')} (+${equipmentCost}pts)`);
        
        return true;
      };

      // Phase 1: Establish command structure (mandatory HQ) with 10th Edition Leader Embedding
      const bestHQ = selectBestUnit(units.hq, usedUnitIds, unitCounts);
      if (bestHQ) {
        addUnit(bestHQ);
        
        // 10th Edition Leader Embedding: Ensure HQ has a compatible unit to attach to
        if (bestHQ.leaderAttachment && bestHQ.leaderAttachment.canAttachTo.length > 0) {
          const attached = ensureLeaderHasCompatibleUnit(army, bestHQ, units);
          
          if (!attached && needsCompatibleUnitForLeader(bestHQ, army, units)) {
            // Need to add a compatible unit for the leader to attach to
            const compatibleUnits = findCompatibleUnitsForLeader(bestHQ, units);
            
            if (compatibleUnits.length > 0) {
              // Score compatible units and select the best one
              const scoredCompatibleUnits = compatibleUnits.map(unit => ({
                ...unit,
                score: scoreUnitWithDoctrine(unit, currentComposition, doctrineTargets, customChoices.useRealWorldDoctrine)
              }));
              
              scoredCompatibleUnits.sort((a, b) => b.score - a.score);
              const bestCompatibleUnit = scoredCompatibleUnits[0];
              
              if (bestCompatibleUnit && army.totalPoints + bestCompatibleUnit.points <= TARGET_POINTS - 200) {
                addUnit(bestCompatibleUnit);
                
                // Attach the leader to this unit
                const addedUnit = army.units[army.units.length - 1];
                addedUnit.attachedLeader = {
                  id: bestHQ.id,
                  name: bestHQ.name,
                  bonuses: bestHQ.leaderAttachment?.bonuses || []
                };
                
                console.log(`Added ${bestCompatibleUnit.name} for ${bestHQ.name} to attach to`);
              }
            }
          }
        }
      }

      // Phase 2: Add named character for major operations (doctrine-based) with Leader Embedding
      const namedCharacterThreshold = militaryDoctrine.commandStructure?.namedCharacterThreshold || 500;
      if (difficultyMods.namedCharacters && army.totalPoints >= namedCharacterThreshold) {
        const namedChar = selectBestUnit(units.namedCharacters, usedUnitIds, unitCounts);
        if (namedChar && army.totalPoints + namedChar.points <= TARGET_POINTS - 300) {
          addUnit(namedChar);
          
          // 10th Edition Leader Embedding for Named Characters
          if (namedChar.leaderAttachment && namedChar.leaderAttachment.canAttachTo.length > 0) {
            const attached = ensureLeaderHasCompatibleUnit(army, namedChar, units);
            
            if (!attached && needsCompatibleUnitForLeader(namedChar, army, units)) {
              // Need to add a compatible unit for the named character
              const compatibleUnits = findCompatibleUnitsForLeader(namedChar, units);
              
              if (compatibleUnits.length > 0) {
                const scoredCompatibleUnits = compatibleUnits.map(unit => ({
                  ...unit,
                  score: scoreUnitWithDoctrine(unit, currentComposition, doctrineTargets, customChoices.useRealWorldDoctrine)
                }));
                
                scoredCompatibleUnits.sort((a, b) => b.score - a.score);
                const bestCompatibleUnit = scoredCompatibleUnits[0];
                
                if (bestCompatibleUnit && army.totalPoints + bestCompatibleUnit.points <= TARGET_POINTS - 100) {
                  addUnit(bestCompatibleUnit);
                  
                  // Attach the named character to this unit
                  const addedUnit = army.units[army.units.length - 1];
                  addedUnit.attachedLeader = {
                    id: namedChar.id,
                    name: namedChar.name,
                    bonuses: namedChar.leaderAttachment?.bonuses || []
                  };
                  
                  console.log(`Added ${bestCompatibleUnit.name} for ${namedChar.name} to attach to`);
                }
              }
            }
          }
        }
      }

      // Phase 3: Core doctrine-based force structure
      const maxAttempts = 30;
      let attempts = 0;
      
      while (army.totalPoints < MINIMUM_TARGET && attempts < maxAttempts) {
        let addedAnyUnit = false;
        
        // Select best unit from any category using doctrine scoring
        const allCategories = [units.troops, units.elites, units.fastAttack, units.heavySupport];
        let bestUnit = null;
        let bestScore = -1;
        
        for (const category of allCategories) {
          const unit = selectBestUnit(category, [], unitCounts);
          if (unit && army.totalPoints + unit.points + 50 <= TARGET_POINTS) { // Leave room for equipment
            if (unit.score > bestScore) {
              bestScore = unit.score;
              bestUnit = unit;
            }
          }
        }
        
        if (bestUnit) {
          addUnit(bestUnit);
          addedAnyUnit = true;
        }
        
        if (!addedAnyUnit) break;
        attempts++;
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

      // Enhanced helper function to add unit with wargear selection
      const addUnit = (unit) => {
        if (!unit) return false;
        
        // Select optimal wargear for this unit
        const wargearSelection = selectOptimalWargear(unit, scenario.context, difficulty, factionData.mainFaction);
        const equipmentCost = calculateEquipmentCost(wargearSelection.selectedOptions);
        const totalUnitCost = unit.points + equipmentCost;
        
        // Create enhanced unit with selected wargear
        const enhancedUnit = {
          ...unit,
          selectedOptions: wargearSelection.selectedOptions,
          optionsPoints: equipmentCost,
          tacticalRationale: wargearSelection.tacticalRationale,
          wargearDescription: wargearSelection.description
        };
        
        // Process equipment
        const equipmentResult = processUnitEquipment(enhancedUnit, wargearSelection);
        enhancedUnit.equipment = equipmentResult.equipment;
        enhancedUnit.equipmentChanges = equipmentResult.changes;
        
        army.units.push(enhancedUnit);
        army.totalPoints += totalUnitCost;
        unitCounts[unit.id] = (unitCounts[unit.id] || 0) + 1;
        
        // Update military composition tracking
        const unitRole = getMilitaryRole(unit);
        currentComposition[unitRole] += totalUnitCost;
        
        // Only add to excludeIds for first instance (for HQ uniqueness)
        if (!usedUnitIds.includes(unit.id)) {
          usedUnitIds.push(unit.id);
        }
        
        console.log(`Added ${unit.name} with wargear: ${wargearSelection.selectedOptions.map(opt => opt.name).join(', ')} (+${equipmentCost}pts)`);
        
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

      // Phase 1: Establish command structure (mandatory HQ) with 10th Edition Leader Embedding
      const bestHQ = selectBestUnitWithDoctrine(units.hq, usedUnitIds, unitCounts);
      if (bestHQ) {
        addUnit(bestHQ);
        
        // 10th Edition Leader Embedding: Ensure HQ has a compatible unit to attach to
        if (bestHQ.leaderAttachment && bestHQ.leaderAttachment.canAttachTo.length > 0) {
          const attached = ensureLeaderHasCompatibleUnit(army, bestHQ, units);
          
          if (!attached && needsCompatibleUnitForLeader(bestHQ, army, units)) {
            // Need to add a compatible unit for the leader to attach to
            const compatibleUnits = findCompatibleUnitsForLeader(bestHQ, units);
            
            if (compatibleUnits.length > 0) {
              // Score compatible units and select the best one
              const scoredCompatibleUnits = compatibleUnits.map(unit => ({
                ...unit,
                score: scoreUnitWithDoctrine(unit, currentComposition, doctrineTargets, customChoices.useRealWorldDoctrine)
              }));
              
              scoredCompatibleUnits.sort((a, b) => b.score - a.score);
              const bestCompatibleUnit = scoredCompatibleUnits[0];
              
              if (bestCompatibleUnit && army.totalPoints + bestCompatibleUnit.points <= TARGET_POINTS - 200) {
                addUnit(bestCompatibleUnit);
                
                // Attach the leader to this unit
                const addedUnit = army.units[army.units.length - 1];
                addedUnit.attachedLeader = {
                  id: bestHQ.id,
                  name: bestHQ.name,
                  bonuses: bestHQ.leaderAttachment?.bonuses || []
                };
                
                console.log(`Added ${bestCompatibleUnit.name} for ${bestHQ.name} to attach to`);
              }
            }
          }
        }
      }

      // Phase 2: Add named character for major operations (doctrine-based) with Leader Embedding
      const namedCharacterThreshold = militaryDoctrine.commandStructure?.namedCharacterThreshold || 500;
      if (difficultyMods.namedCharacters && army.totalPoints >= namedCharacterThreshold) {
        const namedChar = selectBestUnitWithDoctrine(units.namedCharacters, usedUnitIds, unitCounts);
        if (namedChar && army.totalPoints + namedChar.points <= TARGET_POINTS - 300) {
          addUnit(namedChar);
          
          // 10th Edition Leader Embedding for Named Characters
          if (namedChar.leaderAttachment && namedChar.leaderAttachment.canAttachTo.length > 0) {
            const attached = ensureLeaderHasCompatibleUnit(army, namedChar, units);
            
            if (!attached && needsCompatibleUnitForLeader(namedChar, army, units)) {
              // Need to add a compatible unit for the named character
              const compatibleUnits = findCompatibleUnitsForLeader(namedChar, units);
              
              if (compatibleUnits.length > 0) {
                const scoredCompatibleUnits = compatibleUnits.map(unit => ({
                  ...unit,
                  score: scoreUnitWithDoctrine(unit, currentComposition, doctrineTargets, customChoices.useRealWorldDoctrine)
                }));
                
                scoredCompatibleUnits.sort((a, b) => b.score - a.score);
                const bestCompatibleUnit = scoredCompatibleUnits[0];
                
                if (bestCompatibleUnit && army.totalPoints + bestCompatibleUnit.points <= TARGET_POINTS - 100) {
                  addUnit(bestCompatibleUnit);
                  
                  // Attach the named character to this unit
                  const addedUnit = army.units[army.units.length - 1];
                  addedUnit.attachedLeader = {
                    id: namedChar.id,
                    name: namedChar.name,
                    bonuses: namedChar.leaderAttachment?.bonuses || []
                  };
                  
                  console.log(`Added ${bestCompatibleUnit.name} for ${namedChar.name} to attach to`);
                }
              }
            }
          }
        }
      }

      // Phase 3: Core doctrine-based force structure
      const maxAttempts = 30;
      let attempts = 0;
      
      while (army.totalPoints < MINIMUM_TARGET && attempts < maxAttempts) {
        let addedAnyUnit = false;
        
        // Select best unit from any category using doctrine scoring
        const allCategories = [units.troops, units.elites, units.fastAttack, units.heavySupport];
        let bestUnit = null;
        let bestScore = -1;
        
        for (const category of allCategories) {
          const unit = selectBestUnitWithDoctrine(category, [], unitCounts);
          if (unit && army.totalPoints + unit.points + 50 <= TARGET_POINTS) { // Leave room for equipment
            if (unit.score > bestScore) {
              bestScore = unit.score;
              bestUnit = unit;
            }
          }
        }
        
        if (bestUnit) {
          addUnit(bestUnit);
          addedAnyUnit = true;
        }
        
        if (!addedAnyUnit) break;
        attempts++;
      }
    }

    // Generate lore justification
    army.loreJustification = generateLoreJustification(army, scenario, faction, difficulty, militaryRoles);

    onArmyGenerated(army);
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

    // List key units with tactical roles and equipment
    justification += `**Key Force Elements:**\n`;
    army.units.forEach(unit => {
      const role = unit.loreRoles?.[0] || 'Combat Unit';
      const basePoints = unit.points;
      const equipmentPoints = unit.optionsPoints || 0;
      const totalPoints = basePoints + equipmentPoints;
      
      justification += `• ${unit.name}: ${role} (${totalPoints}pts`;
      if (equipmentPoints > 0) {
        justification += ` - ${basePoints}pts base + ${equipmentPoints}pts equipment`;
      }
      justification += `)\n`;
      
      // Add equipment rationale if available
      if (unit.tacticalRationale) {
        justification += `  └─ ${unit.tacticalRationale}\n`;
      }
    });

    // Add wargear optimization summary
    const totalEquipmentCost = army.units.reduce((total, unit) => total + (unit.optionsPoints || 0), 0);
    if (totalEquipmentCost > 0) {
      justification += `\n**Equipment Optimization:**\n`;
      justification += `Total equipment investment: ${totalEquipmentCost}pts optimized for ${scenario.context} operations and ${difficulty} difficulty requirements.\n\n`;
    }

    // Military doctrine composition if used
    if (army.militaryDoctrine) {
      const total = army.totalPoints;
      const comp = army.militaryDoctrine.composition;
      
      justification += `**Military Doctrine Composition:**\n`;
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