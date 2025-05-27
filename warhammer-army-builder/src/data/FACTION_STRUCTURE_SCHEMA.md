# Warhammer 40k Army Builder - Faction Structure Schema

## Overview
This document defines the standardized structure that all factions must follow for consistency, maintainability, and easy expansion of the army builder system.

## Core Faction File Structure

### 1. Units Export (`{faction}Units.js`)
```javascript
export const {faction}Units = {
  // Required unit categories
  hq: [...],
  troops: [...], 
  elites: [...],
  fastAttack: [...],
  heavySupport: [...],
  namedCharacters: [...]
};
```

### 2. Scenario Modifiers Export
```javascript
export const scenarioModifiers = {
  // Standard scenario contexts
  defensive: {
    prioritize: [],           // Units to prioritize (T'au style)
    bonusUnits: [],          // Alternative: bonus units (Space Marine style) 
    avoid: [],               // Units to avoid
    characterPreference: [], // Preferred characters
    modifiers: {},           // Optional: category modifiers
    tacticalPriority: ""     // Optional: tactical description
  },
  assault: { /* same structure */ },
  siege: { /* same structure */ },
  reconnaissance: { /* same structure */ },
  research: { /* same structure */ },
  general: { /* fallback structure */ }
};
```

### 3. Difficulty Modifiers Export
```javascript
export const difficultyModifiers = {
  easy: {
    // Boolean flags for features
    namedCharacters: false,
    optimizedLoadouts: false,
    maxSynergy: false,
    preferBasicUnits: true,
    competitiveOnly: false,
    
    // Optional: additional properties for Space Marine style
    pointsModifier: 0.8,
    unitComplexity: 'low',
    preferredUnits: [],
    description: 'Faction-agnostic description'
  },
  medium: { /* same structure */ },
  hard: { /* same structure */ },
  extreme: { /* same structure */ }
};
```

## Unit Object Structure

### Standard Unit Properties
```javascript
{
  // Required properties
  id: 'unique_unit_identifier',
  name: 'Display Name',
  points: 100,
  models: 1,
  keywords: ['Keyword1', 'Keyword2'],
  
  // Equipment system
  equipment: {
    base: ['Standard weapon', 'Standard armor'],
    options: [
      { name: 'Optional weapon', cost: 10 },
      { name: 'Optional upgrade', cost: 5 }
    ]
  },
  
  // Faction synergy (all subfactions must be listed)
  subfactionSynergy: {
    subfaction_1: 'very_high', // none, low, medium, high, very_high
    subfaction_2: 'high',
    // ... all subfactions
  },
  
  // Competitive rating
  competitiveLevel: 'medium', // low, medium, high, very_high
  
  // Lore and tactical roles
  loreRoles: ['Primary Role', 'Secondary Role'],
  
  // Optional properties
  restrictions: ['subfaction_specific_restriction'],
  abilities: ['Special Rule 1', 'Special Rule 2'],
  description: 'Unit description'
}
```

## Military Doctrine Structure (`{faction}Doctrine.js`)

