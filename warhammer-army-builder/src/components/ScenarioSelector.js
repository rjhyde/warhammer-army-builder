import React, { useState, useEffect } from 'react';
import { generateMatchupScenarios, getAvailableFactions } from '../data/factionRegistry';
import './ScenarioSelector.css';

// Regular universal scenarios that work for any faction
const universalScenarios = [
  {
    id: 'defensive_line',
    name: 'Defensive Line',
    description: 'Establish and hold defensive positions against enemy assault',
    context: 'defensive',
    type: 'universal'
  },
  {
    id: 'lightning_assault', 
    name: 'Lightning Assault',
    description: 'Rapid strike mission to capture key objectives',
    context: 'assault',
    type: 'universal'
  },
  {
    id: 'urban_warfare',
    name: 'Urban Warfare',
    description: 'House-to-house fighting in dense urban terrain',
    context: 'siege',
    type: 'universal'
  },
  {
    id: 'reconnaissance_force',
    name: 'Reconnaissance Mission',
    description: 'Fast-moving mission to gather intelligence',
    context: 'reconnaissance',
    type: 'universal'
  },
  {
    id: 'research_facility',
    name: 'Secure Research Facility',
    description: 'Protect or capture a strategic research installation',
    context: 'research',
    type: 'universal'
  }
];

function ScenarioSelector({ onScenarioSelect, selectedFaction, selectedSubfaction }) {
  const [availableScenarios, setAvailableScenarios] = useState([]);
  const [otherFactions, setOtherFactions] = useState([]);

  useEffect(() => {
    // Get all other factions for faction vs faction scenarios
    const allFactions = getAvailableFactions();
    const others = allFactions.filter(faction => faction.id !== selectedFaction);
    setOtherFactions(others);

    // Build available scenarios list
    const scenarios = [...universalScenarios];
    
    // Add faction vs faction scenarios for each other faction
    others.forEach(otherFaction => {
      const matchupScenarios = generateMatchupScenarios(selectedFaction, otherFaction.id);
      matchupScenarios.forEach(scenario => {
        scenarios.push({
          ...scenario,
          id: `${selectedFaction}_vs_${otherFaction.id}_${scenario.name.toLowerCase().replace(/ /g, '_')}`,
          type: 'faction_vs_faction',
          opponentFaction: otherFaction
        });
      });
    });

    setAvailableScenarios(scenarios);
  }, [selectedFaction]);

  const handleScenarioSelect = (scenario) => {
    onScenarioSelect(scenario);
  };

  const getScenarioIcon = (scenario) => {
    if (scenario.type === 'faction_vs_faction') {
      return `${scenario.opponentFaction.icon} VS ${getSelectedFactionIcon()}`;
    }
    
    switch (scenario.context) {
      case 'defensive': return '🛡️';
      case 'assault': return '⚔️';
      case 'siege': return '🏰';
      case 'reconnaissance': return '🔍';
      case 'research': return '🔬';
      default: return '⚡';
    }
  };

  const getSelectedFactionIcon = () => {
    const allFactions = getAvailableFactions();
    const faction = allFactions.find(f => f.id === selectedFaction);
    return faction?.icon || '⚔️';
  };

  const getScenarioTypeLabel = (scenario) => {
    if (scenario.type === 'faction_vs_faction') {
      return `vs ${scenario.opponentFaction.shortName || scenario.opponentFaction.name}`;
    }
    return 'Universal';
  };

  return (
    <div className="scenario-selector">
      <h2>Choose Your Battle Scenario</h2>
      <p>Select the type of engagement for your {selectedFaction?.replace('_', ' ')} forces</p>
      
      <div className="scenarios-grid">
        {availableScenarios.map(scenario => (
          <div key={scenario.id} className={`scenario-card ${scenario.type}`}>
            <div className="scenario-header">
              <div className="scenario-icon">
                {getScenarioIcon(scenario)}
              </div>
              <div className="scenario-type">
                {getScenarioTypeLabel(scenario)}
              </div>
            </div>
            
            <h3>{scenario.name}</h3>
            <p className="scenario-description">{scenario.description}</p>
            
            <div className="scenario-details">
              <span className="context-tag">{scenario.context}</span>
              {scenario.type === 'faction_vs_faction' && (
                <span className="opponent-tag">
                  {scenario.opponentFaction.shortName}
                </span>
              )}
            </div>
            
            {scenario.specialRules && scenario.specialRules[selectedFaction] && (
              <div className="special-rules">
                <strong>Special Rules:</strong>
                <ul>
                  {scenario.specialRules[selectedFaction].map((rule, index) => (
                    <li key={index}>{rule}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <button 
              className="select-scenario-btn"
              onClick={() => handleScenarioSelect(scenario)}
            >
              Select Scenario
            </button>
          </div>
        ))}
      </div>

      <div className="scenario-help">
        <h3>Scenario Types</h3>
        <div className="help-content">
          <div className="help-item">
            <strong>Universal Scenarios:</strong> Standard missions that work with any faction
          </div>
          <div className="help-item">
            <strong>Faction vs Faction:</strong> Specialized scenarios with unique rules for specific matchups
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScenarioSelector; 