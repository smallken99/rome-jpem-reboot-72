
export type Season = 'spring' | 'summer' | 'fall' | 'winter' | 'Ver' | 'Aestas' | 'Autumnus' | 'Hiems' | 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER';

export interface GameDate {
  year: number;
  season: Season;
  phase?: string;
  day?: number;
}

export type GamePhase = 
  | 'normal' 
  | 'election' 
  | 'crisis' 
  | 'war' 
  | 'POLITIQUE' 
  | 'ECONOMIE' 
  | 'SOCIAL' 
  | 'MILITAIRE' 
  | 'RELIGION'
  | 'ACTIONS'
  | 'ECONOMY'
  | 'EVENTS'
  | 'DIPLOMACY'
  | 'MILITARY'
  | 'SETUP'
  | 'ACTION'
  | 'SENATE'
  | 'EVENEMENT'
  | 'ADMINISTRATION'
  | 'senate'
  | 'ELECTION'
  | 'SENAT';

export enum ImportanceType {
  MINOR = 'minor',
  MODERATE = 'moderate',
  MAJOR = 'major',
  CRITICAL = 'critical',
  NORMALE = 'normale'
}

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export function dateToGameDate(date: Date): GameDate {
  const month = date.getMonth();
  let season: Season;
  
  if (month >= 2 && month <= 4) {
    season = 'spring';
  } else if (month >= 5 && month <= 7) {
    season = 'summer';
  } else if (month >= 8 && month <= 10) {
    season = 'fall';
  } else {
    season = 'winter';
  }
  
  return {
    year: date.getFullYear(),
    season
  };
}

// Add missing utility functions
export function formatAnyDate(date: GameDate | Date): string {
  if (isGameDate(date)) {
    return `${date.year} (${date.season})`;
  } else {
    return date.toLocaleDateString();
  }
}

export function isGameDate(date: any): date is GameDate {
  return date && typeof date === 'object' && 
    typeof date.year === 'number' && 
    typeof date.season === 'string';
}

export function parseStringToGameDate(dateString: string): GameDate {
  const parts = dateString.split(' ');
  const year = parseInt(parts[0], 10);
  const season = parts[1].replace(/[()]/g, '') as Season;
  
  return { year, season };
}
