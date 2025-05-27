// T'au Empire Wargear Selection System for 10th Edition Warhammer 40,000
// Intelligently selects equipment based on scenario, unit role, and tactical considerations
// Note: In 10th Edition, all wargear options are free

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

export const wargearSelectionRules = {
  // Fire Warriors Strike Team
  fire_warriors_strike: {
    scenarios: {
      defensive: {
        shasui: 'markerlight', // Shas'ui gets markerlight for target designation
        supportTurret: 0.8, // 80% chance to take support turret in defensive scenarios
        specialWeapons: []
      },
      assault: {
        shasui: 'pulse_pistol_ccw', // Close combat weapon for assault
        supportTurret: 0.3, // Less likely to take static turret in assault
        specialWeapons: []
      },
      siege: {
        shasui: 'markerlight',
        supportTurret: 0.6,
        specialWeapons: []
      },
      reconnaissance: {
        shasui: 'markerlight',
        supportTurret: 0.2, // Mobile operations don't want static weapons
        specialWeapons: []
      },
      research: {
        shasui: 'markerlight',
        supportTurret: 0.7, // Security operations benefit from heavy weapons
        specialWeapons: []
      }
    }
  },

  // Fire Warriors Breacher Team  
  fire_warriors_breacher: {
    scenarios: {
      defensive: {
        drones: ['guardian_drone'], // Guardian drone for survivability
        shasui: 'pulse_pistol_ccw',
        droneChance: 0.6
      },
      assault: {
        drones: ['gun_drone', 'gun_drone'], // Gun drones for fire support
        shasui: 'pulse_pistol_ccw',
        droneChance: 0.8
      },
      siege: {
        drones: ['guardian_drone'], // Survivability in urban warfare
        shasui: 'pulse_pistol_ccw',
        droneChance: 0.9
      },
      reconnaissance: {
        drones: ['gun_drone'], // Light support
        shasui: 'pulse_pistol_ccw',
        droneChance: 0.4
      },
      research: {
        drones: ['guardian_drone'],
        shasui: 'pulse_pistol_ccw', 
        droneChance: 0.6
      }
    }
  },

  // Pathfinder Team
  pathfinders: {
    scenarios: {
      defensive: {
        specialWeapons: {
          rail_rifle: 2, // 2 rail rifles for anti-armor
          ion_rifle: 1,  // 1 ion rifle for versatility
          grenade_launcher: 1
        },
        drones: ['marker_drone', 'shield_drone'],
        shasui_drone: 'pulse_accelerator', // Extended range for defensive positions
        droneCount: 2
      },
      assault: {
        specialWeapons: {
          ion_rifle: 2, // Ion rifles better for mobile warfare
          rail_rifle: 1,
          grenade_launcher: 1
        },
        drones: ['gun_drone', 'marker_drone'],
        shasui_drone: 'recon', // Infiltrators for assault ops
        droneCount: 2
      },
      siege: {
        specialWeapons: {
          ion_rifle: 2,
          rail_rifle: 1,
          grenade_launcher: 1
        },
        drones: ['shield_drone', 'marker_drone'],
        shasui_drone: 'grav_inhibitor', // Area denial in urban warfare
        droneCount: 2
      },
      reconnaissance: {
        specialWeapons: {
          ion_rifle: 1, // Light equipment for mobility
          rail_rifle: 1
        },
        drones: ['marker_drone'],
        shasui_drone: 'recon', // Infiltrators for recon
        droneCount: 1
      },
      research: {
        specialWeapons: {
          rail_rifle: 2,
          ion_rifle: 1,
          grenade_launcher: 1
        },
        drones: ['marker_drone', 'shield_drone'],
        shasui_drone: 'pulse_accelerator',
        droneCount: 2
      }
    }
  },

  // Stealth Battlesuits
  stealth_suits: {
    scenarios: {
      defensive: {
        specialWeapons: 0.3, // 30% chance for fusion blaster
        weaponType: 'fusion_blaster',
        drones: 0.4, // 40% chance for gun drone
        droneType: 'gun_drone'
      },
      assault: {
        specialWeapons: 0.6, // Higher chance for anti-armor in assault
        weaponType: 'fusion_blaster',
        drones: 0.6,
        droneType: 'gun_drone'
      },
      siege: {
        specialWeapons: 0.8, // Urban warfare needs anti-armor
        weaponType: 'fusion_blaster', 
        drones: 0.5,
        droneType: 'gun_drone'
      },
      reconnaissance: {
        specialWeapons: 0.2, // Light equipment for stealth
        weaponType: 'fusion_blaster',
        drones: 0.3,
        droneType: 'gun_drone'
      },
      research: {
        specialWeapons: 0.4,
        weaponType: 'fusion_blaster',
        drones: 0.5,
        droneType: 'gun_drone'
      }
    }
  },

  // Heavy Support units
  hammerhead: {
    scenarios: {
      defensive: {
        mainWeapon: 'railgun', // Long range anti-armor
        secondaryWeapon: 'smart_missile_system', // All-round capability
        weaponChance: 0.7
      },
      assault: {
        mainWeapon: 'railgun', // Breakthrough capability
        secondaryWeapon: 'accelerator_burst_cannon', // Infantry support
        weaponChance: 0.6
      },
      siege: {
        mainWeapon: 'ion_cannon', // Better for urban warfare
        secondaryWeapon: 'smart_missile_system',
        weaponChance: 0.8
      },
      reconnaissance: {
        mainWeapon: 'railgun',
        secondaryWeapon: 'accelerator_burst_cannon',
        weaponChance: 0.4
      },
      research: {
        mainWeapon: 'railgun',
        secondaryWeapon: 'smart_missile_system',
        weaponChance: 0.6
      }
    }
  },

  broadside_suits: {
    scenarios: {
      defensive: {
        mainWeapon: 'heavy_rail_rifle', // Long range precision
        missiles: 'seeker_missiles', // Additional anti-armor
        support: 'velocity_tracker', // Anti-air capability
        upgradeChance: 0.8
      },
      assault: {
        mainWeapon: 'high_yield_missile_pod', // Area effect
        missiles: 'seeker_missiles',
        support: 'velocity_tracker',
        upgradeChance: 0.6
      },
      siege: {
        mainWeapon: 'high_yield_missile_pod', // Building clearing
        missiles: 'seeker_missiles',
        support: 'velocity_tracker',
        upgradeChance: 0.9
      },
      reconnaissance: {
        mainWeapon: 'heavy_rail_rifle',
        missiles: null,
        support: 'velocity_tracker',
        upgradeChance: 0.3
      },
      research: {
        mainWeapon: 'heavy_rail_rifle',
        missiles: 'seeker_missiles',
        support: 'velocity_tracker',
        upgradeChance: 0.7
      }
    }
  },

  // Fast Attack
  piranhas: {
    scenarios: {
      defensive: {
        mainWeapon: 'burst_cannon', // Standard equipment
        upgrade: null,
        upgradeChance: 0.2
      },
      assault: {
        mainWeapon: 'fusion_blaster', // Anti-armor punch
        upgrade: 'seeker_missiles',
        upgradeChance: 0.7
      },
      siege: {
        mainWeapon: 'fusion_blaster',
        upgrade: 'seeker_missiles',
        upgradeChance: 0.8
      },
      reconnaissance: {
        mainWeapon: 'burst_cannon', // Light and fast
        upgrade: null,
        upgradeChance: 0.1
      },
      research: {
        mainWeapon: 'burst_cannon',
        upgrade: null,
        upgradeChance: 0.3
      }
    }
  },

  // Riptide Battlesuit
  riptide_battlesuit: {
    scenarios: {
      defensive: {
        mainWeapon: 'ion_accelerator',
        secondaryWeapon: 'twin_fusion_blaster',
        weaponChance: 0.8
      },
      assault: {
        mainWeapon: 'heavy_burst_cannon',
        secondaryWeapon: 'twin_plasma_rifle', 
        weaponChance: 0.7
      },
      siege: {
        mainWeapon: 'amplified_ion_accelerator',
        secondaryWeapon: 'twin_fusion_blaster',
        weaponChance: 0.9
      },
      reconnaissance: {
        mainWeapon: 'ion_accelerator',
        secondaryWeapon: 'twin_plasma_rifle',
        weaponChance: 0.6
      }
    },
    difficulty: {
      easy: { weaponChance: 0.5 },
      normal: { weaponChance: 0.7 },
      hard: { weaponChance: 0.9 }
    }
  },

  // Ghostkeel Battlesuit
  ghostkeel_battlesuit: {
    scenarios: {
      defensive: {
        mainWeapon: 'fusion_collider',
        secondaryWeapon: 'shield_generator',
        weaponChance: 0.7
      },
      assault: {
        mainWeapon: 'cyclic_ion_raker',
        secondaryWeapon: 'advanced_targeting_system',
        weaponChance: 0.8
      },
      siege: {
        mainWeapon: 'fusion_collider',
        secondaryWeapon: 'advanced_targeting_system',
        weaponChance: 0.9
      },
      reconnaissance: {
        mainWeapon: 'cyclic_ion_raker',
        secondaryWeapon: 'target_lock',
        weaponChance: 0.6
      }
    },
    difficulty: {
      easy: { weaponChance: 0.4 },
      normal: { weaponChance: 0.7 },
      hard: { weaponChance: 0.9 }
    }
  },

  // Stormsurge Battlesuit
  stormsurge_battlesuit: {
    scenarios: {
      defensive: {
        mainWeapon: 'pulse_blast_cannon',
        secondaryWeapon: 'shield_generator',
        weaponChance: 0.9
      },
      assault: {
        mainWeapon: 'pulse_driver_cannon',
        secondaryWeapon: 'velocity_tracker',
        weaponChance: 0.8
      },
      siege: {
        mainWeapon: 'pulse_blast_cannon',
        secondaryWeapon: 'target_lock',
        weaponChance: 0.9
      },
      reconnaissance: {
        mainWeapon: 'pulse_driver_cannon',
        secondaryWeapon: 'velocity_tracker',
        weaponChance: 0.7
      }
    },
    difficulty: {
      easy: { weaponChance: 0.3 },
      normal: { weaponChance: 0.6 },
      hard: { weaponChance: 0.9 }
    }
  },

  // Ta'unar Supremacy Armour
  taunar_supremacy_armour: {
    scenarios: {
      defensive: {
        mainWeapon: 'tri_axis_ion_cannon',
        secondaryWeapon: 'shield_generator',
        weaponChance: 0.9
      },
      assault: {
        mainWeapon: 'pulse_ordnance_multi_driver',
        secondaryWeapon: 'nexus_missile_system',
        weaponChance: 0.8
      },
      siege: {
        mainWeapon: 'pulse_ordnance_multi_driver',
        secondaryWeapon: 'nexus_missile_system',
        weaponChance: 0.9
      },
      reconnaissance: {
        mainWeapon: 'tri_axis_ion_cannon',
        secondaryWeapon: 'shield_generator',
        weaponChance: 0.6
      }
    },
    difficulty: {
      easy: { weaponChance: 0.1 },
      normal: { weaponChance: 0.3 },
      hard: { weaponChance: 0.7 }
    }
  },

  // Kroot Units
  kroot_carnivores: {
    scenarios: {
      defensive: {
        mainWeapon: 'kroot_rifle',
        secondaryWeapon: 'kroot_hound',
        weaponChance: 0.6
      },
      assault: {
        mainWeapon: 'kroot_rifle',
        secondaryWeapon: 'kroot_gun',
        weaponChance: 0.7
      },
      siege: {
        mainWeapon: 'kroot_rifle',
        secondaryWeapon: 'kroot_gun',
        weaponChance: 0.8
      },
      reconnaissance: {
        mainWeapon: 'kroot_rifle',
        secondaryWeapon: 'kroot_hound',
        weaponChance: 0.9
      }
    },
    difficulty: {
      easy: { weaponChance: 0.3 },
      normal: { weaponChance: 0.5 },
      hard: { weaponChance: 0.7 }
    }
  },

  // Vespid Stingwings
  vespid_stingwings: {
    scenarios: {
      defensive: {
        mainWeapon: 'neutron_blaster',
        weaponChance: 0.5
      },
      assault: {
        mainWeapon: 'neutron_blaster',
        weaponChance: 0.8
      },
      siege: {
        mainWeapon: 'neutron_blaster',
        weaponChance: 0.7
      },
      reconnaissance: {
        mainWeapon: 'neutron_blaster',
        weaponChance: 0.9
      }
    },
    difficulty: {
      easy: { weaponChance: 0.4 },
      normal: { weaponChance: 0.6 },
      hard: { weaponChance: 0.8 }
    }
  },

  // SPACE MARINE UNITS

  // Dreadnought
  dreadnought: {
    scenarios: {
      defensive: {
        mainWeapon: 'twin_lascannon',
        secondaryWeapon: 'missile_launcher',
        weaponChance: 0.8
      },
      assault: {
        mainWeapon: 'assault_cannon',
        secondaryWeapon: 'heavy_flamer',
        weaponChance: 0.7
      },
      siege: {
        mainWeapon: 'plasma_cannon',
        secondaryWeapon: 'missile_launcher',
        weaponChance: 0.8
      },
      reconnaissance: {
        mainWeapon: 'assault_cannon',
        secondaryWeapon: 'heavy_flamer',
        weaponChance: 0.6
      }
    },
    difficulty: {
      easy: { weaponChance: 0.5 },
      normal: { weaponChance: 0.7 },
      hard: { weaponChance: 0.9 }
    }
  },

  // Redemptor Dreadnought
  redemptor_dreadnought: {
    scenarios: {
      defensive: {
        mainWeapon: 'macro_plasma_incinerator',
        secondaryWeapon: 'onslaught_gatling_cannon',
        weaponChance: 0.8
      },
      assault: {
        mainWeapon: 'heavy_onslaught_gatling_cannon',
        secondaryWeapon: 'heavy_flamer',
        weaponChance: 0.7
      },
      siege: {
        mainWeapon: 'macro_plasma_incinerator',
        secondaryWeapon: 'onslaught_gatling_cannon',
        weaponChance: 0.9
      },
      reconnaissance: {
        mainWeapon: 'heavy_onslaught_gatling_cannon',
        secondaryWeapon: 'storm_bolters',
        weaponChance: 0.6
      }
    },
    difficulty: {
      easy: { weaponChance: 0.5 },
      normal: { weaponChance: 0.7 },
      hard: { weaponChance: 0.9 }
    }
  },

  // Brutalis Dreadnought
  brutalis_dreadnought: {
    scenarios: {
      defensive: {
        mainWeapon: 'twin_lascannon',
        secondaryWeapon: 'hurricane_bolter',
        weaponChance: 0.7
      },
      assault: {
        mainWeapon: 'brutalis_fists',
        secondaryWeapon: 'hurricane_bolter',
        weaponChance: 0.9
      },
      siege: {
        mainWeapon: 'twin_lascannon',
        secondaryWeapon: 'hurricane_bolter',
        weaponChance: 0.8
      },
      reconnaissance: {
        mainWeapon: 'brutalis_fists',
        secondaryWeapon: 'hurricane_bolter',
        weaponChance: 0.6
      }
    },
    difficulty: {
      easy: { weaponChance: 0.4 },
      normal: { weaponChance: 0.7 },
      hard: { weaponChance: 0.9 }
    }
  },

  // Librarian Dreadnought
  librarian_dreadnought: {
    scenarios: {
      defensive: {
        mainWeapon: 'twin_lascannon',
        secondaryWeapon: 'psychic_powers',
        weaponChance: 0.8
      },
      assault: {
        mainWeapon: 'multi_melta',
        secondaryWeapon: 'psychic_powers',
        weaponChance: 0.7
      },
      siege: {
        mainWeapon: 'plasma_cannon',
        secondaryWeapon: 'psychic_powers',
        weaponChance: 0.8
      },
      reconnaissance: {
        mainWeapon: 'missile_launcher',
        secondaryWeapon: 'psychic_powers',
        weaponChance: 0.6
      }
    },
    difficulty: {
      easy: { weaponChance: 0.3 },
      normal: { weaponChance: 0.6 },
      hard: { weaponChance: 0.9 }
    }
  },

  // Repulsor Tank
  repulsor_tank: {
    scenarios: {
      defensive: {
        mainWeapon: 'twin_lascannon',
        secondaryWeapon: 'icarus_rocket_pod',
        weaponChance: 0.8
      },
      assault: {
        mainWeapon: 'las_talon',
        secondaryWeapon: 'twin_plasma_incinerator',
        weaponChance: 0.7
      },
      siege: {
        mainWeapon: 'las_talon',
        secondaryWeapon: 'icarus_rocket_pod',
        weaponChance: 0.8
      },
      reconnaissance: {
        mainWeapon: 'twin_lascannon',
        secondaryWeapon: 'ironhail_heavy_stubber',
        weaponChance: 0.6
      }
    },
    difficulty: {
      easy: { weaponChance: 0.4 },
      normal: { weaponChance: 0.7 },
      hard: { weaponChance: 0.9 }
    }
  },

  // Repulsor Executioner
  repulsor_executioner: {
    scenarios: {
      defensive: {
        mainWeapon: 'heavy_laser_destroyer',
        secondaryWeapon: 'icarus_rocket_pod',
        weaponChance: 0.9
      },
      assault: {
        mainWeapon: 'macro_plasma_incinerator',
        secondaryWeapon: 'ironhail_heavy_stubber',
        weaponChance: 0.8
      },
      siege: {
        mainWeapon: 'heavy_laser_destroyer',
        secondaryWeapon: 'icarus_rocket_pod',
        weaponChance: 0.9
      },
      reconnaissance: {
        mainWeapon: 'macro_plasma_incinerator',
        secondaryWeapon: 'ironhail_heavy_stubber',
        weaponChance: 0.7
      }
    },
    difficulty: {
      easy: { weaponChance: 0.3 },
      normal: { weaponChance: 0.6 },
      hard: { weaponChance: 0.9 }
    }
  },

  // Subfaction-specific units
  sanguinary_guard: {
    scenarios: {
      defensive: {
        mainWeapon: 'encarmine_sword',
        secondaryWeapon: 'inferno_pistol',
        weaponChance: 0.7
      },
      assault: {
        mainWeapon: 'encarmine_axe',
        secondaryWeapon: 'plasma_pistol',
        weaponChance: 0.9
      },
      siege: {
        mainWeapon: 'power_fist',
        secondaryWeapon: 'inferno_pistol',
        weaponChance: 0.8
      },
      reconnaissance: {
        mainWeapon: 'encarmine_sword',
        secondaryWeapon: 'plasma_pistol',
        weaponChance: 0.6
      }
    },
    difficulty: {
      easy: { weaponChance: 0.4 },
      normal: { weaponChance: 0.7 },
      hard: { weaponChance: 0.9 }
    }
  },

  // Enhanced unit selection priorities for centerpiece units
  centerpiecePriorities: {
    tau_empire: {
      riptide_battlesuit: { easy: 0.3, normal: 0.6, hard: 0.8 },
      ghostkeel_battlesuit: { easy: 0.2, normal: 0.5, hard: 0.7 },
      stormsurge_battlesuit: { easy: 0.1, normal: 0.3, hard: 0.6 },
      taunar_supremacy_armour: { easy: 0.05, normal: 0.15, hard: 0.4 }
    },
    space_marines: {
      redemptor_dreadnought: { easy: 0.4, normal: 0.7, hard: 0.9 },
      brutalis_dreadnought: { easy: 0.2, normal: 0.5, hard: 0.8 },
      librarian_dreadnought: { easy: 0.1, normal: 0.3, hard: 0.6 },
      repulsor_executioner: { easy: 0.2, normal: 0.5, hard: 0.8 },
      repulsor_tank: { easy: 0.3, normal: 0.6, hard: 0.8 }
    }
  },

  // Scenario modifiers for unit selection
  scenarioModifiers: {
    defensive: {
      heavy_support_bias: 1.5,
      centerpiece_bias: 1.3,
      long_range_bias: 1.4
    },
    assault: {
      fast_attack_bias: 1.4,
      melee_bias: 1.5,
      centerpiece_bias: 1.2
    },
    siege: {
      heavy_support_bias: 1.6,
      centerpiece_bias: 1.4,
      anti_armor_bias: 1.5
    },
    reconnaissance: {
      fast_attack_bias: 1.6,
      elite_bias: 1.3,
      centerpiece_bias: 0.8
    }
  }
};

