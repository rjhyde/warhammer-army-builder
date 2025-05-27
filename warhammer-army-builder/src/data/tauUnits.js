// Tau Empire unit data for 10th Edition Warhammer 40,000
// Points costs and unit compositions based on publicly available data

// Data Version Information
export const dataVersion = {
  version: "1.0.0",
  lastUpdated: "2024-01-15",
  sources: [
    "Warhammer 40,000 Core Rules",
    "Codex: T'au Empire (10th Edition)",
    "Chapter Approved 2024"
  ],
  updateCheckUrl: "https://api.github.com/repos/your-repo/releases/latest", // For checking updates
  warhammerCommunityCheck: true // Enable checking for updates
};

// 10th Edition Leader Attachment Rules for T'au Empire
export const leaderAttachmentRules = {
  // T'au Empire HQ units can embed with specific unit types
  commander_crisis: {
    canAttachTo: ['crisis_suits_sunforge', 'crisis_suits_starscythe', 'crisis_suits_fireknife'],
    restrictions: ['Cannot attach to units that already have a leader'],
    bonuses: ['Unit gains Leader keyword', '+1 to hit rolls', 'Can use leader abilities']
  },
  commander_enforcer: {
    canAttachTo: ['crisis_suits_sunforge', 'crisis_suits_starscythe', 'crisis_suits_fireknife'],
    restrictions: ['Cannot attach to units that already have a leader'],
    bonuses: ['Unit gains Leader keyword', '+1 to hit rolls', 'Can use leader abilities']
  },
  ethereal: {
    canAttachTo: ['fire_warriors_strike', 'fire_warriors_breacher'],
    restrictions: ['Cannot attach to units that already have a leader'],
    bonuses: ['Unit gains Leader keyword', 'Aura abilities', 'Inspiring Presence']
  },
  cadre_fireblade: {
    canAttachTo: ['fire_warriors_strike', 'fire_warriors_breacher'],
    restrictions: ['Cannot attach to units that already have a leader'],
    bonuses: ['Unit gains Leader keyword', 'Volley Fire', 'Markerlight support']
  },
  // Kroot Character leaders
  kroot_flesh_shaper: {
    canAttachTo: ['kroot_carnivores'],
    restrictions: ['Cannot attach to units that already have a leader', 'Kroot units only'],
    bonuses: ['Unit gains Leader keyword', 'Battlefield surgery', 'Kroot leadership']
  },
  kroot_lone_spear: {
    canAttachTo: ['kroot_carnivores'],
    restrictions: ['Cannot attach to units that already have a leader', 'Kroot units only'],
    bonuses: ['Unit gains Leader keyword', 'Precision shots', 'Hunter instincts']
  },
  kroot_trail_shaper: {
    canAttachTo: ['kroot_carnivores'],
    restrictions: ['Cannot attach to units that already have a leader', 'Kroot units only'],
    bonuses: ['Unit gains Leader keyword', 'Stealth guidance', 'Tracking abilities']
  },
  kroot_war_shaper: {
    canAttachTo: ['kroot_carnivores'],
    restrictions: ['Cannot attach to units that already have a leader', 'Kroot units only'],
    bonuses: ['Unit gains Leader keyword', 'War chants', 'Combat bonuses']
  },
  // Named Characters
  commander_farsight: {
    canAttachTo: ['crisis_suits_sunforge', 'crisis_suits_starscythe', 'crisis_suits_fireknife'],
    restrictions: ['Cannot attach to units that already have a leader', 'Farsight Enclaves only'],
    bonuses: ['Unit gains Leader keyword', 'Inspiring Leader', 'Dawn Blade abilities']
  },
  commander_shadowsun: {
    canAttachTo: ['stealth_suits'],
    restrictions: ['Cannot attach to units that already have a leader', 'Cannot be used with Farsight Enclaves'],
    bonuses: ['Unit gains Leader keyword', 'Master of Stealth', 'Infiltration bonuses']
  }
};

