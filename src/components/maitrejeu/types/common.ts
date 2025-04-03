
export type Season = 
  | 'Ver' 
  | 'Aestas' 
  | 'Autumnus' 
  | 'Hiems'
  | 'SPRING'
  | 'SUMMER'
  | 'AUTUMN'
  | 'WINTER'
  | 'Spring'
  | 'Summer'
  | 'Autumn'
  | 'Winter'
  | 'spring'
  | 'summer'
  | 'autumn'
  | 'winter'
  | 'fall'
  | 'Fall'
  | 'Aes'
  | 'Aut'
  | 'Hie';

export enum GamePhase {
  NORMAL = 'normal',
  CRISIS = 'crisis',
  WAR = 'war',
  PEACE = 'peace',
  TRIUMPH = 'triumph',
  SENATE = 'senate',
  ELECTION = 'election',
  ECONOMY = 'economy',
  MILITARY = 'military',
  DIPLOMACY = 'diplomacy',
  EVENTS = 'events',
  ACTIONS = 'actions',
  ACTION = 'action',
  POLITIQUE = 'politique',
  ECONOMIE = 'economie',
  MILITAIRE = 'militaire',
  RELIGION = 'religion',
  SOCIAL = 'social',
  SENAT = 'senat',
  EVENEMENT = 'evenement',
  ADMINISTRATION = 'administration',
  SETUP = 'setup',
  RELIGIOUS = 'religious',
  DIPLOMATIC = 'diplomatic',
  REVOLT = 'revolt',
  GAMES = 'games',
  SCANDAL = 'scandal'
}

// Helper function to convert string to GamePhase enum safely
export function stringToGamePhase(phase: string): GamePhase {
  if (Object.values(GamePhase).includes(phase as GamePhase)) {
    return phase as GamePhase;
  }
  return GamePhase.NORMAL;
}

export interface GameDate {
  year: number;
  season: Season;
  phase?: GamePhase | string;
}

// Helper function to create a GameDate from parts
export function createGameDate(year: number, season: Season, phase?: GamePhase): GameDate {
  return { year, season, phase };
}

// Helper for parsing string to GameDate
export function parseStringToGameDate(dateString: string): GameDate {
  try {
    const parts = dateString.split('-');
    return {
      year: parseInt(parts[0], 10),
      season: parts[1] as Season,
      phase: parts[2] ? stringToGamePhase(parts[2]) : undefined
    };
  } catch (error) {
    console.error('Error parsing date string:', error);
    return { year: new Date().getFullYear(), season: 'Ver' };
  }
}

export function stringToGameDate(dateString: string): GameDate {
  return parseStringToGameDate(dateString);
}
