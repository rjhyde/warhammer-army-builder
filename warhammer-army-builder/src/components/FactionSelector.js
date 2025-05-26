import React from 'react';
import './FactionSelector.css';

const tauSubfactions = [
  {
    id: 'tau_empire',
    name: 'T\'au Empire (T\'au Sept)',
    description: 'The original T\'au Sept, masters of combined arms warfare and technological innovation.',
    strengths: [
      'Balanced combined arms approach',
      'Strong Fire Warrior core',
      'Excellent drone support',
      'Flexible tactics'
    ],
    loreTraits: [
      'Disciplined military doctrine',
      'Advanced technology integration',
      'Coordinated battlefield tactics',
      'Moderate range preferences'
    ],
    preferredScenarios: ['defensive', 'general', 'research'],
    color: '#FFA726'
  },
  {
    id: 'farsight_enclaves',
    name: 'Farsight Enclaves',
    description: 'Rebel T\'au forces led by Commander Farsight, favoring close-range battlesuit warfare.',
    strengths: [
      'Elite battlesuit formations',
      'Close-range specialists',
      'Aggressive tactics',
      'Named character support'
    ],
    loreTraits: [
      'Aggressive military doctrine',
      'Battlesuit-heavy forces',
      'Short to medium range focus',
      'Independent operations'
    ],
    preferredScenarios: ['assault', 'siege', 'excavation'],
    color: '#E57373'
  },
  {
    id: 'bork_an',
    name: 'Bork\'an Sept',
    description: 'Masters of long-range warfare and advanced weapon technology.',
    strengths: [
      'Extended weapon ranges',
      'Superior marksmanship',
      'Advanced weapon systems',
      'Long-range fire support'
    ],
    loreTraits: [
      'Technological superiority',
      'Long-range engagement preference',
      'Precise targeting doctrine',
      'Defensive positioning'
    ],
    preferredScenarios: ['defensive', 'research', 'general'],
    color: '#81C784'
  },
  {
    id: 'vior_la',
    name: 'Vior\'la Sept',
    description: 'Aggressive hunters known for rapid deployment and aggressive tactics.',
    strengths: [
      'Rapid deployment',
      'Aggressive fire tactics',
      'Mobile warfare',
      'Hunter-killer doctrine'
    ],
    loreTraits: [
      'Aggressive pursuit tactics',
      'Mobile strike forces',
      'Hunt-focused doctrine',
      'Fast engagement preference'
    ],
    preferredScenarios: ['assault', 'patrol', 'excavation'],
    color: '#9575CD'
  },
  {
    id: 'sacea',
    name: 'Sa\'cea Sept',
    description: 'Masters of defensive warfare and strategic positioning.',
    strengths: [
      'Defensive expertise',
      'Strategic positioning',
      'Coordinated fire support',
      'Battlefield control'
    ],
    loreTraits: [
      'Defensive mastery',
      'Strategic doctrine',
      'Coordinated tactics',
      'Territorial control'
    ],
    preferredScenarios: ['defensive', 'siege', 'research'],
    color: '#64B5F6'
  }
];

