import React, { useState } from 'react';
import './ArmyDisplay.css';
import { getWeaponProfile } from '../data/weaponProfiles';

function ArmyDisplay({ army, scenario, difficulty, faction, onStartOver }) {
  const [exportFormat, setExportFormat] = useState('text');
  const [expandedUnits, setExpandedUnits] = useState(new Set());

  const toggleUnitExpansion = (unitIndex) => {
    const newExpanded = new Set(expandedUnits);
    if (newExpanded.has(unitIndex)) {
      newExpanded.delete(unitIndex);
    } else {
      newExpanded.add(unitIndex);
    }
    setExpandedUnits(newExpanded);
  };

  // Function to parse and display equipment with detailed profiles
  const renderEquipmentProfile = (equipmentName, showDetails = false) => {
    const profile = getWeaponProfile(equipmentName);
    
    if (!showDetails) {
      return (
        <span className="equipment-name" title={profile.description}>
          {profile.name}
        </span>
      );
    }

    // Show detailed weapon card
    return (
      <div className="weapon-profile-card">
        <div className="weapon-header">
          <h5 className="weapon-name">{profile.name}</h5>
          <span className="weapon-category">{profile.category}</span>
        </div>
        
        <div className="weapon-stats">
          <div className="stat-row">
            <div className="stat">
              <label>Range</label>
              <span className="value">{profile.range}</span>
            </div>
            <div className="stat">
              <label>Type</label>
              <span className="value">{profile.type}</span>
            </div>
            <div className="stat">
              <label>S</label>
              <span className="value">{profile.strength}</span>
            </div>
            <div className="stat">
              <label>AP</label>
              <span className="value">{profile.ap}</span>
            </div>
            <div className="stat">
              <label>D</label>
              <span className="value">{profile.damage}</span>
            </div>
          </div>
        </div>

        {profile.abilities && profile.abilities.length > 0 && (
          <div className="weapon-abilities">
            <label>Special Rules:</label>
            <div className="abilities-list">
              {profile.abilities.map((ability, index) => (
                <span key={index} className="ability-tag">{ability}</span>
              ))}
            </div>
          </div>
        )}

        <p className="weapon-description">{profile.description}</p>
      </div>
    );
  };

  // Function to categorize equipment by type
  const categorizeEquipment = (equipmentList) => {
    const categories = {
      weapons: [],
      support: [],
      defensive: [],
      melee: []
    };

    equipmentList.forEach(equipment => {
      const profile = getWeaponProfile(equipment);
      switch (profile.category) {
        case 'Basic Weapon':
        case 'Special Weapon':
        case 'Heavy Weapon':
        case 'Sidearm':
          categories.weapons.push(equipment);
          break;
        case 'Support Equipment':
        case 'Support System':
        case 'Missile System':
          categories.support.push(equipment);
          break;
        case 'Defensive Equipment':
          categories.defensive.push(equipment);
          break;
        case 'Melee Weapon':
          categories.melee.push(equipment);
          break;
        default:
          categories.weapons.push(equipment);
      }
    });

    return categories;
  };

  const exportArmy = () => {
    const armyText = generateArmyText();
    
    if (exportFormat === 'text') {
      // Create and download text file
      const element = document.createElement('a');
      const file = new Blob([armyText], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `army_${scenario.replace(/\s+/g, '_').toLowerCase()}_${difficulty}.txt`;
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
      sacea: 'T\'au Empire (Sa\'cea Sept)',
      ultramarines: 'Ultramarines',
      blood_angels: 'Blood Angels',
      dark_angels: 'Dark Angels',
      imperial_fists: 'Imperial Fists',
      iron_hands: 'Iron Hands',
      salamanders: 'Salamanders'
    };

    let text = `WARHAMMER 40,000 ARMY LIST\n`;
    text += `=====================================\n\n`;
    text += `Army: ${factionNames[faction] || faction.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}\n`;
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
      } else if (unit.keywords.includes('Crisis') || unit.keywords.includes('Stealth') || unit.keywords.includes('Terminator')) {
        role = 'Elites';
      } else if (unit.keywords.includes('Piranha') || unit.keywords.includes('Drone') || unit.keywords.includes('Bike')) {
        role = 'Fast Attack';
      } else if (unit.keywords.includes('Hammerhead') || unit.keywords.includes('Broadside') || unit.keywords.includes('Devastator')) {
        role = 'Heavy Support';
      }
      unitsByRole[role].push(unit);
    });

    // Output units by role with detailed equipment
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
          
          // Handle both old and new equipment structures
          const allEquipment = Array.isArray(unit.equipment) 
            ? [...unit.equipment] 
            : [...(unit.equipment?.base || [])];
          
          if (unit.selectedOptions && unit.selectedOptions.length > 0) {
            allEquipment.push(...unit.selectedOptions.map(opt => opt.name || opt));
          }
          
          const categorized = categorizeEquipment(allEquipment);
          
          if (categorized.weapons.length > 0) {
            text += `  Weapons: ${categorized.weapons.join(', ')}\n`;
          }
          if (categorized.support.length > 0) {
            text += `  Support Systems: ${categorized.support.join(', ')}\n`;
          }
          if (categorized.defensive.length > 0) {
            text += `  Defensive Equipment: ${categorized.defensive.join(', ')}\n`;
          }
          if (categorized.melee.length > 0) {
            text += `  Melee Weapons: ${categorized.melee.join(', ')}\n`;
          }
          
          text += `  Unit Cost: ${unit.points + (unit.optionsPoints || 0)}pts\n`;
          
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
    let text = `++ Battalion Detachment 0CP ++\n\n`;
    
    army.units.forEach(unit => {
      text += `${unit.name}: `;
      if (unit.selectedOptions && unit.selectedOptions.length > 0) {
        text += unit.selectedOptions.map(opt => opt.name || opt).join(', ');
      }
      text += ` [${unit.points + (unit.optionsPoints || 0)}pts]\n`;
    });
    
    text += `\n++ Total: [${army.totalPoints}pts] ++`;
    return text;
  };

  const generateTacticalNotes = () => {
    let notes = '';
    
    const hasCommander = army.units.some(unit => unit.keywords.includes('Commander') || unit.keywords.includes('Captain'));
    const hasBattlesuits = army.units.some(unit => unit.keywords.includes('Battlesuit'));
    const hasFireWarriors = army.units.some(unit => unit.keywords.includes('Fire Warrior'));
    const hasPathfinders = army.units.some(unit => unit.id === 'pathfinders');
    const hasMarines = army.units.some(unit => unit.keywords.includes('Infantry') && !unit.keywords.includes('Fire Warrior'));

    if (hasCommander && hasBattlesuits) {
      notes += '• Deploy Commander with Crisis Suits for maximum synergy\n';
    }
    
    if (hasFireWarriors && hasPathfinders) {
      notes += '• Use Pathfinders to provide markerlight support for Fire Warriors\n';
    }
    
    if (hasMarines) {
      notes += '• Coordinate squad-level tactics for combined arms effectiveness\n';
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

    if (scenario && scenario.context === 'defensive') {
      notes += '• Establish strong firing positions early\n';
      notes += '• Use support units to screen important units\n';
    } else if (scenario && scenario.context === 'assault') {
      notes += '• Use mobility to control engagement range\n';
      notes += '• Focus fire to eliminate threats quickly\n';
    }

    return notes || '• Standard combined arms tactics apply\n';
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
            {army.units.map((unit, index) => {
              const isExpanded = expandedUnits.has(index);
              
              // Handle both old and new equipment structures
              const allEquipment = Array.isArray(unit.equipment) 
                ? [...unit.equipment] 
                : [...(unit.equipment?.base || [])];
              
              if (unit.selectedOptions && unit.selectedOptions.length > 0) {
                allEquipment.push(...unit.selectedOptions.map(opt => opt.name || opt));
              }
              const categorized = categorizeEquipment(allEquipment);

              return (
                <div key={index} className={`unit-card ${isExpanded ? 'expanded' : ''}`}>
                  <div 
                    className="unit-header" 
                    onClick={() => toggleUnitExpansion(index)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="unit-title">
                      <h4>{unit.name}</h4>
                      {unit.models > 1 && (
                        <span className="model-count">({unit.models} models)</span>
                      )}
                    </div>
                    <div className="unit-summary">
                      <span className="unit-points">
                        {unit.points + (unit.optionsPoints || 0)} pts
                      </span>
                      <span className="expand-indicator">
                        {isExpanded ? '▼' : '▶'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="unit-details">
                    {/* Quick overview - always visible */}
                    <div className="equipment-overview">
                      <div className="equipment-category">
                        <strong>Primary Weapons:</strong>{' '}
                        {categorized.weapons.slice(0, 3).map((weapon, idx) => (
                          <React.Fragment key={idx}>
                            {renderEquipmentProfile(weapon, false)}
                            {idx < Math.min(2, categorized.weapons.length - 1) && ', '}
                          </React.Fragment>
                        ))}
                        {categorized.weapons.length > 3 && ` +${categorized.weapons.length - 3} more`}
                      </div>
                    </div>

                    {/* Detailed equipment - shown when expanded */}
                    {isExpanded && (
                      <div className="detailed-equipment">
                        {categorized.weapons.length > 0 && (
                          <div className="equipment-section">
                            <h5>🔫 Weapons</h5>
                            <div className="weapon-profiles">
                              {categorized.weapons.map((weapon, idx) => (
                                <div key={idx}>
                                  {renderEquipmentProfile(weapon, true)}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {categorized.support.length > 0 && (
                          <div className="equipment-section">
                            <h5>🎯 Support Systems</h5>
                            <div className="weapon-profiles">
                              {categorized.support.map((equipment, idx) => (
                                <div key={idx}>
                                  {renderEquipmentProfile(equipment, true)}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {categorized.defensive.length > 0 && (
                          <div className="equipment-section">
                            <h5>🛡️ Defensive Equipment</h5>
                            <div className="weapon-profiles">
                              {categorized.defensive.map((equipment, idx) => (
                                <div key={idx}>
                                  {renderEquipmentProfile(equipment, true)}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {categorized.melee.length > 0 && (
                          <div className="equipment-section">
                            <h5>⚔️ Melee Weapons</h5>
                            <div className="weapon-profiles">
                              {categorized.melee.map((weapon, idx) => (
                                <div key={idx}>
                                  {renderEquipmentProfile(weapon, true)}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="unit-meta">
                          <p><strong>Keywords:</strong> {unit.keywords.join(', ')}</p>
                          {unit.loreRoles && (
                            <p><strong>Battlefield Role:</strong> {unit.loreRoles.join(', ')}</p>
                          )}
                          {unit.selectedOptions && unit.selectedOptions.length > 0 && (
                            <p><strong>Equipment Cost:</strong> +{unit.optionsPoints || 0}pts</p>
                          )}
                        </div>

                        <div className="unit-equipment">
                          <h4>🔧 Equipment</h4>
                          {unit.equipmentChanges && unit.equipmentChanges.length > 0 && (
                            <div className="equipment-changes">
                              <p className="changes-label">Equipment Modifications:</p>
                              <ul className="changes-list">
                                {unit.equipmentChanges.map((change, changeIndex) => (
                                  <li key={changeIndex} className="equipment-change">
                                    {change}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          <div className="equipment-grid">
                            {(Array.isArray(unit.equipment) 
                              ? unit.equipment 
                              : (unit.equipment?.base || [])
                            ).map((equipment, equipIndex) => (
                              <div key={equipIndex} className="equipment-item">
                                {renderEquipmentProfile(equipment, expandedUnits.has(index))}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
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