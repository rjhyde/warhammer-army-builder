// Space Marine Units Database for 10th Edition Warhammer 40,000
// Points costs and unit compositions based on publicly available data

// Data Version Information
export const dataVersion = {
  version: "1.0.0",
  lastUpdated: "2024-01-15",
  sources: [
    "Warhammer 40,000 Core Rules",
    "Codex: Space Marines (10th Edition)",
    "Chapter Approved 2024"
  ],
  updateCheckUrl: "https://api.github.com/repos/your-repo/releases/latest", // For checking updates
  warhammerCommunityCheck: true // Enable checking for updates
};

// 10th Edition Leader Attachment Rules for Space Marines
export const leaderAttachmentRules = {
  // Space Marine HQ units can embed with specific unit types
  captain: {
    canAttachTo: ['tactical_squad', 'intercessor_squad', 'assault_squad', 'devastator_squad', 'sternguard_veterans', 'vanguard_veterans'],
    restrictions: ['Cannot attach to units that already have a leader'],
    bonuses: ['Unit gains Leader keyword', 'Rites of Battle', 'Re-roll 1s to hit and wound']
  },
  lieutenant: {
    canAttachTo: ['tactical_squad', 'intercessor_squad', 'assault_squad', 'devastator_squad', 'sternguard_veterans'],
    restrictions: ['Cannot attach to units that already have a leader'],
    bonuses: ['Unit gains Leader keyword', 'Tactical Precision', 'Re-roll 1s to wound']
  },
  librarian: {
    canAttachTo: ['tactical_squad', 'intercessor_squad', 'assault_squad', 'devastator_squad', 'sternguard_veterans', 'vanguard_veterans'],
    restrictions: ['Cannot attach to units that already have a leader'],
    bonuses: ['Unit gains Leader keyword', 'Psychic abilities', 'Mental Fortress']
  },
  chaplain: {
    canAttachTo: ['tactical_squad', 'intercessor_squad', 'assault_squad', 'vanguard_veterans', 'sternguard_veterans'],
    restrictions: ['Cannot attach to units that already have a leader'],
    bonuses: ['Unit gains Leader keyword', 'Spiritual Leader', 'Litanies of Battle']
  },
  techmarine: {
    canAttachTo: ['tactical_squad', 'intercessor_squad', 'devastator_squad'],
    restrictions: ['Cannot attach to units that already have a leader'],
    bonuses: ['Unit gains Leader keyword', 'Blessing of the Omnissiah', 'Tech support']
  },
  // Dreadnought characters (if any exist)
  librarian_dreadnought: {
    canAttachTo: [], // Dreadnoughts typically cannot attach to units
    restrictions: ['Independent character'],
    bonuses: ['Psychic Dreadnought', 'Unyielding Ancient']
  },
  // Chapter-specific characters
  sanguinary_priest: {
    canAttachTo: ['tactical_squad', 'intercessor_squad', 'assault_squad', 'sanguinary_guard', 'death_company'],
    restrictions: ['Cannot attach to units that already have a leader', 'Blood Angels only'],
    bonuses: ['Unit gains Leader keyword', 'Sanguinary healing', 'Blood Chalice']
  }
};

