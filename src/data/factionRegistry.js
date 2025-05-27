// Central Faction Registry for Multi-Faction Army Builder
// Manages all available factions, their subfactions, and capabilities

import { tauUnits, scenarioModifiers as tauScenarioModifiers, difficultyModifiers as tauDifficultyModifiers } from './tauUnits';
import { spaceMarineUnits, scenarioModifiers as smScenarioModifiers, difficultyModifiers as smDifficultyModifiers } from './spaceMarineUnits';
import { militaryDoctrine as tauDoctrine, tauMilitaryRoles } from './militaryDoctrine';
import { spaceMarineDoctrine, spaceMarineMilitaryRoles } from './spaceMarineDoctrine';

// Faction metadata and UI information
export const factionMetadata = {
  tau_empire: {
    name: "T'au Empire",
    shortName: "T'au",
    description: "Advanced alien civilization emphasizing technology, combined arms warfare, and the Greater Good",
    playstyle: "Long-range firepower, combined arms, technological superiority",
    difficulty: "Moderate",
    icon: "🛸",
    primaryColor: "#FED7AA", // Tau Sept orange
    accentColor: "#DC2626", // Red accent
    subfactions: {
      tau_sept: {
        name: "T'au Sept",
        description: "The founding Sept, balanced and adaptable",
        playstyle: "Balanced combined arms with Fire Warrior emphasis",
        bonuses: ["Improved pulse weapon range", "Enhanced leadership"]
      },
      farsight_enclaves: {
        name: "Farsight Enclaves",
        description: "Aggressive battlesuit-focused breakaway faction",
        playstyle: "Elite battlesuit formations, close-range combat",
        bonuses: ["Battlesuit improvements", "Aggressive tactics"]
      },
      bork_an: {
        name: "Bork'an Sept",
        description: "Technological innovators with extended weapon ranges",
        playstyle: "Long-range superiority, advanced weaponry",
        bonuses: ["Extended weapon ranges", "Technological advantages"]
      },
      vior_la: {
        name: "Vior'la Sept",
        description: "Aggressive fire warriors with rapid deployment",
        playstyle: "Fast assault tactics, improved mobility",
        bonuses: ["Enhanced Fire Warrior abilities", "Rapid deployment"]
      },
      sacea: {
        name: "Sa'cea Sept",
        description: "Masters of combined arms and markerlight coordination",
        playstyle: "Coordinated support, markerlight mastery",
        bonuses: ["Markerlight improvements", "Leadership bonuses"]
      }
    }
  },

  space_marines: {
    name: "Adeptus Astartes",
    shortName: "Space Marines", 
    description: "Humanity's elite superhuman warriors, masters of combined arms warfare",
    playstyle: "Versatile combined arms, elite infantry, heavy armor support",
    difficulty: "Easy to Moderate",
    icon: "⚔️",
    primaryColor: "#1E40AF", // Imperial blue
    accentColor: "#FCD34D", // Imperial gold
    subfactions: {
      ultramarines: {
        name: "Ultramarines",
        description: "Exemplars of the Codex Astartes, tactically flexible",
        playstyle: "Balanced combined arms, tactical flexibility",
        bonuses: ["Tactical doctrine bonuses", "Leadership improvements"]
      },
      blood_angels: {
        name: "Blood Angels",
        description: "Close combat specialists with jump pack mastery",
        playstyle: "Aggressive assault, jump pack units, close combat",
        bonuses: ["Assault improvements", "Jump pack bonuses"]
      },
      dark_angels: {
        name: "Dark Angels",
        description: "Secretive chapter with plasma weapon expertise",
        playstyle: "Plasma weaponry, elite Deathwing and Ravenwing",
        bonuses: ["Plasma weapon improvements", "Elite unit bonuses"]
      },
      imperial_fists: {
        name: "Imperial Fists",
        description: "Siege warfare specialists and defensive masters",
        playstyle: "Defensive positions, heavy weapons, siege warfare",
        bonuses: ["Fortification bonuses", "Heavy weapon improvements"]
      },
      iron_hands: {
        name: "Iron Hands",
        description: "Technology-focused chapter with vehicle expertise",
        playstyle: "Vehicle heavy, technological upgrades",
        bonuses: ["Vehicle improvements", "Technological bonuses"]
      },
      salamanders: {
        name: "Salamanders",
        description: "Flame weapon specialists with resilient tactics",
        playstyle: "Flame weapons, resilient infantry, close support",
        bonuses: ["Flame weapon bonuses", "Durability improvements"]
      }
    }
  }
};

