// Space Marine Wargear Selection System
// Chapter-specific equipment and tactical loadouts

export const spaceMarineWargearRules = {
  // Tactical Squad
  tactical_squad: {
    scenarios: {
      defensive: {
        heavyWeapon: 'heavy_bolter', // Sustained fire for defense
        specialWeapon: 'flamer', // Area denial
        sergeant: 'power_sword',
        weaponChance: 0.8
      },
      assault: {
        heavyWeapon: 'multi_melta', // Anti-armor for breakthrough
        specialWeapon: 'meltagun',
        sergeant: 'power_fist',
        weaponChance: 0.9
      },
      siege: {
        heavyWeapon: 'missile_launcher', // Versatile urban warfare
        specialWeapon: 'flamer',
        sergeant: 'power_sword',
        weaponChance: 0.9
      },
      reconnaissance: {
        heavyWeapon: null, // Light and mobile
        specialWeapon: 'plasma_gun',
        sergeant: 'power_sword',
        weaponChance: 0.4
      },
      general: {
        heavyWeapon: 'heavy_bolter',
        specialWeapon: 'plasma_gun',
        sergeant: 'power_sword',
        weaponChance: 0.7
      }
    }
  },

  // Intercessor Squad
  intercessor_squad: {
    scenarios: {
      defensive: {
        boltVariant: 'stalker_bolt_rifle', // Long range for defense
        sergeant: 'power_sword',
        upgradeChance: 0.6
      },
      assault: {
        boltVariant: 'auto_bolt_rifle', // High rate of fire
        sergeant: 'power_fist',
        upgradeChance: 0.8
      },
      siege: {
        boltVariant: 'auto_bolt_rifle', // Urban warfare
        sergeant: 'power_sword',
        upgradeChance: 0.7
      },
      reconnaissance: {
        boltVariant: 'bolt_rifle', // Standard equipment
        sergeant: 'power_sword',
        upgradeChance: 0.3
      },
      general: {
        boltVariant: 'bolt_rifle',
        sergeant: 'power_sword',
        upgradeChance: 0.5
      }
    }
  },

  // Assault Intercessor Squad
  assault_intercessor_squad: {
    scenarios: {
      assault: {
        sergeant: 'thunder_hammer', // Maximum impact
        specialWeapons: ['plasma_pistol', 'plasma_pistol'],
        upgradeChance: 0.9
      },
      siege: {
        sergeant: 'power_fist',
        specialWeapons: ['plasma_pistol'],
        upgradeChance: 0.8
      },
      defensive: {
        sergeant: 'power_sword',
        specialWeapons: [],
        upgradeChance: 0.4
      },
      general: {
        sergeant: 'power_sword',
        specialWeapons: ['plasma_pistol'],
        upgradeChance: 0.6
      }
    }
  },

  // Terminator Squad
  terminator_squad: {
    scenarios: {
      defensive: {
        heavyWeapon: 'assault_cannon', // Anti-infantry
        meleeWeapons: ['power_sword', 'power_sword'],
        upgradeChance: 0.8
      },
      assault: {
        heavyWeapon: 'assault_cannon',
        meleeWeapons: ['power_fist', 'power_fist'],
        upgradeChance: 0.9
      },
      siege: {
        heavyWeapon: 'heavy_flamer', // Urban warfare
        meleeWeapons: ['power_fist', 'power_sword'],
        upgradeChance: 0.9
      },
      general: {
        heavyWeapon: 'assault_cannon',
        meleeWeapons: ['power_sword', 'power_fist'],
        upgradeChance: 0.7
      }
    }
  },

  // Assault Terminators
  assault_terminators: {
    scenarios: {
      assault: {
        loadout: 'thunder_hammer_storm_shield', // Maximum impact
        upgradeChance: 0.9
      },
      siege: {
        loadout: 'thunder_hammer_storm_shield', // Building assault
        upgradeChance: 0.9
      },
      defensive: {
        loadout: 'lightning_claws', // Faster attacks
        upgradeChance: 0.7
      },
      general: {
        loadout: 'thunder_hammer_storm_shield',
        upgradeChance: 0.8
      }
    }
  },

  // Devastator Squad
  devastator_squad: {
    scenarios: {
      defensive: {
        heavyWeapons: ['heavy_bolter', 'heavy_bolter', 'missile_launcher', 'lascannon'],
        sergeant: 'signum',
        upgradeChance: 0.9
      },
      assault: {
        heavyWeapons: ['multi_melta', 'multi_melta', 'heavy_bolter', 'heavy_bolter'],
        sergeant: 'signum',
        upgradeChance: 0.8
      },
      siege: {
        heavyWeapons: ['heavy_bolter', 'missile_launcher', 'missile_launcher', 'lascannon'],
        sergeant: 'signum',
        upgradeChance: 0.9
      },
      general: {
        heavyWeapons: ['heavy_bolter', 'heavy_bolter', 'missile_launcher', 'lascannon'],
        sergeant: 'signum',
        upgradeChance: 0.8
      }
    }
  },

  // Heavy Intercessor Squad
  heavy_intercessor_squad: {
    scenarios: {
      defensive: {
        heavyWeapon: 'heavy_bolter', // Sustained fire
        sergeant: 'power_sword',
        upgradeChance: 0.7
      },
      assault: {
        heavyWeapon: 'executor_heavy_bolter', // Higher damage
        sergeant: 'power_fist',
        upgradeChance: 0.8
      },
      siege: {
        heavyWeapon: 'executor_heavy_bolter',
        sergeant: 'power_sword',
        upgradeChance: 0.8
      },
      general: {
        heavyWeapon: 'heavy_bolter',
        sergeant: 'power_sword',
        upgradeChance: 0.6
      }
    }
  },

  // Vehicle loadouts
  predator: {
    scenarios: {
      defensive: {
        sponsons: 'lascannon', // Anti-armor
        upgradeChance: 0.8
      },
      assault: {
        sponsons: 'heavy_bolter', // Anti-infantry
        upgradeChance: 0.7
      },
      siege: {
        sponsons: 'lascannon',
        upgradeChance: 0.9
      },
      general: {
        sponsons: 'heavy_bolter',
        upgradeChance: 0.6
      }
    }
  },

  land_raider: {
    scenarios: {
      assault: {
        passengers: 'assault_terminators', // Best assault troops
        upgradeChance: 0.9
      },
      siege: {
        passengers: 'tactical_squad', // Versatile troops
        upgradeChance: 0.8
      },
      general: {
        passengers: 'tactical_squad',
        upgradeChance: 0.7
      }
    }
  }
};