### Standard Doctrine Export
```javascript
export const {faction}Doctrine = {
  // Basic information
  name: "Doctrine Name",
  origin: "Historical origin",
  description: "Overview description",
  
  // Core military principles
  coreTeaching: {
    principle_1: "Description",
    principle_2: "Description"
  },
  
  // Scenario-specific doctrines
  scenarioDoctrine: {
    defensive: {
      name: "Defensive Doctrine Name",
      description: "How this faction approaches defense",
      composition: {
        command: { min: 5, max: 15 },    // Percentage ranges
        infantry: { min: 30, max: 60 },
        armor: { min: 20, max: 50 },
        support: { min: 5, max: 25 }
      },
      priorityRoles: ['role1', 'role2'], // Matches unit loreRoles
      realWorldAnalog: "Modern military comparison"
    },
    assault: { /* same structure */ },
    siege: { /* same structure */ },
    reconnaissance: { /* same structure */ },
    research: { /* same structure */ }
  },
  
  // Subfaction-specific doctrines
  subfactionDoctrines: {
    subfaction_1: {
      name: "Subfaction Doctrine Name",
      philosophy: "Tactical philosophy",
      strengths: ["Strength 1", "Strength 2"],
      preferred_tactics: ["Tactic 1", "Tactic 2"],
      special_rules: {
        rule_name: "Rule description"
      }
    }
    // ... other subfactions
  },
  
  // Command structure (optional but recommended)
  commandStructure: {
    minCommandRatio: 0.05,
    maxCommandRatio: 0.20,
    namedCharacterThreshold: 500
  },
  
  // Realism scaling descriptions
  realismScaling: {
    easy: { description: "Basic tactical deployment" },
    medium: { description: "Standard combined arms" },
    hard: { description: "Elite veteran formations" },
    extreme: { description: "Maximum effort operations" }
  }
};
```

## Military Roles Structure

### Standard Military Roles Export
```javascript
export const {faction}MilitaryRoles = {
  // Core roles (required)
  command: {
    units: ['unit_id_1', 'unit_id_2'],
    description: "Command and control elements",
    realWorldRole: "Military leadership comparison"
  },
  
  line_infantry: { // Primary infantry
    units: ['unit_id_1', 'unit_id_2'],
    description: "Main battle line troops",
    realWorldRole: "Infantry comparison"
  },
  
  elite_assault: { // Elite/armor units
    units: ['unit_id_1', 'unit_id_2'], 
    description: "Elite assault elements",
    realWorldRole: "Special forces comparison"
  },
  
  fire_support: { // Support units
    units: ['unit_id_1', 'unit_id_2'],
    description: "Fire support and logistics",
    realWorldRole: "Support elements comparison"
  },
  
  // Additional faction-specific roles (optional)
  custom_role: {
    units: ['unit_id_1'],
    description: "Faction-specific role",
    realWorldRole: "Specialized comparison"
  }
};
```

## Faction Registry Integration

### Metadata Structure
```javascript
{
  name: "Faction Full Name",
  shortName: "Short Name",
  description: "Faction overview",
  playstyle: "Tactical style description", 
  difficulty: "Easy/Moderate/Hard",
  icon: "🔫", // Emoji icon
  primaryColor: "#HEX", // Main faction color
  accentColor: "#HEX",  // Accent color
  
  subfactions: {
    subfaction_id: {
      name: "Subfaction Name",
      description: "Subfaction overview",
      playstyle: "Subfaction tactical style",
      bonuses: ["Bonus 1", "Bonus 2"]
    }
  }
}
```

## Compatibility Layer

### ArmyComposer Integration Points
The ArmyComposer should handle these variations gracefully:

1. **Scenario Modifiers**: Check for both `prioritize`/`avoid` (T'au style) and `bonusUnits` (Space Marine style)
2. **Difficulty Properties**: Handle both boolean flags and descriptive properties
3. **Doctrine Structure**: Access doctrine properties with optional chaining
4. **Military Roles**: Standardize on the core four roles, allow additional custom roles

### Validation Checklist
Before adding a new faction, verify:

- [ ] All required unit categories present
- [ ] All subfactions have synergy ratings for all units
- [ ] Scenario modifiers follow standard structure
- [ ] Difficulty modifiers include all boolean flags
- [ ] Military doctrine has scenario-specific compositions
- [ ] Military roles map to actual unit IDs
- [ ] Faction metadata includes all required fields
- [ ] Icons and colors are defined
- [ ] All strings are faction-agnostic where possible

## Migration Notes

### Existing Factions
- **T'au Empire**: Already mostly compliant, needs minor standardization
- **Space Marines**: Needs scenario modifier structure update to include T'au-style arrays

### Future Factions
All new factions should follow this schema exactly to ensure compatibility and maintainability.

## Example Implementation

See `exampleFaction.js` for a complete reference implementation following this schema. 