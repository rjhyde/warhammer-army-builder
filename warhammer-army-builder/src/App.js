import React, { useState } from 'react';
import './App.css';
import ScenarioSelector from './components/ScenarioSelector';
import DifficultySelector from './components/DifficultySelector';
import FactionSelector from './components/FactionSelector';
import ArmyComposer from './components/ArmyComposer';
import ArmyDisplay from './components/ArmyDisplay';
import UpdateNotification from './components/UpdateNotification';
import heroImage from './assets/hero-space-battle.jpg';

function App() {
  const [scenario, setScenario] = useState(null);
  const [difficulty, setDifficulty] = useState('medium');
  const [selectedFaction, setSelectedFaction] = useState(null);
  const [selectedSubfaction, setSelectedSubfaction] = useState(null);
  const [generatedArmy, setGeneratedArmy] = useState(null);
  const [currentStep, setCurrentStep] = useState('faction');
  const [showHero, setShowHero] = useState(true);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);

  // Check if hero image loads
  React.useEffect(() => {
    const img = new Image();
    img.onload = () => setHeroImageLoaded(true);
    img.onerror = () => setHeroImageLoaded(false);
    img.src = heroImage;
  }, []);

  const handleFactionChange = (factionId, subfactionId, factionData, subfactionData) => {
    setSelectedFaction(factionId);
    setSelectedSubfaction(subfactionId);
    setGeneratedArmy(null); // Reset army when faction changes
    setShowHero(false); // Hide hero once faction is selected
    
    // Proceed to scenario selection once faction is chosen
    if (factionId && subfactionId) {
      setCurrentStep('scenario');
    }
  };

  const handleScenarioSelect = (selectedScenario) => {
    setScenario(selectedScenario);
    setCurrentStep('difficulty');
  };

  const handleDifficultySelect = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setCurrentStep('compose');
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
    setCurrentStep('faction'); // Reset to faction selection
    setShowHero(true); // Show hero again
  };

  const scrollToFactions = () => {
    setShowHero(false);
    // Small delay to ensure the component renders before scrolling
    setTimeout(() => {
      const factionsElement = document.querySelector('.faction-selector');
      if (factionsElement) {
        factionsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // For backward compatibility with ArmyComposer that expects the old faction string format
  const legacyFactionString = selectedSubfaction || selectedFaction;

  // Hero section background style
  const heroBackgroundStyle = heroImageLoaded ? {
    background: `
      linear-gradient(135deg, rgba(10, 14, 26, 0.9), rgba(17, 24, 39, 0.8)),
      url(${heroImage}) center/cover no-repeat
    `
  } : {};

  return (
    <div className="App">
      {/* Hero Section - Only show on initial load */}
      {currentStep === 'faction' && showHero && (
        <section 
          className="hero-section" 
          style={heroBackgroundStyle}
        >
          <div className="hero-content">
            <h1>Warhammer 40k Army Builder</h1>
            <p className="subtitle">
              Forge legendary armies from the grim darkness of the far future. 
              Generate competitive, lore-appropriate forces for your narrative battles.
            </p>
            <button className="hero-cta" onClick={scrollToFactions}>
              ⚔️ Begin Your Crusade
            </button>
          </div>
        </section>
      )}

      {/* Header - Simplified when hero is visible */}
      <header className="App-header">
        <h1>Warhammer 40k Narrative Army Builder</h1>
        <p>Generate competitive, lore-appropriate armies for your narrative events</p>
        {currentStep !== 'scenario' && !showHero && (
          <button onClick={resetBuilder} className="reset-button">
            🔄 Start Over
          </button>
        )}
      </header>

      <main className="App-main">
        <UpdateNotification />
        
        {currentStep === 'faction' && (
          <FactionSelector 
            onFactionChange={handleFactionChange}
            selectedFaction={selectedFaction}
            selectedSubfaction={selectedSubfaction}
          />
        )}

        {currentStep === 'scenario' && (
          <ScenarioSelector 
            onScenarioSelect={handleScenarioSelect}
            selectedFaction={selectedFaction}
            selectedSubfaction={selectedSubfaction}
          />
        )}

        {currentStep === 'difficulty' && (
          <DifficultySelector 
            onDifficultySelect={handleDifficultySelect}
            scenario={scenario}
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
