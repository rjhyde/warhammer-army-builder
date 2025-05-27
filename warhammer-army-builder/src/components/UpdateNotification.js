import React, { useState, useEffect } from 'react';
import { checkForUpdates, getUpdateSuggestions } from '../utils/updateChecker';
import { dataVersion } from '../data/tauUnits';
import './UpdateNotification.css';

function UpdateNotification() {
  const [updateInfo, setUpdateInfo] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [checking, setChecking] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check for updates on component mount
    checkUpdates();
  }, []);

  const checkUpdates = async () => {
    setChecking(true);
    try {
      const results = await checkForUpdates();
      setUpdateInfo(results);
      
      // Show notification if there might be updates
      const hasUpdates = results.checks?.community?.battlescribe?.hasNewerData;
      if (hasUpdates && !dismissed) {
        // Auto-show if there are potential updates
      }
    } catch (error) {
      console.error('Error checking for updates:', error);
    } finally {
      setChecking(false);
    }
  };

  const suggestions = getUpdateSuggestions();

  if (dismissed) return null;

  const hasNewerData = updateInfo?.checks?.community?.battlescribe?.hasNewerData;

  return (
    <div className="update-notification">
      <div className="data-version-info">
        <span className="version-tag">
          📊 Data Version: {dataVersion.version} 
          <small>(Updated: {dataVersion.lastUpdated})</small>
        </span>
        
        <button 
          className="check-updates-btn"
          onClick={checkUpdates}
          disabled={checking}
        >
          {checking ? '🔄 Checking...' : '🔍 Check for Updates'}
        </button>
        
        <button 
          className="sources-btn"
          onClick={() => setShowSuggestions(!showSuggestions)}
        >
          📚 Update Sources
        </button>
      </div>

      {hasNewerData && (
        <div className="update-alert">
          <div className="alert-content">
            <span className="alert-icon">⚠️</span>
            <div className="alert-text">
              <strong>Newer data available!</strong>
              <p>BattleScribe data has been updated since our last refresh. Consider checking for points changes.</p>
            </div>
            <button 
              className="dismiss-btn"
              onClick={() => setDismissed(true)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {showSuggestions && (
        <div className="update-sources-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>📋 Data Update Sources</h3>
              <button 
                className="close-modal"
                onClick={() => setShowSuggestions(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="sources-sections">
              <div className="source-section">
                <h4>🏢 Official Sources</h4>
                <p>Always check these first for official updates:</p>
                <ul>
                  {suggestions.officialSources.map((source, index) => (
                    <li key={index}>
                      <a href={source.url} target="_blank" rel="noopener noreferrer">
                        <strong>{source.name}</strong>
                      </a>
                      <br />
                      <small>{source.description}</small>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="source-section">
                <h4>👥 Community Sources</h4>
                <p>Community-maintained databases (often updated faster):</p>
                <ul>
                  {suggestions.communitySources.map((source, index) => (
                    <li key={index}>
                      <a href={source.url} target="_blank" rel="noopener noreferrer">
                        <strong>{source.name}</strong>
                      </a>
                      <br />
                      <small>{source.description}</small>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="update-info">
              <h4>🔧 Manual Updates</h4>
              <p>
                If you find newer points values or rule changes, you can update the data files manually:
              </p>
              <ol>
                <li>Fork this project on GitHub</li>
                <li>Update the unit data in <code>src/data/tauUnits.js</code></li>
                <li>Update the version number and date</li>
                <li>Submit a pull request</li>
              </ol>
              
              {updateInfo && (
                <div className="last-check-info">
                  <small>
                    Last checked: {new Date(updateInfo.timestamp).toLocaleString()}
                  </small>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateNotification; 