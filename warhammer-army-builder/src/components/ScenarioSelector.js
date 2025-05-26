import React, { useState } from 'react';
import './ScenarioSelector.css';

const predefinedScenarios = [
  {
    id: 'shrine_world_defense',
    name: 'Shrine World Defense',
    description: 'Imperial forces defend a sacred shrine world from Tau expansion forces. The battle takes place around ancient cathedral ruins.',
    playerFactions: ['Sisters of Battle', 'Adeptus Mechanicus'],
    enemyFaction: 'Tau Empire',
    context: 'defensive',
    terrain: 'urban_ruins'
  },
  {
    id: 'forge_world_excavation',
    name: 'Forge World Excavation',
    description: 'Adeptus Mechanicus excavation teams uncover ancient technology while Tau forces attempt to claim the site.',
    playerFactions: ['Adeptus Mechanicus'],
    enemyFaction: 'Tau Empire',
    context: 'excavation',
    terrain: 'industrial'
  },
  {
    id: 'convent_assault',
    name: 'Convent Under Siege',
    description: 'Tau forces launch a surprise assault on a Sisters of Battle convent, seeking to eliminate Imperial resistance.',
    playerFactions: ['Sisters of Battle'],
    enemyFaction: 'Tau Empire',
    context: 'siege',
    terrain: 'fortified'
  },
  {
    id: 'research_station_raid',
    name: 'Research Station Raid',
    description: 'Joint Imperial forces defend a critical research facility from Tau infiltration and assault.',
    playerFactions: ['Sisters of Battle', 'Adeptus Mechanicus'],
    enemyFaction: 'Tau Empire',
    context: 'research',
    terrain: 'scientific'
  }
];

function ScenarioSelector({ onScenarioSelect }) {
  const [selectedMode, setSelectedMode] = useState('predefined');
  const [customScenario, setCustomScenario] = useState({
    name: '',
    description: '',
    playerFactions: [],
    enemyFaction: 'Tau Empire',
    context: 'general',
    terrain: 'mixed'
  });

  const handlePredefinedSelect = (scenario) => {
    onScenarioSelect(scenario);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (customScenario.name && customScenario.description) {
      onScenarioSelect({
        ...customScenario,
        id: 'custom_' + Date.now()
      });
    }
  };

  const handleRandomScenario = () => {
    const randomScenario = predefinedScenarios[Math.floor(Math.random() * predefinedScenarios.length)];
    onScenarioSelect(randomScenario);
  };

  const handleFactionToggle = (faction) => {
    setCustomScenario(prev => ({
      ...prev,
      playerFactions: prev.playerFactions.includes(faction)
        ? prev.playerFactions.filter(f => f !== faction)
        : [...prev.playerFactions, faction]
    }));
  };

  return (
    <div className="scenario-selector">
      <h2>Select Your Scenario</h2>
      
      <div className="mode-selector">
        <button 
          className={selectedMode === 'predefined' ? 'active' : ''}
          onClick={() => setSelectedMode('predefined')}
        >
          Predefined Scenarios
        </button>
        <button 
          className={selectedMode === 'custom' ? 'active' : ''}
          onClick={() => setSelectedMode('custom')}
        >
          Custom Scenario
        </button>
        <button 
          className="random-button"
          onClick={handleRandomScenario}
        >
          🎲 Random Scenario
        </button>
      </div>

      {selectedMode === 'predefined' && (
        <div className="predefined-scenarios">
          {predefinedScenarios.map(scenario => (
            <div key={scenario.id} className="scenario-card">
              <h3>{scenario.name}</h3>
              <p>{scenario.description}</p>
              <div className="scenario-details">
                <span><strong>Player Forces:</strong> {scenario.playerFactions.join(', ')}</span>
                <span><strong>Enemy:</strong> {scenario.enemyFaction}</span>
                <span><strong>Context:</strong> {scenario.context}</span>
              </div>
              <button onClick={() => handlePredefinedSelect(scenario)}>
                Select This Scenario
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedMode === 'custom' && (
        <div className="custom-scenario">
          <form onSubmit={handleCustomSubmit}>
            <div className="form-group">
              <label htmlFor="scenario-name">Scenario Name:</label>
              <input
                id="scenario-name"
                type="text"
                value={customScenario.name}
                onChange={(e) => setCustomScenario(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter scenario name..."
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="scenario-description">Description:</label>
              <textarea
                id="scenario-description"
                value={customScenario.description}
                onChange={(e) => setCustomScenario(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the narrative scenario..."
                rows={4}
                required
              />
            </div>

            <div className="form-group">
              <label>Player Factions:</label>
              <div className="faction-checkboxes">
                {['Sisters of Battle', 'Adeptus Mechanicus'].map(faction => (
                  <label key={faction} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={customScenario.playerFactions.includes(faction)}
                      onChange={() => handleFactionToggle(faction)}
                    />
                    {faction}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="context">Battle Context:</label>
              <select
                id="context"
                value={customScenario.context}
                onChange={(e) => setCustomScenario(prev => ({ ...prev, context: e.target.value }))}
              >
                <option value="general">General Engagement</option>
                <option value="defensive">Defensive Action</option>
                <option value="assault">Assault Mission</option>
                <option value="siege">Siege Warfare</option>
                <option value="excavation">Archaeological Site</option>
                <option value="research">Research Facility</option>
                <option value="patrol">Border Patrol</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="terrain">Primary Terrain:</label>
              <select
                id="terrain"
                value={customScenario.terrain}
                onChange={(e) => setCustomScenario(prev => ({ ...prev, terrain: e.target.value }))}
              >
                <option value="mixed">Mixed Terrain</option>
                <option value="urban_ruins">Urban Ruins</option>
                <option value="industrial">Industrial Complex</option>
                <option value="fortified">Fortified Position</option>
                <option value="scientific">Research Facility</option>
                <option value="open">Open Ground</option>
                <option value="forest">Dense Terrain</option>
              </select>
            </div>

            <button type="submit" disabled={!customScenario.name || !customScenario.description}>
              Create Custom Scenario
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ScenarioSelector; 