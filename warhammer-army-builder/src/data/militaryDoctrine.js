// Real-world military doctrine patterns adapted for T'au Empire
// Based on modern combined arms doctrine and force structures

export const militaryDoctrine = {
  // Standard combined arms ratios (percentages of total force points)
  standardComposition: {
    command: { min: 8, max: 15 },        // HQ and command elements
    infantry: { min: 35, max: 55 },      // Core infantry forces
    armor: { min: 15, max: 35 },         // Vehicles and heavy units
    support: { min: 10, max: 25 },       // Artillery, recon, specialists
    fastAttack: { min: 5, max: 15 },     // Mobile assault forces
    reserves: { min: 5, max: 10 }        // Additional flexibility (reduced to accommodate fastAttack)
  },

  // Scenario-specific doctrine adaptations
  scenarioDoctrine: {
    defensive: {
      name: "Defensive Operations",
      description: "Static defense with heavy weapons and prepared positions",
      composition: {
        command: { min: 8, max: 12 },
        infantry: { min: 45, max: 60 },   // More infantry for holding ground
        armor: { min: 20, max: 35 },      // Heavy weapons platforms
        support: { min: 15, max: 25 },    // Fire support and recon
        fastAttack: { min: 2, max: 8 },   // Limited mobile reserves
        reserves: { min: 5, max: 10 }
      },
      priorityRoles: ['firebase', 'defensive_coordination', 'heavy_fire_support'],
      realWorldAnalog: "Defensive operations emphasize static firepower and prepared positions"
    },

    assault: {
      name: "Offensive Operations", 
      description: "Mobile assault with combined arms coordination",
      composition: {
        command: { min: 10, max: 15 },    // More command for coordination
        infantry: { min: 30, max: 45 },   // Mobile infantry
        armor: { min: 25, max: 40 },      // Assault vehicles and battlesuits
        support: { min: 15, max: 25 },    // Close support
        fastAttack: { min: 10, max: 20 }, // High mobile assault component
        reserves: { min: 5, max: 10 }
      },
      priorityRoles: ['elite_assault', 'fast_attack', 'close_combat'],
      realWorldAnalog: "Combined arms assault with armor-infantry cooperation"
    },

    siege: {
      name: "Urban/Siege Warfare",
      description: "Close-quarters operations with specialized equipment",
      composition: {
        command: { min: 12, max: 18 },    // Complex urban operations need more command
        infantry: { min: 40, max: 55 },   // Infantry-heavy for urban terrain
        armor: { min: 15, max: 30 },      // Limited heavy vehicles in urban areas
        support: { min: 20, max: 30 },    // Engineers, specialists
        fastAttack: { min: 5, max: 12 },  // Limited mobility in urban areas
        reserves: { min: 3, max: 8 }
      },
      priorityRoles: ['urban_warfare', 'breaching_operations', 'close_assault'],
      realWorldAnalog: "Urban warfare requires specialized infantry and engineer support"
    },

    reconnaissance: {
      name: "Reconnaissance in Force",
      description: "Mobile reconnaissance with fighting capability", 
      composition: {
        command: { min: 8, max: 12 },
        infantry: { min: 25, max: 40 },   // Light, mobile infantry
        armor: { min: 15, max: 30 },      // Fast vehicles (reduced for mobility)
        support: { min: 30, max: 45 },    // Heavy on recon and support
        fastAttack: { min: 15, max: 25 }, // High mobility component
        reserves: { min: 5, max: 10 }
      },
      priorityRoles: ['reconnaissance', 'markerlight_support', 'fast_attack'],
      realWorldAnalog: "Reconnaissance forces balance mobility with fighting power"
    },

    research: {
      name: "Security Operations",
      description: "Protecting assets with balanced security force",
      composition: {
        command: { min: 10, max: 15 },
        infantry: { min: 40, max: 55 },   // Security teams
        armor: { min: 15, max: 25 },      // Quick reaction force
        support: { min: 20, max: 30 },    // Sensors, communications
        fastAttack: { min: 5, max: 15 },  // Mobile response teams
        reserves: { min: 5, max: 10 }
      },
      priorityRoles: ['objective_holding', 'defensive_coordination', 'markerlight_support'],
      realWorldAnalog: "Security operations require balanced, responsive forces"
    }
  },

  // Command span of control (realistic command ratios)
  commandStructure: {
    // Points ratio of commanders to total force
    minCommandRatio: 0.08,  // 8% minimum for command elements
    maxCommandRatio: 0.18,  // 18% maximum (more for complex operations)
    
    // Troop units per command element (realistic span of control)
    troopsPerCommander: { min: 2, max: 6 },
    
    // Named characters represent senior leadership
    namedCharacterThreshold: 1500 // Only in major operations (1500+ points)
  },

  // Support element ratios (based on real military tooth-to-tail ratios)
  supportElements: {
    // Minimum support for sustainable operations
    minReconElements: 1,        // Always need some reconnaissance
    maxReconPercentage: 0.25,   // Max 25% recon elements
    
    // Fire support ratios
    fireSupportRatio: 0.15,     // ~15% fire support is optimal
    maxFireSupport: 0.30,       // Maximum 30% fire support
    
    // Logistics and support (represented by drones and support units)
    supportRatio: { min: 0.10, max: 0.20 }
  },

  // Real-world force multiplication principles
  forceMultipliers: {
    // Combined arms bonuses (when multiple types work together)
    combinedArms: {
      infantryArmorSynergy: 1.2,    // 20% bonus when infantry + armor
      fireSupportSynergy: 1.15,     // 15% bonus with proper fire support
      commandControlSynergy: 1.1    // 10% bonus with good command structure
    },
    
    // Specialization penalties (over-specialization is bad)
    specializationPenalty: {
      tooMuchArmor: 0.9,           // Penalty if >50% armor
      tooMuchInfantry: 0.95,       // Penalty if >70% infantry
      lackOfSupport: 0.85          // Major penalty if <10% support
    }
  }
};

