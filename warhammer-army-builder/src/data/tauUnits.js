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

export const tauUnits = {
  // HQ Units
  hq: [
    {
      id: 'commander_crisis',
      name: 'Commander in Crisis Battlesuit',
      points: 90,
      models: 1,
      keywords: ['Character', 'Battlesuit', 'Fly', 'Commander'],
      equipment: {
        base: ['Plasma rifle', 'Fusion blaster', 'Shield generator'],
        options: [
          { name: 'Burst cannon', cost: 0 },
          { name: 'Cyclic ion blaster', cost: 5 },
          { name: 'Flamer', cost: 0 },
          { name: 'Missile pod', cost: 10 },
          { name: 'Multi-tracker', cost: 5 },
          { name: 'Stimm injectors', cost: 10 }
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
      equipment: {
        base: ['Plasma rifle', 'Missile pod', 'Shield generator'],
        options: [
          { name: 'Burst cannon', cost: 0 },
          { name: 'Cyclic ion blaster', cost: 5 },
          { name: 'Fusion blaster', cost: 5 },
          { name: 'Airbursting fragmentation projector', cost: 10 }
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
          { name: 'Markerlight (Shas\'ui)', cost: 5 },
          { name: 'Support turret', cost: 15 }
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
          { name: 'Guardian drone', cost: 10 },
          { name: 'Gun drone x2', cost: 15 }
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
      points: 110,
      models: 3,
      keywords: ['Battlesuit', 'Fly', 'Crisis'],
      equipment: {
        base: ['Burst cannon', 'Plasma rifle', 'Multi-tracker'],
        options: []
      },
      loreRoles: ['elite_assault', 'anti_infantry', 'mobile_fire_support'],
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
      points: 120,
      models: 3,
      keywords: ['Battlesuit', 'Fly', 'Crisis'],
      equipment: {
        base: ['Cyclic ion blaster', 'Missile pod', 'Target lock'],
        options: []
      },
      loreRoles: ['elite_assault', 'fire_support', 'long_range'],
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
        base: ['Plasma rifle', 'Missile pod', 'Multi-tracker'],
        options: []
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
          { name: 'Fusion blaster', cost: 5 },
          { name: 'Gun drone', cost: 10 }
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
          { name: 'Fusion blaster', cost: 10 },
          { name: 'Seeker missiles x2', cost: 10 }
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
          { name: 'Ion cannon', cost: -10 },
          { name: 'Burst cannon', cost: 0 },
          { name: 'Smart missile system', cost: 15 }
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
          { name: 'High-yield missile pod', cost: 5 },
          { name: 'Seeker missiles x2', cost: 10 },
          { name: 'Velocity tracker', cost: 5 }
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