// Codex Astartes - Space Marine Military Doctrine
// Comprehensive tactical doctrine and organizational structure

export const spaceMarineDoctrine = {
  name: "Codex Astartes",
  origin: "Written by Roboute Guilliman, Primarch of the Ultramarines",
  description: "The foundational military manual governing Space Marine organization, tactics, and strategic doctrine",

  // Core Principles
  coreTeaching: {
    flexibility: "Adapt tactics to battlefield conditions and enemy capabilities",
    combined_arms: "Coordinate infantry, armor, and air support for maximum effectiveness",
    elite_deployment: "Deploy small, highly trained forces to achieve decisive objectives",
    rapid_deployment: "Strike fast and hard at critical points to disrupt enemy plans",
    tactical_supremacy: "Maintain battlefield superiority through superior training and equipment"
  },

  // Chapter Organization Structure
  organization: {
    chapter_master: {
      role: "Supreme commander of the Chapter",
      authority: "Overall strategic command and Chapter direction",
      equipment: "Finest weapons and armor available to the Chapter",
      bodyguard: "Honor Guard or Command Squad"
    },
    
    company_structure: {
      first_company: {
        name: "Veteran Company",
        composition: "100 Veterans in Terminator or power armor",
        role: "Elite assault formations and Chapter heroes",
        deployment: "Critical objectives and enemy strongpoints"
      },
      
      battle_companies: {
        composition: "Companies 2-5, each with 100 Space Marines",
        structure: {
          tactical_squads: 6,
          assault_squads: 2,
          devastator_squads: 2
        },
        role: "Primary fighting formations",
        support: "Dreadnoughts, vehicles, and aircraft"
      },
      
      reserve_companies: {
        sixth_seventh: "Tactical reserves - additional Tactical Squads",
        eighth: "Assault reserves - Close support specialists",
        ninth: "Devastator reserves - Heavy weapons specialists",
        tenth: "Scout Company - Reconnaissance and recruitment"
      }
    }
  },

  // Combat Doctrines by Chapter
  chapterDoctrines: {
    ultramarines: {
      name: "Ultramarines Tactical Doctrine",
      philosophy: "Strict adherence to Codex principles with tactical flexibility",
      strengths: [
        "Balanced combined arms approach",
        "Excellent tactical coordination",
        "Superior leadership and discipline",
        "Adaptive battlefield tactics"
      ],
      preferred_tactics: [
        "Combined arms assaults",
        "Coordinated fire support",
        "Tactical withdrawals and redeployment",
        "Objective-focused operations"
      ],
      special_rules: {
        tactical_doctrine: "Enhanced coordination between different unit types",
        leadership_inspiration: "Improved morale and effectiveness of nearby units",
        codex_discipline: "Reduced scatter for orbital bombardments and deep strikes"
      }
    },

    blood_angels: {
      name: "Blood Angels Assault Doctrine",
      philosophy: "Aggressive close-quarters combat emphasizing speed and ferocity",
      strengths: [
        "Exceptional close combat prowess",
        "Superior jump pack tactics",
        "Rapid assault capabilities",
        "Psychological warfare through intimidation"
      ],
      preferred_tactics: [
        "Jump pack assault formations",
        "Rapid deployment and engagement",
        "Close combat specialization",
        "Terror tactics and shock assault"
      ],
      special_rules: {
        red_thirst: "Enhanced combat effectiveness in close quarters",
        death_company: "Berserker units with exceptional combat ability",
        sanguinary_discipline: "Resistance to fear and morale effects"
      }
    },

    dark_angels: {
      name: "Dark Angels Strategic Doctrine",
      philosophy: "Secretive operations with emphasis on elite formations",
      strengths: [
        "Elite Deathwing Terminator squads",
        "Fast attack Ravenwing formations",
        "Plasma weapon specialization",
        "Independent operation capability"
      ],
      preferred_tactics: [
        "Elite spearhead assaults",
        "Plasma weapon focus fire",
        "Coordinated Deathwing/Ravenwing operations",
        "Secretive mission parameters"
      ],
      special_rules: {
        deathwing_assault: "Superior Terminator deployment and tactics",
        ravenwing_support: "Enhanced fast attack coordination",
        plasma_mastery: "Improved plasma weapon reliability and effectiveness"
      }
    },

    imperial_fists: {
      name: "Imperial Fists Siege Doctrine",
      philosophy: "Masters of fortification and siege warfare",
      strengths: [
        "Exceptional defensive capabilities",
        "Siege warfare specialization",
        "Heavy weapons expertise",
        "Fortification construction and assault"
      ],
      preferred_tactics: [
        "Defensive positioning and fire lanes",
        "Siege warfare and urban combat",
        "Heavy weapons fire support",
        "Fortified position assault"
      ],
      special_rules: {
        siege_masters: "Enhanced effectiveness against fortifications",
        bolter_drill: "Improved bolt weapon accuracy and rate of fire",
        defensive_doctrine: "Superior performance in defensive scenarios"
      }
    },

    iron_hands: {
      name: "Iron Hands Tech-War Doctrine",
      philosophy: "Technology and machine enhancement of warfare",
      strengths: [
        "Vehicle warfare specialization",
        "Technological superiority",
        "Cybernetic enhancement",
        "Machine-spirit communion"
      ],
      preferred_tactics: [
        "Vehicle-heavy formations",
        "Technological warfare",
        "Coordinated machine attacks",
        "Tech-marine integration"
      ],
      special_rules: {
        machine_empathy: "Enhanced vehicle performance and repair",
        cybernetic_enhancement: "Improved Marine capabilities through technology",
        tech_mastery: "Superior equipment maintenance and modification"
      }
    },

    salamanders: {
      name: "Salamanders Fire-War Doctrine", 
      philosophy: "Flame weapons and protection of human life",
      strengths: [
        "Flame weapon mastery",
        "Exceptional durability",
        "Civilian protection focus",
        "Master-crafted equipment"
      ],
      preferred_tactics: [
        "Flame weapon specialization",
        "Close support operations",
        "Defensive protection missions",
        "Master-crafted weapon deployment"
      ],
      special_rules: {
        flame_mastery: "Enhanced flame weapon effectiveness and range",
        salamander_resilience: "Improved resistance to damage and environmental hazards",
        master_craftsmen: "Superior weapon and armor quality"
      }
    }
  },

  // Combat Doctrines
  combatDoctrines: {
    devastator_doctrine: {
      phase: "Opening engagement",
      focus: "Heavy weapons supremacy",
      units: ["Devastator Squads", "Heavy Intercessors", "Vehicles"],
      tactics: "Establish fire superiority and eliminate key targets",
      duration: "First 2 turns of engagement"
    },

    tactical_doctrine: {
      phase: "Main engagement",
      focus: "Balanced combined arms",
      units: ["Tactical Squads", "Intercessors", "All-rounders"],
      tactics: "Coordinate all elements for battlefield control",
      duration: "Turns 3-4 of engagement"
    },

    assault_doctrine: {
      phase: "Final engagement",
      focus: "Close combat superiority", 
      units: ["Assault Marines", "Terminators", "Close combat specialists"],
      tactics: "Decisive close quarters combat and objective seizure",
      duration: "Final turns of engagement"
    }
  }
};

