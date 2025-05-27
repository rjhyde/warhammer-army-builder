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
          support: { min: totalPoints * 0.05, max: totalPoints * 0.25 },
          fastAttack: { min: totalPoints * 0.05, max: totalPoints * 0.20 }
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
        },
        fastAttack: { 
          min: totalPoints * (doctrine.fastAttack.min / 100), 
          max: totalPoints * (doctrine.fastAttack.max / 100) 
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
      
      // VARIETY BONUS - Encourage diverse force composition
      const existingUnitCount = army.units.filter(u => u.id === unit.id).length;
      const primaryRole = unit.loreRoles?.[0] || 'general';
      
      // Classify unit for variety scoring
      const isSpecialist = ['reconnaissance', 'markerlight_support', 'stealth_specialist', 'scout', 'infiltration'].some(role => primaryRole.includes(role));
      const isSupport = ['fire_support', 'transport', 'mobile_support', 'logistics'].some(role => primaryRole.includes(role));
      const isElite = ['elite_assault', 'elite_command', 'veteran', 'specialist'].some(role => primaryRole.includes(role));
      const isBattleLine = unit.keywords?.includes('troops') || unitRole === 'infantry';
      
      // Apply variety bonuses/penalties
      if (existingUnitCount === 0) {
        // Bonus for units we don't have yet
        if (isSpecialist || isSupport || isElite) {
          score += 4; // Strong bonus for new specialist/support capabilities
        } else if (isBattleLine) {
          score += 2; // Moderate bonus for new battle-line units
        } else {
          score += 3; // Standard bonus for any new unit type
        }
      } else if (existingUnitCount === 1) {
        // Moderate penalty for duplicating specialist units
        if (isSpecialist || isSupport || isElite) {
          score -= 3; // Discourage duplicate specialists
        } else if (isBattleLine) {
          score += 1; // Slight bonus for second battle-line unit (redundancy)
        }
      } else if (existingUnitCount >= 2) {
        // Heavy penalty for too many duplicates
        if (isSpecialist || isSupport || isElite) {
          score -= 8; // Heavily discourage multiple specialists
        } else if (isBattleLine) {
          score -= 2; // Moderate penalty for too many battle-line
        }
      }
      
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

    // Enhanced intelligent quantity selection based on real-world military doctrine
    const calculateOptimalQuantity = (unit, scenario, currentArmy, remainingPoints, doctrineTargets, currentComposition) => {
      // Base factors for quantity calculation
      const unitCost = unit.points;
      const unitRole = getMilitaryRole(unit);
      const primaryRole = unit.loreRoles?.[0] || 'general';
      
      // Real-world military doctrine constraints
      const currentRolePoints = currentComposition[unitRole] || 0;
      const roleTarget = doctrineTargets[unitRole];
      
      // DIMINISHING RETURNS CLASSIFICATION
      // Different unit types have different optimal quantities based on tactical employment
      const unitClassification = {
        // Battle-line units - can scale up for mass and redundancy
        battleLine: ['line_infantry', 'core_infantry', 'troops', 'objective_holding'],
        
        // Specialist units - diminishing returns after 1-2 units
        specialists: ['reconnaissance', 'markerlight_support', 'stealth_specialist', 'scout', 'infiltration'],
        
        // Support units - 1-2 optimal, more creates logistics burden
        support: ['fire_support', 'transport', 'mobile_support', 'logistics'],
        
        // Elite units - expensive, 1-2 optimal
        elites: ['elite_assault', 'elite_command', 'veteran', 'specialist'],
        
        // Heavy assets - 1 optimal, centerpiece units
        heavyAssets: ['heavy_fire_support', 'anti_armor', 'centerpiece', 'super_heavy', 'fortress_breaker'],
        
        // Command units - very limited
        command: ['elite_command', 'tactical_coordination', 'command', 'leadership']
      };
      
      // Determine unit classification
      let unitClass = 'battleLine'; // Default
      for (const [classification, roles] of Object.entries(unitClassification)) {
        if (roles.some(role => primaryRole.includes(role))) {
          unitClass = classification;
          break;
        }
      }
      
      // Override classification for specific unit categories
      if (unitRole === 'command' || unit.keywords?.includes('Character')) {
        unitClass = 'command';
      } else if (unitCost > 200) {
        unitClass = 'heavyAssets';
      } else if (unit.keywords?.includes('troops') || unitRole === 'infantry') {
        // Check if it's actually a specialist infantry unit
        if (unit.id.includes('pathfinder') || unit.id.includes('stealth') || unit.id.includes('scout')) {
          unitClass = 'specialists';
        } else {
          unitClass = 'battleLine';
        }
      }
      
      // OPTIMAL QUANTITY BASED ON CLASSIFICATION AND DIMINISHING RETURNS
      const optimalQuantities = {
        battleLine: { min: 1, optimal: 2, max: 3, diminishingReturns: false },
        specialists: { min: 1, optimal: 1, max: 2, diminishingReturns: true },
        support: { min: 1, optimal: 1, max: 2, diminishingReturns: true },
        elites: { min: 1, optimal: 1, max: 2, diminishingReturns: true },
        heavyAssets: { min: 1, optimal: 1, max: 1, diminishingReturns: true },
        command: { min: 1, optimal: 1, max: 2, diminishingReturns: true }
      };
      
      const quantityLimits = optimalQuantities[unitClass];
      
      // VARIETY ENCOURAGEMENT - Check how many of this unit we already have
      const existingUnitCount = currentArmy.units.filter(u => u.id === unit.id).length;
      
      // DIMINISHING RETURNS PENALTY
      let varietyMultiplier = 1.0;
      if (quantityLimits.diminishingReturns && existingUnitCount > 0) {
        // Severe penalty for adding more specialist/support units
        switch (existingUnitCount) {
          case 1:
            varietyMultiplier = 0.3; // 70% reduction in desirability
            break;
          case 2:
            varietyMultiplier = 0.1; // 90% reduction
            break;
          default:
            varietyMultiplier = 0.05; // 95% reduction
        }
      } else if (!quantityLimits.diminishingReturns && existingUnitCount >= 2) {
        // Moderate penalty for too many battle-line units
        varietyMultiplier = 0.6; // 40% reduction
      }
      
      // Cost-based quantity limits (Rule of Three maximum)
      let maxQuantity = Math.min(3, quantityLimits.max);
      
      // REAL-WORLD MILITARY DOCTRINE PRINCIPLES
      
      // 1. COMMAND SPAN OF CONTROL - Limited command elements
      if (unitRole === 'command' || unit.keywords?.includes('Character')) {
        // Real militaries: 1 leader per 3-12 subordinate units
        const commandRatio = currentRolePoints / (currentArmy.totalPoints || 1);
        if (commandRatio > 0.12) { // 12% command is already very high
          return 0; // No more command units needed
        }
        maxQuantity = Math.min(2, maxQuantity); // Max 2 command units typically
      }
      
      // 2. HEAVY ASSETS DOCTRINE - Expensive units require support
      if (unitCost > 200) {
        // Heavy assets (tanks, aircraft, etc.) - typically 10-25% of force
        const heavyAssetRatio = (currentRolePoints + unitCost) / (currentArmy.totalPoints + unitCost);
        if (heavyAssetRatio > 0.35) { // Don't exceed 35% heavy assets
          maxQuantity = 1;
        } else {
          maxQuantity = Math.min(2, maxQuantity);
        }
        
        // Super heavy assets (>400pts) - centerpiece units
        if (unitCost > 400) {
          maxQuantity = 1; // Only one centerpiece per army
        }
      }
      
      // 3. COMBINED ARMS BALANCE - Force composition ratios
      let roleMultiplier = 1.0;
      
      if (roleTarget) {
        const roleDeficit = roleTarget.min - currentRolePoints;
        const roleExcess = currentRolePoints - roleTarget.max;
        
        if (roleDeficit > 0) {
          // We need more of this role - encourage selection
          roleMultiplier = Math.min(3.0, 1.0 + (roleDeficit / roleTarget.min));
        } else if (roleExcess > 0) {
          // We have too much of this role - discourage selection
          roleMultiplier = Math.max(0.3, 1.0 - (roleExcess / roleTarget.max));
        }
      }
      
      // 4. MISSION-SPECIFIC DOCTRINE ADJUSTMENTS
      let missionMultiplier = 1.0;
      
      // Real-world tactical considerations by scenario
      switch (scenario) {
        case 'defensive':
          // Defensive operations: More fire support, fewer mobile units
          if (primaryRole.includes('fire_support') || primaryRole.includes('heavy')) {
            missionMultiplier = 1.4; // Favor defensive firepower
          } else if (primaryRole.includes('fast') || primaryRole.includes('reconnaissance')) {
            missionMultiplier = 0.7; // Fewer fast units in defense
          }
          break;
          
        case 'assault':
          // Assault operations: More mobile/assault units, fewer static
          if (primaryRole.includes('assault') || primaryRole.includes('mobile') || primaryRole.includes('fast')) {
            missionMultiplier = 1.5; // Favor mobility and assault capability
          } else if (primaryRole.includes('heavy_fire_support') || primaryRole.includes('firebase')) {
            missionMultiplier = 0.6; // Fewer static fire support
          }
          break;
          
        case 'reconnaissance':
          // Reconnaissance: More scouts, lighter forces
          if (primaryRole.includes('scout') || primaryRole.includes('stealth') || primaryRole.includes('reconnaissance')) {
            missionMultiplier = 1.8; // Heavily favor reconnaissance units
          } else if (unitCost > 150) {
            missionMultiplier = 0.5; // Fewer heavy units
          }
          break;
          
        case 'siege':
          // Siege operations: Balance of heavy firepower and assault troops
          if (primaryRole.includes('anti_armor') || primaryRole.includes('assault') || primaryRole.includes('heavy')) {
            missionMultiplier = 1.3; // Favor siege-appropriate units
          }
          break;
      }
      
      // 5. INFANTRY-CENTRIC DOCTRINE (80/20 rule) - Only for battle-line units
      if (unitClass === 'battleLine') {
        const totalInfantryPoints = currentComposition.infantry || 0;
        const infantryRatio = totalInfantryPoints / (currentArmy.totalPoints || 1);
        
        if (infantryRatio < 0.5) { // Less than 50% infantry
          roleMultiplier *= 1.6; // Strongly encourage more infantry
        } else if (infantryRatio < 0.7) { // Less than 70% infantry
          roleMultiplier *= 1.2; // Moderately encourage more infantry
        }
      }
      
      // 6. SUPPORT-TO-COMBAT RATIO
      const supportRoles = ['fire_support', 'support', 'logistics', 'command'];
      if (supportRoles.includes(primaryRole)) {
        const totalSupportPoints = (currentComposition.support || 0) + (currentComposition.command || 0);
        const supportRatio = totalSupportPoints / (currentArmy.totalPoints || 1);
        
        if (supportRatio > 0.4) { // More than 40% support
          roleMultiplier *= 0.5; // Discourage more support
        }
      }
      
      // 7. BUDGET ALLOCATION DOCTRINE
      // Don't spend more than 30% of budget on any single datasheet type
      const budgetLimitQuantity = Math.floor(remainingPoints / (unitCost * 1.8));
      const maxBudgetPerDatasheet = remainingPoints * 0.3;
      const maxAffordableQuantity = Math.floor(maxBudgetPerDatasheet / unitCost);
      
      // Calculate target quantity using classification and variety considerations
      let baseTargetQuantity = quantityLimits.optimal;
      
      // Apply mission and role multipliers only to base optimal quantity for battle-line units
      if (unitClass === 'battleLine') {
        baseTargetQuantity = Math.max(1, Math.floor(roleMultiplier * missionMultiplier * quantityLimits.optimal));
      }
      
      // Apply variety multiplier to discourage duplicates
      const varietyAdjustedQuantity = Math.max(1, Math.floor(baseTargetQuantity * varietyMultiplier));
      
      // Apply all military doctrine constraints
      const finalQuantity = Math.min(
        maxQuantity,                    // Rule of Three and classification limits
        varietyAdjustedQuantity,        // Variety-adjusted target
        budgetLimitQuantity,           // Budget constraints
        maxAffordableQuantity,         // Budget allocation limits
        Math.floor(remainingPoints / unitCost) // Absolute affordability
      );
      
      // For non-battle-line units, strongly prefer 1 unless role is critically needed
      if (unitClass !== 'battleLine' && existingUnitCount >= quantityLimits.optimal) {
        return 0; // Don't add more specialists/support beyond optimal
      }
      
      // Ensure minimum requirements for battle-line units
      const minimumQuantity = (unitClass === 'battleLine' && existingUnitCount === 0) ? 1 : Math.max(0, quantityLimits.min - existingUnitCount);
      
      return Math.max(minimumQuantity, finalQuantity);
    };

    // Enhanced unit selection with intelligent quantity and role balancing
    const selectUnitsWithQuantity = (units, excludeIds = [], unitCounts = {}, remainingPoints, doctrineTargets = {}, currentComposition = {}) => {
      const availableUnits = filterUnitsByFaction(units, faction).filter(unit => {
        const currentCount = unitCounts[unit.id] || 0;
        if (currentCount >= 3) return false;
        
        if (unit.keywords?.includes('Character') && excludeIds.includes(unit.id)) {
          return false;
        }
        
        return unit.points <= remainingPoints;
      });
      
      if (availableUnits.length === 0) return [];
      
      const scoredUnits = availableUnits.map(unit => ({
        ...unit,
        score: scoreUnit(unit),
        optimalQuantity: calculateOptimalQuantity(unit, scenario.context, army, remainingPoints, doctrineTargets, currentComposition)
      }));
      
      scoredUnits.sort((a, b) => b.score - a.score);
      
      // Return the best unit with its optimal quantity
      const bestUnit = scoredUnits[0];
      const currentCount = unitCounts[bestUnit.id] || 0;
      const remainingPossible = Math.min(
        3 - currentCount, // Rule of Three
        bestUnit.optimalQuantity,
        Math.floor(remainingPoints / bestUnit.points)
      );
      
      return {
        unit: bestUnit,
        quantity: Math.max(1, remainingPossible)
      };
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

      // Calculate military doctrine targets for custom mode too
      const doctrineTargets = calculateDoctrineTargets(TARGET_POINTS, customChoices.useRealWorldDoctrine);
      let currentComposition = { command: 0, infantry: 0, armor: 0, support: 0, fastAttack: 0 };

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

      // Phase 1: Establish command structure (mandatory HQ) with 10th Edition Leader Embedding
      const bestHQ = selectUnitsWithQuantity(units.hq, usedUnitIds, unitCounts, TARGET_POINTS, doctrineTargets, currentComposition);
      if (bestHQ.unit) {
        addUnit(bestHQ.unit);
        
        // 10th Edition Leader Embedding: Ensure HQ has a compatible unit to attach to
        if (bestHQ.unit.leaderAttachment && bestHQ.unit.leaderAttachment.canAttachTo.length > 0) {
          const attached = ensureLeaderHasCompatibleUnit(army, bestHQ.unit, units);
          
          if (!attached && needsCompatibleUnitForLeader(bestHQ.unit, army, units)) {
            // Need to add a compatible unit for the leader to attach to
            const compatibleUnits = findCompatibleUnitsForLeader(bestHQ.unit, units);
            
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
                  id: bestHQ.unit.id,
                  name: bestHQ.unit.name,
                  bonuses: bestHQ.unit.leaderAttachment?.bonuses || []
                };
                
                console.log(`Added ${bestCompatibleUnit.name} for ${bestHQ.unit.name} to attach to`);
              }
            }
          }
        }
      }

      // Phase 2: Add named character for major operations (doctrine-based) with Leader Embedding
      const namedCharacterThreshold = militaryDoctrine.commandStructure?.namedCharacterThreshold || 500;
      if (difficultyMods.namedCharacters && army.totalPoints >= namedCharacterThreshold) {
        const namedChar = selectUnitsWithQuantity(units.namedCharacters, usedUnitIds, unitCounts, TARGET_POINTS, doctrineTargets, currentComposition);
        if (namedChar.unit && army.totalPoints + namedChar.unit.points <= TARGET_POINTS - 300) {
          addUnit(namedChar.unit);
          
          // 10th Edition Leader Embedding for Named Characters
          if (namedChar.unit.leaderAttachment && namedChar.unit.leaderAttachment.canAttachTo.length > 0) {
            const attached = ensureLeaderHasCompatibleUnit(army, namedChar.unit, units);
            
            if (!attached && needsCompatibleUnitForLeader(namedChar.unit, army, units)) {
              // Need to add a compatible unit for the named character
              const compatibleUnits = findCompatibleUnitsForLeader(namedChar.unit, units);
              
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
                    id: namedChar.unit.id,
                    name: namedChar.unit.name,
                    bonuses: namedChar.unit.leaderAttachment?.bonuses || []
                  };
                  
                  console.log(`Added ${bestCompatibleUnit.name} for ${namedChar.unit.name} to attach to`);
                }
              }
            }
          }
        }
      }

      // Phase 3: Core doctrine-based force structure with intelligent quantity
      const maxAttempts = 30;
      let attempts = 0;
      
      while (army.totalPoints < MINIMUM_POINTS && attempts < maxAttempts) {
        let addedAnyUnit = false;
        
        // Select best unit from any category using doctrine scoring with quantity
        const allCategories = [units.troops, units.elites, units.fastAttack, units.heavySupport];
        let bestSelection = null;
        let bestScore = -1;
        
        for (const category of allCategories) {
          const selection = selectUnitsWithQuantity(category, [], unitCounts, TARGET_POINTS - army.totalPoints, doctrineTargets, currentComposition);
          if (selection.unit && army.totalPoints + (selection.unit.points * selection.quantity) + 100 <= TARGET_POINTS) {
            // Calculate value score (effectiveness per point spent)
            const totalCost = selection.unit.points * selection.quantity;
            const valueScore = (selection.unit.score || 0) * selection.quantity / totalCost;
            
            if (valueScore > bestScore) {
              bestScore = valueScore;
              bestSelection = selection;
            }
          }
        }
        
        if (bestSelection) {
          // Add the optimal quantity of the selected unit
          for (let i = 0; i < bestSelection.quantity; i++) {
            if (army.totalPoints + bestSelection.unit.points + 50 <= TARGET_POINTS) {
              addUnit(bestSelection.unit);
              addedAnyUnit = true;
            } else {
              break; // Can't afford more of this unit
            }
          }
          
          console.log(`Added ${bestSelection.quantity}x ${bestSelection.unit.name} (military doctrine optimized - role: ${bestSelection.unit.loreRoles?.[0] || 'general'}, cost: ${bestSelection.unit.points}pts each)`);
        }
        
        if (!addedAnyUnit) break;
        attempts++;
      }

    } else {
      // Easy-create: Automatic army generation with intelligent quantity management
      const usedUnitIds = [];
      const unitCounts = {}; // Track how many of each datasheet we have
      const TARGET_POINTS = 2000;
      const MINIMUM_TARGET = 1980; // Much more aggressive target
      
      // Calculate military doctrine targets
      const doctrineTargets = calculateDoctrineTargets(TARGET_POINTS, customChoices.useRealWorldDoctrine);
      let currentComposition = { command: 0, infantry: 0, armor: 0, support: 0, fastAttack: 0 };

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

      // Enhanced unit selection with doctrine scoring and quantity awareness
      const selectBestUnitWithQuantityAndDoctrine = (units, excludeIds = [], unitCounts = {}, remainingPoints) => {
        const availableUnits = filterUnitsByFaction(units, faction).filter(unit => {
          if (excludeIds.includes(unit.id)) return false;
          const currentCount = unitCounts[unit.id] || 0;
          if (currentCount >= 3) return false;
          return unit.points <= remainingPoints;
        });
        
        if (availableUnits.length === 0) return null;
        
        const scoredUnits = availableUnits.map(unit => ({
          ...unit,
          score: scoreUnitWithDoctrine(unit, currentComposition, doctrineTargets, customChoices.useRealWorldDoctrine),
          optimalQuantity: calculateOptimalQuantity(unit, scenario.context, army, remainingPoints, doctrineTargets, currentComposition)
        }));
        
        scoredUnits.sort((a, b) => b.score - a.score);
        
        const bestUnit = scoredUnits[0];
        const currentCount = unitCounts[bestUnit.id] || 0;
        const remainingPossible = Math.min(
          3 - currentCount, // Rule of Three
          bestUnit.optimalQuantity,
          Math.floor(remainingPoints / bestUnit.points)
        );
        
        return {
          unit: bestUnit,
          quantity: Math.max(1, remainingPossible)
        };
      };

      // Phase 1: Establish command structure (mandatory HQ) with 10th Edition Leader Embedding
      const bestHQSelection = selectBestUnitWithQuantityAndDoctrine(units.hq, usedUnitIds, unitCounts, TARGET_POINTS);
      if (bestHQSelection?.unit) {
        addUnit(bestHQSelection.unit);
        
        // 10th Edition Leader Embedding: Ensure HQ has a compatible unit to attach to
        if (bestHQSelection.unit.leaderAttachment && bestHQSelection.unit.leaderAttachment.canAttachTo.length > 0) {
          const attached = ensureLeaderHasCompatibleUnit(army, bestHQSelection.unit, units);
          
          if (!attached && needsCompatibleUnitForLeader(bestHQSelection.unit, army, units)) {
            // Need to add a compatible unit for the leader to attach to
            const compatibleUnits = findCompatibleUnitsForLeader(bestHQSelection.unit, units);
            
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
                  id: bestHQSelection.unit.id,
                  name: bestHQSelection.unit.name,
                  bonuses: bestHQSelection.unit.leaderAttachment?.bonuses || []
                };
                
                console.log(`Added ${bestCompatibleUnit.name} for ${bestHQSelection.unit.name} to attach to`);
              }
            }
          }
        }
      }

      // Phase 2: Add named character for major operations (doctrine-based) with Leader Embedding
      const namedCharacterThreshold = militaryDoctrine.commandStructure?.namedCharacterThreshold || 500;
      if (difficultyMods.namedCharacters && army.totalPoints >= namedCharacterThreshold) {
        const namedCharSelection = selectBestUnitWithQuantityAndDoctrine(units.namedCharacters, usedUnitIds, unitCounts, TARGET_POINTS - army.totalPoints);
        if (namedCharSelection?.unit && army.totalPoints + namedCharSelection.unit.points <= TARGET_POINTS - 300) {
          addUnit(namedCharSelection.unit);
          
          // 10th Edition Leader Embedding for Named Characters
          if (namedCharSelection.unit.leaderAttachment && namedCharSelection.unit.leaderAttachment.canAttachTo.length > 0) {
            const attached = ensureLeaderHasCompatibleUnit(army, namedCharSelection.unit, units);
            
            if (!attached && needsCompatibleUnitForLeader(namedCharSelection.unit, army, units)) {
              // Need to add a compatible unit for the named character
              const compatibleUnits = findCompatibleUnitsForLeader(namedCharSelection.unit, units);
              
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
                    id: namedCharSelection.unit.id,
                    name: namedCharSelection.unit.name,
                    bonuses: namedCharSelection.unit.leaderAttachment?.bonuses || []
                  };
                  
                  console.log(`Added ${bestCompatibleUnit.name} for ${namedCharSelection.unit.name} to attach to`);
                }
              }
            }
          }
        }
      }

      // Phase 3: Core doctrine-based force structure with intelligent quantity selection
      const maxAttempts = 30;
      let attempts = 0;
      
      while (army.totalPoints < MINIMUM_TARGET && attempts < maxAttempts) {
        let addedAnyUnit = false;
        
        // Select best unit from any category using doctrine scoring with quantity awareness
        const allCategories = [units.troops, units.elites, units.fastAttack, units.heavySupport];
        let bestSelection = null;
        let bestScore = -1;
        
        for (const category of allCategories) {
          const selection = selectBestUnitWithQuantityAndDoctrine(category, [], unitCounts, TARGET_POINTS - army.totalPoints);
          if (selection?.unit) {
            // Calculate value score (effectiveness per point spent)
            const totalCost = selection.unit.points * selection.quantity;
            if (army.totalPoints + totalCost + 100 <= TARGET_POINTS) {
              const valueScore = (selection.unit.score || 0) * selection.quantity / totalCost;
              
              if (valueScore > bestScore) {
                bestScore = valueScore;
                bestSelection = selection;
              }
            }
          }
        }
        
        if (bestSelection) {
          // Add the optimal quantity of the selected unit
          for (let i = 0; i < bestSelection.quantity; i++) {
            if (army.totalPoints + bestSelection.unit.points + 50 <= TARGET_POINTS) {
              addUnit(bestSelection.unit);
              addedAnyUnit = true;
            } else {
              break; // Can't afford more of this unit
            }
          }
          
          console.log(`Added ${bestSelection.quantity}x ${bestSelection.unit.name} (military doctrine optimized - role: ${bestSelection.unit.loreRoles?.[0] || 'general'}, cost: ${bestSelection.unit.points}pts each)`);
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
      justification += `• Infantry Forces: ${Math.round((comp.infantry / total) * 100)}% (${comp.infantry}pts) - ${militaryRoles.infantry?.description || 'Main battle line'}\n`;
      
      if (comp.armor) {
        justification += `• Armored Units: ${Math.round((comp.armor / total) * 100)}% (${comp.armor}pts) - ${militaryRoles.armor?.description || 'Heavy assault'}\n`;
      }
      if (comp.support) {
        justification += `• Support Elements: ${Math.round((comp.support / total) * 100)}% (${comp.support}pts) - ${militaryRoles.support?.description || 'Fire support'}\n`;
      }
      if (comp.fastAttack) {
        justification += `• Fast Attack: ${Math.round((comp.fastAttack / total) * 100)}% (${comp.fastAttack}pts) - ${militaryRoles.fastAttack?.description || 'Mobile assault'}\n`;
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
          <li>🏛️ <strong>Enhanced Military Doctrine:</strong> Real-world force composition and tactical employment principles</li>
          <li>⚔️ <strong>Intelligent Quantity Selection:</strong> Unit quantities optimized based on role, cost, and mission requirements</li>
          <li>Unit selection prioritizes lore-appropriate choices and subfaction synergies</li>
          <li>Equipment is optimized based on difficulty level and scenario context</li>
          <li>Subfaction abilities and tactical doctrines are considered</li>
          <li>Tactical Drones removed (now integrated as equipment/wargear)</li>
          <li>⚡ <strong>Aggressive Point Allocation:</strong> Maximizes point usage with equipment and additional units</li>
        </ul>
        
        <div className="doctrine-info">
          <h4>🎯 Enhanced Military Doctrine Features:</h4>
          <ul>
            <li><strong>Real Force Ratios:</strong> Command 5-12%, Infantry 50-70%, Heavy Assets 15-35%, Support 10-25%</li>
            <li><strong>Mission-Specific Adaptation:</strong> Unit quantities adapt to operational requirements (defensive, assault, reconnaissance, siege)</li>
            <li><strong>Command Span of Control:</strong> Limited command elements following real military leadership ratios</li>
            <li><strong>Combined Arms Integration:</strong> Balanced mix ensures mutual support between unit types</li>
            <li><strong>Tactical Employment:</strong> Unit quantities based on real-world tactical doctrine and proven effectiveness</li>
            <li><strong>Cost-Effectiveness:</strong> Expensive units limited to prevent over-investment in single capabilities</li>
            <li><strong>Infantry-Centric Doctrine:</strong> Emphasis on infantry backbone (80/20 rule) with appropriate support</li>
            <li><strong>Budget Allocation:</strong> No single unit type consumes more than 30% of total force budget</li>
            <li><strong>🎲 Diminishing Returns:</strong> Specialist units (pathfinders, stealth suits) limited to 1-2 units for optimal variety</li>
            <li><strong>⚡ Variety Encouragement:</strong> Strong preference for diverse capabilities over duplicate specialist units</li>
          </ul>
        </div>

        <div className="variety-system">
          <h4>🎲 Intelligent Unit Variety System:</h4>
          <ul>
            <li><strong>Battle-Line Units:</strong> Fire Warriors, basic infantry - can scale to 2-3 units for mass and redundancy</li>
            <li><strong>Specialist Units:</strong> Pathfinders, Stealth Suits - optimal at 1 unit, severe penalty for duplicates</li>
            <li><strong>Support Units:</strong> Transports, fire support - optimal at 1 unit, diminishing returns for more</li>
            <li><strong>Elite Units:</strong> Crisis Suits, special units - optimal at 1-2 units maximum</li>
            <li><strong>Heavy Assets:</strong> Hammerheads, Riptides - strictly 1 unit optimal for cost-effectiveness</li>
            <li><strong>Command Units:</strong> Characters, commanders - very limited quantities (1-2 maximum)</li>
          </ul>
          <p><em>This system prevents "3 Pathfinder squads" scenarios and ensures tactical variety while maintaining battle-line redundancy.</em></p>
        </div>

        <div className="tactical-principles">
          <h4>⚖️ Real-World Tactical Principles Applied:</h4>
          <ul>
            <li><strong>Fire and Maneuver:</strong> Balance of firepower and mobility units</li>
            <li><strong>Redundancy:</strong> Multiple units of core capabilities to prevent single points of failure</li>
            <li><strong>Force Multipliers:</strong> Specialized units in limited quantities for maximum impact</li>
            <li><strong>Logistics Constraints:</strong> Heavy units require proportional support elements</li>
            <li><strong>Operational Flexibility:</strong> Mixed unit types provide tactical options</li>
            <li><strong>Mission Command:</strong> Appropriate command structure for force size and complexity</li>
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