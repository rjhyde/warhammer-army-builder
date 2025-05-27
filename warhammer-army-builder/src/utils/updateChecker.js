// Update checking utility for Warhammer 40k data
import { dataVersion } from '../data/tauUnits';

const UPDATE_CHECK_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Community sources for 40k data (these are maintained by the community)
const COMMUNITY_SOURCES = {
  battlescribe: 'https://api.github.com/repos/BSData/wh40k-10e/releases/latest',
  wahapedia: 'https://wahapedia.ru/wh40k10ed/factions/tau-empire/datasheets/',
  goonhammer: 'https://www.goonhammer.com/tag/tau-empire/'
};

// Check for Warhammer Community updates (basic check)
const checkWarhammerCommunity = async () => {
  try {
    // This is a basic example - in practice, you'd need a more sophisticated approach
    // since GW doesn't provide a structured API
    const response = await fetch('https://www.warhammer-community.com/en-us/articles/');
    
    if (response.ok) {
      // Look for recent articles mentioning points updates or T'au
      // This is simplified - real implementation would need better parsing
      return {
        hasUpdates: false, // Placeholder
        lastCheck: new Date().toISOString(),
        message: "Manual check recommended for latest updates"
      };
    }
  } catch (error) {
    console.warn('Could not check Warhammer Community for updates:', error);
    return null;
  }
};

// Check community data sources
const checkCommunityUpdates = async () => {
  const results = {};
  
  try {
    // Check BattleScribe data updates
    const bsResponse = await fetch(COMMUNITY_SOURCES.battlescribe);
    if (bsResponse.ok) {
      const bsData = await bsResponse.json();
      const lastBSUpdate = new Date(bsData.published_at);
      const ourLastUpdate = new Date(dataVersion.lastUpdated);
      
      results.battlescribe = {
        hasNewerData: lastBSUpdate > ourLastUpdate,
        lastUpdate: bsData.published_at,
        version: bsData.tag_name
      };
    }
  } catch (error) {
    console.warn('Could not check BattleScribe updates:', error);
  }
  
  return results;
};

// Main update checking function
export const checkForUpdates = async () => {
  const lastCheck = localStorage.getItem('lastUpdateCheck');
  const now = Date.now();
  
  // Only check once per day to avoid spam
  if (lastCheck && (now - parseInt(lastCheck)) < UPDATE_CHECK_INTERVAL) {
    return JSON.parse(localStorage.getItem('lastUpdateResult') || '{}');
  }
  
  const results = {
    timestamp: new Date().toISOString(),
    dataVersion: dataVersion.version,
    dataLastUpdated: dataVersion.lastUpdated,
    checks: {}
  };
  
  // Check community sources
  results.checks.community = await checkCommunityUpdates();
  
  // Check Warhammer Community (basic)
  if (dataVersion.warhammerCommunityCheck) {
    results.checks.warhammerCommunity = await checkWarhammerCommunity();
  }
  
  // Store results
  localStorage.setItem('lastUpdateCheck', now.toString());
  localStorage.setItem('lastUpdateResult', JSON.stringify(results));
  
  return results;
};

// Get suggestions for manual updates
export const getUpdateSuggestions = () => {
  return {
    officialSources: [
      {
        name: "Warhammer Community",
        url: "https://www.warhammer-community.com/en-us/articles/",
        description: "Official rules updates and errata"
      },
      {
        name: "Games Workshop Downloads",
        url: "https://www.games-workshop.com/en-US/Warhammer-40000-Rules-Downloads",
        description: "Official rule books and points updates"
      }
    ],
    communitySources: [
      {
        name: "Wahapedia",
        url: "https://wahapedia.ru/wh40k10ed/factions/tau-empire/",
        description: "Community-maintained rules reference"
      },
      {
        name: "BattleScribe Data",
        url: "https://github.com/BSData/wh40k-10e",
        description: "Army builder data files"
      },
      {
        name: "Goonhammer",
        url: "https://www.goonhammer.com/tag/tau-empire/",
        description: "Analysis and updates"
      }
    ]
  };
};

// Manual data update helper
export const validatePointsUpdate = (unitData) => {
  const errors = [];
  const warnings = [];
  
  // Basic validation
  Object.entries(unitData).forEach(([category, units]) => {
    units.forEach(unit => {
      if (!unit.points || unit.points < 0) {
        errors.push(`${unit.name}: Invalid points value`);
      }
      
      if (!unit.models || unit.models < 1) {
        errors.push(`${unit.name}: Invalid model count`);
      }
      
      // Check for suspicious large changes (might indicate typos)
      if (unit.points > 500) {
        warnings.push(`${unit.name}: Unusually high points cost (${unit.points})`);
      }
      
      if (unit.points < 20 && unit.models === 1) {
        warnings.push(`${unit.name}: Unusually low points for single model (${unit.points})`);
      }
    });
  });
  
  return { errors, warnings };
};

export default {
  checkForUpdates,
  getUpdateSuggestions,
  validatePointsUpdate
}; 