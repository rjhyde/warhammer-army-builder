// Multi-Faction Selector Component
// Allows users to select different factions and subfactions

import React, { useState, useEffect } from 'react';
import { getAvailableFactions, getSubfactions } from '../data/factionRegistry';
import './FactionSelector.css';

const FactionSelector = ({ onFactionChange, selectedFaction, selectedSubfaction }) => {
  const [availableFactions, setAvailableFactions] = useState([]);
  const [availableSubfactions, setAvailableSubfactions] = useState([]);
  const [showSubfactions, setShowSubfactions] = useState(false);

  useEffect(() => {
    const factions = getAvailableFactions();
    setAvailableFactions(factions);
  }, []);

  useEffect(() => {
    if (selectedFaction) {
      const subfactions = getSubfactions(selectedFaction);
      setAvailableSubfactions(subfactions);
      setShowSubfactions(subfactions.length > 0);
    } else {
      setAvailableSubfactions([]);
      setShowSubfactions(false);
    }
  }, [selectedFaction]);

  const handleFactionSelect = (factionId) => {
    const faction = availableFactions.find(f => f.id === factionId);
    onFactionChange(factionId, null, faction);
  };

  const handleSubfactionSelect = (subfactionId) => {
    const faction = availableFactions.find(f => f.id === selectedFaction);
    const subfaction = availableSubfactions.find(s => s.id === subfactionId);
    onFactionChange(selectedFaction, subfactionId, faction, subfaction);
  };

  const selectedFactionData = availableFactions.find(f => f.id === selectedFaction);
  const selectedSubfactionData = availableSubfactions.find(s => s.id === selectedSubfaction);

  return (
    <div className="faction-selector">
      <div className="faction-selector-header">
        <h2>🌌 Multi-Faction Army Builder</h2>
        <p>Choose your faction and forge your battle force</p>
      </div>

      {/* Faction Selection */}
      <div className="faction-grid">
        <h3>Select Faction</h3>
        <div className="faction-cards">
          {availableFactions.map(faction => (
            <div
              key={faction.id}
              className={`faction-card ${selectedFaction === faction.id ? 'selected' : ''}`}
              onClick={() => handleFactionSelect(faction.id)}
              style={{
                borderColor: selectedFaction === faction.id ? faction.primaryColor : '#374151'
              }}
            >
              <div className="faction-icon">{faction.icon}</div>
              <div className="faction-info">
                <h4>{faction.name}</h4>
                <p className="faction-description">{faction.description}</p>
                <div className="faction-meta">
                  <span className="playstyle">📋 {faction.playstyle}</span>
                  <span className="difficulty">⚡ {faction.difficulty}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subfaction Selection */}
      {showSubfactions && (
        <div className="subfaction-grid">
          <h3>{selectedFactionData?.shortName} Subfactions</h3>
          <div className="subfaction-cards">
            {availableSubfactions.map(subfaction => (
              <div
                key={subfaction.id}
                className={`subfaction-card ${selectedSubfaction === subfaction.id ? 'selected' : ''}`}
                onClick={() => handleSubfactionSelect(subfaction.id)}
              >
                <div className="subfaction-info">
                  <h4>{subfaction.name}</h4>
                  <p className="subfaction-description">{subfaction.description}</p>
                  <div className="subfaction-playstyle">
                    <span>🎯 {subfaction.playstyle}</span>
                  </div>
                  <div className="subfaction-bonuses">
                    {subfaction.bonuses.map((bonus, index) => (
                      <span key={index} className="bonus-tag">
                        ✨ {bonus}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected Faction Summary */}
      {selectedFactionData && (
        <div className="faction-summary">
          <div className="summary-header">
            <span className="summary-icon">{selectedFactionData.icon}</span>
            <div className="summary-text">
              <h3>
                {selectedFactionData.name}
                {selectedSubfactionData && (
                  <span className="subfaction-name"> - {selectedSubfactionData.name}</span>
                )}
              </h3>
              <p>{selectedFactionData.description}</p>
              {selectedSubfactionData && (
                <p className="subfaction-summary">{selectedSubfactionData.description}</p>
              )}
            </div>
          </div>
          
          <div className="summary-stats">
            <div className="stat-item">
              <span className="stat-label">Playstyle:</span>
              <span className="stat-value">
                {selectedSubfactionData ? selectedSubfactionData.playstyle : selectedFactionData.playstyle}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Difficulty:</span>
              <span className="stat-value">{selectedFactionData.difficulty}</span>
            </div>
            {selectedSubfactionData && selectedSubfactionData.bonuses.length > 0 && (
              <div className="stat-item">
                <span className="stat-label">Special Rules:</span>
                <div className="special-rules">
                  {selectedSubfactionData.bonuses.map((bonus, index) => (
                    <span key={index} className="rule-tag">{bonus}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Action Prompt */}
      {selectedFaction && (
        <div className="action-prompt">
          <p>🚀 Ready to build your army! Configure your scenario and difficulty below.</p>
        </div>
      )}
    </div>
  );
};

export default FactionSelector; 