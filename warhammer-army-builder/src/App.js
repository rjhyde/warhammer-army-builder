import React, { useState } from 'react';
import './App.css';
import ScenarioSelector from './components/ScenarioSelector';
import DifficultySelector from './components/DifficultySelector';
import FactionSelector from './components/FactionSelector';
import ArmyComposer from './components/ArmyComposer';
import ArmyDisplay from './components/ArmyDisplay';
import UpdateNotification from './components/UpdateNotification';

function App() {
  const [scenario, setScenario] = useState(null);
  const [difficulty, setDifficulty] = useState('medium');
  const [selectedFaction, setSelectedFaction] = useState(null);
  const [selectedSubfaction, setSelectedSubfaction] = useState(null);
  const [generatedArmy, setGeneratedArmy] = useState(null);
  const [currentStep, setCurrentStep] = useState('scenario');

  const handleScenarioSelect = (selectedScenario) => {
    setScenario(selectedScenario);
    setCurrentStep('difficulty');
  };

  const handleDifficultySelect = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setCurrentStep('faction');
  };

  const handleFactionChange = (factionId, subfactionId, factionData, subfactionData) => {
    setSelectedFaction(factionId);
    setSelectedSubfaction(subfactionId);
    setGeneratedArmy(null); // Reset army when faction changes
    
    // Only proceed to compose step if we have both faction and subfaction selected
    if (factionId && subfactionId) {
      setCurrentStep('compose');
    }
  };

  const handleArmyGenerated = (army) => {
    setGeneratedArmy(army);
    setCurrentStep('display');
  };

  const resetBuilder = () => {
    setScenario(null);
    setDifficulty('medium');
    setSelectedFaction(null);
    setSelectedSubfaction(null);
    setGeneratedArmy(null);
    setCurrentStep('scenario');
  };

  // For backward compatibility with ArmyComposer that expects the old faction string format
  const legacyFactionString = selectedSubfaction || selectedFaction;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Warhammer 40k Narrative Army Builder</h1>
        <p>Generate competitive, lore-appropriate armies for your narrative events</p>
        {currentStep !== 'scenario' && (
          <button onClick={resetBuilder} className="reset-button">
            Start Over
          </button>
        )}
      </header>

      <main className="App-main">
        <UpdateNotification />
        
        {currentStep === 'scenario' && (
          <ScenarioSelector onScenarioSelect={handleScenarioSelect} />
        )}

        {currentStep === 'difficulty' && (
          <DifficultySelector 
            onDifficultySelect={handleDifficultySelect}
            scenario={scenario}
          />
        )}

        {currentStep === 'faction' && (
          <FactionSelector 
            onFactionChange={handleFactionChange}
            selectedFaction={selectedFaction}
            selectedSubfaction={selectedSubfaction}
          />
        )}

        {currentStep === 'compose' && (
          <ArmyComposer
            scenario={scenario}
            difficulty={difficulty}
            faction={legacyFactionString}
            onArmyGenerated={handleArmyGenerated}
          />
        )}

        {currentStep === 'display' && (
          <ArmyDisplay
            army={generatedArmy}
            scenario={scenario}
            difficulty={difficulty}
            faction={legacyFactionString}
            onStartOver={resetBuilder}
          />
        )}
      </main>
    </div>
  );
}

export default App;