// Chapter-specific equipment modifiers
export const chapterModifiers = {
  ultramarines: {
    specialRules: ['Tactical doctrine', 'Leadership aura'],
    equipmentBias: 'balanced',
    preferredWeapons: ['bolt_rifle', 'power_sword', 'heavy_bolter'],
    tacticalFocus: 'Combined arms coordination'
  },

  blood_angels: {
    specialRules: ['Red Thirst', 'Death Company'],
    equipmentBias: 'assault',
    preferredWeapons: ['chainsword', 'jump_pack', 'plasma_pistol'],
    tacticalFocus: 'Close combat supremacy'
  },

  dark_angels: {
    specialRules: ['Deathwing Assault', 'Ravenwing Support'],
    equipmentBias: 'elite',
    preferredWeapons: ['plasma_gun', 'terminator_armor', 'power_sword'],
    tacticalFocus: 'Elite formation coordination'
  },

  imperial_fists: {
    specialRules: ['Siege Masters', 'Bolter Drill'],
    equipmentBias: 'defensive',
    preferredWeapons: ['heavy_bolter', 'missile_launcher', 'power_fist'],
    tacticalFocus: 'Fortification and siege warfare'
  },

  iron_hands: {
    specialRules: ['Machine Empathy', 'Tech Mastery'],
    equipmentBias: 'technology',
    preferredWeapons: ['vehicle_weapons', 'servo_harness', 'augmetics'],
    tacticalFocus: 'Vehicle coordination and tech-war'
  },

  salamanders: {
    specialRules: ['Master Crafsmen', 'Flame Mastery'],
    equipmentBias: 'flame',
    preferredWeapons: ['flamer', 'multi_melta', 'master_crafted_weapons'],
    tacticalFocus: 'Flame weapons and durability'
  }
};

