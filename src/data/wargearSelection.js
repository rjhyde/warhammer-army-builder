// T'au Empire Wargear Selection System
// Intelligently selects equipment based on scenario, unit role, and tactical considerations

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
        secondaryWeapon: 'burst_cannon', // Infantry support
        weaponChance: 0.6
      },
      siege: {
        mainWeapon: 'ion_cannon', // Better for urban warfare
        secondaryWeapon: 'smart_missile_system',
        weaponChance: 0.8
      },
      reconnaissance: {
        mainWeapon: 'railgun',
        secondaryWeapon: 'burst_cannon',
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
          selectedOptions.push('Smart missile system');
        } else if (scenarioRules.secondaryWeapon === 'burst_cannon') {
          selectedOptions.push('Burst cannon');
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

    default:
      // No specific wargear rules for this unit type
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

const wargearSelectionModule = { wargearSelectionRules, selectWargear };

export default wargearSelectionModule; 