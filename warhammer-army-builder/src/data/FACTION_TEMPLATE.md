# Faction Implementation Template

## Step-by-Step Guide to Adding a New Faction

### 1. Create Unit File: `{factionName}Units.js`

Replace `{factionName}` with your faction (e.g., `orkUnits.js`, `necronUnits.js`)

```javascript
// Example: orkUnits.js
export const orkUnits = {
  hq: [
    {
      id: 'warboss',
      name: 'Warboss',
      points: 120,
      models: 1,
      keywords: ['Character', 'HQ', 'Ork', 'Infantry'],
      equipment: {
        base: ['Power klaw', 'Slugga'],
        options: [
          { name: 'Big choppa', cost: 5 },
          { name: 'Kombi-weapon', cost: 10 }
        ]
      },
      subfactionSynergy: {
        goffs: 'very_high',
        bad_moons: 'medium',
        evil_sunz: 'high',
        // ... all subfactions
      },
      competitiveLevel: 'high',
      loreRoles: ['Command', 'Melee Combat'],
      description: 'Brutal Ork leader'
    }
    // Add more HQ units...
  ],
  
  troops: [
    {
      id: 'boyz',
      name: 'Boyz',
      points: 90,
      models: 10,
      keywords: ['Infantry', 'Troops', 'Ork', 'Core'],
      equipment: {
        base: ['Slugga', 'Choppa'],
        options: [
          { name: 'Big shoota (1 per 10)', cost: 10 },
          { name: 'Rokkit launcha (1 per 10)', cost: 15 }
        ]
      },
      subfactionSynergy: {
        goffs: 'high',
        bad_moons: 'medium',
        evil_sunz: 'very_high',
        // ... all subfactions
      },
      competitiveLevel: 'medium',
      loreRoles: ['Line Infantry', 'Melee Combat'],
      description: 'Basic Ork infantry'
    }
    // Add more...
  ],
  
  elites: [/* Elite units */],
  fastAttack: [/* Fast Attack units */],
  heavySupport: [/* Heavy Support units */],
  namedCharacters: [/* Named Characters */]
};

export const scenarioModifiers = {
  defensive: {
    prioritize: ['boyz', 'lootas'],
    bonusUnits: ['boyz', 'lootas'],
    avoid: ['stormboyz'],
    characterPreference: ['warboss'],
    modifiers: {
      troops: 1.2,
      heavySupport: 1.3,
      fastAttack: 0.8
    },
    tacticalPriority: 'Hold ground with dakka and choppas'
  },
  // ... other scenarios
};

export const difficultyModifiers = {
  easy: {
    namedCharacters: false,
    optimizedLoadouts: false,
    maxSynergy: false,
    preferBasicUnits: true,
    competitiveOnly: false,
    description: 'Basic Ork mob tactics'
  },
  // ... other difficulties
};
```

### 2. Create Doctrine File: `{factionName}Doctrine.js`

```javascript
// Example: orkDoctrine.js
export const orkDoctrine = {
  name: "Ork Mob Doctrine",
  origin: "Da biggest boss makes da rules",
  description: "Might makes right - crude but effective",

  coreTeaching: {
    mob_rule: "More Orks means more dakka and more WAAAGH!",
    speed_kills: "Red ones go faster, hit harder",
    big_guns: "Bigger is always better"
  },

  scenarioDoctrine: {
    defensive: {
      name: "Dig In an' Shoot",
      description: "Hold ground with overwhelming firepower",
      composition: {
        command: { min: 5, max: 15 },
        infantry: { min: 40, max: 60 },
        armor: { min: 15, max: 35 },
        support: { min: 10, max: 25 }
      },
      priorityRoles: ['Line Infantry', 'Heavy Support'],
      realWorldAnalog: "Defensive positions with heavy weapons"
    }
    // ... other scenarios
  },

  subfactionDoctrines: {
    goffs: {
      name: "Goff Klan Doctrine",
      philosophy: "Get in close and krump 'em good",
      strengths: ["Close combat excellence", "Mob coordination"],
      preferred_tactics: ["Mass infantry assault", "Melee specialization"]
    }
    // ... other klans
  },

  commandStructure: {
    minCommandRatio: 0.05,
    maxCommandRatio: 0.15,
    namedCharacterThreshold: 400
  },

  realismScaling: {
    easy: { description: "Basic mob tactics with simple coordination" },
    medium: { description: "Organized WAAAGH! with clan specialization" },
    hard: { description: "Elite mobs with veteran bosses" },
    extreme: { description: "Maximum WAAAGH! with legendary warbosses" }
  }
};

export const orkMilitaryRoles = {
  command: {
    units: ['warboss', 'big_mek'],
    description: "Bosses and specialists who lead da boyz",
    realWorldRole: "Command structure and leadership"
  },
  
  line_infantry: {
    units: ['boyz', 'gretchin'],
    description: "Core infantry mobs",
    realWorldRole: "Main infantry formations"
  },
  
  elite_assault: {
    units: ['nobz', 'meganobz'],
    description: "Elite fighters and heavy armor",
    realWorldRole: "Shock troops and armored units"
  },
  
  fire_support: {
    units: ['lootas', 'flash_gitz'],
    description: "Heavy weapons and fire support",
    realWorldRole: "Artillery and support weapons"
  }
};
```

