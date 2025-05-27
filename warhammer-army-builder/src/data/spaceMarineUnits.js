// Adeptus Astartes (Space Marines) Unit Database
// Comprehensive unit definitions for Space Marine army building

export const spaceMarineUnits = {
  // HQ Units
  hq: [
    {
      id: 'captain',
      name: 'Captain',
      points: 90,
      models: 1,
      keywords: ['Character', 'Captain', 'Infantry'],
      equipment: {
        base: ['Bolt pistol', 'Power sword', 'Frag grenades', 'Krak grenades']
      },
      subfactionSynergy: {
        ultramarines: 'very_high',
        blood_angels: 'high',
        dark_angels: 'high',
        imperial_fists: 'high',
        iron_hands: 'high',
        salamanders: 'high'
      },
      competitiveLevel: 'high',
      loreRoles: ['Command', 'Tactical Leadership', 'Close Combat'],
      description: 'Battle-hardened company commander and tactical genius'
    },
    {
      id: 'captain_terminator',
      name: 'Captain in Terminator Armour',
      points: 110,
      models: 1,
      keywords: ['Character', 'Captain', 'Infantry', 'Terminator'],
      equipment: {
        base: ['Storm bolter', 'Power sword', 'Terminator armour', 'Teleport strike']
      },
      subfactionSynergy: {
        ultramarines: 'high',
        blood_angels: 'medium',
        dark_angels: 'very_high',
        imperial_fists: 'high',
        iron_hands: 'high',
        salamanders: 'medium'
      },
      competitiveLevel: 'very_high',
      loreRoles: ['Heavy Assault', 'Elite Command', 'Teleport Strike'],
      description: 'Elite commander in ancient Terminator armour'
    },
    {
      id: 'chaplain',
      name: 'Chaplain',
      points: 85,
      models: 1,
      keywords: ['Character', 'Chaplain', 'Infantry', 'Priest'],
      equipment: {
        base: ['Bolt pistol', 'Crozius arcanum', 'Rosarius', 'Litanies of battle']
      },
      subfactionSynergy: {
        ultramarines: 'high',
        blood_angels: 'very_high',
        dark_angels: 'high',
        imperial_fists: 'high',
        iron_hands: 'medium',
        salamanders: 'very_high'
      },
      competitiveLevel: 'high',
      loreRoles: ['Spiritual Leadership', 'Close Combat', 'Morale Support'],
      description: 'Spiritual leader inspiring righteous fury in battle'
    },
    {
      id: 'librarian',
      name: 'Librarian',
      points: 95,
      models: 1,
      keywords: ['Character', 'Librarian', 'Infantry', 'Psyker'],
      equipment: {
        base: ['Bolt pistol', 'Force sword', 'Psychic powers', 'Psychic hood']
      },
      subfactionSynergy: {
        ultramarines: 'high',
        blood_angels: 'very_high',
        dark_angels: 'medium',
        imperial_fists: 'medium',
        iron_hands: 'medium',
        salamanders: 'high'
      },
      competitiveLevel: 'very_high',
      loreRoles: ['Psychic Support', 'Anti-Psyker', 'Tactical Support'],
      description: 'Warrior-psyker wielding the power of the Warp'
    }
  ],

  // Troops Units
  troops: [
    {
      id: 'tactical_squad',
      name: 'Tactical Squad',
      points: 180,
      models: 10,
      keywords: ['Infantry', 'Battleline', 'Tactical Squad'],
      equipment: {
        base: ['Bolt rifle', 'Bolt pistol', 'Frag grenades', 'Krak grenades'],
        options: ['Heavy weapon', 'Special weapon', 'Sergeant upgrades']
      },
      subfactionSynergy: {
        ultramarines: 'very_high',
        blood_angels: 'high',
        dark_angels: 'high',
        imperial_fists: 'high',
        iron_hands: 'high',
        salamanders: 'high'
      },
      competitiveLevel: 'high',
      loreRoles: ['Versatile Infantry', 'Objective Control', 'Fire Support'],
      description: 'Versatile Space Marine squads forming the backbone of any force'
    },
    {
      id: 'intercessor_squad',
      name: 'Intercessor Squad',
      points: 195,
      models: 10,
      keywords: ['Infantry', 'Battleline', 'Intercessor', 'Primaris'],
      equipment: {
        base: ['Bolt rifle', 'Bolt pistol', 'Frag grenades', 'Krak grenades'],
        options: ['Auto bolt rifle', 'Stalker bolt rifle', 'Sergeant upgrades']
      },
      subfactionSynergy: {
        ultramarines: 'very_high',
        blood_angels: 'high',
        dark_angels: 'high',
        imperial_fists: 'very_high',
        iron_hands: 'high',
        salamanders: 'high'
      },
      competitiveLevel: 'very_high',
      loreRoles: ['Line Infantry', 'Fire Support', 'Objective Holding'],
      description: 'Advanced Primaris Marines with superior firepower and resilience'
    },
    {
      id: 'assault_intercessor_squad',
      name: 'Assault Intercessor Squad',
      points: 180,
      models: 10,
      keywords: ['Infantry', 'Battleline', 'Assault Intercessor', 'Primaris'],
      equipment: {
        base: ['Astartes chainsword', 'Heavy bolt pistol', 'Frag grenades', 'Krak grenades'],
        options: ['Sergeant upgrades', 'Jump packs (specific units)']
      },
      subfactionSynergy: {
        ultramarines: 'high',
        blood_angels: 'very_high',
        dark_angels: 'high',
        imperial_fists: 'medium',
        iron_hands: 'medium',
        salamanders: 'high'
      },
      competitiveLevel: 'high',
      loreRoles: ['Close Combat', 'Rapid Assault', 'Urban Warfare'],
      description: 'Close combat specialists optimized for brutal melee engagement'
    }
  ],

  // Elites Units
  elites: [
    {
      id: 'terminator_squad',
      name: 'Terminator Squad',
      points: 205,
      models: 5,
      keywords: ['Infantry', 'Terminator', 'Elite'],
      equipment: {
        base: ['Storm bolter', 'Power fist', 'Terminator armour'],
        options: ['Heavy weapons', 'Melee weapon variants', 'Teleport strike']
      },
      subfactionSynergy: {
        ultramarines: 'high',
        blood_angels: 'medium',
        dark_angels: 'very_high',
        imperial_fists: 'high',
        iron_hands: 'very_high',
        salamanders: 'medium'
      },
      competitiveLevel: 'very_high',
      loreRoles: ['Heavy Assault', 'Elite Infantry', 'Breakthrough'],
      description: 'Elite veterans in ancient Terminator armour'
    },
    {
      id: 'assault_terminators',
      name: 'Assault Terminator Squad',
      points: 215,
      models: 5,
      keywords: ['Infantry', 'Terminator', 'Elite', 'Assault'],
      equipment: {
        base: ['Thunder hammer & Storm shield OR Lightning claws (pair)', 'Terminator armour'],
        options: ['Weapon loadout selection', 'Teleport strike']
      },
      subfactionSynergy: {
        ultramarines: 'high',
        blood_angels: 'very_high',
        dark_angels: 'very_high',
        imperial_fists: 'medium',
        iron_hands: 'high',
        salamanders: 'high'
      },
      competitiveLevel: 'very_high',
      loreRoles: ['Elite Close Combat', 'Breakthrough', 'Heavy Assault'],
      description: 'Close combat specialists in Terminator armour'
    },
    {
      id: 'bladeguard_veterans',
      name: 'Bladeguard Veteran Squad',
      points: 105,
      models: 3,
      keywords: ['Infantry', 'Bladeguard', 'Veteran', 'Primaris'],
      equipment: {
        base: ['Master-crafted power sword', 'Storm shield', 'Heavy bolt pistol']
      },
      subfactionSynergy: {
        ultramarines: 'very_high',
        blood_angels: 'very_high',
        dark_angels: 'high',
        imperial_fists: 'high',
        iron_hands: 'medium',
        salamanders: 'high'
      },
      competitiveLevel: 'very_high',
      loreRoles: ['Elite Close Combat', 'Character Protection', 'Elite Infantry'],
      description: 'Elite Primaris veterans with sword and shield'
    },
    {
      id: 'sternguard_veterans',
      name: 'Sternguard Veteran Squad',
      points: 160,
      models: 5,
      keywords: ['Infantry', 'Sternguard', 'Veteran'],
      equipment: {
        base: ['Special issue boltgun', 'Bolt pistol', 'Special ammunition'],
        options: ['Heavy weapons', 'Special weapons', 'Sergeant upgrades']
      },
      subfactionSynergy: {
        ultramarines: 'very_high',
        blood_angels: 'high',
        dark_angels: 'high',
        imperial_fists: 'very_high',
        iron_hands: 'high',
        salamanders: 'medium'
      },
      competitiveLevel: 'high',
      loreRoles: ['Veteran Infantry', 'Special Ammunition', 'Fire Support'],
      description: 'Veteran marksmen with special issue ammunition'
    },
    {
      id: 'company_veterans',
      name: 'Company Veterans',
      points: 120,
      models: 5,
      keywords: ['Infantry', 'Veteran', 'Company Veterans'],
      equipment: {
        base: ['Bolt rifle', 'Bolt pistol', 'Combat blade'],
        options: ['Heavy weapons', 'Special weapons', 'Melee upgrades']
      },
      subfactionSynergy: {
        ultramarines: 'high',
        blood_angels: 'high',
        dark_angels: 'high',
        imperial_fists: 'high',
        iron_hands: 'high',
        salamanders: 'high'
      },
      competitiveLevel: 'medium',
      loreRoles: ['Veteran Infantry', 'Flexible Support', 'Special Weapons'],
      description: 'Experienced battle-brothers with specialized roles'
    }
  ],

  // Fast Attack Units
  fastAttack: [
    {
      id: 'assault_squad',
      name: 'Assault Squad',
      points: 140,
      models: 5,
      keywords: ['Infantry', 'Jump Pack', 'Assault Squad'],
      equipment: {
        base: ['Astartes chainsword', 'Bolt pistol', 'Jump pack'],
        options: ['Flamers', 'Plasma pistols', 'Sergeant upgrades']
      },
      subfactionSynergy: {
        ultramarines: 'medium',
        blood_angels: 'very_high',
        dark_angels: 'medium',
        imperial_fists: 'low',
        iron_hands: 'low',
        salamanders: 'high'
      },
      competitiveLevel: 'medium',
      loreRoles: ['Mobile Assault', 'Close Combat', 'Rapid Deployment'],
      description: 'Jump pack equipped close combat specialists'
    },
    {
      id: 'inceptor_squad',
      name: 'Inceptor Squad',
      points: 115,
      models: 3,
      keywords: ['Infantry', 'Jump Pack', 'Inceptor', 'Primaris'],
      equipment: {
        base: ['Assault bolter x2', 'Jump pack'],
        options: ['Plasma exterminator x2']
      },
      subfactionSynergy: {
        ultramarines: 'high',
        blood_angels: 'very_high',
        dark_angels: 'high',
        imperial_fists: 'medium',
        iron_hands: 'medium',
        salamanders: 'high'
      },
      competitiveLevel: 'high',
      loreRoles: ['Mobile Fire Support', 'Rapid Assault', 'Deep Strike'],
      description: 'Heavy weapons specialists with jump pack mobility'
    },
    {
      id: 'bike_squad',
      name: 'Bike Squad',
      points: 135,
      models: 3,
      keywords: ['Mounted', 'Bike', 'Fast Attack'],
      equipment: {
        base: ['Twin boltgun', 'Bolt pistol', 'Space Marine bike'],
        options: ['Heavy weapons', 'Special weapons', 'Sergeant upgrades']
      },
      subfactionSynergy: {
        ultramarines: 'medium',
        blood_angels: 'high',
        dark_angels: 'very_high',
        imperial_fists: 'medium',
        iron_hands: 'high',
        salamanders: 'medium'
      },
      competitiveLevel: 'medium',
      loreRoles: ['Fast Reconnaissance', 'Mobile Fire Support', 'Harassment'],
      description: 'Fast moving bike-mounted Marines'
    },
    {
      id: 'outrider_squad',
      name: 'Outrider Squad',
      points: 135,
      models: 3,
      keywords: ['Mounted', 'Outrider', 'Primaris', 'Fast Attack'],
      equipment: {
        base: ['Twin bolt rifle', 'Bolt pistol', 'Primaris bike'],
        options: ['Sergeant upgrades']
      },
      subfactionSynergy: {
        ultramarines: 'high',
        blood_angels: 'high',
        dark_angels: 'very_high',
        imperial_fists: 'medium',
        iron_hands: 'high',
        salamanders: 'medium'
      },
      competitiveLevel: 'high',
      loreRoles: ['Fast Reconnaissance', 'Mobile Fire Support', 'Objective Control'],
      description: 'Primaris bike-mounted reconnaissance specialists'
    }
  ],

  // Heavy Support Units
  heavySupport: [
    {
      id: 'devastator_squad',
      name: 'Devastator Squad',
      points: 160,
      models: 5,
      keywords: ['Infantry', 'Devastator Squad', 'Heavy Weapons'],
      equipment: {
        base: ['Boltgun', 'Bolt pistol'],
        options: ['Heavy bolter', 'Multi-melta', 'Lascannon', 'Missile launcher']
      },
      subfactionSynergy: {
        ultramarines: 'high',
        blood_angels: 'medium',
        dark_angels: 'high',
        imperial_fists: 'very_high',
        iron_hands: 'very_high',
        salamanders: 'medium'
      },
      competitiveLevel: 'high',
      loreRoles: ['Heavy Fire Support', 'Anti-Armor', 'Area Denial'],
      description: 'Heavy weapons specialists providing devastating fire support'
    },
    {
      id: 'heavy_intercessor_squad',
      name: 'Heavy Intercessor Squad',
      points: 180,
      models: 5,
      keywords: ['Infantry', 'Heavy Intercessor', 'Primaris', 'Heavy Weapons'],
      equipment: {
        base: ['Heavy bolt rifle', 'Bolt pistol'],
        options: ['Executor heavy bolter', 'Heavy bolter', 'Sergeant upgrades']
      },
      subfactionSynergy: {
        ultramarines: 'very_high',
        blood_angels: 'medium',
        dark_angels: 'high',
        imperial_fists: 'very_high',
        iron_hands: 'very_high',
        salamanders: 'high'
      },
      competitiveLevel: 'very_high',
      loreRoles: ['Heavy Infantry', 'Fire Support', 'Defensive Line'],
      description: 'Heavily armed Primaris Marines for sustained fire support'
    },
    {
      id: 'predator',
      name: 'Predator',
      points: 130,
      models: 1,
      keywords: ['Vehicle', 'Predator', 'Tank'],
      equipment: {
        base: ['Predator autocannon', 'Storm bolter'],
        options: ['Lascannon sponsons', 'Heavy bolter sponsons', 'Hunter-killer missile']
      },
      subfactionSynergy: {
        ultramarines: 'high',
        blood_angels: 'medium',
        dark_angels: 'high',
        imperial_fists: 'high',
        iron_hands: 'very_high',
        salamanders: 'medium'
      },
      competitiveLevel: 'medium',
      loreRoles: ['Mobile Fire Support', 'Anti-Armor', 'Vehicle Support'],
      description: 'Main battle tank with flexible weapon options'
    },
    {
      id: 'whirlwind',
      name: 'Whirlwind',
      points: 125,
      models: 1,
      keywords: ['Vehicle', 'Whirlwind', 'Artillery'],
      equipment: {
        base: ['Whirlwind multiple missile launcher', 'Storm bolter']
      },
      subfactionSynergy: {
        ultramarines: 'high',
        blood_angels: 'low',
        dark_angels: 'medium',
        imperial_fists: 'very_high',
        iron_hands: 'high',
        salamanders: 'medium'
      },
      competitiveLevel: 'medium',
      loreRoles: ['Artillery Support', 'Area Denial', 'Indirect Fire'],
      description: 'Self-propelled artillery for indirect fire support'
    },
    {
      id: 'land_raider',
      name: 'Land Raider',
      points: 285,
      models: 1,
      keywords: ['Vehicle', 'Land Raider', 'Transport', 'Tank'],
      equipment: {
        base: ['Twin lascannon x2', 'Twin heavy bolter', 'Transport capacity 10']
      },
      subfactionSynergy: {
        ultramarines: 'high',
        blood_angels: 'high',
        dark_angels: 'very_high',
        imperial_fists: 'high',
        iron_hands: 'very_high',
        salamanders: 'medium'
      },
      competitiveLevel: 'medium',
      loreRoles: ['Heavy Transport', 'Assault Vehicle', 'Mobile Fortress'],
      description: 'Legendary assault transport and mobile fortress'
    }
  ],

  // Named Characters
  namedCharacters: [
    {
      id: 'marneus_calgar',
      name: 'Marneus Calgar',
      points: 210,
      models: 1,
      keywords: ['Character', 'Epic Hero', 'Chapter Master', 'Terminator'],
      equipment: {
        base: ['Gauntlets of Ultramar', 'Terminator armour', 'Iron halo']
      },
      restrictions: ['ultramarines_only'],
      subfactionSynergy: {
        ultramarines: 'very_high'
      },
      competitiveLevel: 'very_high',
      loreRoles: ['Supreme Command', 'Chapter Master', 'Elite Combat'],
      description: 'Chapter Master of the Ultramarines, Lord of Macragge'
    },
    {
      id: 'dante',
      name: 'Commander Dante',
      points: 180,
      models: 1,
      keywords: ['Character', 'Epic Hero', 'Chapter Master', 'Jump Pack'],
      equipment: {
        base: ['Axe Mortalis', 'Inferno pistol', 'Death mask of Sanguinius', 'Jump pack']
      },
      restrictions: ['blood_angels_only'],
      subfactionSynergy: {
        blood_angels: 'very_high'
      },
      competitiveLevel: 'very_high',
      loreRoles: ['Chapter Master', 'Close Combat', 'Aerial Assault'],
      description: 'Ancient Chapter Master of the Blood Angels'
    },
    {
      id: 'azrael',
      name: 'Azrael',
      points: 160,
      models: 1,
      keywords: ['Character', 'Epic Hero', 'Chapter Master'],
      equipment: {
        base: ['Sword of Secrets', 'Combi-plasma', 'Lion helm']
      },
      restrictions: ['dark_angels_only'],
      subfactionSynergy: {
        dark_angels: 'very_high'
      },
      competitiveLevel: 'very_high',
      loreRoles: ['Chapter Master', 'Plasma Weaponry', 'Tactical Command'],
      description: 'Supreme Grand Master of the Dark Angels'
    }
  ]
};

