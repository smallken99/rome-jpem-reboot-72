
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
  switch (season) {
    case 'SPRING':
    case 'Ver':
      return 'Printemps';
    case 'SUMMER':
    case 'Aestas':
      return 'Été';
    case 'AUTUMN':
    case 'Autumnus':
      return 'Automne';
    case 'WINTER':
    case 'Hiems':
      return 'Hiver';
    default:
      return season;
  }
};