### 3. Update Faction Registry: `factionRegistry.js`

Add your faction to the registry:

```javascript
import { orkUnits, scenarioModifiers as orkScenarios, difficultyModifiers as orkDifficulty } from './orkUnits';
import { orkDoctrine, orkMilitaryRoles } from './orkDoctrine';

export const factionMetadata = {
  // ... existing factions
  
  orks: {
    name: "Orks",
    shortName: "Orks",
    description: "Brutal alien warriors who live for war and violence",
    playstyle: "Overwhelming numbers, close combat, crude but effective",
    difficulty: "Easy",
    icon: "🟢",
    primaryColor: "#22C55E",
    accentColor: "#DC2626",
    subfactions: {
      goffs: {
        name: "Goffs",
        description: "Close combat specialists",
        playstyle: "Melee focused with mob tactics",
        bonuses: ["Enhanced close combat", "Leadership bonuses"]
      },
      bad_moons: {
        name: "Bad Moons",
        description: "Wealthy Orks with the best gear",
        playstyle: "Superior equipment and dakka",
        bonuses: ["Better weapons", "More equipment options"]
      }
      // ... other klans
    }
  }
};

export const factionRegistry = {
  // ... existing factions
  
  orks: {
    metadata: factionMetadata.orks,
    units: orkUnits,
    scenarioModifiers: orkScenarios,
    difficultyModifiers: orkDifficulty,
    militaryDoctrine: orkDoctrine,
    militaryRoles: orkMilitaryRoles,
    wargearSystem: 'ork_wargear',
    pointsTarget: 2000
  }
};
```

### 4. Validation Checklist

Before testing your new faction:

- [ ] All unit categories (hq, troops, elites, fastAttack, heavySupport, namedCharacters) are present
- [ ] Every unit has synergy ratings for ALL subfactions
- [ ] Scenario modifiers include both `prioritize`/`bonusUnits` and `avoid` arrays
- [ ] Difficulty modifiers have all required boolean flags
- [ ] Military roles reference actual unit IDs
- [ ] Faction metadata includes icon, colors, and subfaction descriptions
- [ ] All strings use faction-agnostic language where appropriate

### 5. Testing Your Faction

1. Import the faction in `factionRegistry.js`
2. Add it to both `factionMetadata` and `factionRegistry`
3. Start the development server: `npm start`
4. Select your faction and test army generation
5. Verify all difficulty levels work
6. Test different scenarios
7. Check that subfaction restrictions work correctly

### 6. Common Pitfalls to Avoid

- **Inconsistent Synergy**: Every unit must have synergy ratings for every subfaction
- **Missing Arrays**: Scenario modifiers need `prioritize`, `avoid`, and `characterPreference` arrays
- **Wrong Unit IDs**: Military roles must reference actual unit `id` values
- **Faction-Specific Language**: Use generic terms in difficulty descriptions
- **Missing Fallbacks**: Always provide fallback values for optional properties

### 7. File Structure Summary

```
src/data/
├── FACTION_STRUCTURE_SCHEMA.md    # This documentation
├── FACTION_TEMPLATE.md            # This template
├── factionRegistry.js             # Central registry
├── orkUnits.js                    # Your faction units
├── orkDoctrine.js                 # Your faction doctrine
└── orkWargear.js                  # Your faction equipment (optional)
```

This structure ensures consistency, maintainability, and easy expansion for future factions. 