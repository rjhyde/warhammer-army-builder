import React from 'react';
import './DifficultySelector.css';

const difficultyLevels = [
  {
    id: 'easy',
    name: 'Easy',
    description: 'Basic army composition with straightforward tactics',
    details: [
      'Standard unit formations',
      'Basic equipment loadouts',
      'Limited special characters',
      'Straightforward deployment'
    ],
    color: '#4CAF50'
  },
  {
    id: 'medium',
    name: 'Medium',
    description: 'Balanced force with moderate synergies and tactical flexibility',
    details: [
      'Mixed unit types with synergy',
      'Moderate use of special rules',
      'Balanced equipment choices',
      'Tactical coordination'
    ],
    color: '#FF9800'
  },
  {
    id: 'hard',
    name: 'Hard',
    description: 'Highly optimized army with strong synergies and veteran formations',
    details: [
      'Optimized unit combinations',
      'Named characters and heroes',
      'Competitive equipment loadouts',
      'Elite tactical coordination'
    ],
    color: '#F44336'
  },
  {
    id: 'extreme',
    name: 'Extreme',
    description: 'Tournament-level army with maximum optimization and legendary leaders',
    details: [
      'Meta-optimized compositions',
      'Legendary character support',
      'Highly specialized loadouts',
      'Complex tactical synergies'
    ],
    color: '#9C27B0'
  }
];

function DifficultySelector({ onDifficultySelect, scenario }) {
  const handleDifficultySelect = (difficulty) => {
    onDifficultySelect(difficulty);
  };

  const getContextualInfo = (difficulty, scenario) => {
    const contextMap = {
      easy: {
        defensive: 'Basic infantry formations with standard defensive equipment',
        assault: 'Standard assault troops with straightforward tactics',
        siege: 'Simple combined arms approach',
        reconnaissance: 'Basic reconnaissance units with limited support',
        research: 'Standard security detachment with basic equipment'
      },
      medium: {
        defensive: 'Balanced force with heavy weapons support and tactical coordination',
        assault: 'Combined arms assault with specialized units and support',
        siege: 'Coordinated siege tactics with appropriate equipment',
        reconnaissance: 'Fast attack units with moderate specialist support',
        research: 'Balanced security force with specialized equipment'
      },
      hard: {
        defensive: 'Optimized defensive formation with veteran units and character support',
        assault: 'Elite assault spearhead with veteran formations and leaders',
        siege: 'Specialized siege warfare units with experienced commanders',
        reconnaissance: 'Elite fast attack formations with specialist equipment',
        research: 'Elite security forces with advanced technology and tactics'
      },
      extreme: {
        defensive: 'Meta-optimized defensive castle with legendary commanders',
        assault: 'Tournament-level alpha strike with maximum synergies',
        siege: 'Elite siege specialists with legendary leader support',
        reconnaissance: 'Maximum mobility with overwhelming specialist support',
        research: 'Elite special operations force with legendary commanders'
      }
    };

    return contextMap[difficulty]?.[scenario?.context] || 'Standard military deployment for this difficulty';
  };

  return (
    <div className="difficulty-selector">
      <h2>Choose Difficulty Level</h2>
      <p className="scenario-context">
        <strong>Scenario:</strong> {scenario?.name}
      </p>
      <p className="difficulty-explanation">
        Difficulty determines how optimized and tactically sophisticated the army will be. 
        Higher difficulties result in more competitive, well-coordinated forces with veteran units and legendary leaders.
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
                {getContextualInfo(level.id, scenario)}
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