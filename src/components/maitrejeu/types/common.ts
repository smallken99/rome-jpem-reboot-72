
export type Season = 
  | 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER' 
  | 'Ver' | 'Aestas' | 'Autumnus' | 'Hiems' 
  | string;

export type PlayerSeason = 
  | 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER'
  | 'Ver' | 'Aestas' | 'Autumnus' | 'Hiems'
  | string;

export interface GameDate {
  year: number;
  season: Season | PlayerSeason;
  phase?: GamePhase;
  day?: number;
}

export type GamePhase = 
  | 'EVENT' | 'ACTION' | 'RESOLUTION' | 'ELECTION' | 'VOTE'
  | 'SENATE' | 'ACTIONS' | 'ECONOMY' | 'EVENTS' | 'DIPLOMACY' | 'MILITARY'
  | 'POLITIQUE' | 'ECONOMIE' | 'MILITAIRE' | 'RELIGION' | 'SOCIAL' | 'SETUP'
  | 'SENAT' | 'EVENEMENT' | 'ADMINISTRATION';

export type ImportanceType = 'mineure' | 'normale' | 'majeure' | 'critique';

// Utility function to generate unique IDs
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Utility function to format season display
export const formatSeasonDisplay = (season: string): string => {
  switch (season.toUpperCase()) {
    case 'SPRING':
    case 'VER':
      return 'Printemps';
    case 'SUMMER':
    case 'AESTAS':
      return 'Été';
    case 'AUTUMN':
    case 'FALL':
    case 'AUTUMNUS':
      return 'Automne';
    case 'WINTER':
    case 'HIEMS':
      return 'Hiver';
    default:
      return season;
  }
};

// Utility function to convert Date to GameDate
export const dateToGameDate = (date: Date): GameDate => {
  const year = date.getFullYear();
  let season: Season;
  const month = date.getMonth();
  
  if (month >= 2 && month <= 4) season = 'SPRING';
  else if (month >= 5 && month <= 7) season = 'SUMMER';
  else if (month >= 8 && month <= 10) season = 'AUTUMN';
  else season = 'WINTER';
  
  return { year, season };
};

// Utility function to parse string dates to GameDate
export const parseStringToGameDate = (dateString: string | Date | GameDate): GameDate => {
  // If it's already a GameDate, return it
  if (typeof dateString === 'object' && 'year' in dateString && 'season' in dateString) {
    return dateString as GameDate;
  }
  
  // If it's a Date object
  if (dateString instanceof Date) {
    return dateToGameDate(dateString);
  }
  
  // If it's a string
  try {
    if (typeof dateString === 'string') {
      if (dateString.includes('-')) {
        // Format: YYYY-MM-DD
        const date = new Date(dateString);
        return dateToGameDate(date);
      } else if (dateString.includes(' ')) {
        // Format: "YEAR SEASON"
        const parts = dateString.split(' ');
        return {
          year: parseInt(parts[0], 10),
          season: parts[1] as Season
        };
      }
    }
    // Default
    return { year: new Date().getFullYear(), season: 'SPRING' };
  } catch (error) {
    console.error("Error parsing date string:", error);
    return { year: new Date().getFullYear(), season: 'SPRING' };
  }
};