// Space Marine Military Roles
export const spaceMarineMilitaryRoles = {
  command: {
    description: "Leadership and tactical coordination",
    units: ["Captain", "Chaplain", "Librarian"],
    battlefield_role: "Provide leadership, inspiration, and tactical coordination",
    strategic_importance: "Critical for force cohesion and effectiveness"
  },

  line_infantry: {
    description: "Versatile battlefield troops",
    units: ["Tactical Squad", "Intercessor Squad", "Assault Intercessor Squad"],
    battlefield_role: "Hold objectives, provide fire support, advance under fire",
    strategic_importance: "Core fighting strength of any Space Marine force"
  },

  elite_assault: {
    description: "Specialized heavy assault troops",
    units: ["Terminator Squad", "Assault Terminators", "Bladeguard Veterans"],
    battlefield_role: "Breakthrough operations, enemy elimination, critical objectives",
    strategic_importance: "Force multipliers for decisive actions"
  },

  fire_support: {
    description: "Heavy weapons and long-range fire",
    units: ["Devastator Squad", "Heavy Intercessor Squad"],
    battlefield_role: "Suppress enemy positions, eliminate armor, provide covering fire",
    strategic_importance: "Essential for battlefield superiority"
  },

  mobile_warfare: {
    description: "Fast attack and reconnaissance",
    units: ["Assault Squad", "Bike Squad", "Outrider Squad"],
    battlefield_role: "Rapid deployment, flanking actions, pursuit operations",
    strategic_importance: "Tactical flexibility and battlefield mobility"
  },

  armored_support: {
    description: "Vehicle warfare and heavy armor",
    units: ["Predator", "Land Raider", "Whirlwind"],
    battlefield_role: "Mobile fire support, troop transport, siege operations",
    strategic_importance: "Force projection and heavy combat capability"
  }
}; 