function FactionSelector({ onFactionSelect, scenario, difficulty }) {
  const getRecommendationScore = (subfaction) => {
    let score = 0;
    
    // Scenario compatibility
    if (subfaction.preferredScenarios.includes(scenario?.context)) {
      score += 2;
    }
    
    // Difficulty considerations
    if (difficulty === 'hard' || difficulty === 'extreme') {
      if (subfaction.id === 'farsight_enclaves') score += 1; // Named characters
      if (subfaction.id === 'bork_an') score += 1; // Competitive range advantage
    }
    
    return score;
  };

  const getSuitabilityText = (subfaction) => {
    const score = getRecommendationScore(subfaction);
    if (score >= 2) return '🎯 Highly Recommended';
    if (score === 1) return '✅ Good Match';
    return '⚪ Suitable';
  };

  const getLoreJustification = (subfaction) => {
    const justifications = {
      tau_empire: {
        defensive: 'T\'au Sept\'s disciplined doctrine excels at organized defense',
        assault: 'Balanced approach allows for coordinated assault operations',
        siege: 'Combined arms doctrine effective in siege warfare',
        excavation: 'Technological expertise aids in archaeological operations',
        research: 'Advanced technology perfect for research facility operations',
        general: 'Versatile doctrine suitable for general engagements'
      },
      farsight_enclaves: {
        defensive: 'Aggressive doctrine can be adapted for defensive positions',
        assault: 'Battlesuit specialists excel at spearhead assaults',
        siege: 'Close-range battlesuit warfare perfect for siege breaking',
        excavation: 'Independent operations suit excavation missions',
        research: 'Elite forces capable of rapid facility capture',
        general: 'Experienced rebels adapt to various battlefield conditions'
      },
      bork_an: {
        defensive: 'Long-range superiority ideal for defensive positions',
        assault: 'Extended range allows for assault fire support',
        siege: 'Advanced weapons effective against fortifications',
        excavation: 'Precision weapons protect valuable archaeological sites',
        research: 'Technological mastery suits research operations',
        general: 'Superior marksmanship effective in all engagements'
      },
      vior_la: {
        defensive: 'Aggressive hunters can adapt to defensive hunting',
        assault: 'Rapid deployment perfect for assault operations',
        siege: 'Mobile warfare effective in siege scenarios',
        excavation: 'Hunter doctrine suits site exploration',
        research: 'Fast strike forces can quickly secure facilities',
        general: 'Aggressive tactics effective across scenarios'
      },
      sacea: {
        defensive: 'Masters of defensive warfare in their element',
        assault: 'Strategic positioning aids assault coordination',
        siege: 'Defensive expertise translates to siege warfare',
        excavation: 'Strategic control secures excavation sites',
        research: 'Battlefield control protects research operations',
        general: 'Strategic mastery applicable to all scenarios'
      }
    };

    return justifications[subfaction.id]?.[scenario?.context] || 'Suitable for the mission parameters';
  };

  const sortedSubfactions = [...tauSubfactions].sort((a, b) => 
    getRecommendationScore(b) - getRecommendationScore(a)
  );

  return (
    <div className="faction-selector">
      <h2>Choose T\'au Subfaction</h2>
      <div className="scenario-summary">
        <p><strong>Scenario:</strong> {scenario?.name}</p>
        <p><strong>Context:</strong> {scenario?.context}</p>
        <p><strong>Difficulty:</strong> {difficulty}</p>
      </div>

      <div className="subfaction-grid">
        {sortedSubfactions.map(subfaction => (
          <div key={subfaction.id} className="subfaction-card">
            <div 
              className="subfaction-header"
              style={{ borderTopColor: subfaction.color }}
            >
              <div className="recommendation-badge">
                {getSuitabilityText(subfaction)}
              </div>
              <h3>{subfaction.name}</h3>
              <p className="subfaction-description">{subfaction.description}</p>
            </div>

            <div className="subfaction-content">
              <div className="subfaction-section">
                <h4>Combat Strengths:</h4>
                <ul>
                  {subfaction.strengths.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </div>

              <div className="subfaction-section">
                <h4>Lore Characteristics:</h4>
                <ul>
                  {subfaction.loreTraits.map((trait, index) => (
                    <li key={index}>{trait}</li>
                  ))}
                </ul>
              </div>

              <div className="lore-justification">
                <h4>Why for this scenario:</h4>
                <p>{getLoreJustification(subfaction)}</p>
              </div>
            </div>

            <button 
              className="select-subfaction-btn"
              onClick={() => onFactionSelect(subfaction.id)}
              style={{ backgroundColor: subfaction.color }}
            >
              Deploy {subfaction.name}
            </button>
          </div>
        ))}
      </div>

      <div className="faction-note">
        <h4>🏛️ Lore Considerations:</h4>
        <p>
          Each T\'au sept has distinct tactical doctrines and cultural approaches to warfare. 
          The recommendations above consider which subfaction would most likely be deployed 
          for your chosen scenario based on established lore and tactical preferences.
        </p>
      </div>
    </div>
  );
}

export default FactionSelector; 