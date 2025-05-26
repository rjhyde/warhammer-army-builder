import React from 'react';
import './DifficultySelector.css';

const difficultyLevels = [
  {
    id: 'easy',
    name: 'Easy',
    description: 'Basic army composition with limited synergies',
    details: [
      'Standard troop formations',
      'Limited special characters',
      'Basic equipment loadouts',
      'Straightforward tactics'
    ],
    color: '#4CAF50'
  },
  {
    id: 'medium',
    name: 'Medium',
    description: 'Balanced force with moderate synergies and competitive elements',
    details: [
      'Mixed unit types with some synergy',
      'Moderate use of special rules',
      'Balanced equipment choices',
      'Tactical flexibility'
    ],
    color: '#FF9800'
  },
  {
    id: 'hard',
    name: 'Hard',
    description: 'Highly optimized army with strong synergies and competitive build',
    details: [
      'Optimized unit combinations',
      'Named characters and relics',
      'Competitive equipment loadouts',
      'Strong tactical synergies'
    ],
    color: '#F44336'
  },
  {
    id: 'extreme',
    name: 'Extreme',
    description: 'Tournament-level army with maximum synergies and optimization',
    details: [
      'Meta-optimized compositions',
      'Maximum character support',
      'Highly specialized loadouts',
      'Complex tactical interactions'
    ],
    color: '#9C27B0'
  }
];

function DifficultySelector({ onDifficultySelect, scenario }) {
  const handleDifficultySelect = (difficulty) => {
    onDifficultySelect(difficulty);
  };

  const getTauContextualInfo = (difficulty, scenario) => {
    const contextMap = {
      easy: {
        defensive: 'Basic Fire Warrior teams with Pulse Rifle support',
        assault: 'Standard Strike Teams with minimal drone support',
        siege: 'Straightforward gunline tactics',
        excavation: 'Basic Pathfinder reconnaissance',
        research: 'Simple infiltration teams'
      },
      medium: {
        defensive: 'Fire Warriors with Crisis Suit support and tactical drones',
        assault: 'Balanced Strike Teams with Stealth Suit reconnaissance',
        siege: 'Combined arms with moderate Battlesuit support',
        excavation: 'Pathfinders with Crisis Suit excavation teams',
        research: 'Stealth teams with technical specialists'
      },
      hard: {
        defensive: 'Optimized gunlines with Commander support and drone screens',
        assault: 'Crisis Suit spearhead with coordinated drone support',
        siege: 'Heavy Battlesuit presence with named Commander',
        excavation: 'Specialized archaeological teams with heavy protection',
        research: 'Elite infiltration with advanced technology'
      },
      extreme: {
        defensive: 'Meta-optimized castle with maximum synergies',
        assault: 'Tournament-level alpha strike composition',
        siege: 'Competitive Battlesuit spam with character support',
        excavation: 'Overwhelming technological superiority',
        research: 'Elite special operations force'
      }
    };

    return contextMap[difficulty]?.[scenario?.context] || contextMap[difficulty]?.general || 'Standard Tau deployment';
  };

  return (
    <div className="difficulty-selector">
      <h2>Choose Difficulty Level</h2>
      <p className="scenario-context">
        <strong>Scenario:</strong> {scenario?.name}
      </p>
      <p className="difficulty-explanation">
        Difficulty determines how optimized and synergistic the Tau army will be. 
        Higher difficulties result in more competitive, well-coordinated forces.
      </p>

      <div className="difficulty-grid">
        {difficultyLevels.map(level => (
          <div key={level.id} className="difficulty-card">
            <div 
              className="difficulty-header"
              style={{ borderLeftColor: level.color }}
            >
              <h3>{level.name}</h3>
              <p className="difficulty-description">{level.description}</p>
            </div>

            <div className="difficulty-details">
              <h4>General Characteristics:</h4>
              <ul>
                {level.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>

              <h4>For This Scenario:</h4>
              <p className="contextual-info">
                {getTauContextualInfo(level.id, scenario)}
              </p>
            </div>

            <button 
              className="select-difficulty-btn"
              onClick={() => handleDifficultySelect(level.id)}
              style={{ backgroundColor: level.color }}
            >
              Select {level.name}
            </button>
          </div>
        ))}
      </div>

      <div className="difficulty-note">
        <h4>📋 Note for Event Organizers:</h4>
        <p>
          Consider the experience level of your players when selecting difficulty. 
          New players may struggle against Hard or Extreme armies, while experienced 
          players might find Easy armies unchallenging.
        </p>
      </div>
    </div>
  );
}

export default DifficultySelector; 