// Function to select wargear for Space Marine units
export function selectSpaceMarineWargear(unit, scenario, difficulty, chapter = 'ultramarines') {
  const rules = spaceMarineWargearRules[unit.id];
  if (!rules || !rules.scenarios[scenario]) {
    return { selectedOptions: [], description: 'Standard equipment only' };
  }

  const scenarioRules = rules.scenarios[scenario];
  const chapterMods = chapterModifiers[chapter];
  const selectedOptions = [];

  // Handle different unit types
  switch (unit.id) {
    case 'tactical_squad':
      if (Math.random() < scenarioRules.weaponChance) {
        if (scenarioRules.heavyWeapon) {
          selectedOptions.push(`${scenarioRules.heavyWeapon.replace('_', ' ')}`);
        }
        if (scenarioRules.specialWeapon) {
          selectedOptions.push(`${scenarioRules.specialWeapon.replace('_', ' ')}`);
        }
      }
      selectedOptions.push(`Sergeant: ${scenarioRules.sergeant.replace('_', ' ')}`);
      break;

    case 'intercessor_squad':
      if (Math.random() < scenarioRules.upgradeChance) {
        if (scenarioRules.boltVariant !== 'bolt_rifle') {
          selectedOptions.push(`${scenarioRules.boltVariant.replace('_', ' ')} (squad)`);
        }
      }
      selectedOptions.push(`Sergeant: ${scenarioRules.sergeant.replace('_', ' ')}`);
      break;

    case 'assault_intercessor_squad':
      if (Math.random() < scenarioRules.upgradeChance) {
        selectedOptions.push(`Sergeant: ${scenarioRules.sergeant.replace('_', ' ')}`);
        scenarioRules.specialWeapons.forEach(weapon => {
          selectedOptions.push(`${weapon.replace('_', ' ')}`);
        });
      }
      break;

    case 'terminator_squad':
      if (Math.random() < scenarioRules.upgradeChance) {
        selectedOptions.push(`${scenarioRules.heavyWeapon.replace('_', ' ')}`);
        scenarioRules.meleeWeapons.forEach(weapon => {
          selectedOptions.push(`${weapon.replace('_', ' ')}`);
        });
      }
      break;

    case 'assault_terminators':
      if (Math.random() < scenarioRules.upgradeChance) {
        if (scenarioRules.loadout === 'thunder_hammer_storm_shield') {
          selectedOptions.push('Thunder hammer & storm shield (all models)');
        } else {
          selectedOptions.push('Lightning claws (all models)');
        }
      }
      break;

    case 'devastator_squad':
      if (Math.random() < scenarioRules.upgradeChance) {
        scenarioRules.heavyWeapons.forEach(weapon => {
          selectedOptions.push(`${weapon.replace('_', ' ')}`);
        });
        selectedOptions.push(`Sergeant: ${scenarioRules.sergeant}`);
      }
      break;

    case 'heavy_intercessor_squad':
      if (Math.random() < scenarioRules.upgradeChance) {
        selectedOptions.push(`${scenarioRules.heavyWeapon.replace('_', ' ')}`);
      }
      selectedOptions.push(`Sergeant: ${scenarioRules.sergeant.replace('_', ' ')}`);
      break;

    case 'predator':
      if (Math.random() < scenarioRules.upgradeChance) {
        selectedOptions.push(`${scenarioRules.sponsons.replace('_', ' ')} sponsons`);
      }
      break;

    case 'land_raider':
      if (Math.random() < scenarioRules.upgradeChance) {
        selectedOptions.push(`Optimized for: ${scenarioRules.passengers.replace('_', ' ')}`);
      }
      break;

    default:
      break;
  }

  // Apply chapter-specific modifications
  if (chapterMods.equipmentBias === 'assault' && scenario === 'assault') {
    selectedOptions.push(`${chapterMods.specialRules[0]} enhancement`);
  } else if (chapterMods.equipmentBias === 'flame' && selectedOptions.some(opt => opt.includes('flamer'))) {
    selectedOptions.push(`${chapterMods.specialRules[0]} improvement`);
  } else if (chapterMods.equipmentBias === 'defensive' && scenario === 'defensive') {
    selectedOptions.push(`${chapterMods.specialRules[0]} bonus`);
  }

  // Generate description
  let description = 'Standard equipment only';
  if (selectedOptions.length > 0) {
    if (difficulty === 'easy') {
      description = `Basic loadout: ${selectedOptions.slice(0, 2).join(', ')}`;
    } else {
      description = `Full ${chapter.charAt(0).toUpperCase() + chapter.slice(1)} loadout: ${selectedOptions.join(', ')}`;
    }
  }

  return {
    selectedOptions,
    description,
    tacticalRationale: getSpaceMarineTacticalRationale(unit.id, scenario, selectedOptions, chapter)
  };
}

// Generate tactical explanation for Space Marine equipment choices
function getSpaceMarineTacticalRationale(unitId, scenario, options, chapter) {
  const rationales = {
    tactical_squad: {
      defensive: 'Heavy bolter provides sustained fire, flamer for area denial',
      assault: 'Multi-melta for vehicle destruction, meltagun for breakthrough',
      siege: 'Missile launcher versatility, flamer for building clearing'
    },
    terminator_squad: {
      assault: 'Assault cannon suppression, power fists for maximum impact',
      defensive: 'Sustained fire and defensive positioning',
      siege: 'Heavy flamer for corridor fighting, mixed melee weapons'
    },
    devastator_squad: {
      defensive: 'Long-range anti-armor and anti-infantry coverage',
      assault: 'Multi-meltas for bunker busting and vehicle destruction',
      siege: 'Mixed weapons for urban warfare flexibility'
    }
  };

  const chapterSpecific = {
    blood_angels: 'Enhanced with Red Thirst combat prowess',
    dark_angels: 'Coordinated with Deathwing/Ravenwing tactics', 
    imperial_fists: 'Optimized for siege warfare and fortification',
    salamanders: 'Enhanced flame weapons for maximum effect',
    iron_hands: 'Technological superiority and vehicle coordination',
    ultramarines: 'Tactical flexibility following Codex doctrine'
  };

  const unitRationales = rationales[unitId];
  let baseRationale = 'Equipment optimized for mission parameters';
  
  if (unitRationales && unitRationales[scenario]) {
    baseRationale = unitRationales[scenario];
  }

  return `${baseRationale}. ${chapterSpecific[chapter]}.`;
} 