// Scenario Modifiers for Space Marines
export const scenarioModifiers = {
  defensive: {
    bonusUnits: ['devastator_squad', 'heavy_intercessor_squad', 'tactical_squad'],
    modifiers: {
      heavySupport: 1.3,
      troops: 1.2,
      fastAttack: 0.8
    },
    tacticalPriority: 'Establish defensive lines with heavy weapons and infantry'
  },
  assault: {
    bonusUnits: ['assault_intercessor_squad', 'inceptor_squad', 'assault_terminators'],
    modifiers: {
      elites: 1.3,
      fastAttack: 1.2,
      heavySupport: 0.9
    },
    tacticalPriority: 'Rapid assault with elite close combat units'
  },
  siege: {
    bonusUnits: ['terminator_squad', 'devastator_squad', 'tactical_squad'],
    modifiers: {
      elites: 1.2,
      heavySupport: 1.2,
      troops: 1.1
    },
    tacticalPriority: 'Combined arms for urban warfare and fortification assault'
  },
  reconnaissance: {
    bonusUnits: ['outrider_squad', 'bike_squad', 'assault_squad'],
    modifiers: {
      fastAttack: 1.4,
      troops: 1.1,
      heavySupport: 0.7
    },
    tacticalPriority: 'Mobile forces for rapid movement and intelligence gathering'
  },
  research: {
    bonusUnits: ['intercessor_squad', 'sternguard_veterans', 'tactical_squad'],
    modifiers: {
      troops: 1.3,
      elites: 1.1,
      hq: 1.1
    },
    tacticalPriority: 'Balanced force for securing and protecting research objectives'
  }
};

// Difficulty Modifiers for Space Marines
export const difficultyModifiers = {
  easy: {
    pointsModifier: 0.8,
    unitComplexity: 'low',
    preferredUnits: ['tactical_squad', 'intercessor_squad', 'devastator_squad'],
    description: 'Basic Space Marine forces with straightforward tactics'
  },
  medium: {
    pointsModifier: 1.0,
    unitComplexity: 'medium',
    preferredUnits: ['intercessor_squad', 'bladeguard_veterans', 'heavy_intercessor_squad'],
    description: 'Balanced force with mix of classic and Primaris units'
  },
  hard: {
    pointsModifier: 1.2,
    unitComplexity: 'high',
    preferredUnits: ['terminator_squad', 'sternguard_veterans', 'assault_terminators'],
    description: 'Elite formations with veteran units and complex tactics'
  },
  extreme: {
    pointsModifier: 1.3,
    unitComplexity: 'very_high',
    preferredUnits: ['marneus_calgar', 'dante', 'azrael', 'bladeguard_veterans'],
    description: 'Named characters leading elite forces in demanding scenarios'
  }
}; 