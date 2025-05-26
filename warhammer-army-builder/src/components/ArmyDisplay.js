import React, { useState } from 'react';
import './ArmyDisplay.css';

function ArmyDisplay({ army, scenario, difficulty, faction, onStartOver }) {
  const [exportFormat, setExportFormat] = useState('text');

  const exportArmy = () => {
    const armyText = generateArmyText();
    
    if (exportFormat === 'text') {
      // Create and download text file
      const element = document.createElement('a');
      const file = new Blob([armyText], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `tau_army_${scenario.replace(/\s+/g, '_').toLowerCase()}_${difficulty}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } else if (exportFormat === 'warhammer_app') {
      // Copy formatted text for Warhammer app import
      navigator.clipboard.writeText(generateWarhammerAppFormat()).then(() => {
        alert('Army list copied to clipboard! You can now paste this into the official Warhammer 40k app.');
      });
    }
  };

  const generateArmyText = () => {
    const factionNames = {
      tau_empire: 'T\'au Empire (T\'au Sept)',
      farsight_enclaves: 'Farsight Enclaves',
      bork_an: 'T\'au Empire (Bork\'an Sept)',
      vior_la: 'T\'au Empire (Vior\'la Sept)',
      sacea: 'T\'au Empire (Sa\'cea Sept)'
    };

    let text = `WARHAMMER 40,000 ARMY LIST\n`;
    text += `=====================================\n\n`;
    text += `Army: ${factionNames[faction]}\n`;
    text += `Scenario: ${army.scenario}\n`;
    text += `Difficulty: ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}\n`;
    text += `Total Points: ${army.totalPoints}\n`;
    text += `Date Generated: ${new Date().toLocaleDateString()}\n\n`;

    // Group units by battlefield role
    const unitsByRole = {
      'HQ': [],
      'Troops': [],
      'Elites': [],
      'Fast Attack': [],
      'Heavy Support': []
    };

    army.units.forEach(unit => {
      let role = 'HQ';
      if (unit.keywords.includes('Fire Warrior') || unit.keywords.includes('Pathfinder')) {
        role = 'Troops';
      } else if (unit.keywords.includes('Crisis') || unit.keywords.includes('Stealth')) {
        role = 'Elites';
      } else if (unit.keywords.includes('Piranha') || unit.keywords.includes('Drone')) {
        role = 'Fast Attack';
      } else if (unit.keywords.includes('Hammerhead') || unit.keywords.includes('Broadside')) {
        role = 'Heavy Support';
      }
      unitsByRole[role].push(unit);
    });

    // Output units by role
    Object.entries(unitsByRole).forEach(([role, units]) => {
      if (units.length > 0) {
        text += `${role.toUpperCase()}\n`;
        text += `${'-'.repeat(role.length)}\n`;
        
        units.forEach((unit, index) => {
          const unitNumber = units.length > 1 ? ` ${index + 1}` : '';
          text += `${unit.name}${unitNumber}\n`;
          
          if (unit.models > 1) {
            text += `  Models: ${unit.models}\n`;
          }
          
          text += `  Base Equipment: ${unit.equipment.base.join(', ')}\n`;
          
          if (unit.selectedOptions && unit.selectedOptions.length > 0) {
            text += `  Additional Equipment: ${unit.selectedOptions.map(opt => opt.name).join(', ')}\n`;
            text += `  Equipment Cost: +${unit.optionsPoints || 0}pts\n`;
          }
          
          text += `  Unit Cost: ${unit.points}pts\n`;
          
          if (unit.loreRoles && unit.loreRoles.length > 0) {
            text += `  Role: ${unit.loreRoles.join(', ')}\n`;
          }
          
          text += '\n';
        });
        
        text += '\n';
      }
    });

    // Add lore justification
    text += `LORE JUSTIFICATION\n`;
    text += `==================\n`;
    text += `${army.loreJustification}\n\n`;

    // Add tactical notes
    text += `TACTICAL NOTES\n`;
    text += `==============\n`;
    text += generateTacticalNotes();

    return text;
  };

  const generateWarhammerAppFormat = () => {
    // Simplified format that might work with the official app
    let text = `++ Battalion Detachment 0CP (T'au Empire) ++\n\n`;
    
    army.units.forEach(unit => {
      text += `${unit.name}: `;
      if (unit.selectedOptions && unit.selectedOptions.length > 0) {
        text += unit.selectedOptions.map(opt => opt.name).join(', ');
      }
      text += ` [${unit.points + (unit.optionsPoints || 0)}pts]\n`;
    });
    
    text += `\n++ Total: [${army.totalPoints}pts] ++`;
    return text;
  };

  const generateTacticalNotes = () => {
    let notes = '';
    
    const hasCommander = army.units.some(unit => unit.keywords.includes('Commander'));
    const hasBattlesuits = army.units.some(unit => unit.keywords.includes('Battlesuit'));
    const hasFireWarriors = army.units.some(unit => unit.keywords.includes('Fire Warrior'));
    const hasPathfinders = army.units.some(unit => unit.id === 'pathfinders');

    if (hasCommander && hasBattlesuits) {
      notes += '• Deploy Commander with Crisis Suits for maximum synergy\n';
    }
    
    if (hasFireWarriors && hasPathfinders) {
      notes += '• Use Pathfinders to provide markerlight support for Fire Warriors\n';
    }
    
    if (faction === 'farsight_enclaves') {
      notes += '• Focus on aggressive mid-range engagements\n';
      notes += '• Use battlesuit mobility for rapid repositioning\n';
    } else if (faction === 'bork_an') {
      notes += '• Maximize range advantage with long-range weapons\n';
      notes += '• Maintain defensive positions when possible\n';
    }
    
    if (difficulty === 'hard' || difficulty === 'extreme') {
      notes += '• This is a competitive-level army - coordinate unit abilities carefully\n';
      notes += '• Target priority should focus on high-value enemy units\n';
    }

    if (scenario.context === 'defensive') {
      notes += '• Establish strong firing positions early\n';
      notes += '• Use drones to screen important units\n';
    } else if (scenario.context === 'assault') {
      notes += '• Use mobility to control engagement range\n';
      notes += '• Focus fire to eliminate threats quickly\n';
    }

    return notes || '• Standard T\'au combined arms tactics apply\n';
  };

  const copyToClipboard = () => {
    const armyText = generateArmyText();
    navigator.clipboard.writeText(armyText).then(() => {
      alert('Army list copied to clipboard!');
    });
  };

  return (
    <div className="army-display">
      <div className="army-header">
        <h2>Generated Army List</h2>
        <div className="army-summary">
          <span className="points-total">{army.totalPoints} Points</span>
          <span className="army-faction">{faction.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
          <span className="army-difficulty">{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Difficulty</span>
        </div>
      </div>

      <div className="army-content">
        <div className="scenario-info">
          <h3>Scenario Context</h3>
          <p><strong>{army.scenario}</strong></p>
          <p className="lore-justification">{army.loreJustification}</p>
        </div>

        <div className="army-units">
          <h3>Army Composition</h3>
          <div className="units-list">
            {army.units.map((unit, index) => (
              <div key={index} className="unit-card">
                <div className="unit-header">
                  <h4>{unit.name}</h4>
                  <span className="unit-points">
                    {unit.points + (unit.optionsPoints || 0)} pts
                  </span>
                </div>
                
                <div className="unit-details">
                  {unit.models > 1 && (
                    <p><strong>Models:</strong> {unit.models}</p>
                  )}
                  
                  <p><strong>Base Equipment:</strong> {unit.equipment.base.join(', ')}</p>
                  
                  {unit.selectedOptions && unit.selectedOptions.length > 0 && (
                    <p><strong>Additional Equipment:</strong> {unit.selectedOptions.map(opt => opt.name).join(', ')} (+{unit.optionsPoints}pts)</p>
                  )}
                  
                  <p><strong>Keywords:</strong> {unit.keywords.join(', ')}</p>
                  
                  {unit.loreRoles && (
                    <p><strong>Battlefield Role:</strong> {unit.loreRoles.join(', ')}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="tactical-notes">
          <h3>Tactical Recommendations</h3>
          <pre>{generateTacticalNotes()}</pre>
        </div>
      </div>

      <div className="army-actions">
        <div className="export-section">
          <h3>Export Army List</h3>
          <div className="export-options">
            <label>
              <input 
                type="radio" 
                value="text" 
                checked={exportFormat === 'text'} 
                onChange={(e) => setExportFormat(e.target.value)}
              />
              Text File (.txt)
            </label>
            <label>
              <input 
                type="radio" 
                value="warhammer_app" 
                checked={exportFormat === 'warhammer_app'} 
                onChange={(e) => setExportFormat(e.target.value)}
              />
              Warhammer 40k App Format
            </label>
          </div>
          
          <div className="export-buttons">
            <button onClick={exportArmy} className="export-btn">
              📁 Export Army List
            </button>
            <button onClick={copyToClipboard} className="copy-btn">
              📋 Copy to Clipboard
            </button>
          </div>
        </div>

        <div className="navigation-actions">
          <button onClick={onStartOver} className="start-over-btn">
            🔄 Create New Army
          </button>
        </div>
      </div>

      <div className="army-footer">
        <p><strong>Generated on:</strong> {new Date().toLocaleDateString()}</p>
        <p><strong>For use in:</strong> Narrative Crusade Events</p>
        <p className="disclaimer">
          * Points costs and rules based on publicly available data. 
          Verify with current official publications before play.
        </p>
      </div>
    </div>
  );
}

export default ArmyDisplay; 