export const tauUnits = {
  // HQ Units
  hq: [
    {
      id: 'commander_crisis',
      name: 'Commander in Crisis Battlesuit',
      points: 90,
      models: 1,
      keywords: ['Character', 'Battlesuit', 'Fly', 'Commander'],
      leaderAttachment: {
        canAttachTo: ['crisis_suits_sunforge', 'crisis_suits_starscythe', 'crisis_suits_fireknife'],
        bonuses: ['Leader abilities', 'Re-roll 1s to hit', 'Tactical coordination']
      },
      equipment: {
        base: ['Plasma rifle', 'Fusion blaster', 'Shield generator'],
        options: [
          { name: 'Burst cannon', cost: 0 },
          { name: 'Flamer', cost: 0 },
          { name: 'Missile pod', cost: 0 },
          { name: 'Airbursting fragmentation projector', cost: 0 },
          { name: 'Multi-tracker', cost: 0 },
          { name: 'Stimm injectors', cost: 0 }
        ]
      },
      loreRoles: ['elite_command', 'battlesuit_support', 'tactical_coordination'],
      competitiveLevel: 'medium',
      subfactionSynergy: {
        tau_empire: 'high',
        farsight_enclaves: 'very_high',
        bork_an: 'medium',
        vior_la: 'high',
        sacea: 'medium'
      }
    },
    {
      id: 'commander_enforcer',
      name: 'Commander in Enforcer Battlesuit',
      points: 110,
      models: 1,
      keywords: ['Character', 'Battlesuit', 'Fly', 'Commander'],
      leaderAttachment: {
        canAttachTo: ['crisis_suits_sunforge', 'crisis_suits_starscythe', 'crisis_suits_fireknife'],
        bonuses: ['Leader abilities', 'Re-roll 1s to hit', 'Defensive coordination']
      },
      equipment: {
        base: ['Plasma rifle', 'Missile pod', 'Shield generator'],
        options: [
          { name: 'Burst cannon', cost: 0 },
          { name: 'Fusion blaster', cost: 0 },
          { name: 'Flamer', cost: 0 },
          { name: 'Airbursting fragmentation projector', cost: 0 }
        ]
      },
      loreRoles: ['elite_command', 'fire_support', 'defensive_coordination'],
      competitiveLevel: 'high',
      subfactionSynergy: {
        tau_empire: 'very_high',
        farsight_enclaves: 'medium',
        bork_an: 'high',
        vior_la: 'medium',
        sacea: 'very_high'
      }
    },
    {
      id: 'ethereal',
      name: 'Ethereal',
      points: 65,
      models: 1,
      keywords: ['Character', 'Infantry', 'Ethereal'],
      leaderAttachment: {
        canAttachTo: ['fire_warriors_strike', 'fire_warriors_breacher'],
        bonuses: ['Leader abilities', 'Aura of leadership', 'Inspiring Presence']
      },
      equipment: {
        base: ['Honour blade', 'Hover drone'],
        options: []
      },
      loreRoles: ['spiritual_guidance', 'troop_support', 'leadership'],
      competitiveLevel: 'medium',
      subfactionSynergy: {
        tau_empire: 'very_high',
        farsight_enclaves: 'low',
        bork_an: 'high',
        vior_la: 'high',
        sacea: 'very_high'
      }
    },
    {
      id: 'cadre_fireblade',
      name: 'Cadre Fireblade',
      points: 55,
      models: 1,
      keywords: ['Character', 'Infantry', 'Fire Caste'],
      leaderAttachment: {
        canAttachTo: ['fire_warriors_strike', 'fire_warriors_breacher'],
        bonuses: ['Leader abilities', 'Volley Fire', 'Markerlight coordination']
      },
      equipment: {
        base: ['Pulse rifle', 'Markerlight'],
        options: [
          { name: 'Pulse pistol', cost: 0 }
        ]
      },
      loreRoles: ['fire_warrior_support', 'markerlight_coordination', 'tactical_leadership'],
      competitiveLevel: 'high',
      subfactionSynergy: {
        tau_empire: 'very_high',
        farsight_enclaves: 'medium',
        bork_an: 'very_high',
        vior_la: 'high',
        sacea: 'very_high'
      }
    },
    // KROOT CHARACTER LEADERS - These are HQ units that can embed with Kroot Carnivores
    {
      id: 'kroot_flesh_shaper',
      name: 'Kroot Flesh Shaper',
      points: 50,
      models: 1,
      keywords: ['Character', 'Infantry', 'Kroot', 'Flesh Shaper'],
      leaderAttachment: {
        canAttachTo: ['kroot_carnivores'],
        bonuses: ['Leader abilities', 'Battlefield surgery', 'Kroot unit coordination']
      },
      equipment: {
        base: ['Kroot rifle', 'Flesh shaper tools', 'Ritual blade']
      },
      loreRoles: ['kroot_leader', 'field_surgery', 'auxiliary_command'],
      competitiveLevel: 'medium',
      subfactionSynergy: {
        tau_empire: 'medium',
        farsight_enclaves: 'high',
        bork_an: 'low',
        vior_la: 'medium',
        sacea: 'medium'
      }
    },
    {
      id: 'kroot_lone_spear',
      name: 'Kroot Lone-Spear',
      points: 70,
      models: 1,
      keywords: ['Character', 'Infantry', 'Kroot', 'Lone-Spear'],
      leaderAttachment: {
        canAttachTo: ['kroot_carnivores'],
        bonuses: ['Leader abilities', 'Precision targeting', 'Hunter coordination']
      },
      equipment: {
        base: ['Kroot long gun', 'Hunting stave', 'Kroot blade']
      },
      loreRoles: ['kroot_sniper', 'lone_operative', 'hunter'],
      competitiveLevel: 'high',
      subfactionSynergy: {
        tau_empire: 'medium',
        farsight_enclaves: 'very_high',
        bork_an: 'medium',
        vior_la: 'high',
        sacea: 'medium'
      }
    },
    {
      id: 'kroot_trail_shaper',
      name: 'Kroot Trail Shaper',
      points: 60,
      models: 1,
      keywords: ['Character', 'Infantry', 'Kroot', 'Trail Shaper'],
      leaderAttachment: {
        canAttachTo: ['kroot_carnivores'],
        bonuses: ['Leader abilities', 'Stealth coordination', 'Infiltration guidance']
      },
      equipment: {
        base: ['Kroot rifle', 'Shaper kroot rifle', 'Ritual blade']
      },
      loreRoles: ['kroot_leader', 'tracker', 'stealth_specialist'],
      competitiveLevel: 'medium',
      subfactionSynergy: {
        tau_empire: 'high',
        farsight_enclaves: 'high',
        bork_an: 'medium',
        vior_la: 'very_high',
        sacea: 'high'
      }
    },
    {
      id: 'kroot_war_shaper',
      name: 'Kroot War Shaper',
      points: 65,
      models: 1,
      keywords: ['Character', 'Infantry', 'Kroot', 'War Shaper'],
      leaderAttachment: {
        canAttachTo: ['kroot_carnivores'],
        bonuses: ['Leader abilities', 'War chants', 'Close combat coordination']
      },
      equipment: {
        base: ['Kroot scattergun', 'Bladestaves', 'War shaper adornments']
      },
      loreRoles: ['kroot_leader', 'close_combat', 'war_chant'],
      competitiveLevel: 'high',
      subfactionSynergy: {
        tau_empire: 'medium',
        farsight_enclaves: 'very_high',
        bork_an: 'low',
        vior_la: 'medium',
        sacea: 'medium'
      }
    }
  ],

  // Troops
  troops: [
    {
      id: 'fire_warriors_strike',
      name: 'Strike Team',
      points: 85,
      models: 10,
      keywords: ['Infantry', 'Fire Warrior', 'Fire Caste'],
      equipment: {
        base: ['Pulse rifle'],
        options: [
          { name: 'Pulse pistol + close combat weapon', cost: 0 },
          { name: 'Markerlight (Shas\'ui)', cost: 0 },
          { name: 'Support turret', cost: 0 }
        ]
      },
      loreRoles: ['line_infantry', 'fire_support', 'objective_holding'],
      competitiveLevel: 'high',
      subfactionSynergy: {
        tau_empire: 'very_high',
        farsight_enclaves: 'medium',
        bork_an: 'very_high',
        vior_la: 'high',
        sacea: 'very_high'
      }
    },
    {
      id: 'fire_warriors_breacher',
      name: 'Breacher Team',
      points: 85,
      models: 10,
      keywords: ['Infantry', 'Fire Warrior', 'Fire Caste'],
      equipment: {
        base: ['Pulse blaster'],
        options: [
          { name: 'Pulse pistol + close combat weapon', cost: 0 },
          { name: 'Guardian drone', cost: 0 },
          { name: 'Gun drone x2', cost: 0 }
        ]
      },
      loreRoles: ['close_assault', 'urban_warfare', 'breaching_operations'],
      competitiveLevel: 'medium',
      subfactionSynergy: {
        tau_empire: 'high',
        farsight_enclaves: 'very_high',
        bork_an: 'low',
        vior_la: 'very_high',
        sacea: 'medium'
      }
    }
  ],

  // Elites
  elites: [
    {
      id: 'crisis_suits_sunforge',
      name: 'Crisis Battlesuits (Sunforge)',
      points: 160,
      models: 3,
      keywords: ['Battlesuit', 'Fly', 'Crisis'],
      equipment: {
        base: ['Fusion blaster x2', 'Shield generator'],
        options: [
          { name: 'Gun drone', cost: 0 },
          { name: 'Marker drone', cost: 0 },
          { name: 'Shield drone', cost: 0 }
        ]
      },
      loreRoles: ['elite_assault', 'anti_vehicle', 'tank_hunting'],
      competitiveLevel: 'high',
      subfactionSynergy: {
        tau_empire: 'very_high',
        farsight_enclaves: 'high',
        bork_an: 'very_high',
        vior_la: 'very_high',
        sacea: 'high'
      }
    },
    {
      id: 'crisis_suits_starscythe',
      name: 'Crisis Battlesuits (Starscythe)',
      points: 110,
      models: 3,
      keywords: ['Battlesuit', 'Fly', 'Crisis'],
      equipment: {
        base: ['Burst cannon', 'T\'au flamer', 'Battlesuit support system'],
        options: [
          { name: 'Replace burst cannon with T\'au flamer', cost: 0 },
          { name: 'Replace T\'au flamer with burst cannon', cost: 0 },
          { name: 'Gun drone', cost: 0 },
          { name: 'Marker drone', cost: 0 },
          { name: 'Shield drone', cost: 0 }
        ]
      },
      loreRoles: ['elite_assault', 'anti_infantry', 'close_range_fire_support'],
      competitiveLevel: 'very_high',
      subfactionSynergy: {
        tau_empire: 'very_high',
        farsight_enclaves: 'very_high',
        bork_an: 'high',
        vior_la: 'high',
        sacea: 'medium'
      }
    },
    {
      id: 'crisis_suits_fireknife',
      name: 'Crisis Battlesuits (Fireknife)',
      points: 115,
      models: 3,
      keywords: ['Battlesuit', 'Fly', 'Crisis'],
      equipment: {
        base: ['Missile pod', 'Plasma rifle', 'Weapon support system'],
        options: [
          { name: 'Replace missile pod with plasma rifle', cost: 0 },
          { name: 'Replace plasma rifle with missile pod', cost: 0 },
          { name: 'Gun drone', cost: 0 },
          { name: 'Marker drone', cost: 0 },
          { name: 'Shield drone', cost: 0 }
        ]
      },
      loreRoles: ['elite_assault', 'fire_support', 'versatile'],
      competitiveLevel: 'very_high',
      subfactionSynergy: {
        tau_empire: 'very_high',
        farsight_enclaves: 'very_high',
        bork_an: 'high',
        vior_la: 'very_high',
        sacea: 'high'
      }
    },
    {
      id: 'stealth_suits',
      name: 'Stealth Battlesuits',
      points: 70,
      models: 3,
      keywords: ['Battlesuit', 'Fly', 'Stealth', 'Infantry'],
      equipment: {
        base: ['Burst cannon', 'Markerlight'],
        options: [
          { name: 'Fusion blaster', cost: 0 },
          { name: 'Gun drone', cost: 0 }
        ]
      },
      loreRoles: ['reconnaissance', 'infiltration', 'markerlight_support'],
      competitiveLevel: 'high',
      subfactionSynergy: {
        tau_empire: 'high',
        farsight_enclaves: 'high',
        bork_an: 'medium',
        vior_la: 'very_high',
        sacea: 'high'
      }
    },
    {
      id: 'ghostkeel_battlesuit',
      name: 'Ghostkeel Battlesuit',
      points: 160,
      models: 1,
      keywords: ['Battlesuit', 'Fly', 'Ghostkeel', 'Stealth'],
      equipment: {
        base: ['Fusion collider', 'Twin burst cannon', 'Stealth drones x2'],
        options: [
          { name: 'Cyclic ion raker', cost: 0 },
          { name: 'Target lock', cost: 0 },
          { name: 'Advanced targeting system', cost: 0 },
          { name: 'Shield generator', cost: 0 }
        ]
      },
      loreRoles: ['stealth_assault', 'anti_armor', 'infiltration'],
      competitiveLevel: 'very_high',
      subfactionSynergy: {
        tau_empire: 'high',
        farsight_enclaves: 'very_high',
        bork_an: 'medium',
        vior_la: 'very_high',
        sacea: 'high'
      }
    },
    {
      id: 'riptide_battlesuit',
      name: 'Riptide Battlesuit',
      points: 190,
      models: 1,
      keywords: ['Battlesuit', 'Fly', 'Riptide', 'Vehicle', 'Walker'],
      equipment: {
        base: ['Heavy burst cannon', 'Twin plasma rifle', 'Riptide fists'],
        options: [
          { name: 'Ion accelerator (replaces heavy burst cannon)', cost: 0 },
          { name: 'Twin fusion blaster (replaces twin plasma rifle)', cost: 0 },
          { name: 'Twin smart missile system (replaces twin plasma rifle)', cost: 0 },
          { name: 'Missile drone', cost: 0 },
          { name: 'Missile drone x2', cost: 0 }
        ]
      },
      loreRoles: ['centerpiece', 'heavy_fire_support', 'anti_armor'],
      competitiveLevel: 'very_high',
      subfactionSynergy: {
        tau_empire: 'very_high',
        farsight_enclaves: 'high',
        bork_an: 'very_high',
        vior_la: 'high',
        sacea: 'very_high'
      }
    },
    {
      id: 'kroot_carnivores',
      name: 'Kroot Carnivores',
      points: 75,
      models: 10,
      keywords: ['Infantry', 'Kroot', 'Auxiliary'],
      equipment: {
        base: ['Kroot rifle', 'Kroot blade'],
        options: [
          { name: 'Kroot gun (1 per 10)', cost: 0 },
          { name: 'Kroot hound x3', cost: 0 }
        ]
      },
      loreRoles: ['auxiliary_infantry', 'scouts', 'melee_support'],
      competitiveLevel: 'medium',
      subfactionSynergy: {
        tau_empire: 'high',
        farsight_enclaves: 'very_high',
        bork_an: 'medium',
        vior_la: 'high',
        sacea: 'high'
      }
    },
    {
      id: 'kroot_hounds',
      name: 'Kroot Hounds',
      points: 30,
      models: 5,
      keywords: ['Beast', 'Kroot', 'Auxiliary'],
      equipment: {
        base: ['Ripping fangs']
      },
      abilities: [
        'Loping Pounce: This unit can declare a charge in a turn in which it Advanced',
        'Hunting Hounds: While this unit is within 6" of a friendly Kroot Character, models in this unit have an Objective Control characteristic of 1 instead of 0'
      ],
      loreRoles: ['fast_assault', 'scouts', 'harassment'],
      competitiveLevel: 'medium',
      subfactionSynergy: {
        tau_empire: 'medium',
        farsight_enclaves: 'high',
        bork_an: 'low',
        vior_la: 'high',
        sacea: 'medium'
      }
    },
    {
      id: 'pathfinders',
      name: 'Pathfinder Team',
      points: 90,
      models: 10,
      keywords: ['Infantry', 'Grenades', 'Markerlight'],
      equipment: {
        base: ['Pulse carbine', 'Pulse pistol', 'Close combat weapon'],
        options: [
          'Ion rifle (up to 3 models)',
          'Rail rifle (up to 3 models)',
          'Semi-automatic grenade launcher (1 model)',
          'Gun drone (up to 2)',
          'Marker drone (up to 2)', 
          'Shield drone (up to 2)'
        ]
      },
      // Shas'ui drone selection - choose one, no points cost
      droneSelection: {
        description: 'The Pathfinder Shas\'ui can be equipped with one of the following:',
        options: [
          {
            name: 'Recon Drone',
            effect: '+1 drone burst cannon, unit gains Infiltrators ability',
            keywords: ['Infiltrators']
          },
          {
            name: 'Grav-inhibitor Drone', 
            effect: 'Subtract 2 from Charge rolls against this unit',
            keywords: ['Charge Defense']
          },
          {
            name: 'Pulse Accelerator Drone',
            effect: 'Add 6" to Range of pulse carbines in this unit',
            keywords: ['Extended Range']
          }
        ]
      },
      abilities: [
        'Scouts 7"',
        'For the Greater Good',
        'Target Uploaded: Once per turn when using Greater Good, can select this unit as Observer twice'
      ],
      loreRoles: ['reconnaissance', 'support', 'markerlight'],
      competitiveLevel: 'high',
      subfactionSynergy: {
        tau_empire: 'very_high',
        farsight_enclaves: 'high', 
        bork_an: 'very_high',
        vior_la: 'very_high',
        sacea: 'very_high'
      }
    }
  ],

  // Fast Attack
  fastAttack: [
    {
      id: 'piranhas',
      name: 'Piranhas',
      points: 60,
      models: 1,
      keywords: ['Vehicle', 'Fly', 'Piranha'],
      equipment: {
        base: ['Burst cannon', 'Gun drone'],
        options: [
          { name: 'Fusion blaster', cost: 0 },
          { name: 'Seeker missiles x2', cost: 0 }
        ]
      },
      loreRoles: ['fast_attack', 'reconnaissance', 'harassment'],
      competitiveLevel: 'medium',
      subfactionSynergy: {
        tau_empire: 'high',
        farsight_enclaves: 'high',
        bork_an: 'medium',
        vior_la: 'very_high',
        sacea: 'medium'
      }
    },
    {
      id: 'vespid_stingwings',
      name: 'Vespid Stingwings',
      points: 65,
      models: 5,
      keywords: ['Infantry', 'Fly', 'Vespid', 'Auxiliary'],
      equipment: {
        base: ['Neutron blaster', 'Stingwing claws']
      },
      loreRoles: ['mobile_fire_support', 'auxiliary', 'aerial_assault'],
      competitiveLevel: 'medium',
      subfactionSynergy: {
        tau_empire: 'high',
        farsight_enclaves: 'medium',
        bork_an: 'very_high',
        vior_la: 'high',
        sacea: 'high'
      }
    },
    {
      id: 'krootox_rampagers',
      name: 'Krootox Rampagers',
      points: 80,
      models: 3,
      keywords: ['Beast', 'Kroot', 'Auxiliary', 'Krootox'],
      equipment: {
        base: ['Krootox fists', 'Kroot gun']
      },
      abilities: [
        'Berserk Rampage: Each time this unit makes a Charge move, until the end of the turn, melee weapons equipped by models in this unit have the [DEVASTATING WOUNDS] ability'
      ],
      loreRoles: ['assault', 'shock_troops', 'auxiliary'],
      competitiveLevel: 'high',
      subfactionSynergy: {
        tau_empire: 'medium',
        farsight_enclaves: 'very_high',
        bork_an: 'low',
        vior_la: 'medium',
        sacea: 'low'
      }
    },
    {
      id: 'krootox_riders',
      name: 'Krootox Riders',
      points: 115,
      models: 3,
      keywords: ['Beast', 'Kroot', 'Auxiliary', 'Krootox'],
      equipment: {
        base: ['Kroot gun', 'Krootox fists'],
        options: [
          { name: 'Kroot bolt-thrower (1 model)', cost: 0 }
        ]
      },
      abilities: [
        'Kroot Packmates: Each time an enemy unit targets a friendly Kroot unit within 6" of this unit with ranged attacks, this unit can shoot at that enemy unit as if it were your Shooting phase'
      ],
      loreRoles: ['fire_support', 'mobile_artillery', 'auxiliary'],
      competitiveLevel: 'high',
      subfactionSynergy: {
        tau_empire: 'high',
        farsight_enclaves: 'high',
        bork_an: 'medium',
        vior_la: 'high',
        sacea: 'medium'
      }
    }
  ],

  // Heavy Support
  heavySupport: [
    {
      id: 'hammerhead',
      name: 'Hammerhead Gunship',
      points: 160,
      models: 1,
      keywords: ['Vehicle', 'Fly', 'Hammerhead'],
      equipment: {
        base: ['Railgun', 'Gun drones x2'],
        options: [
          { name: 'Ion cannon', cost: 0 },
          { name: 'Burst cannon', cost: 0 },
          { name: 'Smart missile system', cost: 0 }
        ]
      },
      loreRoles: ['heavy_fire_support', 'anti_tank', 'long_range'],
      competitiveLevel: 'high',
      subfactionSynergy: {
        tau_empire: 'high',
        farsight_enclaves: 'medium',
        bork_an: 'very_high',
        vior_la: 'medium',
        sacea: 'very_high'
      }
    },
    {
      id: 'broadside_suits',
      name: 'Broadside Battlesuits',
      points: 95,
      models: 1,
      keywords: ['Battlesuit', 'Broadside'],
      equipment: {
        base: ['Heavy rail rifle', 'Smart missile system'],
        options: [
          { name: 'High-yield missile pod', cost: 0 },
          { name: 'Seeker missiles x2', cost: 0 },
          { name: 'Velocity tracker', cost: 0 }
        ]
      },
      loreRoles: ['heavy_fire_support', 'anti_armor', 'firebase'],
      competitiveLevel: 'high',
      subfactionSynergy: {
        tau_empire: 'high',
        farsight_enclaves: 'medium',
        bork_an: 'very_high',
        vior_la: 'medium',
        sacea: 'very_high'
      }
    },
    {
      id: 'stormsurge_battlesuit',
      name: 'Stormsurge Battlesuit',
      points: 400,
      models: 1,
      keywords: ['Battlesuit', 'Stormsurge', 'Titanic'],
      equipment: {
        base: ['Pulse blast cannon', 'Twin smart missile system', 'Twin burst cannon', 'Destroyer missiles'],
        options: [
          { name: 'Pulse driver cannon', cost: 0 },
          { name: 'Shield generator', cost: 0 },
          { name: 'Velocity tracker', cost: 0 },
          { name: 'Target lock', cost: 0 }
        ]
      },
      loreRoles: ['super_heavy', 'firebase', 'centerpiece'],
      competitiveLevel: 'very_high',
      subfactionSynergy: {
        tau_empire: 'very_high',
        farsight_enclaves: 'medium',
        bork_an: 'very_high',
        vior_la: 'medium',
        sacea: 'very_high'
      }
    },
    {
      id: 'taunar_supremacy_armour',
      name: 'Ta\'unar Supremacy Armour',
      points: 750,
      models: 1,
      keywords: ['Battlesuit', 'Ta\'unar', 'Titanic', 'Forge World'],
      equipment: {
        base: ['Tri-axis ion cannon', 'Fusion eradicator', 'Smart missile system x4', 'Twin burst cannon x2'],
        options: [
          { name: 'Pulse ordnance multi-driver', cost: 0 },
          { name: 'Nexus missile system', cost: 0 },
          { name: 'Shield generator', cost: 0 }
        ]
      },
      loreRoles: ['apocalypse', 'super_heavy', 'fortress_breaker'],
      competitiveLevel: 'legendary',
      subfactionSynergy: {
        tau_empire: 'very_high',
        farsight_enclaves: 'high',
        bork_an: 'very_high',
        vior_la: 'medium',
        sacea: 'very_high'
      }
    },
    {
      id: 'devilfish',
      name: 'Devilfish Transport',
      points: 90,
      models: 1,
      keywords: ['Vehicle', 'Fly', 'Transport', 'Devilfish'],
      equipment: {
        base: ['Burst cannon', 'Gun drone x2', 'Landing bay'],
        options: [
          { name: 'Smart missile system', cost: 0 },
          { name: 'Seeker missiles x2', cost: 0 }
        ]
      },
      loreRoles: ['transport', 'mobile_support', 'fire_support'],
      competitiveLevel: 'high',
      subfactionSynergy: {
        tau_empire: 'high',
        farsight_enclaves: 'high',
        bork_an: 'medium',
        vior_la: 'very_high',
        sacea: 'high'
      }
    }
  ],

  // Aircraft
  aircraft: [
    {
      id: 'sun_shark_bomber',
      name: 'Sun Shark Bomber',
      points: 160,
      models: 1,
      keywords: ['Vehicle', 'Aircraft', 'Fly', 'Sun Shark Bomber'],
      equipment: {
        base: ['Missile pod', 'Seeker missile x2', 'Twin ion rifle x2', 'Armoured hull'],
        options: [
          { name: 'Twin missile pod (replaces missile pod)', cost: 0 }
        ]
      },
      abilities: [
        'Deadly Demise D3',
        'Pulse Bombs: Each time this model ends a Normal move, you can select one enemy unit it moved over during that move and roll six D6: for each 4+, that unit suffers 1 mortal wound'
      ],
      loreRoles: ['bomber', 'ground_attack', 'air_support'],
      competitiveLevel: 'high',
      subfactionSynergy: {
        tau_empire: 'high',
        farsight_enclaves: 'medium',
        bork_an: 'very_high',
        vior_la: 'high',
        sacea: 'very_high'
      }
    },
    {
      id: 'razorshark_strike_fighter',
      name: 'Razorshark Strike Fighter',
      points: 150,
      models: 1,
      keywords: ['Vehicle', 'Aircraft', 'Fly', 'Razorshark'],
      equipment: {
        base: ['Quad ion turret', 'Accelerator burst cannon', 'Seeker missile x2'],
        options: [
          { name: 'Missile pod (replaces accelerator burst cannon)', cost: 0 }
        ]
      },
      abilities: [
        'Deadly Demise D3',
        'Interceptor: Each time this model makes a ranged attack that targets a unit that can FLY, add 1 to the Hit roll'
      ],
      loreRoles: ['interceptor', 'air_superiority', 'anti_aircraft'],
      competitiveLevel: 'high',
      subfactionSynergy: {
        tau_empire: 'high',
        farsight_enclaves: 'high',
        bork_an: 'very_high',
        vior_la: 'high',
        sacea: 'very_high'
      }
    }
  ],

  // Auxiliary Forces (Extended)
  auxiliaryForces: [
    {
      id: 'kroot_great_knarloc',
      name: 'Great Knarloc',
      points: 75,
      models: 1,
      keywords: ['Monster', 'Great Knarloc', 'Kroot'],
      equipment: {
        base: ['Great Knarloc beak', 'Kroot gun', 'Razor-sharp claws'],
        options: [
          { name: 'Kroot bolt thrower', cost: 0 },
          { name: 'Kroot hunting rifle', cost: 0 }
        ]
      },
      abilities: [
        'Deadly Demise 1',
        'Beast Pack: This unit can move through models and terrain as if they were not there'
      ],
      loreRoles: ['monster', 'kroot_heavy_support', 'beast_cavalry'],
      competitiveLevel: 'medium',
      subfactionSynergy: {
        tau_empire: 'high',
        farsight_enclaves: 'medium',
        bork_an: 'high',
        vior_la: 'medium',
        sacea: 'high'
      }
    },
    {
      id: 'vespid_stingwings_heavy',
      name: 'Vespid Stingwings (Heavy Support)',
      points: 90,
      models: 8,
      keywords: ['Infantry', 'Fly', 'Vespid', 'Stingwings'],
      equipment: {
        base: ['Neutron blaster', 'Strain leader neutron blaster'],
        options: []
      },
      abilities: [
        'Deep Strike',
        'Shredding Burst: Each time this unit makes a ranged attack, improve the Armour Penetration characteristic of that attack by 1'
      ],
      loreRoles: ['deep_strike', 'anti_armor', 'mobile_support'],
      competitiveLevel: 'medium',
      subfactionSynergy: {
        tau_empire: 'medium',
        farsight_enclaves: 'low',
        bork_an: 'high',
        vior_la: 'medium',
        sacea: 'high'
      }
    },
    {
      id: 'gue_vesa_auxiliaries',
      name: 'Gue\'vesa Auxiliaries',
      points: 65,
      models: 10,
      keywords: ['Infantry', 'Gue\'vesa', 'Auxiliary'],
      equipment: {
        base: ['Pulse rifle', 'Pulse pistol', 'Grenades'],
        options: [
          { name: 'Ion rifle', cost: 0 },
          { name: 'Rail rifle', cost: 0 }
        ]
      },
      abilities: [
        'For the Greater Good',
        'Human Adaptability: This unit can be deployed in any terrain without penalty'
      ],
      loreRoles: ['troops', 'auxiliary_support', 'versatile_infantry'],
      competitiveLevel: 'low',
      subfactionSynergy: {
        tau_empire: 'medium',
        farsight_enclaves: 'high',
        bork_an: 'medium',
        vior_la: 'medium',
        sacea: 'medium'
      }
    }
  ],

  // Named Characters
  namedCharacters: [
    {
      id: 'commander_farsight',
      name: 'Commander Farsight',
      points: 130,
      models: 1,
      keywords: ['Character', 'Battlesuit', 'Fly', 'Commander', 'Epic Hero'],
      leaderAttachment: {
        canAttachTo: ['crisis_suits_sunforge', 'crisis_suits_starscythe', 'crisis_suits_fireknife'],
        bonuses: ['Leader abilities', 'Inspiring Leader', 'Dawn Blade combat bonuses']
      },
      equipment: {
        base: ['Dawn blade', 'High-intensity plasma rifle', 'Shield generator'],
        options: []
      },
      loreRoles: ['legendary_leader', 'close_combat', 'battlesuit_command'],
      competitiveLevel: 'very_high',
      subfactionSynergy: {
        tau_empire: 'none',
        farsight_enclaves: 'very_high',
        bork_an: 'none',
        vior_la: 'none',
        sacea: 'none'
      },
      restrictions: ['farsight_enclaves_only']
    },
    {
      id: 'commander_shadowsun',
      name: 'Commander Shadowsun',
      points: 120,
      models: 1,
      keywords: ['Character', 'Battlesuit', 'Fly', 'Commander', 'Epic Hero'],
      leaderAttachment: {
        canAttachTo: ['stealth_suits'],
        bonuses: ['Leader abilities', 'Master of Stealth', 'Infiltration coordination']
      },
      equipment: {
        base: ['Flechette launcher', 'High-energy fusion blaster', 'Light missile pod'],
        options: []
      },
      loreRoles: ['stealth_command', 'infiltration', 'tactical_genius'],
      competitiveLevel: 'very_high',
      subfactionSynergy: {
        tau_empire: 'very_high',
        farsight_enclaves: 'none',
        bork_an: 'high',
        vior_la: 'very_high',
        sacea: 'high'
      },
      restrictions: ['not_farsight_enclaves']
    }
  ]
};