export const spaceMarineUnits = {
  // HQ
  hq: [
    {
      id: 'captain',
      name: 'Captain',
      points: 80,
      models: 1,
      keywords: ['Character', 'Infantry', 'Captain'],
      leaderAttachment: {
        canAttachTo: ['tactical_squad', 'intercessor_squad', 'assault_squad', 'devastator_squad', 'sternguard_veterans', 'vanguard_veterans'],
        bonuses: ['Leader abilities', 'Rites of Battle', 'Re-roll 1s to hit and wound']
      },
      equipment: {
        base: ['Bolt pistol', 'Chainsword'],
        options: [
          { name: 'Power sword', cost: 0 },
          { name: 'Power fist', cost: 0 },
          { name: 'Thunder hammer', cost: 0 },
          { name: 'Storm shield', cost: 0 },
          { name: 'Combi-weapon', cost: 0 }
        ]
      },
      loreRoles: ['leadership', 'command', 'melee_specialist'],
      competitiveLevel: 'high',
      subfactionSynergy: {
        ultramarines: 'very_high',
        blood_angels: 'very_high',
        dark_angels: 'very_high',
        imperial_fists: 'very_high',
        iron_hands: 'very_high',
        salamanders: 'very_high'
      }
    },
    {
      id: 'lieutenant',
      name: 'Primaris Lieutenant',
      points: 70,
      models: 1,
      keywords: ['Character', 'Infantry', 'Lieutenant', 'Primaris'],
      leaderAttachment: {
        canAttachTo: ['tactical_squad', 'intercessor_squad', 'assault_squad', 'devastator_squad', 'sternguard_veterans'],
        bonuses: ['Leader abilities', 'Tactical Precision', 'Re-roll 1s to wound']
      },
      equipment: {
        base: ['Bolt pistol', 'Chainsword'],
        options: [
          { name: 'Power sword', cost: 0 },
          { name: 'Power fist', cost: 0 },
          { name: 'Storm shield', cost: 0 },
          { name: 'Combi-weapon', cost: 0 }
        ]
      },
      loreRoles: ['support_command', 'tactical_flexibility'],
      competitiveLevel: 'high',
      subfactionSynergy: {
        ultramarines: 'very_high',
        blood_angels: 'high',
        dark_angels: 'high',
        imperial_fists: 'very_high',
        iron_hands: 'very_high',
        salamanders: 'high'
      }
    },
    {
      id: 'librarian',
      name: 'Librarian',
      points: 90,
      models: 1,
      keywords: ['Character', 'Infantry', 'Psyker', 'Librarian'],
      leaderAttachment: {
        canAttachTo: ['tactical_squad', 'intercessor_squad', 'assault_squad', 'devastator_squad', 'sternguard_veterans', 'vanguard_veterans'],
        bonuses: ['Leader abilities', 'Psychic abilities', 'Mental Fortress']
      },
      equipment: {
        base: ['Bolt pistol', 'Force weapon', 'Psychic hood'],
        options: [
          { name: 'Force sword', cost: 0 },
          { name: 'Force axe', cost: 0 },
          { name: 'Force stave', cost: 0 },
          { name: 'Combi-weapon', cost: 0 }
        ]
      },
      loreRoles: ['psyker', 'support', 'anti_psyker'],
      competitiveLevel: 'very_high',
      subfactionSynergy: {
        ultramarines: 'very_high',
        blood_angels: 'very_high',
        dark_angels: 'very_high',
        imperial_fists: 'high',
        iron_hands: 'medium',
        salamanders: 'high'
      }
    },
    {
      id: 'chaplain',
      name: 'Chaplain',
      points: 85,
      models: 1,
      keywords: ['Character', 'Infantry', 'Chaplain'],
      leaderAttachment: {
        canAttachTo: ['tactical_squad', 'intercessor_squad', 'assault_squad', 'vanguard_veterans', 'sternguard_veterans'],
        bonuses: ['Leader abilities', 'Spiritual Leader', 'Litanies of Battle']
      },
      equipment: {
        base: ['Bolt pistol', 'Crozius arcanum', 'Rosarius'],
        options: [
          { name: 'Jump pack', cost: 0 },
          { name: 'Combi-weapon', cost: 0 },
          { name: 'Power fist', cost: 0 }
        ]
      },
      loreRoles: ['morale_support', 'melee_specialist', 'spiritual_leader'],
      competitiveLevel: 'high',
      subfactionSynergy: {
        ultramarines: 'high',
        blood_angels: 'very_high',
        dark_angels: 'very_high',
        imperial_fists: 'very_high',
        iron_hands: 'high',
        salamanders: 'very_high'
      }
    },
    {
      id: 'techmarine',
      name: 'Techmarine',
      points: 75,
      models: 1,
      keywords: ['Character', 'Infantry', 'Techmarine'],
      leaderAttachment: {
        canAttachTo: ['tactical_squad', 'intercessor_squad', 'devastator_squad'],
        bonuses: ['Leader abilities', 'Blessing of the Omnissiah', 'Tech support']
      },
      equipment: {
        base: ['Bolt pistol', 'Power axe', 'Servo-arm', 'Mechadendrites'],
        options: [
          { name: 'Servitors x4', cost: 0 },
          { name: 'Conversion beamer', cost: 0 },
          { name: 'Combi-weapon', cost: 0 }
        ]
      },
      loreRoles: ['vehicle_support', 'repair', 'tech_specialist'],
      competitiveLevel: 'medium',
      subfactionSynergy: {
        ultramarines: 'high',
        blood_angels: 'medium',
        dark_angels: 'medium',
        imperial_fists: 'very_high',
        iron_hands: 'very_high',
        salamanders: 'very_high'
      }
    }
  ],

  // Troops
  troops: [
    {
      id: 'tactical_squad',
      name: 'Tactical Squad',
      points: 90,
      models: 5,
      keywords: ['Infantry', 'Tactical Squad'],
      equipment: {
        base: ['Bolt gun', 'Bolt pistol', 'Frag grenades', 'Krak grenades'],
        options: [
          { name: 'Flamer', cost: 0 },
          { name: 'Meltagun', cost: 0 },
          { name: 'Plasma gun', cost: 0 },
          { name: 'Missile launcher', cost: 0 },
          { name: 'Heavy bolter', cost: 0 },
          { name: 'Lascannon', cost: 0 }
        ]
      },
      loreRoles: ['core_infantry', 'objective_secured', 'versatile'],
      competitiveLevel: 'medium',
      subfactionSynergy: {
        ultramarines: 'very_high',
        blood_angels: 'high',
        dark_angels: 'high',
        imperial_fists: 'very_high',
        iron_hands: 'high',
        salamanders: 'high'
      }
    },
    {
      id: 'intercessor_squad',
      name: 'Intercessor Squad',
      points: 100,
      models: 5,
      keywords: ['Infantry', 'Primaris', 'Intercessor'],
      equipment: {
        base: ['Bolt rifle', 'Bolt pistol', 'Frag grenades', 'Krak grenades'],
        options: [
          { name: 'Auto bolt rifle', cost: 0 },
          { name: 'Stalker bolt rifle', cost: 0 },
          { name: 'Auxiliary grenade launcher', cost: 0 },
          { name: 'Power sword (Sergeant)', cost: 0 },
          { name: 'Power fist (Sergeant)', cost: 0 }
        ]
      },
      loreRoles: ['core_infantry', 'objective_secured', 'fire_support'],
      competitiveLevel: 'very_high',
      subfactionSynergy: {
        ultramarines: 'very_high',
        blood_angels: 'high',
        dark_angels: 'high',
        imperial_fists: 'very_high',
        iron_hands: 'very_high',
        salamanders: 'high'
      }
    },
    {
      id: 'infiltrator_squad',
      name: 'Infiltrator Squad',
      points: 130,
      models: 5,
      keywords: ['Infantry', 'Primaris', 'Infiltrator', 'Phobos'],
      equipment: {
        base: ['Marksman bolt carbine', 'Bolt pistol', 'Frag grenades', 'Krak grenades'],
        options: [
          { name: 'Infiltrator comms array', cost: 0 },
          { name: 'Helix gauntlet', cost: 0 }
        ]
      },
      loreRoles: ['scouts', 'infiltration', 'anti_infiltration'],
      competitiveLevel: 'high',
      subfactionSynergy: {
        ultramarines: 'high',
        blood_angels: 'medium',
        dark_angels: 'very_high',
        imperial_fists: 'high',
        iron_hands: 'medium',
        salamanders: 'medium'
      }
    },
    {
      id: 'scout_squad',
      name: 'Scout Squad',
      points: 70,
      models: 5,
      keywords: ['Infantry', 'Scout'],
      equipment: {
        base: ['Scout bolter', 'Bolt pistol', 'Combat knife'],
        options: [
          { name: 'Sniper rifle', cost: 0 },
          { name: 'Heavy bolter', cost: 0 },
          { name: 'Missile launcher', cost: 0 },
          { name: 'Shotgun', cost: 0 },
          { name: 'Camo cloaks', cost: 0 }
        ]
      },
      loreRoles: ['scouts', 'reconnaissance', 'infiltration'],
      competitiveLevel: 'medium',
      subfactionSynergy: {
        ultramarines: 'high',
        blood_angels: 'medium',
        dark_angels: 'high',
        imperial_fists: 'very_high',
        iron_hands: 'medium',
        salamanders: 'medium'
      }
    }
  ],

  // Elites
  elites: [
    {
      id: 'terminator_squad',
      name: 'Terminator Squad',
      points: 175,
      models: 5,
      keywords: ['Infantry', 'Terminator'],
      equipment: {
        base: ['Storm bolter', 'Power fist'],
        options: [
          { name: 'Lightning claws (pair)', cost: 0 },
          { name: 'Thunder hammer', cost: 0 },
          { name: 'Storm shield', cost: 0 },
          { name: 'Assault cannon', cost: 0 },
          { name: 'Heavy flamer', cost: 0 },
          { name: 'Cyclone missile launcher', cost: 0 }
        ]
      },
      loreRoles: ['elite_assault', 'heavy_infantry', 'teleport_strike'],
      competitiveLevel: 'high',
      subfactionSynergy: {
        ultramarines: 'very_high',
        blood_angels: 'high',
        dark_angels: 'very_high',
        imperial_fists: 'very_high',
        iron_hands: 'very_high',
        salamanders: 'high'
      }
    },
    {
      id: 'dreadnought',
      name: 'Dreadnought',
      points: 150,
      models: 1,
      keywords: ['Vehicle', 'Walker', 'Dreadnought'],
      equipment: {
        base: ['Multi-melta', 'Dreadnought combat weapon'],
        options: [
          { name: 'Twin lascannon', cost: 0 },
          { name: 'Missile launcher', cost: 0 },
          { name: 'Plasma cannon', cost: 0 },
          { name: 'Assault cannon', cost: 0 },
          { name: 'Heavy flamer', cost: 0 }
        ]
      },
      loreRoles: ['heavy_support', 'anti_armor', 'firebase'],
      competitiveLevel: 'high',
      subfactionSynergy: {
        ultramarines: 'high',
        blood_angels: 'very_high',
        dark_angels: 'high',
        imperial_fists: 'very_high',
        iron_hands: 'very_high',
        salamanders: 'very_high'
      }
    },
    {
      id: 'redemptor_dreadnought',
      name: 'Redemptor Dreadnought',
      points: 220,
      models: 1,
      keywords: ['Vehicle', 'Walker', 'Primaris', 'Redemptor'],
      equipment: {
        base: ['Macro plasma incinerator', 'Redemptor fist', 'Storm bolters x2', 'Fragstorm grenade launcher'],
        options: [
          { name: 'Heavy onslaught gatling cannon', cost: 0 },
          { name: 'Heavy flamer', cost: 0 },
          { name: 'Onslaught gatling cannon', cost: 0 },
          { name: 'Storm bolters', cost: 0 }
        ]
      },
      loreRoles: ['centerpiece', 'heavy_fire_support', 'anti_infantry'],
      competitiveLevel: 'very_high',
      subfactionSynergy: {
        ultramarines: 'very_high',
        blood_angels: 'high',
        dark_angels: 'high',
        imperial_fists: 'very_high',
        iron_hands: 'very_high',
        salamanders: 'very_high'
      }
    },
    {
      id: 'brutalis_dreadnought',
      name: 'Brutalis Dreadnought',
      points: 200,
      models: 1,
      keywords: ['Vehicle', 'Walker', 'Primaris', 'Brutalis'],
      equipment: {
        base: ['Brutalis fists x2', 'Twin bolt rifle x2', 'Multi-melta x2'],
        options: [
          { name: 'Twin lascannon', cost: 0 },
          { name: 'Hurricane bolter', cost: 0 }
        ]
      },
      loreRoles: ['assault_specialist', 'melee_dominance', 'breakthrough'],
      competitiveLevel: 'very_high',
      subfactionSynergy: {
        ultramarines: 'high',
        blood_angels: 'very_high',
        dark_angels: 'high',
        imperial_fists: 'medium',
        iron_hands: 'very_high',
        salamanders: 'high'
      }
    },
    {
      id: 'librarian_dreadnought',
      name: 'Librarian Dreadnought',
      points: 190,
      models: 1,
      keywords: ['Vehicle', 'Walker', 'Psyker', 'Librarian', 'Dreadnought'],
      equipment: {
        base: ['Force halberd', 'Storm bolter', 'Psychic hood'],
        options: [
          { name: 'Twin lascannon', cost: 0 },
          { name: 'Missile launcher', cost: 0 },
          { name: 'Plasma cannon', cost: 0 },
          { name: 'Multi-melta', cost: 0 }
        ]
      },
      loreRoles: ['psyker_support', 'heavy_assault', 'force_multiplier'],
      competitiveLevel: 'very_high',
      subfactionSynergy: {
        ultramarines: 'very_high',
        blood_angels: 'very_high',
        dark_angels: 'medium', // Dark Angels distrust psykers
        imperial_fists: 'high',
        iron_hands: 'medium',
        salamanders: 'high'
      }
    },
    {
      id: 'sanguinary_guard',
      name: 'Sanguinary Guard',
      points: 150,
      models: 5,
      keywords: ['Infantry', 'Jump Pack', 'Sanguinary Guard'],
      equipment: {
        base: ['Angelus boltgun', 'Encarmine sword'],
        options: [
          { name: 'Encarmine axe', cost: 0 },
          { name: 'Power fist', cost: 0 },
          { name: 'Inferno pistol', cost: 0 },
          { name: 'Plasma pistol', cost: 0 }
        ]
      },
      loreRoles: ['elite_assault', 'jump_infantry', 'honor_guard'],
      competitiveLevel: 'very_high',
      subfactionRestricted: ['blood_angels'], // Blood Angels only
      subfactionSynergy: {
        blood_angels: 'legendary'
      }
    },
    {
      id: 'death_company',
      name: 'Death Company',
      points: 120,
      models: 5,
      keywords: ['Infantry', 'Jump Pack', 'Death Company'],
      equipment: {
        base: ['Bolt pistol', 'Chainsword'],
        options: [
          { name: 'Power sword', cost: 0 },
          { name: 'Power fist', cost: 0 },
          { name: 'Thunder hammer', cost: 0 },
          { name: 'Plasma pistol', cost: 0 },
          { name: 'Inferno pistol', cost: 0 }
        ]
      },
      loreRoles: ['berserker_assault', 'shock_troops', 'death_seekers'],
      competitiveLevel: 'very_high',
      subfactionRestricted: ['blood_angels'],
      subfactionSynergy: {
        blood_angels: 'legendary'
      }
    },
    {
      id: 'deathwing_knights',
      name: 'Deathwing Knights',
      points: 230,
      models: 5,
      keywords: ['Infantry', 'Terminator', 'Deathwing', 'Inner Circle'],
      equipment: {
        base: ['Storm shield', 'Mace of absolution'],
        options: [
          { name: 'Flail of the Unforgiven (Champion)', cost: 0 },
          { name: 'Watcher in the Dark', cost: 0 }
        ]
      },
      loreRoles: ['elite_melee', 'fortress_breakers', 'inner_circle'],
      competitiveLevel: 'very_high',
      subfactionRestricted: ['dark_angels'],
      subfactionSynergy: {
        dark_angels: 'legendary'
      }
    },
    {
      id: 'ravenwing_knights',
      name: 'Ravenwing Black Knights',
      points: 135,
      models: 3,
      keywords: ['Biker', 'Ravenwing'],
      equipment: {
        base: ['Twin boltgun', 'Corvus hammer', 'Plasma talon'],
        options: [
          { name: 'Huntmaster (Champion)', cost: 0 },
          { name: 'Ravenwing grenade launcher', cost: 0 }
        ]
      },
      loreRoles: ['fast_attack', 'plasma_specialists', 'hunt_the_fallen'],
      competitiveLevel: 'very_high',
      subfactionRestricted: ['dark_angels'],
      subfactionSynergy: {
        dark_angels: 'legendary'
      }
    },
    {
      id: 'centurion_devastators',
      name: 'Centurion Devastator Squad',
      points: 255,
      models: 3,
      keywords: ['Infantry', 'Centurion'],
      equipment: {
        base: ['Grav-cannon', 'Hurricane bolter'],
        options: [
          { name: 'Heavy bolter', cost: 0 },
          { name: 'Lascannon', cost: 0 },
          { name: 'Omniscope', cost: 0 }
        ]
      },
      loreRoles: ['heavy_fire_support', 'fortress_assault', 'devastation'],
      competitiveLevel: 'high',
      subfactionSynergy: {
        ultramarines: 'very_high',
        blood_angels: 'medium',
        dark_angels: 'medium',
        imperial_fists: 'very_high',
        iron_hands: 'very_high',
        salamanders: 'high'
      }
    },
    {
      id: 'primaris_apothecary',
      name: 'Primaris Apothecary',
      points: 75,
      models: 1,
      keywords: ['Character', 'Infantry', 'Primaris', 'Apothecary'],
      equipment: {
        base: ['Absolvor bolt pistol', 'Reductor pistol', 'Narthecium'],
        options: [
          { name: 'Chief Apothecary upgrade', cost: 0 }
        ]
      },
      loreRoles: ['medic', 'support', 'revival_specialist'],
      competitiveLevel: 'very_high',
      subfactionSynergy: {
        ultramarines: 'very_high',
        blood_angels: 'very_high',
        dark_angels: 'high',
        imperial_fists: 'very_high',
        iron_hands: 'very_high',
        salamanders: 'very_high'
      }
    }
  ],

  // Fast Attack
  fastAttack: [
    {
      id: 'assault_squad',
      name: 'Assault Squad',
      points: 100,
      models: 5,
      keywords: ['Infantry', 'Jump Pack', 'Assault Squad'],
      equipment: {
        base: ['Bolt pistol', 'Chainsword', 'Jump pack'],
        options: [
          { name: 'Flamer', cost: 0 },
          { name: 'Meltagun', cost: 0 },
          { name: 'Plasma pistol', cost: 0 },
          { name: 'Power sword', cost: 0 },
          { name: 'Power fist', cost: 0 }
        ]
      },
      loreRoles: ['fast_assault', 'jump_infantry', 'shock_troops'],
      competitiveLevel: 'medium',
      subfactionSynergy: {
        ultramarines: 'high',
        blood_angels: 'very_high',
        dark_angels: 'medium',
        imperial_fists: 'medium',
        iron_hands: 'medium',
        salamanders: 'high'
      }
    },
    {
      id: 'bike_squad',
      name: 'Bike Squad',
      points: 85,
      models: 3,
      keywords: ['Biker'],
      equipment: {
        base: ['Twin boltgun', 'Bolt pistol'],
        options: [
          { name: 'Flamer', cost: 0 },
          { name: 'Meltagun', cost: 0 },
          { name: 'Plasma gun', cost: 0 },
          { name: 'Multi-melta attack bike', cost: 0 }
        ]
      },
      loreRoles: ['fast_attack', 'mobile_fire_support', 'reconnaissance'],
      competitiveLevel: 'medium',
      subfactionSynergy: {
        ultramarines: 'high',
        blood_angels: 'high',
        dark_angels: 'very_high',
        imperial_fists: 'medium',
        iron_hands: 'high',
        salamanders: 'medium'
      }
    },
    {
      id: 'land_speeder',
      name: 'Land Speeder',
      points: 70,
      models: 1,
      keywords: ['Vehicle', 'Fly', 'Land Speeder'],
      equipment: {
        base: ['Heavy bolter'],
        options: [
          { name: 'Multi-melta', cost: 0 },
          { name: 'Assault cannon', cost: 0 },
          { name: 'Typhoon missile launcher', cost: 0 },
          { name: 'Heavy flamer', cost: 0 }
        ]
      },
      loreRoles: ['fast_support', 'reconnaissance', 'harassment'],
      competitiveLevel: 'medium',
      subfactionSynergy: {
        ultramarines: 'high',
        blood_angels: 'high',
        dark_angels: 'very_high',
        imperial_fists: 'high',
        iron_hands: 'medium',
        salamanders: 'medium'
      }
    },
    {
      id: 'inceptor_squad',
      name: 'Inceptor Squad',
      points: 150,
      models: 3,
      keywords: ['Infantry', 'Jump Pack', 'Fly', 'Primaris', 'Inceptor'],
      equipment: {
        base: ['Assault bolter x2'],
        options: [
          { name: 'Plasma exterminator x2', cost: 0 }
        ]
      },
      loreRoles: ['fast_assault', 'fire_support', 'deep_strike'],
      competitiveLevel: 'very_high',
      subfactionSynergy: {
        ultramarines: 'very_high',
        blood_angels: 'very_high',
        dark_angels: 'high',
        imperial_fists: 'very_high',
        iron_hands: 'high',
        salamanders: 'high'
      }
    },
    {
      id: 'outrider_squad',
      name: 'Outrider Squad',
      points: 135,
      models: 3,
      keywords: ['Biker', 'Primaris', 'Outrider'],
      equipment: {
        base: ['Twin bolt rifle', 'Bolt pistol', 'Astartes chainsword'],
        options: [
          { name: 'Plasma pistol', cost: 0 },
          { name: 'Power sword', cost: 0 }
        ]
      },
      loreRoles: ['fast_assault', 'mobile_firebase', 'flanking'],
      competitiveLevel: 'high',
      subfactionSynergy: {
        ultramarines: 'high',
        blood_angels: 'very_high',
        dark_angels: 'very_high',
        imperial_fists: 'medium',
        iron_hands: 'high',
        salamanders: 'medium'
      }
    }
  ],

  // Heavy Support
  heavySupport: [
    {
      id: 'devastator_squad',
      name: 'Devastator Squad',
      points: 95,
      models: 5,
      keywords: ['Infantry', 'Devastator'],
      equipment: {
        base: ['Boltgun', 'Bolt pistol'],
        options: [
          { name: 'Heavy bolter', cost: 0 },
          { name: 'Missile launcher', cost: 0 },
          { name: 'Lascannon', cost: 0 },
          { name: 'Multi-melta', cost: 0 },
          { name: 'Plasma cannon', cost: 0 },
          { name: 'Grav-cannon', cost: 0 }
        ]
      },
      loreRoles: ['heavy_fire_support', 'anti_armor', 'firebase'],
      competitiveLevel: 'medium',
      subfactionSynergy: {
        ultramarines: 'high',
        blood_angels: 'medium',
        dark_angels: 'medium',
        imperial_fists: 'very_high',
        iron_hands: 'very_high',
        salamanders: 'high'
      }
    },
    {
      id: 'predator_tank',
      name: 'Predator',
      points: 130,
      models: 1,
      keywords: ['Vehicle', 'Predator'],
      equipment: {
        base: ['Predator autocannon', 'Storm bolter'],
        options: [
          { name: 'Twin lascannon turret', cost: 0 },
          { name: 'Lascannon sponsons', cost: 0 },
          { name: 'Heavy bolter sponsons', cost: 0 },
          { name: 'Hunter-killer missile', cost: 0 }
        ]
      },
      loreRoles: ['main_battle_tank', 'fire_support', 'anti_armor'],
      competitiveLevel: 'medium',
      subfactionSynergy: {
        ultramarines: 'high',
        blood_angels: 'medium',
        dark_angels: 'medium',
        imperial_fists: 'very_high',
        iron_hands: 'very_high',
        salamanders: 'high'
      }
    },
    {
      id: 'repulsor_tank',
      name: 'Repulsor',
      points: 275,
      models: 1,
      keywords: ['Vehicle', 'Fly', 'Transport', 'Repulsor', 'Primaris'],
      equipment: {
        base: ['Twin heavy bolter', 'Twin lascannon', 'Onslaught gatling cannon', 'Fragstorm grenade launcher', 'Storm bolter x2'],
        options: [
          { name: 'Las-talon', cost: 0 },
          { name: 'Twin plasma incinerator', cost: 0 },
          { name: 'Icarus rocket pod', cost: 0 },
          { name: 'Ironhail heavy stubber', cost: 0 }
        ]
      },
      loreRoles: ['battle_tank', 'transport', 'firebase'],
      competitiveLevel: 'very_high',
      subfactionSynergy: {
        ultramarines: 'very_high',
        blood_angels: 'high',
        dark_angels: 'high',
        imperial_fists: 'very_high',
        iron_hands: 'very_high',
        salamanders: 'high'
      }
    },
    {
      id: 'repulsor_executioner',
      name: 'Repulsor Executioner',
      points: 325,
      models: 1,
      keywords: ['Vehicle', 'Fly', 'Repulsor', 'Primaris'],
      equipment: {
        base: ['Macro plasma incinerator', 'Twin heavy bolter', 'Twin Icarus ironhail heavy stubber', 'Fragstorm grenade launcher x2'],
        options: [
          { name: 'Heavy laser destroyer', cost: 0 },
          { name: 'Icarus rocket pod', cost: 0 },
          { name: 'Ironhail heavy stubber', cost: 0 }
        ]
      },
      loreRoles: ['heavy_battle_tank', 'anti_armor', 'centerpiece'],
      competitiveLevel: 'very_high',
      subfactionSynergy: {
        ultramarines: 'very_high',
        blood_angels: 'medium',
        dark_angels: 'high',
        imperial_fists: 'very_high',
        iron_hands: 'very_high',
        salamanders: 'high'
      }
    },
    {
      id: 'land_raider',
      name: 'Land Raider',
      points: 285,
      models: 1,
      keywords: ['Vehicle', 'Transport', 'Land Raider'],
      equipment: {
        base: ['Twin lascannon x2', 'Twin heavy bolter'],
        options: [
          { name: 'Hunter-killer missile', cost: 0 },
          { name: 'Storm bolter', cost: 0 }
        ]
      },
      loreRoles: ['assault_transport', 'heavy_armor', 'breakthrough'],
      competitiveLevel: 'high',
      subfactionSynergy: {
        ultramarines: 'very_high',
        blood_angels: 'high',
        dark_angels: 'very_high',
        imperial_fists: 'very_high',
        iron_hands: 'very_high',
        salamanders: 'high'
      }
    },
    {
      id: 'land_raider_crusader',
      name: 'Land Raider Crusader',
      points: 270,
      models: 1,
      keywords: ['Vehicle', 'Transport', 'Land Raider'],
      equipment: {
        base: ['Twin assault cannon', 'Hurricane bolter x2'],
        options: [
          { name: 'Multi-melta', cost: 0 },
          { name: 'Hunter-killer missile', cost: 0 }
        ]
      },
      loreRoles: ['assault_transport', 'infantry_support', 'urban_warfare'],
      competitiveLevel: 'high',
      subfactionSynergy: {
        ultramarines: 'high',
        blood_angels: 'very_high',
        dark_angels: 'very_high',
        imperial_fists: 'very_high',
        iron_hands: 'high',
        salamanders: 'high'
      }
    },
    {
      id: 'whirlwind',
      name: 'Whirlwind',
      points: 125,
      models: 1,
      keywords: ['Vehicle', 'Whirlwind'],
      equipment: {
        base: ['Whirlwind castellan launcher', 'Storm bolter'],
        options: [
          { name: 'Whirlwind vengeance launcher', cost: 0 },
          { name: 'Hunter-killer missile', cost: 0 }
        ]
      },
      loreRoles: ['artillery', 'indirect_fire', 'infantry_support'],
      competitiveLevel: 'medium',
      subfactionSynergy: {
        ultramarines: 'high',
        blood_angels: 'medium',
        dark_angels: 'medium',
        imperial_fists: 'very_high',
        iron_hands: 'high',
        salamanders: 'medium'
      }
    },
    {
      id: 'eliminator_squad',
      name: 'Eliminator Squad',
      points: 90,
      models: 3,
      keywords: ['Infantry', 'Primaris', 'Phobos', 'Eliminator'],
      equipment: {
        base: ['Bolt sniper rifle', 'Bolt pistol', 'Camo cloak'],
        options: [
          { name: 'Las fusil', cost: 0 },
          { name: 'Instigator bolt carbine (Sergeant)', cost: 0 }
        ]
      },
      loreRoles: ['sniper', 'infiltration', 'character_assassination'],
      competitiveLevel: 'very_high',
      subfactionSynergy: {
        ultramarines: 'high',
        blood_angels: 'medium',
        dark_angels: 'very_high',
        imperial_fists: 'very_high',
        iron_hands: 'high',
        salamanders: 'medium'
      }
    }
  ],

  // Dedicated Transports
  dedicatedTransports: [
    {
      id: 'rhino',
      name: 'Rhino',
      points: 80,
      models: 1,
      keywords: ['Vehicle', 'Transport', 'Rhino'],
      equipment: {
        base: ['Storm bolter'],
        options: [
          { name: 'Additional storm bolter', cost: 0 },
          { name: 'Hunter-killer missile', cost: 0 }
        ]
      },
      loreRoles: ['transport', 'mobile_support'],
      competitiveLevel: 'medium',
      subfactionSynergy: {
        ultramarines: 'high',
        blood_angels: 'high',
        dark_angels: 'high',
        imperial_fists: 'very_high',
        iron_hands: 'high',
        salamanders: 'high'
      }
    },
    {
      id: 'razorback',
      name: 'Razorback',
      points: 95,
      models: 1,
      keywords: ['Vehicle', 'Transport', 'Razorback'],
      equipment: {
        base: ['Twin heavy bolter'],
        options: [
          { name: 'Twin assault cannon', cost: 0 },
          { name: 'Twin lascannon', cost: 0 },
          { name: 'Lascannon and twin plasma gun', cost: 0 },
          { name: 'Hunter-killer missile', cost: 0 }
        ]
      },
      loreRoles: ['armed_transport', 'fire_support'],
      competitiveLevel: 'medium',
      subfactionSynergy: {
        ultramarines: 'high',
        blood_angels: 'medium',
        dark_angels: 'medium',
        imperial_fists: 'very_high',
        iron_hands: 'very_high',
        salamanders: 'high'
      }
    },
    {
      id: 'drop_pod',
      name: 'Drop Pod',
      points: 85,
      models: 1,
      keywords: ['Vehicle', 'Transport', 'Drop Pod'],
      equipment: {
        base: ['Storm bolter'],
        options: [
          { name: 'Deathwind launcher', cost: 0 }
        ]
      },
      loreRoles: ['deep_strike_transport', 'tactical_insertion'],
      competitiveLevel: 'medium',
      subfactionSynergy: {
        ultramarines: 'very_high',
        blood_angels: 'high',
        dark_angels: 'medium',
        imperial_fists: 'very_high',
        iron_hands: 'medium',
        salamanders: 'high'
      }
    },
    {
      id: 'impulsor',
      name: 'Impulsor',
      points: 100,
      models: 1,
      keywords: ['Vehicle', 'Transport', 'Impulsor', 'Primaris'],
      equipment: {
        base: ['Twin bolt rifle', 'Impulsor shield dome'],
        options: [
          { name: 'Bellicatus missile array', cost: 0 },
          { name: 'Fragstorm grenade launcher', cost: 0 },
          { name: 'Ironhail heavy stubber', cost: 0 },
          { name: 'Orbital comms array', cost: 0 }
        ]
      },
      loreRoles: ['fast_transport', 'primaris_support'],
      competitiveLevel: 'high',
      subfactionSynergy: {
        ultramarines: 'very_high',
        blood_angels: 'high',
        dark_angels: 'high',
        imperial_fists: 'high',
        iron_hands: 'high',
        salamanders: 'high'
      }
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