
export type Season = 
  | 'Spring' | 'Summer' | 'Autumn' | 'Winter' 
  | 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER' 
  | 'Ver' | 'Aes' | 'Aut' | 'Hie'
  | 'Aestas' | 'Autumnus' | 'Hiems'
  | 'spring' | 'summer' | 'autumn' | 'winter' | 'fall'
  | 'Fall';

export interface GameDate {
  year: number;
  season: Season;
  phase?: GamePhase;
  day?: number;
}

export enum GamePhase {
  SETUP = 'setup',
  SENATE = 'senate',
  SENAT = 'senat',
  ELECTION = 'election',
  ACTIONS = 'actions',
  ACTION = 'action',
  EVENTS = 'events',
  EVENEMENT = 'evenement',
  ECONOMY = 'economy',
  ECONOMIE = 'economie',
  DIPLOMACY = 'diplomatic',
  MILITARY = 'military',
  MILITAIRE = 'militaire',
  RELIGION = 'religious',
  POLITIQUE = 'politique',
  SOCIAL = 'social',
  ADMINISTRATION = 'administration'
}

// Utility functions to format dates
export const formatGameDate = (date: GameDate): string => {
  return `${date.year} ${date.season}`;
};

export const parseStringToGameDate = (dateString: string): GameDate => {
  const parts = dateString.split(' ');
  if (parts.length >= 2) {
    return {
      year: parseInt(parts[0], 10),
      season: parts[1] as Season
    };
  }
  throw new Error('Invalid date format');
};

export const stringToGameDate = parseStringToGameDate;