// Scenario-based unit priorities
export const scenarioModifiers = {
  defensive: {
    prioritize: ['fire_warriors_strike', 'broadside_suits', 'hammerhead', 'pathfinders'],
    avoid: ['fire_warriors_breacher', 'piranhas'],
    characterPreference: ['cadre_fireblade', 'ethereal']
  },
  assault: {
    prioritize: ['crisis_suits', 'fire_warriors_breacher', 'stealth_suits', 'piranhas'],
    avoid: ['broadside_suits'],
    characterPreference: ['commander_crisis', 'commander_farsight']
  },
  siege: {
    prioritize: ['crisis_suits', 'fire_warriors_breacher', 'hammerhead'],
    avoid: ['pathfinder_drones'],
    characterPreference: ['commander_crisis', 'commander_enforcer']
  },
  excavation: {
    prioritize: ['pathfinders', 'stealth_suits', 'crisis_suits', 'piranhas'],
    avoid: ['hammerhead'],
    characterPreference: ['cadre_fireblade', 'commander_shadowsun']
  },
  research: {
    prioritize: ['fire_warriors_strike', 'pathfinders', 'stealth_suits'],
    avoid: ['fire_warriors_breacher'],
    characterPreference: ['ethereal', 'cadre_fireblade']
  },
  general: {
    prioritize: ['crisis_suits', 'fire_warriors_strike', 'pathfinders'],
    avoid: [],
    characterPreference: ['commander_crisis', 'cadre_fireblade']
  }
};

// Difficulty scaling
export const difficultyModifiers = {
  easy: {
    namedCharacters: false,
    optimizedLoadouts: false,
    maxSynergy: false,
    preferBasicUnits: true
  },
  medium: {
    namedCharacters: false,
    optimizedLoadouts: true,
    maxSynergy: false,
    preferBasicUnits: false
  },
  hard: {
    namedCharacters: true,
    optimizedLoadouts: true,
    maxSynergy: true,
    preferBasicUnits: false
  },
  extreme: {
    namedCharacters: true,
    optimizedLoadouts: true,
    maxSynergy: true,
    preferBasicUnits: false,
    competitiveOnly: true
  }
}; 