// Faction capabilities and data structure
export const factionRegistry = {
  tau_empire: {
    metadata: factionMetadata.tau_empire,
    units: tauUnits,
    scenarioModifiers: tauScenarioModifiers,
    difficultyModifiers: tauDifficultyModifiers,
    militaryDoctrine: tauDoctrine,
    militaryRoles: tauMilitaryRoles,
    wargearSystem: 'tau_wargear', // Reference to wargear system
    pointsTarget: 2000
  },

  space_marines: {
    metadata: factionMetadata.space_marines,
    units: spaceMarineUnits,
    scenarioModifiers: smScenarioModifiers, 
    difficultyModifiers: smDifficultyModifiers,
    militaryDoctrine: spaceMarineDoctrine,
    militaryRoles: spaceMarineMilitaryRoles,
    wargearSystem: 'space_marine_wargear',
    pointsTarget: 2000
  }
};

// Get all available factions
export function getAvailableFactions() {
  return Object.keys(factionRegistry).map(factionId => ({
    id: factionId,
    ...factionRegistry[factionId].metadata
  }));
}

// Get subfactions for a specific faction
export function getSubfactions(factionId) {
  const faction = factionRegistry[factionId];
  if (!faction) return [];
  
  return Object.entries(faction.metadata.subfactions).map(([subfactionId, data]) => ({
    id: subfactionId,
    factionId,
    ...data
  }));
}

// Get faction data
export function getFactionData(factionId) {
  return factionRegistry[factionId];
}

// Check if faction vs faction matchup has special rules
export function getMatchupModifiers(faction1, faction2) {
  const matchups = {
    'tau_empire_vs_space_marines': {
      name: 'Greater Good vs Imperial Might',
      description: 'Technology and coordination versus superhuman prowess and power armor',
      scenarios: [
        {
          name: 'Colonial Defense',
          description: 'T\'au defend a newly established colony from Space Marine reclamation force',
          context: 'defensive',
          specialRules: {
            tau_empire: ['Enhanced markerlight coordination', 'Defensive positions'],
            space_marines: ['Aggressive assault tactics', 'Drop pod deployment']
          }
        },
        {
          name: 'Relic Recovery',
          description: 'Both forces race to secure ancient technology',
          context: 'assault', 
          specialRules: {
            tau_empire: ['Mobile firebase tactics', 'Pathfinder reconnaissance'],
            space_marines: ['Rapid deployment', 'Objective securing']
          }
        },
        {
          name: 'Urban Warfare',
          description: 'House-to-house fighting in an Imperial city',
          context: 'siege',
          specialRules: {
            tau_empire: ['Pulse weapon effectiveness', 'Drone support'],
            space_marines: ['Bolt weapon supremacy', 'Power armor protection']
          }
        }
      ]
    }
  };

  const matchupKey = `${faction1}_vs_${faction2}`;
  const reverseKey = `${faction2}_vs_${faction1}`;
  
  return matchups[matchupKey] || matchups[reverseKey] || null;
}

// Generate faction vs faction scenarios
export function generateMatchupScenarios(faction1, faction2) {
  const matchup = getMatchupModifiers(faction1, faction2);
  if (matchup) {
    return matchup.scenarios;
  }

  // Generic scenarios for any faction matchup
  return [
    {
      name: 'Clash of Doctrines',
      description: `${factionMetadata[faction1].name} tactical doctrine vs ${factionMetadata[faction2].name} military tradition`,
      context: 'assault',
      specialRules: {}
    },
    {
      name: 'Defensive Stand',
      description: `${factionMetadata[faction1].name} defensive positions against ${factionMetadata[faction2].name} assault`,
      context: 'defensive', 
      specialRules: {}
    },
    {
      name: 'Mobile Engagement',
      description: `Fast-moving battle between ${factionMetadata[faction1].name} and ${factionMetadata[faction2].name} forces`,
      context: 'reconnaissance',
      specialRules: {}
    }
  ];
}

export default factionRegistry; 