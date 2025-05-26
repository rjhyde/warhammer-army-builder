import React, { useState } from 'react';
import './App.css';
import ScenarioSelector from './components/ScenarioSelector';
import DifficultySelector from './components/DifficultySelector';
import FactionSelector from './components/FactionSelector';
import ArmyComposer from './components/ArmyComposer';
import ArmyDisplay from './components/ArmyDisplay';

function App() {
  const [scenario, setScenario] = useState(null);
  const [difficulty, setDifficulty] = useState('medium');
  const [selectedFaction, setSelectedFaction] = useState('tau_empire');
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

  const handleFactionSelect = (faction) => {
    setSelectedFaction(faction);
    setCurrentStep('compose');
  };

  const handleArmyGenerated = (army) => {
    setGeneratedArmy(army);
    setCurrentStep('display');
  };

  const resetBuilder = () => {
    setScenario(null);
    setDifficulty('medium');
    setSelectedFaction('tau_empire');
    setGeneratedArmy(null);
    setCurrentStep('scenario');
  };

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
            onFactionSelect={handleFactionSelect}
            scenario={scenario}
            difficulty={difficulty}
          />
        )}

        {currentStep === 'compose' && (
          <ArmyComposer
            scenario={scenario}
            difficulty={difficulty}
            faction={selectedFaction}
            onArmyGenerated={handleArmyGenerated}
          />
        )}

        {currentStep === 'display' && (
          <ArmyDisplay
            army={generatedArmy}
            scenario={scenario}
            difficulty={difficulty}
            faction={selectedFaction}
            onStartOver={resetBuilder}
          />
        )}
      </main>
    </div>
  );
}

export default App;
