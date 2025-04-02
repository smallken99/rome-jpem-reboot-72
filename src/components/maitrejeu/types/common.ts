
// Define all possible seasons
export type Season = 
  'Spring' | 'Summer' | 'Autumn' | 'Winter' | 'Fall' | 
  'Ver' | 'Aestas' | 'Autumnus' | 'Hiems' |
  'Aes' | 'Aut' | 'Hie' |
  'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER' |
  'spring' | 'summer' | 'autumn' | 'winter' | 'fall';

// Define game phases
export enum GamePhase {
  SETUP = 'setup',
  SENATE = 'senate',
  ACTIONS = 'actions',
  ECONOMY = 'economy',
  EVENTS = 'events',
  DIPLOMACY = 'diplomacy',
  MILITARY = 'military',
  POLITIQUE = 'politique',
  ECONOMIE = 'economie',
  MILITAIRE = 'militaire',
  RELIGION = 'religion',
  SOCIAL = 'social',
  ELECTION = 'election',
  ACTION = 'action',
  SENAT = 'senat',
  EVENEMENT = 'evenement',
  ADMINISTRATION = 'administration',
  // Add these to fix the existing comparisons
  NORMAL = 'normal',
  CRISIS = 'crisis',
  WAR = 'war',
  ECONOMIC = 'economic',
  REVOLT = 'revolt',
  TRIUMPH = 'triumph',
  GAMES = 'games',
  SCANDAL = 'scandal',
  DIPLOMATIC = 'diplomatic',
  RELIGIOUS = 'religious'
}

// Define game date structure
export interface GameDate {
  year: number;
  season: Season;
  phase?: GamePhase;
  day?: number; // Added for compatibility with some code
}

export function isValidPhase(phase: string): phase is GamePhase {
  return Object.values(GamePhase).includes(phase as GamePhase);
}

export function formatGameDate(date: GameDate): string {
  return `${date.year} (${date.season})`;
}

// Add the parseStringToGameDate function
export function parseStringToGameDate(dateStr: string): GameDate {
  try {
    // Handle different date formats
    if (dateStr.includes('-')) {
      // Format like "2023-Spring"
      const [yearStr, seasonStr] = dateStr.split('-');
      return {
        year: parseInt(yearStr, 10),
        season: seasonStr as Season
      };
    } else if (dateStr.match(/^\d+\s+\([A-Za-z]+\)$/)) {
      // Format like "2023 (Spring)"
      const yearMatch = dateStr.match(/^(\d+)/);
      const seasonMatch = dateStr.match(/\(([A-Za-z]+)\)$/);
      
      if (yearMatch && seasonMatch) {
        return {
          year: parseInt(yearMatch[1], 10),
          season: seasonMatch[1] as Season
        };
      }
    }
    
    // Default fallback
    return {
      year: new Date().getFullYear(),
      season: 'Spring'
    };
  } catch (error) {
    console.error("Error parsing date string:", error);
    return {
      year: new Date().getFullYear(),
      season: 'Spring'
    };
  }
}

// Add a function to convert GameDate to string
export function stringToGameDate(date: GameDate): string {
  return `${date.year}-${date.season}`;
}
