// Comprehensive Weapon Profiles Database for 10th Edition Warhammer 40,000
// Detailed stats for all weapons used in the Warhammer 40k Army Builder

// Data Version Information
export const dataVersion = {
  version: "1.0.0",
  lastUpdated: "2024-01-15",
  sources: [
    "Warhammer 40,000 Core Rules",
    "Codex: T'au Empire (10th Edition)",
    "Codex: Space Marines (10th Edition)",
    "Chapter Approved 2024"
  ],
  updateCheckUrl: "https://api.github.com/repos/your-repo/releases/latest", // For checking updates
  warhammerCommunityCheck: true // Enable checking for updates
};

export const weaponProfiles = {
  // T'AU EMPIRE WEAPONS
  
  // Basic T'au Weapons
  'pulse_rifle': {
    name: 'Pulse Rifle',
    range: '30"',
    type: 'Rapid Fire 1',
    strength: 5,
    ap: 0,
    damage: 1,
    abilities: ['Rapid Fire'],
    category: 'Basic Weapon',
    description: 'Standard Fire Warrior ranged weapon'
  },
  'pulse_blaster': {
    name: 'Pulse Blaster',
    range: '15"',
    type: 'Assault 2',
    strength: 6,
    ap: -1,
    damage: 1,
    abilities: ['Assault', 'Point Blank'],
    category: 'Basic Weapon',
    description: 'Close-range pulse weapon for Breachers'
  },
  'pulse_carbine': {
    name: 'Pulse Carbine',
    range: '20"',
    type: 'Assault 2',
    strength: 5,
    ap: 0,
    damage: 1,
    abilities: ['Assault'],
    category: 'Basic Weapon',
    description: 'Lightweight carbine variant'
  },
  'pulse_pistol': {
    name: 'Pulse Pistol',
    range: '12"',
    type: 'Pistol 1',
    strength: 5,
    ap: 0,
    damage: 1,
    abilities: ['Pistol'],
    category: 'Sidearm',
    description: 'T\'au sidearm weapon'
  },
  
  // T'au Special Weapons
  'burst_cannon': {
    name: 'Burst Cannon',
    range: '18"',
    type: 'Assault 4',
    strength: 5,
    ap: 0,
    damage: 1,
    abilities: ['Assault'],
    category: 'Support Weapon',
    description: 'High rate of fire support weapon'
  },
  'accelerator_burst_cannon': {
    name: 'Accelerator Burst Cannon',
    range: '18"',
    type: 'Assault 8',
    strength: 5,
    ap: 0,
    damage: 1,
    abilities: ['Assault'],
    category: 'Support Weapon',
    description: 'Twin-linked burst cannon system for Hammerheads'
  },
  'plasma_rifle': {
    name: 'Plasma Rifle',
    range: '24"',
    type: 'Rapid Fire 1',
    strength: 6,
    ap: -3,
    damage: 1,
    abilities: ['Rapid Fire'],
    category: 'Special Weapon',
    description: 'Versatile plasma-based weapon'
  },
  'fusion_blaster': {
    name: 'Fusion Blaster',
    range: '18"',
    type: 'Assault 1',
    strength: 8,
    ap: -4,
    damage: 'D6',
    abilities: ['Assault', 'Melta'],
    category: 'Special Weapon',
    description: 'Short-range anti-armor weapon'
  },
  'cyclic_ion_blaster': {
    name: 'Cyclic Ion Blaster',
    range: '18"',
    type: 'Assault 3',
    strength: 7,
    ap: -1,
    damage: 1,
    abilities: ['Assault', 'Overcharge'],
    category: 'Special Weapon',
    description: 'Rapid-fire ion weapon system'
  },
  'missile_pod': {
    name: 'Missile Pod',
    range: '36"',
    type: 'Assault 2',
    strength: 7,
    ap: -1,
    damage: 'D3',
    abilities: ['Assault'],
    category: 'Support Weapon',
    description: 'Twin-linked missile launcher'
  },
  'flamer': {
    name: 'Flamer',
    range: '12"',
    type: 'Assault D6',
    strength: 4,
    ap: 0,
    damage: 1,
    abilities: ['Assault', 'Auto-hit', 'Ignores Cover'],
    category: 'Special Weapon',
    description: 'Standard flame weapon'
  },
  'airbursting_fragmentation_projector': {
    name: 'Airbursting Fragmentation Projector',
    range: '18"',
    type: 'Assault D6',
    strength: 4,
    ap: 0,
    damage: 1,
    abilities: ['Assault', 'Indirect Fire', 'Blast'],
    category: 'Special Weapon',
    description: 'Airburst grenade launcher'
  },
  
  // T'au Pathfinder Special Weapons
  'ion_rifle': {
    name: 'Ion Rifle',
    range: '30"',
    type: 'Heavy 1',
    strength: 7,
    ap: -1,
    damage: 1,
    abilities: ['Heavy', 'Overcharge'],
    category: 'Special Weapon',
    description: 'Long-range ion weapon'
  },
  'rail_rifle': {
    name: 'Rail Rifle',
    range: '30"',
    type: 'Heavy 1',
    strength: 6,
    ap: -4,
    damage: 'D3',
    abilities: ['Heavy', 'Mortal Wounds'],
    category: 'Special Weapon',
    description: 'Electromagnetic rail weapon'
  },
  'grenade_launcher': {
    name: 'Semi-automatic Grenade Launcher',
    range: '30"',
    type: 'Assault D6',
    strength: 4,
    ap: 0,
    damage: 1,
    abilities: ['Assault', 'Blast'],
    category: 'Special Weapon',
    description: 'Rapid-fire grenade launcher'
  },
  
  // T'au Heavy Weapons
  'railgun': {
    name: 'Railgun',
    range: '72"',
    type: 'Heavy 1',
    strength: 10,
    ap: -4,
    damage: 'D6+3',
    abilities: ['Heavy', 'Devastating Wounds'],
    category: 'Heavy Weapon',
    description: 'Primary Hammerhead anti-tank weapon'
  },
  'ion_cannon': {
    name: 'Ion Cannon',
    range: '60"',
    type: 'Heavy 3',
    strength: 7,
    ap: -1,
    damage: 2,
    abilities: ['Heavy', 'Overcharge'],
    category: 'Heavy Weapon',
    description: 'Alternative Hammerhead main weapon'
  },
  'heavy_rail_rifle': {
    name: 'Heavy Rail Rifle',
    range: '60"',
    type: 'Heavy 2',
    strength: 8,
    ap: -4,
    damage: 'D3+3',
    abilities: ['Heavy', 'Devastating Wounds'],
    category: 'Heavy Weapon',
    description: 'Broadside primary weapon'
  },
  'high_yield_missile_pod': {
    name: 'High-yield Missile Pod',
    range: '36"',
    type: 'Heavy 4',
    strength: 7,
    ap: -1,
    damage: 'D3',
    abilities: ['Heavy', 'Indirect Fire'],
    category: 'Heavy Weapon',
    description: 'Alternative Broadside weapon'
  },
  'smart_missile_system': {
    name: 'Smart Missile System',
    range: '30"',
    type: 'Heavy 4',
    strength: 5,
    ap: 0,
    damage: 1,
    abilities: ['Heavy', 'Indirect Fire', 'Ignores Cover'],
    category: 'Support Weapon',
    description: 'Intelligent targeting missile system'
  },
  
  // T'au Support Equipment
  'markerlight': {
    name: 'Markerlight',
    range: '36"',
    type: 'Heavy 1',
    strength: '-',
    ap: '-',
    damage: '-',
    abilities: ['Heavy', 'Target Designation'],
    category: 'Support Equipment',
    description: 'Target designation system'
  },
  'shield_generator': {
    name: 'Shield Generator',
    range: '-',
    type: 'Defensive',
    strength: '-',
    ap: '-',
    damage: '-',
    abilities: ['4+ Invulnerable Save'],
    category: 'Defensive Equipment',
    description: 'Energy shield projector'
  },
  'multi_tracker': {
    name: 'Multi-tracker',
    range: '-',
    type: 'Support System',
    strength: '-',
    ap: '-',
    damage: '-',
    abilities: ['Target Lock', 'Multiple Targets'],
    category: 'Support System',
    description: 'Multiple target acquisition system'
  },
  'target_lock': {
    name: 'Target Lock',
    range: '-',
    type: 'Support System',
    strength: '-',
    ap: '-',
    damage: '-',
    abilities: ['Ignore Look Out Sir'],
    category: 'Support System',
    description: 'Character targeting system'
  },
  'velocity_tracker': {
    name: 'Velocity Tracker',
    range: '-',
    type: 'Support System',
    strength: '-',
    ap: '-',
    damage: '-',
    abilities: ['+1 to hit vs Fly'],
    category: 'Support System',
    description: 'Anti-aircraft targeting system'
  },
  'seeker_missiles': {
    name: 'Seeker Missiles',
    range: '72"',
    type: 'Heavy 1',
    strength: 8,
    ap: -2,
    damage: 'D6',
    abilities: ['Heavy', 'One Use Only', 'Ignores Cover'],
    category: 'Missile System',
    description: 'Long-range guided missiles'
  },
  
  // T'au Close Combat
  'close_combat_weapon': {
    name: 'Close Combat Weapon',
    range: 'Melee',
    type: 'Melee',
    strength: 'User',
    ap: 0,
    damage: 1,
    abilities: [],
    category: 'Melee Weapon',
    description: 'Basic melee weapon'
  },
  'honour_blade': {
    name: 'Honour Blade',
    range: 'Melee',
    type: 'Melee',
    strength: '+1',
    ap: -2,
    damage: 1,
    abilities: ['Master-crafted'],
    category: 'Melee Weapon',
    description: 'Ethereal ceremonial weapon'
  },
  
  // SPACE MARINE WEAPONS
  
  // Basic Space Marine Weapons
  'boltgun': {
    name: 'Boltgun',
    range: '24"',
    type: 'Rapid Fire 1',
    strength: 4,
    ap: 0,
    damage: 1,
    abilities: ['Rapid Fire'],
    category: 'Basic Weapon',
    description: 'Standard Astartes weapon'
  },
  'bolt_rifle': {
    name: 'Bolt Rifle',
    range: '30"',
    type: 'Rapid Fire 1',
    strength: 4,
    ap: -1,
    damage: 1,
    abilities: ['Rapid Fire'],
    category: 'Basic Weapon',
    description: 'Primaris standard weapon'
  },
  'auto_bolt_rifle': {
    name: 'Auto Bolt Rifle',
    range: '24"',
    type: 'Assault 3',
    strength: 4,
    ap: 0,
    damage: 1,
    abilities: ['Assault'],
    category: 'Basic Weapon',
    description: 'High rate of fire variant'
  },
  'stalker_bolt_rifle': {
    name: 'Stalker Bolt Rifle',
    range: '36"',
    type: 'Heavy 1',
    strength: 4,
    ap: -2,
    damage: 2,
    abilities: ['Heavy'],
    category: 'Basic Weapon',
    description: 'Long-range precision variant'
  },
  'heavy_bolt_rifle': {
    name: 'Heavy Bolt Rifle',
    range: '30"',
    type: 'Heavy 2',
    strength: 5,
    ap: -1,
    damage: 1,
    abilities: ['Heavy'],
    category: 'Basic Weapon',
    description: 'Heavy Intercessor weapon'
  },
  'bolt_pistol': {
    name: 'Bolt Pistol',
    range: '12"',
    type: 'Pistol 1',
    strength: 4,
    ap: 0,
    damage: 1,
    abilities: ['Pistol'],
    category: 'Sidearm',
    description: 'Standard Astartes sidearm'
  },
  'heavy_bolt_pistol': {
    name: 'Heavy Bolt Pistol',
    range: '18"',
    type: 'Pistol 1',
    strength: 4,
    ap: -1,
    damage: 1,
    abilities: ['Pistol'],
    category: 'Sidearm',
    description: 'Primaris sidearm'
  },
  
  // Space Marine Special Weapons
  'plasma_gun': {
    name: 'Plasma Gun',
    range: '24"',
    type: 'Rapid Fire 1',
    strength: 7,
    ap: -3,
    damage: 1,
    abilities: ['Rapid Fire', 'Hazardous'],
    category: 'Special Weapon',
    description: 'Superheated plasma weapon'
  },
  'plasma_pistol': {
    name: 'Plasma Pistol',
    range: '12"',
    type: 'Pistol 1',
    strength: 7,
    ap: -3,
    damage: 1,
    abilities: ['Pistol', 'Hazardous'],
    category: 'Special Weapon',
    description: 'Sidearm plasma weapon'
  },
  'meltagun': {
    name: 'Meltagun',
    range: '12"',
    type: 'Assault 1',
    strength: 9,
    ap: -4,
    damage: 'D6',
    abilities: ['Assault', 'Melta'],
    category: 'Special Weapon',
    description: 'Anti-armor fusion weapon'
  },
  'multi_melta': {
    name: 'Multi-melta',
    range: '18"',
    type: 'Heavy 2',
    strength: 9,
    ap: -4,
    damage: 'D6',
    abilities: ['Heavy', 'Melta'],
    category: 'Heavy Weapon',
    description: 'Twin-linked melta weapon'
  },
  'special_issue_boltgun': {
    name: 'Special Issue Boltgun',
    range: '30"',
    type: 'Rapid Fire 1',
    strength: 4,
    ap: -1,
    damage: 1,
    abilities: ['Rapid Fire', 'Special Ammunition'],
    category: 'Special Weapon',
    description: 'Sternguard specialized weapon'
  },
  
  // Space Marine Heavy Weapons
  'heavy_bolter': {
    name: 'Heavy Bolter',
    range: '36"',
    type: 'Heavy 3',
    strength: 5,
    ap: -1,
    damage: 2,
    abilities: ['Heavy', 'Sustained Hits 1'],
    category: 'Heavy Weapon',
    description: 'Belt-fed heavy weapon'
  },
  'executor_heavy_bolter': {
    name: 'Executor Heavy Bolter',
    range: '42"',
    type: 'Heavy 4',
    strength: 6,
    ap: -1,
    damage: 2,
    abilities: ['Heavy', 'Sustained Hits 1'],
    category: 'Heavy Weapon',
    description: 'Improved heavy bolter variant'
  },
  'lascannon': {
    name: 'Lascannon',
    range: '48"',
    type: 'Heavy 1',
    strength: 12,
    ap: -3,
    damage: 'D6+1',
    abilities: ['Heavy'],
    category: 'Heavy Weapon',
    description: 'Laser-based anti-tank weapon'
  },
  'missile_launcher': {
    name: 'Missile Launcher',
    range: '48"',
    type: 'Heavy D6',
    strength: 6,
    ap: 0,
    damage: 1,
    abilities: ['Heavy', 'Blast', 'Indirect Fire'],
    category: 'Heavy Weapon',
    description: 'Versatile missile system'
  },
  'assault_cannon': {
    name: 'Assault Cannon',
    range: '24"',
    type: 'Heavy 6',
    strength: 6,
    ap: -1,
    damage: 1,
    abilities: ['Heavy', 'Devastating Wounds'],
    category: 'Heavy Weapon',
    description: 'Rapid-fire heavy weapon'
  },
  'heavy_flamer': {
    name: 'Heavy Flamer',
    range: '12"',
    type: 'Heavy D6',
    strength: 5,
    ap: -1,
    damage: 1,
    abilities: ['Heavy', 'Ignores Cover', 'Torrent'],
    category: 'Heavy Weapon',
    description: 'Heavy flame projector'
  },
  
  // Space Marine Melee Weapons
  'chainsword': {
    name: 'Chainsword',
    range: 'Melee',
    type: 'Melee',
    strength: 'User',
    ap: -1,
    damage: 1,
    abilities: [],
    category: 'Melee Weapon',
    description: 'Motorized chain blade'
  },
  'power_sword': {
    name: 'Power Sword',
    range: 'Melee',
    type: 'Melee',
    strength: 'User',
    ap: -2,
    damage: 1,
    abilities: [],
    category: 'Melee Weapon',
    description: 'Energy-wreathed blade'
  },
  'power_fist': {
    name: 'Power Fist',
    range: 'Melee',
    type: 'Melee',
    strength: 'x2',
    ap: -2,
    damage: 2,
    abilities: [],
    category: 'Melee Weapon',
    description: 'Powered close combat weapon'
  },
  'thunder_hammer': {
    name: 'Thunder Hammer',
    range: 'Melee',
    type: 'Melee',
    strength: 'x2',
    ap: -2,
    damage: 3,
    abilities: ['Devastating Wounds'],
    category: 'Melee Weapon',
    description: 'Shock-enhanced war hammer'
  },
  'lightning_claws': {
    name: 'Lightning Claws',
    range: 'Melee',
    type: 'Melee',
    strength: 'User',
    ap: -2,
    damage: 1,
    abilities: ['Twin Linked'],
    category: 'Melee Weapon',
    description: 'Paired energy claws'
  },
  'master_crafted_power_sword': {
    name: 'Master-crafted Power Sword',
    range: 'Melee',
    type: 'Melee',
    strength: '+1',
    ap: -2,
    damage: 2,
    abilities: [],
    category: 'Melee Weapon',
    description: 'Expertly forged power weapon'
  },
  
  // Space Marine Defensive Equipment
  'storm_shield': {
    name: 'Storm Shield',
    range: '-',
    type: 'Defensive',
    strength: '-',
    ap: '-',
    damage: '-',
    abilities: ['4+ Invulnerable Save'],
    category: 'Defensive Equipment',
    description: 'Energy deflection shield'
  },
  'plasma_exterminator': {
    name: 'Plasma Exterminator',
    range: '18"',
    type: 'Assault D3',
    strength: 7,
    ap: -3,
    damage: 1,
    abilities: ['Assault', 'Hazardous'],
    category: 'Heavy Weapon',
    description: 'Inceptor plasma weapon system'
  },
  'assault_bolter': {
    name: 'Assault Bolter',
    range: '18"',
    type: 'Assault 3',
    strength: 4,
    ap: 0,
    damage: 1,
    abilities: ['Assault'],
    category: 'Special Weapon',
    description: 'Inceptor rapid-fire weapon'
  },
  'twin_boltgun': {
    name: 'Twin Boltgun',
    range: '24"',
    type: 'Rapid Fire 2',
    strength: 4,
    ap: 0,
    damage: 1,
    abilities: ['Rapid Fire', 'Twin Linked'],
    category: 'Basic Weapon',
    description: 'Bike-mounted twin weapon system'
  },
  'twin_bolt_rifle': {
    name: 'Twin Bolt Rifle',
    range: '30"',
    type: 'Rapid Fire 2',
    strength: 4,
    ap: -1,
    damage: 1,
    abilities: ['Rapid Fire', 'Twin Linked'],
    category: 'Basic Weapon',
    description: 'Outrider bike weapon system'
  },
  
  // T'AU EMPIRE LARGE UNIT WEAPONS
  
  // Riptide Weapons
  'ion_accelerator': {
    name: 'Ion Accelerator',
    range: '72\"',
    type: 'Heavy 6',
    strength: 7,
    ap: -2,
    damage: 2,
    abilities: ['Heavy', 'Overcharge'],
    category: 'Primary Weapon',
    description: 'Riptide primary weapon system'
  },
  'amplified_ion_accelerator': {
    name: 'Amplified Ion Accelerator',
    range: '72\"',
    type: 'Heavy 6',
    strength: 8,
    ap: -3,
    damage: 3,
    abilities: ['Heavy', 'Overcharge', 'Amplified'],
    category: 'Primary Weapon',
    description: 'Enhanced Riptide weapon system'
  },
  'heavy_burst_cannon': {
    name: 'Heavy Burst Cannon',
    range: '36\"',
    type: 'Heavy 12',
    strength: 6,
    ap: -1,
    damage: 2,
    abilities: ['Heavy'],
    category: 'Primary Weapon',
    description: 'Riptide alternative primary weapon'
  },
  'twin_fusion_blaster': {
    name: 'Twin Fusion Blaster',
    range: '18\"',
    type: 'Assault 2',
    strength: 8,
    ap: -4,
    damage: 'D6',
    abilities: ['Assault', 'Melta 2'],
    category: 'Secondary Weapon',
    description: 'Riptide secondary weapon system'
  },
  
  // Ghostkeel Weapons
  'fusion_collider': {
    name: 'Fusion Collider',
    range: '18\"',
    type: 'Assault 2',
    strength: 8,
    ap: -4,
    damage: 'D6',
    abilities: ['Assault', 'Melta 2'],
    category: 'Primary Weapon',
    description: 'Ghostkeel primary fusion weapon'
  },
  'cyclic_ion_raker': {
    name: 'Cyclic Ion Raker',
    range: '36\"',
    type: 'Assault 6',
    strength: 7,
    ap: -2,
    damage: 1,
    abilities: ['Assault', 'Overcharge'],
    category: 'Primary Weapon',
    description: 'Ghostkeel alternative primary weapon'
  },
  'twin_burst_cannon': {
    name: 'Twin Burst Cannon',
    range: '18\"',
    type: 'Assault 8',
    strength: 5,
    ap: 0,
    damage: 1,
    abilities: ['Assault'],
    category: 'Secondary Weapon',
    description: 'Ghostkeel secondary weapon system'
  },
  
  // Stormsurge Weapons
  'pulse_blast_cannon': {
    name: 'Pulse Blast Cannon',
    range: '60\"',
    type: 'Heavy 2D6',
    strength: 14,
    ap: -3,
    damage: 'D6',
    abilities: ['Heavy', 'Blast'],
    category: 'Super Heavy Weapon',
    description: 'Stormsurge primary weapon system'
  },
  'pulse_driver_cannon': {
    name: 'Pulse Driver Cannon',
    range: '72\"',
    type: 'Heavy 3',
    strength: 10,
    ap: -3,
    damage: 3,
    abilities: ['Heavy'],
    category: 'Super Heavy Weapon',
    description: 'Stormsurge alternative primary weapon'
  },
  'twin_smart_missile_system': {
    name: 'Twin Smart Missile System',
    range: '30\"',
    type: 'Heavy 8',
    strength: 5,
    ap: 0,
    damage: 1,
    abilities: ['Heavy', 'Indirect Fire', 'Ignores Cover'],
    category: 'Secondary Weapon',
    description: 'Stormsurge secondary weapon system'
  },
  'destroyer_missiles': {
    name: 'Destroyer Missiles',
    range: '48\"',
    type: 'Heavy D6',
    strength: 7,
    ap: -2,
    damage: 2,
    abilities: ['Heavy', 'One Shot'],
    category: 'Secondary Weapon',
    description: 'Stormsurge missile system'
  },
  
  // Ta'unar Supremacy Armour Weapons
  'tri_axis_ion_cannon': {
    name: 'Tri-axis Ion Cannon',
    range: '60\"',
    type: 'Heavy 3D3',
    strength: 9,
    ap: -3,
    damage: 3,
    abilities: ['Heavy', 'Blast'],
    category: 'Titanic Weapon',
    description: 'Ta\'unar primary weapon system'
  },
  'pulse_ordnance_multi_driver': {
    name: 'Pulse Ordnance Multi-driver',
    range: '72\"',
    type: 'Heavy 2D6',
    strength: 10,
    ap: -3,
    damage: 'D6',
    abilities: ['Heavy', 'Blast'],
    category: 'Titanic Weapon',
    description: 'Ta\'unar alternative primary weapon'
  },
  'fusion_eradicator': {
    name: 'Fusion Eradicator',
    range: '24\"',
    type: 'Heavy 3',
    strength: 8,
    ap: -4,
    damage: 'D6',
    abilities: ['Heavy', 'Melta 4'],
    category: 'Heavy Weapon',
    description: 'Ta\'unar fusion weapon system'
  },
  'nexus_missile_system': {
    name: 'Nexus Missile System',
    range: '48\"',
    type: 'Heavy 2D6',
    strength: 7,
    ap: -2,
    damage: 2,
    abilities: ['Heavy', 'Blast', 'Indirect Fire'],
    category: 'Heavy Weapon',
    description: 'Ta\'unar missile system'
  },
  
  // Auxiliary Weapons
  'kroot_rifle': {
    name: 'Kroot Rifle',
    range: '24\"',
    type: 'Rapid Fire 1',
    strength: 4,
    ap: 0,
    damage: 1,
    abilities: ['Rapid Fire'],
    category: 'Basic Weapon',
    description: 'Standard Kroot ranged weapon'
  },
  'kroot_gun': {
    name: 'Kroot Gun',
    range: '48\"',
    type: 'Rapid Fire 1',
    strength: 7,
    ap: -1,
    damage: 2,
    abilities: ['Rapid Fire'],
    category: 'Heavy Weapon',
    description: 'Heavy Kroot support weapon'
  },
  'kroot_blade': {
    name: 'Kroot Blade',
    range: 'Melee',
    type: 'Melee',
    strength: 'User',
    ap: 0,
    damage: 1,
    abilities: ['Melee'],
    category: 'Melee Weapon',
    description: 'Kroot close combat weapon'
  },
  'ritual_blade': {
    name: 'Ritual Blade',
    range: 'Melee',
    type: 'Melee',
    strength: '+1',
    ap: -1,
    damage: 1,
    abilities: ['Melee'],
    category: 'Melee Weapon',
    description: 'Kroot Shaper ceremonial weapon'
  },
  'ripping_fangs': {
    name: 'Ripping Fangs',
    range: 'Melee',
    type: 'Melee',
    strength: 'User',
    ap: 0,
    damage: 1,
    abilities: ['Melee'],
    category: 'Melee Weapon',
    description: 'Kroot Hound natural weapons'
  },
  'neutron_blaster': {
    name: 'Neutron Blaster',
    range: '18\"',
    type: 'Assault 2',
    strength: 5,
    ap: 0,
    damage: 1,
    abilities: ['Assault'],
    category: 'Basic Weapon',
    description: 'Vespid energy weapon'
  },
  'stingwing_claws': {
    name: 'Stingwing Claws',
    range: 'Melee',
    type: 'Melee',
    strength: 'User',
    ap: 0,
    damage: 1,
    abilities: ['Melee'],
    category: 'Melee Weapon',
    description: 'Vespid natural weapons'
  },
  
  // Additional Kroot Weapons
  'krootox_fists': {
    name: 'Krootox Fists',
    range: 'Melee',
    type: 'Melee',
    strength: '+2',
    ap: -1,
    damage: 2,
    abilities: ['Melee'],
    category: 'Melee Weapon',
    description: 'Krootox natural weapons'
  },
  'kroot_bolt_thrower': {
    name: 'Kroot Bolt-thrower',
    range: '24"',
    type: 'Heavy 4',
    strength: 6,
    ap: -1,
    damage: 1,
    abilities: ['Heavy', 'Indirect Fire'],
    category: 'Heavy Weapon',
    description: 'Kroot artillery weapon'
  },
  'kroot_long_gun': {
    name: 'Kroot Long Gun',
    range: '30"',
    type: 'Heavy 1',
    strength: 5,
    ap: -1,
    damage: 2,
    abilities: ['Heavy', 'Precision'],
    category: 'Sniper Weapon',
    description: 'Kroot Lone-Spear precision rifle'
  },
  'hunting_stave': {
    name: 'Hunting Stave',
    range: 'Melee',
    type: 'Melee',
    strength: '+1',
    ap: 0,
    damage: 1,
    abilities: ['Melee'],
    category: 'Melee Weapon',
    description: 'Kroot Lone-Spear melee weapon'
  },
  'shaper_kroot_rifle': {
    name: 'Shaper Kroot Rifle',
    range: '24"',
    type: 'Rapid Fire 2',
    strength: 4,
    ap: 0,
    damage: 1,
    abilities: ['Rapid Fire'],
    category: 'Basic Weapon',
    description: 'Enhanced Kroot rifle'
  },
  'kroot_scattergun': {
    name: 'Kroot Scattergun',
    range: '12"',
    type: 'Assault 2',
    strength: 3,
    ap: 0,
    damage: 1,
    abilities: ['Assault', 'Torrent'],
    category: 'Basic Weapon',
    description: 'Kroot close-range weapon'
  },
  'bladestaves': {
    name: 'Bladestaves',
    range: 'Melee',
    type: 'Melee',
    strength: '+1',
    ap: -1,
    damage: 1,
    abilities: ['Melee', 'Twin-linked'],
    category: 'Melee Weapon',
    description: 'Kroot War Shaper paired weapons'
  },
  'flesh_shaper_tools': {
    name: 'Flesh Shaper Tools',
    range: '-',
    type: 'Support',
    strength: '-',
    ap: '-',
    damage: '-',
    abilities: ['Medical Support'],
    category: 'Support Equipment',
    description: 'Kroot medical instruments'
  },
  
  // Aircraft Weapons
  'quad_ion_turret': {
    name: 'Quad Ion Turret',
    range: '30"',
    type: 'Heavy 6',
    strength: 7,
    ap: -2,
    damage: 2,
    abilities: ['Heavy', 'Overcharge'],
    category: 'Aircraft Weapon',
    description: 'Razorshark primary weapon'
  },
  'accelerator_burst_cannon': {
    name: 'Accelerator Burst Cannon',
    range: '18"',
    type: 'Assault 4',
    strength: 6,
    ap: 0,
    damage: 1,
    abilities: ['Assault'],
    category: 'Aircraft Weapon',
    description: 'Razorshark secondary weapon'
  },
  'armoured_hull': {
    name: 'Armoured Hull',
    range: 'Melee',
    type: 'Melee',
    strength: 6,
    ap: 0,
    damage: 1,
    abilities: ['Melee'],
    category: 'Melee Weapon',
    description: 'Aircraft ramming attack'
  },
  
  // SPACE MARINE WEAPONS
  
  // Dreadnought Weapons
  'dreadnought_combat_weapon': {
    name: 'Dreadnought Combat Weapon',
    range: 'Melee',
    type: 'Melee',
    strength: '+6',
    ap: -3,
    damage: 3,
    abilities: ['Melee'],
    category: 'Melee Weapon',
    description: 'Standard Dreadnought close combat weapon'
  },
  'twin_lascannon': {
    name: 'Twin Lascannon',
    range: '48\"',
    type: 'Heavy 2',
    strength: 9,
    ap: -3,
    damage: 'D6',
    abilities: ['Heavy'],
    category: 'Heavy Weapon',
    description: 'Twin-linked lascannon system'
  },
  'twin_assault_cannon': {
    name: 'Twin Assault Cannon',
    range: '24\"',
    type: 'Heavy 12',
    strength: 6,
    ap: -1,
    damage: 1,
    abilities: ['Heavy', 'Devastating Wounds'],
    category: 'Heavy Weapon',
    description: 'Twin assault cannon system'
  },
  
  // Redemptor Dreadnought Weapons
  'macro_plasma_incinerator': {
    name: 'Macro Plasma Incinerator',
    range: '36\"',
    type: 'Heavy D6+1',
    strength: 8,
    ap: -4,
    damage: 2,
    abilities: ['Heavy', 'Blast', 'Hazardous'],
    category: 'Primary Weapon',
    description: 'Redemptor primary plasma weapon'
  },
  'heavy_onslaught_gatling_cannon': {
    name: 'Heavy Onslaught Gatling Cannon',
    range: '30\"',
    type: 'Heavy 12',
    strength: 5,
    ap: 0,
    damage: 1,
    abilities: ['Heavy', 'Devastating Wounds'],
    category: 'Primary Weapon',
    description: 'Redemptor alternative primary weapon'
  },
  'redemptor_fist': {
    name: 'Redemptor Fist',
    range: 'Melee',
    type: 'Melee',
    strength: '+6',
    ap: -3,
    damage: 3,
    abilities: ['Melee'],
    category: 'Melee Weapon',
    description: 'Redemptor close combat weapon'
  },
  'onslaught_gatling_cannon': {
    name: 'Onslaught Gatling Cannon',
    range: '24\"',
    type: 'Heavy 8',
    strength: 5,
    ap: 0,
    damage: 1,
    abilities: ['Heavy', 'Devastating Wounds'],
    category: 'Secondary Weapon',
    description: 'Redemptor secondary weapon'
  },
  'fragstorm_grenade_launcher': {
    name: 'Fragstorm Grenade Launcher',
    range: '18\"',
    type: 'Assault D6',
    strength: 4,
    ap: 0,
    damage: 1,
    abilities: ['Assault', 'Blast'],
    category: 'Secondary Weapon',
    description: 'Anti-infantry grenade launcher'
  },
  
  // Brutalis Dreadnought Weapons
  'brutalis_fists': {
    name: 'Brutalis Fists',
    range: 'Melee',
    type: 'Melee',
    strength: '+8',
    ap: -2,
    damage: 3,
    abilities: ['Melee', 'Twin-linked'],
    category: 'Melee Weapon',
    description: 'Brutalis assault fists'
  },
  'twin_bolt_rifle': {
    name: 'Twin Bolt Rifle',
    range: '24\"',
    type: 'Rapid Fire 2',
    strength: 4,
    ap: -1,
    damage: 1,
    abilities: ['Rapid Fire'],
    category: 'Basic Weapon',
    description: 'Twin bolt rifle system'
  },
  'hurricane_bolter': {
    name: 'Hurricane Bolter',
    range: '24\"',
    type: 'Rapid Fire 6',
    strength: 4,
    ap: 0,
    damage: 1,
    abilities: ['Rapid Fire'],
    category: 'Secondary Weapon',
    description: 'Multi-barrel bolter system'
  },
  
  // Force Weapons
  'force_weapon': {
    name: 'Force Weapon',
    range: 'Melee',
    type: 'Melee',
    strength: '+1',
    ap: -1,
    damage: 'D3',
    abilities: ['Melee', 'Psychic'],
    category: 'Melee Weapon',
    description: 'Psychically charged weapon'
  },
  'force_sword': {
    name: 'Force Sword',
    range: 'Melee',
    type: 'Melee',
    strength: '+1',
    ap: -2,
    damage: 'D3',
    abilities: ['Melee', 'Psychic'],
    category: 'Melee Weapon',
    description: 'Psychic sword'
  },
  'force_axe': {
    name: 'Force Axe',
    range: 'Melee',
    type: 'Melee',
    strength: '+2',
    ap: -2,
    damage: 'D3',
    abilities: ['Melee', 'Psychic'],
    category: 'Melee Weapon',
    description: 'Psychic axe'
  },
  'force_stave': {
    name: 'Force Stave',
    range: 'Melee',
    type: 'Melee',
    strength: '+1',
    ap: -1,
    damage: 'D3',
    abilities: ['Melee', 'Psychic', 'Two-handed'],
    category: 'Melee Weapon',
    description: 'Psychic staff'
  },
  'force_halberd': {
    name: 'Force Halberd',
    range: 'Melee',
    type: 'Melee',
    strength: '+2',
    ap: -2,
    damage: 'D3',
    abilities: ['Melee', 'Psychic', 'Two-handed'],
    category: 'Melee Weapon',
    description: 'Librarian Dreadnought weapon'
  },
  
  // Blood Angels Weapons
  'angelus_boltgun': {
    name: 'Angelus Boltgun',
    range: '12\"',
    type: 'Assault 2',
    strength: 4,
    ap: -1,
    damage: 1,
    abilities: ['Assault'],
    category: 'Basic Weapon',
    description: 'Sanguinary Guard weapon'
  },
  'encarmine_sword': {
    name: 'Encarmine Sword',
    range: 'Melee',
    type: 'Melee',
    strength: '+1',
    ap: -3,
    damage: 1,
    abilities: ['Melee'],
    category: 'Melee Weapon',
    description: 'Sanguinary Guard power sword'
  },
  'encarmine_axe': {
    name: 'Encarmine Axe',
    range: 'Melee',
    type: 'Melee',
    strength: '+2',
    ap: -3,
    damage: 1,
    abilities: ['Melee'],
    category: 'Melee Weapon',
    description: 'Sanguinary Guard power axe'
  },
  'inferno_pistol': {
    name: 'Inferno Pistol',
    range: '6\"',
    type: 'Pistol 1',
    strength: 8,
    ap: -4,
    damage: 'D3',
    abilities: ['Pistol', 'Melta 2'],
    category: 'Pistol',
    description: 'Compact melta weapon'
  },
  
  // Dark Angels Weapons
  'mace_of_absolution': {
    name: 'Mace of Absolution',
    range: 'Melee',
    type: 'Melee',
    strength: '+2',
    ap: -2,
    damage: 2,
    abilities: ['Melee'],
    category: 'Melee Weapon',
    description: 'Deathwing Knight weapon'
  },
  'flail_of_the_unforgiven': {
    name: 'Flail of the Unforgiven',
    range: 'Melee',
    type: 'Melee',
    strength: '+2',
    ap: -2,
    damage: 2,
    abilities: ['Melee', 'Devastating Wounds'],
    category: 'Melee Weapon',
    description: 'Deathwing Knight Champion weapon'
  },
  'corvus_hammer': {
    name: 'Corvus Hammer',
    range: 'Melee',
    type: 'Melee',
    strength: '+1',
    ap: -1,
    damage: 2,
    abilities: ['Melee'],
    category: 'Melee Weapon',
    description: 'Ravenwing Knight weapon'
  },
  'plasma_talon': {
    name: 'Plasma Talon',
    range: '18\"',
    type: 'Assault 2',
    strength: 7,
    ap: -3,
    damage: 1,
    abilities: ['Assault', 'Hazardous'],
    category: 'Special Weapon',
    description: 'Ravenwing plasma weapon'
  },
  
  // Vehicle Weapons
  'predator_autocannon': {
    name: 'Predator Autocannon',
    range: '48\"',
    type: 'Heavy 4',
    strength: 7,
    ap: -1,
    damage: 2,
    abilities: ['Heavy'],
    category: 'Vehicle Weapon',
    description: 'Predator turret weapon'
  },
  'las_talon': {
    name: 'Las-talon',
    range: '36\"',
    type: 'Heavy 2',
    strength: 9,
    ap: -3,
    damage: 'D6',
    abilities: ['Heavy'],
    category: 'Vehicle Weapon',
    description: 'Repulsor lascannon variant'
  },
  'twin_plasma_incinerator': {
    name: 'Twin Plasma Incinerator',
    range: '24\"',
    type: 'Heavy 2D3',
    strength: 7,
    ap: -3,
    damage: 1,
    abilities: ['Heavy', 'Blast', 'Hazardous'],
    category: 'Vehicle Weapon',
    description: 'Repulsor plasma weapon'
  },
  'heavy_laser_destroyer': {
    name: 'Heavy Laser Destroyer',
    range: '72\"',
    type: 'Heavy D3+3',
    strength: 12,
    ap: -3,
    damage: 'D6',
    abilities: ['Heavy'],
    category: 'Vehicle Weapon',
    description: 'Repulsor Executioner primary weapon'
  },
  'icarus_rocket_pod': {
    name: 'Icarus Rocket Pod',
    range: '24\"',
    type: 'Heavy D3',
    strength: 7,
    ap: -1,
    damage: 2,
    abilities: ['Heavy', 'Anti-Fly 2+'],
    category: 'Vehicle Weapon',
    description: 'Anti-aircraft missile system'
  },
  'twin_icarus_ironhail_heavy_stubber': {
    name: 'Twin Icarus Ironhail Heavy Stubber',
    range: '36\"',
    type: 'Heavy 8',
    strength: 4,
    ap: 0,
    damage: 1,
    abilities: ['Heavy', 'Anti-Fly 4+'],
    category: 'Vehicle Weapon',
    description: 'Anti-aircraft gun system'
  },
  'ironhail_heavy_stubber': {
    name: 'Ironhail Heavy Stubber',
    range: '36\"',
    type: 'Heavy 4',
    strength: 4,
    ap: 0,
    damage: 1,
    abilities: ['Heavy'],
    category: 'Vehicle Weapon',
    description: 'Vehicle-mounted heavy stubber'
  },
  
  // Artillery Weapons
  'whirlwind_castellan_launcher': {
    name: 'Whirlwind Castellan Launcher',
    range: '48\"',
    type: 'Heavy D6',
    strength: 6,
    ap: 0,
    damage: 1,
    abilities: ['Heavy', 'Blast', 'Indirect Fire'],
    category: 'Artillery',
    description: 'Standard Whirlwind missile launcher'
  },
  'whirlwind_vengeance_launcher': {
    name: 'Whirlwind Vengeance Launcher',
    range: '48\"',
    type: 'Heavy D3',
    strength: 7,
    ap: -1,
    damage: 2,
    abilities: ['Heavy', 'Blast', 'Indirect Fire'],
    category: 'Artillery',
    description: 'Heavy Whirlwind missile launcher'
  },
  
  // Sniper Weapons
  'bolt_sniper_rifle': {
    name: 'Bolt Sniper Rifle',
    range: '36\"',
    type: 'Heavy 1',
    strength: 4,
    ap: -2,
    damage: 2,
    abilities: ['Heavy', 'Precision', 'Ignores Cover'],
    category: 'Sniper Weapon',
    description: 'Eliminator sniper rifle'
  },
  'las_fusil': {
    name: 'Las Fusil',
    range: '36\"',
    type: 'Heavy 1',
    strength: 9,
    ap: -3,
    damage: 'D3',
    abilities: ['Heavy', 'Precision'],
    category: 'Sniper Weapon',
    description: 'Anti-armor sniper weapon'
  },
  'instigator_bolt_carbine': {
    name: 'Instigator Bolt Carbine',
    range: '24\"',
    type: 'Assault 3',
    strength: 4,
    ap: -1,
    damage: 1,
    abilities: ['Assault', 'Ignores Cover'],
    category: 'Special Weapon',
    description: 'Eliminator Sergeant weapon'
  },
  
  // Transport Weapons
  'deathwind_launcher': {
    name: 'Deathwind Launcher',
    range: '12\"',
    type: 'Heavy D6',
    strength: 5,
    ap: 0,
    damage: 1,
    abilities: ['Heavy', 'Blast'],
    category: 'Vehicle Weapon',
    description: 'Drop Pod defensive weapon'
  },
  'bellicatus_missile_array': {
    name: 'Bellicatus Missile Array',
    range: '48\"',
    type: 'Heavy D3',
    strength: 8,
    ap: -2,
    damage: 'D3',
    abilities: ['Heavy'],
    category: 'Vehicle Weapon',
    description: 'Impulsor missile system'
  }
};

// Function to get weapon details
export function getWeaponProfile(weaponName) {
  // Normalize weapon name for lookup
  const normalizedName = weaponName.toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^\w]/g, '')
    .replace(/_+/g, '_');
    
  return weaponProfiles[normalizedName] || {
    name: weaponName,
    range: '-',
    type: '-',
    strength: '-',
    ap: '-',
    damage: '-',
    abilities: [],
    category: 'Unknown',
    description: 'Weapon profile not found'
  };
}

// Function to categorize weapons
export function getWeaponsByCategory(category) {
  return Object.values(weaponProfiles).filter(weapon => weapon.category === category);
}

// Function to get all weapon categories
export function getWeaponCategories() {
  const categories = new Set();
  Object.values(weaponProfiles).forEach(weapon => {
    categories.add(weapon.category);
  });
  return Array.from(categories).sort();
} 