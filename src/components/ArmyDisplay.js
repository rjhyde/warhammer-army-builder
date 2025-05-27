const generateTacticalNotes = () => {
  let notes = '';
  
  // Unit analysis
  const commanders = army.units.filter(unit => unit.keywords.includes('Commander'));
  const namedCharacters = army.units.filter(unit => unit.keywords.includes('Epic Hero'));
  const battlesuits = army.units.filter(unit => unit.keywords.includes('Battlesuit'));
  const fireWarriors = army.units.filter(unit => unit.keywords.includes('Fire Warrior'));
  const pathfinders = army.units.filter(unit => unit.id === 'pathfinders');
  const stealthSuits = army.units.filter(unit => unit.id === 'stealth_suits');
  const heavySupport = army.units.filter(unit => unit.keywords.includes('Vehicle') || unit.id.includes('broadside'));
  const fastAttack = army.units.filter(unit => unit.keywords.includes('Piranha') || unit.keywords.includes('Drone'));
  const eliteUnits = army.units.filter(unit => unit.keywords.includes('Crisis') || unit.keywords.includes('Stealth'));

  // === ARMY OVERVIEW & BATTLE PHILOSOPHY ===
  notes += '🎯 BATTLE PLAN OVERVIEW\n';
  notes += '========================\n\n';
  
  if (faction === 'farsight_enclaves') {
    notes += '**Farsight Enclaves Doctrine:** Aggressive close-range engagement with elite battlesuit formations.\n';
    notes += 'Core Philosophy: "Fight with honor, strike without mercy" - Use superior mobility and firepower to dictate engagement range.\n\n';
  } else if (faction === 'bork_an') {
    notes += '**Bork\'an Sept Doctrine:** Long-range technological superiority and defensive positioning.\n';
    notes += 'Core Philosophy: "Technology conquers all" - Maximize range advantage and use superior weaponry to eliminate threats before they close.\n\n';
  } else if (faction === 'vior_la') {
    notes += '**Vior\'la Sept Doctrine:** Aggressive fire discipline and rapid assault tactics.\n';
    notes += 'Core Philosophy: "Swift and deadly" - Use superior training and rapid deployment to overwhelm enemy positions.\n\n';
  } else if (faction === 'sacea') {
    notes += '**Sa\'cea Sept Doctrine:** Flexible combined arms with emphasis on coordination and markerlight support.\n';
    notes += 'Core Philosophy: "Unity in diversity" - Coordinate multiple unit types for maximum tactical flexibility.\n\n';
  } else {
    notes += '**T\'au Sept Doctrine:** Balanced combined arms approach with emphasis on Fire Warrior core and battlesuit support.\n';
    notes += 'Core Philosophy: "For the Greater Good" - Use coordinated fire and tactical flexibility to achieve mission objectives.\n\n';
  }

  // === DEPLOYMENT STRATEGY ===
  notes += '📋 DEPLOYMENT STRATEGY\n';
  notes += '======================\n';
  
  if (scenario.context === 'defensive') {
    notes += '**Defensive Deployment:**\n';
    notes += '• Establish 2-3 strong firebase positions with overlapping fields of fire\n';
    if (pathfinders.length > 0) {
      notes += '• Deploy Pathfinders in elevated or concealed positions for markerlight support\n';
    }
    if (fireWarriors.length > 0) {
      notes += '• Position Fire Warriors in cover with clear sightlines to approach routes\n';
    }
    if (heavySupport.length > 0) {
      notes += '• Place heavy support units to maximize range while maintaining cover\n';
    }
    if (stealthSuits.length > 0) {
      notes += '• Use Stealth Suits to control flanks and deny infiltration routes\n';
    }
  } else if (scenario.context === 'assault') {
    notes += '**Assault Deployment:**\n';
    notes += '• Aggressive forward positioning with mobile reserves\n';
    if (battlesuits.length > 0) {
      notes += '• Deploy battlesuits for rapid advance to key positions\n';
    }
    if (fastAttack.length > 0) {
      notes += '• Use fast attack units to secure flanks and harass enemy deployment\n';
    }
    if (fireWarriors.length > 0) {
      notes += '• Position Fire Warriors for rapid objective capture after initial bombardment\n';
    }
  } else if (scenario.context === 'siege') {
    notes += '**Urban Warfare Deployment:**\n';
    notes += '• Mixed range positioning to cover multiple approach angles\n';
    notes += '• Emphasis on building control and chokepoint management\n';
    if (pathfinders.length > 0) {
      notes += '• Pathfinders essential for detecting hidden threats in urban terrain\n';
    }
  }
  notes += '\n';

  // === UNIT SYNERGIES ===
  notes += '🔗 UNIT SYNERGIES & COMBINATIONS\n';
  notes += '================================\n';
  
  if (commanders.length > 0 && battlesuits.length > 0) {
    notes += '**Commander + Battlesuit Synergy:**\n';
    notes += '• Commanders provide reroll support and tactical coordination\n';
    notes += '• Deploy Commander within 6" of Crisis Suits for maximum effect\n';
    notes += '• Use Commander abilities to enhance battlesuit shooting phases\n';
    if (faction === 'farsight_enclaves') {
      notes += '• Farsight Enclaves bonus: Improved close-range coordination\n';
    }
    notes += '\n';
  }

  if (pathfinders.length > 0 && (fireWarriors.length > 0 || heavySupport.length > 0)) {
    notes += '**Markerlight Support Network:**\n';
    notes += '• Pathfinders provide crucial target designation for heavy weapons\n';
    notes += '• Priority targets: High-value armor, elite units, and characters\n';
    notes += '• Coordinate markerlight placement with heavy weapon firing order\n';
    if (pathfinders.some(unit => unit.selectedOptions?.some(opt => opt.includes('Recon Drone')))) {
      notes += '• Recon Drone enables forward markerlight positioning (Infiltrators)\n';
    }
    if (pathfinders.some(unit => unit.selectedOptions?.some(opt => opt.includes('Pulse Accelerator')))) {
      notes += '• Pulse Accelerator Drone extends Fire Warrior engagement range (+6")\n';
    }
    notes += '\n';
  }

  if (stealthSuits.length > 0) {
    notes += '**Stealth Suit Tactical Employment:**\n';
    notes += '• Primary roles: Flanking, disruption, and objective control\n';
    notes += '• Use stealth and mobility to threaten enemy flanks\n';
    notes += '• Excellent for holding objectives in enemy territory\n';
    if (stealthSuits.some(unit => unit.selectedOptions?.some(opt => opt.includes('Fusion blaster')))) {
      notes += '• Fusion blaster models: Deploy for anti-armor ambush opportunities\n';
    }
    notes += '\n';
  }

  if (fireWarriors.length >= 2) {
    notes += '**Fire Warrior Coordination:**\n';
    notes += '• Multiple Fire Warrior teams provide tactical flexibility\n';
    notes += '• Use one team for objective holding, others for mobile support\n';
    notes += '• Coordinate pulse rifle volleys for maximum impact\n';
    if (fireWarriors.some(unit => unit.id === 'fire_warriors_breacher')) {
      notes += '• Breacher teams: Specialized for close-range urban combat\n';
    }
    if (fireWarriors.some(unit => unit.selectedOptions?.some(opt => opt.includes('Markerlight')))) {
      notes += '• Shas\'ui markerlights: Backup target designation capability\n';
    }
    notes += '\n';
  }

  if (heavySupport.length > 0) {
    notes += '**Heavy Support Employment:**\n';
    heavySupport.forEach(unit => {
      if (unit.id === 'hammerhead') {
        notes += '• Hammerhead: Long-range anti-armor platform\n';
        notes += '  - Prioritize enemy vehicles and monsters\n';
        notes += '  - Maintain maximum range when possible\n';
        if (unit.selectedOptions?.some(opt => opt.includes('Ion cannon'))) {
          notes += '  - Ion cannon: Better for multiple medium targets\n';
        } else {
          notes += '  - Railgun: Optimal for single high-value targets\n';
        }
      }
      if (unit.id === 'broadside_suits') {
        notes += '• Broadside Suits: Flexible heavy weapons platform\n';
        notes += '  - Can engage air and ground targets effectively\n';
        notes += '  - Position for maximum field of fire\n';
        if (unit.selectedOptions?.some(opt => opt.includes('High-yield missile'))) {
          notes += '  - High-yield missiles: Excellent for infantry clearing\n';
        } else {
          notes += '  - Heavy rail rifles: Precision anti-armor capability\n';
        }
      }
    });
    notes += '\n';
  }

  // === TACTICAL PHASES ===
  notes += '⏰ TURN-BY-TURN BATTLE PLAN\n';
  notes += '============================\n';
  
  notes += '**EARLY GAME (Turns 1-2): Positioning & Pressure**\n';
  if (scenario.context === 'defensive') {
    notes += '• Establish firing positions and begin target identification\n';
    notes += '• Focus on eliminating enemy fast attack and flanking units\n';
    if (pathfinders.length > 0) {
      notes += '• Deploy markerlights on highest priority targets\n';
    }
    notes += '• Preserve long-range advantage, avoid premature advances\n';
  } else if (scenario.context === 'assault') {
    notes += '• Aggressive opening moves to secure key terrain\n';
    notes += '• Eliminate enemy heavy weapons that could slow your advance\n';
    if (battlesuits.length > 0) {
      notes += '• Use battlesuit mobility to threaten multiple objectives\n';
    }
    notes += '• Focus fire to create gaps in enemy lines\n';
  } else {
    notes += '• Control key positions and eliminate immediate threats\n';
    notes += '• Begin systematic target prioritization\n';
    notes += '• Establish markerlight network for mid-game advantage\n';
  }
  notes += '\n';

  notes += '**MID GAME (Turns 3-4): Decisive Action**\n';
  notes += '• Execute primary tactical objectives\n';
  if (commanders.length > 0) {
    notes += '• Use Commander abilities for critical engagements\n';
  }
  if (eliteUnits.length > 0) {
    notes += '• Deploy elite units for maximum impact on key targets\n';
  }
  notes += '• Coordinate combined arms for decisive strikes\n';
  notes += '• Begin objective control positioning\n';
  if (scenario.context === 'assault') {
    notes += '• Press advantages gained in early game\n';
    notes += '• Commit reserves to breakthrough points\n';
  } else {
    notes += '• Maintain defensive integrity while pressuring enemy advances\n';
  }
  notes += '\n';

  notes += '**LATE GAME (Turns 5+): Victory Conditions**\n';
  notes += '• Secure primary objectives with reliable units\n';
  if (fireWarriors.length > 0) {
    notes += '• Use Fire Warrior mobility for late-game objective grabs\n';
  }
  if (fastAttack.length > 0) {
    notes += '• Deploy fast units for contested objective control\n';
  }
  notes += '• Eliminate key enemy scoring units\n';
  notes += '• Maintain board control with remaining forces\n';
  notes += '\n';

  // === TARGET PRIORITIES ===
  notes += '🎯 TARGET PRIORITY MATRIX\n';
  notes += '=========================\n';
  notes += '**Priority 1 (Eliminate Immediately):**\n';
  notes += '• Enemy artillery and long-range anti-armor\n';
  notes += '• Fast attack units threatening your deployment\n';
  notes += '• Characters providing enemy force multipliers\n';
  notes += '\n';
  
  notes += '**Priority 2 (Systematic Elimination):**\n';
  notes += '• Elite infantry and heavy weapons teams\n';
  notes += '• Medium armor and transports\n';
  notes += '• Units threatening key objectives\n';
  notes += '\n';
  
  notes += '**Priority 3 (Opportunity Targets):**\n';
  notes += '• Isolated units and damaged vehicles\n';
  notes += '• Basic infantry in the open\n';
  notes += '• Units of opportunity based on positioning\n';
  notes += '\n';

  // === FACTION-SPECIFIC TACTICS ===
  if (faction === 'farsight_enclaves') {
    notes += '🔥 FARSIGHT ENCLAVES SPECIAL TACTICS\n';
    notes += '====================================\n';
    notes += '• **Close-Range Superiority:** Utilize improved close-range weapons\n';
    notes += '• **Aggressive Positioning:** Don\'t be afraid to advance into rapid fire range\n';
    notes += '• **Elite Focus:** Concentrate firepower with battlesuit formations\n';
    notes += '• **Honor Before Retreat:** Fight decisive engagements rather than prolonged attrition\n';
    notes += '\n';
  } else if (faction === 'bork_an') {
    notes += '🔬 BORK\'AN SEPT SPECIAL TACTICS\n';
    notes += '===============================\n';
    notes += '• **Extended Range:** Maximize +6" range bonus on all applicable weapons\n';
    notes += '• **Technological Edge:** Prioritize high-tech weapons and equipment\n';
    notes += '• **Defensive Positioning:** Maintain maximum distance from enemy\n';
    notes += '• **Precision Strikes:** Use superior technology for surgical target elimination\n';
    notes += '\n';
  }

  // === SCENARIO-SPECIFIC GUIDANCE ===
  notes += '🗺️ SCENARIO-SPECIFIC CONSIDERATIONS\n';
  notes += '====================================\n';
  
  if (scenario.context === 'defensive') {
    notes += '**Defensive Operations:**\n';
    notes += '• Hold 2-3 key positions rather than spreading thin\n';
    notes += '• Create overlapping fields of fire\n';
    notes += '• Keep mobile reserves for counter-attacks\n';
    notes += '• Focus on eliminating enemy assault units early\n';
  } else if (scenario.context === 'assault') {
    notes += '**Assault Operations:**\n';
    notes += '• Speed is critical - eliminate enemy heavy weapons first\n';
    notes += '• Use combined arms to create breakthrough points\n';
    notes += '• Commit reserves decisively once gaps appear\n';
    notes += '• Don\'t get bogged down in prolonged firefights\n';
  } else if (scenario.context === 'siege') {
    notes += '**Urban Warfare:**\n';
    notes += '• Control key buildings and chokepoints\n';
    notes += '• Watch for ambushes and hidden units\n';
    notes += '• Use grenades and blast weapons in confined spaces\n';
    notes += '• Coordinate advances between buildings\n';
  } else if (scenario.context === 'reconnaissance') {
    notes += '**Reconnaissance Mission:**\n';
    notes += '• Mobility and stealth are paramount\n';
    notes += '• Avoid unnecessary engagements\n';
    notes += '• Secure information gathering objectives\n';
    notes += '• Maintain escape routes\n';
  }
  notes += '\n';

  // === EQUIPMENT SYNERGIES ===
  if (army.units.some(unit => unit.selectedOptions && unit.selectedOptions.length > 0)) {
    notes += '⚙️ EQUIPMENT SYNERGY NOTES\n';
    notes += '==========================\n';
    
    army.units.forEach(unit => {
      if (unit.selectedOptions && unit.selectedOptions.length > 0) {
        if (unit.id === 'pathfinders') {
          if (unit.selectedOptions.some(opt => opt.includes('Rail rifle'))) {
            notes += '• Pathfinder Rail Rifles: Deploy for anti-armor overwatch\n';
          }
          if (unit.selectedOptions.some(opt => opt.includes('Ion rifle'))) {
            notes += '• Pathfinder Ion Rifles: Excellent for mobile target engagement\n';
          }
          if (unit.selectedOptions.some(opt => opt.includes('Recon Drone'))) {
            notes += '• Recon Drone: Use Infiltrators for forward markerlight placement\n';
          }
          if (unit.selectedOptions.some(opt => opt.includes('Grav-inhibitor'))) {
            notes += '• Grav-inhibitor Drone: Position to deny enemy charge lanes\n';
          }
        }
        
        if (unit.tacticalRationale) {
          notes += `• ${unit.name}: ${unit.tacticalRationale}\n`;
        }
      }
    });
    notes += '\n';
  }

  // === ADVANCED TACTICS ===
  notes += '🎓 ADVANCED TACTICAL CONCEPTS\n';
  notes += '=============================\n';
  if (difficulty === 'hard' || difficulty === 'extreme') {
    notes += '**Competitive-Level Coordination:**\n';
    notes += '• Master the interaction between unit abilities\n';
    notes += '• Practice precise positioning for optimal firing arcs\n';
    notes += '• Understand enemy army capabilities and counter-tactics\n';
    notes += '• Use terrain and line of sight blocking strategically\n';
    notes += '• Coordinate unit activations for maximum impact\n';
    notes += '\n';
  }

  notes += '**T\'au Empire Core Principles:**\n';
  notes += '• **Kauyon (Patient Hunter):** Set up devastating crossfires and wait for the perfect moment\n';
  notes += '• **Mont\'ka (Killing Blow):** Strike hard and fast when the enemy is vulnerable\n';
  notes += '• **Combined Arms:** No single unit wins battles - coordination is key\n';
  notes += '• **Technology Advantage:** Use superior equipment to offset numerical disadvantages\n';
  notes += '• **Mobility Doctrine:** Dictate engagement range and terms of combat\n';
  notes += '\n';

  if (notes === '') {
    notes = '• Standard T\'au combined arms tactics apply\n';
    notes += '• Focus on coordinated fire and positioning\n';
    notes += '• Use mobility to control engagement range\n';
  }

  return notes;
}; 