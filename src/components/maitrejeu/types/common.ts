
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
  | 'senate';

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