// Map T'au units to military roles
export const tauMilitaryRoles = {
  // Command Elements - HQ units and named characters
  command: {
    units: ['commander_crisis', 'commander_enforcer', 'ethereal', 'cadre_fireblade', 'kroot_flesh_shaper', 'kroot_lone_spear', 'kroot_trail_shaper', 'kroot_war_shaper', 'commander_farsight', 'commander_shadowsun'],
    realWorldRole: 'Battalion/Company command elements and auxiliary leaders',
    description: 'Leadership units that provide command and control capabilities'
  },

  // Infantry Forces - Core infantry and auxiliary troops
  infantry: {
    units: ['fire_warriors_strike', 'fire_warriors_breacher', 'kroot_carnivores', 'kroot_hounds', 'vespid_stingwings', 'gue_vesa_auxiliaries'],
    realWorldRole: 'Rifle companies, specialized infantry, and auxiliary troops',
    description: 'Main battle line infantry and close combat specialists'
  },

  // Armor/Mechanized - Heavy battlesuits, vehicles, and centerpiece units
  armor: {
    units: ['crisis_suits_sunforge', 'crisis_suits_starscythe', 'crisis_suits_fireknife', 'ghostkeel_battlesuit', 'riptide_battlesuit', 'broadside_suits', 'hammerhead', 'stormsurge_battlesuit', 'taunar_supremacy_armour'],
    realWorldRole: 'Armored fighting vehicles, heavy weapons platforms, and main battle tanks',
    description: 'Heavy assault units and primary firepower platforms'
  },

  // Support Elements - Reconnaissance, transport, specialists, and mobile support
  support: {
    units: ['pathfinders', 'stealth_suits', 'devilfish', 'piranhas', 'krootox_riders', 'sun_shark_bomber', 'razorshark_strike_fighter'],
    realWorldRole: 'Artillery, reconnaissance, transport, and specialized support',
    description: 'Reconnaissance, transport, and fire support elements'
  },

  // Fast Attack - Mobile strike forces and assault units
  fastAttack: {
    units: ['vespid_stingwings_heavy', 'krootox_rampagers', 'kroot_great_knarloc'],
    realWorldRole: 'Mobile assault forces and shock troops',
    description: 'Fast-moving assault units and breakthrough forces'
  }
};

// Difficulty scaling affects realism vs optimization
export const realismScaling = {
  easy: {
    adhereToDoctrine: 0.7,      // 70% adherence to real doctrine
    allowSuboptimal: true,       // Allow less optimal but more realistic choices
    description: "Realistic but flexible force composition"
  },
  
  medium: {
    adhereToDoctrine: 0.85,     // 85% adherence
    allowSuboptimal: false,      // Optimize within realistic bounds
    description: "Balanced realism and effectiveness"
  },
  
  hard: {
    adhereToDoctrine: 0.95,     // 95% adherence to doctrine
    allowSuboptimal: false,      // Highly optimized realistic forces
    description: "Doctrinally sound and highly effective"
  },
  
  extreme: {
    adhereToDoctrine: 1.0,      // 100% adherence
    allowSuboptimal: false,      // Perfect combined arms doctrine
    description: "Textbook combined arms operations"
  }
};

export default militaryDoctrine; 