// Function to select wargear for a unit based on scenario and difficulty
export function selectWargear(unit, scenario, difficulty) {
  const rules = wargearSelectionRules[unit.id];
  if (!rules || !rules.scenarios[scenario]) {
    return { selectedOptions: [], description: 'Standard equipment only' };
  }

  const scenarioRules = rules.scenarios[scenario];
  const selectedOptions = [];
  let description = 'Base equipment';

  // Handle different unit types
  switch (unit.id) {
    case 'fire_warriors_strike':
      if (scenarioRules.shasui === 'markerlight' && Math.random() < 0.8) {
        selectedOptions.push('Markerlight (Shas\'ui)');
      } else if (scenarioRules.shasui === 'pulse_pistol_ccw') {
        selectedOptions.push('Pulse pistol + close combat weapon (Shas\'ui)');
      }
      
      if (Math.random() < scenarioRules.supportTurret) {
        selectedOptions.push('Support turret');
      }
      break;

    case 'fire_warriors_breacher':
      if (Math.random() < scenarioRules.droneChance) {
        if (scenarioRules.drones.includes('guardian_drone')) {
          selectedOptions.push('Guardian drone');
        } else if (scenarioRules.drones.includes('gun_drone')) {
          selectedOptions.push('Gun drone x2');
        }
      }
      selectedOptions.push('Pulse pistol + close combat weapon (Shas\'ui)');
      break;

    case 'pathfinders':
      // Special weapons
      Object.entries(scenarioRules.specialWeapons).forEach(([weapon, count]) => {
        if (count > 0) {
          const weaponName = weapon.replace('_', ' ');
          selectedOptions.push(`${weaponName.charAt(0).toUpperCase() + weaponName.slice(1)} x${count}`);
        }
      });

      // Drones
      if (scenarioRules.drones && scenarioRules.droneCount > 0) {
        for (let i = 0; i < Math.min(scenarioRules.droneCount, scenarioRules.drones.length); i++) {
          const droneName = scenarioRules.drones[i].replace('_', ' ');
          selectedOptions.push(droneName.charAt(0).toUpperCase() + droneName.slice(1));
        }
      }

      // Shas'ui drone
      if (scenarioRules.shasui_drone) {
        const droneMap = {
          'recon': 'Recon Drone (Infiltrators)',
          'grav_inhibitor': 'Grav-inhibitor Drone (Charge Defense)',
          'pulse_accelerator': 'Pulse Accelerator Drone (Extended Range)'
        };
        selectedOptions.push(`Shas'ui: ${droneMap[scenarioRules.shasui_drone]}`);
      }
      break;

    case 'stealth_suits':
      if (Math.random() < scenarioRules.specialWeapons) {
        selectedOptions.push('Fusion blaster (1 model)');
      }
      if (Math.random() < scenarioRules.drones) {
        selectedOptions.push('Gun drone');
      }
      break;

    case 'hammerhead':
      if (scenarioRules.mainWeapon !== 'railgun') {
        selectedOptions.push('Ion cannon (replaces railgun)');
      }
      if (Math.random() < scenarioRules.weaponChance && scenarioRules.secondaryWeapon) {
        if (scenarioRules.secondaryWeapon === 'smart_missile_system') {
          selectedOptions.push('Smart missile system (replaces gun drones)');
        } else if (scenarioRules.secondaryWeapon === 'accelerator_burst_cannon') {
          selectedOptions.push('Accelerator burst cannon (replaces gun drones)');
        }
      }
      break;

    case 'broadside_suits':
      if (scenarioRules.mainWeapon === 'high_yield_missile_pod') {
        selectedOptions.push('High-yield missile pod (replaces heavy rail rifle)');
      }
      if (Math.random() < scenarioRules.upgradeChance) {
        if (scenarioRules.missiles) {
          selectedOptions.push('Seeker missiles x2');
        }
        if (scenarioRules.support) {
          selectedOptions.push('Velocity tracker');
        }
      }
      break;

    case 'piranhas':
      if (scenarioRules.mainWeapon === 'fusion_blaster') {
        selectedOptions.push('Fusion blaster (replaces burst cannon)');
      }
      if (Math.random() < scenarioRules.upgradeChance && scenarioRules.upgrade) {
        selectedOptions.push('Seeker missiles x2');
      }
      break;

    case 'riptide_battlesuit':
      if (Math.random() < scenarioRules.weaponChance) {
        selectedOptions.push('Ion accelerator');
        selectedOptions.push('Twin fusion blaster');
      }
      if (Math.random() < scenarioRules.weaponChance && scenarioRules.secondaryWeapon) {
        selectedOptions.push(scenarioRules.secondaryWeapon);
      }
      break;

    case 'ghostkeel_battlesuit':
      if (Math.random() < scenarioRules.weaponChance) {
        selectedOptions.push('Fusion collider');
        selectedOptions.push('Shield generator');
      }
      if (Math.random() < scenarioRules.weaponChance && scenarioRules.secondaryWeapon) {
        selectedOptions.push(scenarioRules.secondaryWeapon);
      }
      break;

    case 'stormsurge_battlesuit':
      if (Math.random() < scenarioRules.weaponChance) {
        selectedOptions.push('Pulse blast cannon');
        selectedOptions.push('Shield generator');
      }
      if (Math.random() < scenarioRules.weaponChance && scenarioRules.secondaryWeapon) {
        selectedOptions.push(scenarioRules.secondaryWeapon);
      }
      break;

    case 'taunar_supremacy_armour':
      if (Math.random() < scenarioRules.weaponChance) {
        selectedOptions.push('Tri-axis ion cannon');
        selectedOptions.push('Shield generator');
      }
      if (Math.random() < scenarioRules.weaponChance && scenarioRules.secondaryWeapon) {
        selectedOptions.push(scenarioRules.secondaryWeapon);
      }
      break;

    case 'kroot_carnivores':
      if (Math.random() < scenarioRules.weaponChance) {
        selectedOptions.push('Kroot rifle');
        selectedOptions.push('Kroot hound');
      }
      if (Math.random() < scenarioRules.weaponChance && scenarioRules.secondaryWeapon) {
        selectedOptions.push(scenarioRules.secondaryWeapon);
      }
      break;

    case 'vespid_stingwings':
      if (Math.random() < scenarioRules.weaponChance) {
        selectedOptions.push('Neutron blaster');
      }
      break;

    case 'dreadnought':
      if (Math.random() < scenarioRules.weaponChance) {
        selectedOptions.push('Twin lascannon');
        selectedOptions.push('Missile launcher');
      }
      if (Math.random() < scenarioRules.weaponChance && scenarioRules.secondaryWeapon) {
        selectedOptions.push(scenarioRules.secondaryWeapon);
      }
      break;

    case 'redemptor_dreadnought':
      if (Math.random() < scenarioRules.weaponChance) {
        selectedOptions.push('Macro plasma incinerator');
        selectedOptions.push('Onslaught gatling cannon');
      }
      if (Math.random() < scenarioRules.weaponChance && scenarioRules.secondaryWeapon) {
        selectedOptions.push(scenarioRules.secondaryWeapon);
      }
      break;

    case 'brutalis_dreadnought':
      if (Math.random() < scenarioRules.weaponChance) {
        selectedOptions.push('Twin lascannon');
        selectedOptions.push('Hurricane bolter');
      }
      if (Math.random() < scenarioRules.weaponChance && scenarioRules.secondaryWeapon) {
        selectedOptions.push(scenarioRules.secondaryWeapon);
      }
      break;

    case 'librarian_dreadnought':
      if (Math.random() < scenarioRules.weaponChance) {
        selectedOptions.push('Twin lascannon');
        selectedOptions.push('Psychic powers');
      }
      if (Math.random() < scenarioRules.weaponChance && scenarioRules.secondaryWeapon) {
        selectedOptions.push(scenarioRules.secondaryWeapon);
      }
      break;

    case 'repulsor_tank':
      if (Math.random() < scenarioRules.weaponChance) {
        selectedOptions.push('Twin lascannon');
        selectedOptions.push('Icarus rocket pod');
      }
      if (Math.random() < scenarioRules.weaponChance && scenarioRules.secondaryWeapon) {
        selectedOptions.push(scenarioRules.secondaryWeapon);
      }
      break;

    case 'repulsor_executioner':
      if (Math.random() < scenarioRules.weaponChance) {
        selectedOptions.push('Heavy laser destroyer');
        selectedOptions.push('Icarus rocket pod');
      }
      if (Math.random() < scenarioRules.weaponChance && scenarioRules.secondaryWeapon) {
        selectedOptions.push(scenarioRules.secondaryWeapon);
      }
      break;

    case 'sanguinary_guard':
      if (Math.random() < scenarioRules.weaponChance) {
        selectedOptions.push('Encarmine sword');
        selectedOptions.push('Inferno pistol');
      }
      if (Math.random() < scenarioRules.weaponChance && scenarioRules.secondaryWeapon) {
        selectedOptions.push(scenarioRules.secondaryWeapon);
      }
      break;

    default:
      // Handle unknown unit types with standard equipment
      break;
  }

  // Generate description based on difficulty and selections
  if (selectedOptions.length === 0) {
    description = 'Standard equipment only';
  } else if (difficulty === 'easy') {
    description = `Basic equipment: ${selectedOptions.slice(0, 2).join(', ')}`;
  } else {
    description = `Full loadout: ${selectedOptions.join(', ')}`;
  }

  return {
    selectedOptions,
    description,
    tacticalRationale: getTacticalRationale(unit.id, scenario, selectedOptions)
  };
}

// Generate tactical explanation for equipment choices
function getTacticalRationale(unitId, scenario, options) {
  const rationales = {
    fire_warriors_strike: {
      defensive: 'Markerlight and support turret provide long-range fire support for defensive positions',
      assault: 'Close combat weapons for urban fighting and breakthrough operations',
      siege: 'Mixed loadout for versatile urban warfare capabilities'
    },
    pathfinders: {
      defensive: 'Rail rifles for anti-armor, pulse accelerator drone extends engagement range',
      assault: 'Recon drone provides infiltration, ion rifles offer mobile firepower',
      siege: 'Grav-inhibitor drone controls movement, mixed weapons for urban warfare'
    },
    stealth_suits: {
      assault: 'Fusion blasters for anti-armor punch during breakthrough operations',
      siege: 'Fusion blasters essential for defeating armor in urban environments'
    }
  };

  const unitRationales = rationales[unitId];
  if (unitRationales && unitRationales[scenario]) {
    return unitRationales[scenario];
  }

  return `Equipment selected for ${scenario} operations`;
}

const wargearSelectionExports = { wargearSelectionRules, selectWargear };
export default wargearSelectionExports; 