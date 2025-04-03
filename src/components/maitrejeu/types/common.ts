
export type Season = 
  'Spring' | 'Summer' | 'Autumn' | 'Winter' | 'Fall' | 
  'Ver' | 'Aestas' | 'Autumnus' | 'Hiems' |
  'Aes' | 'Aut' | 'Hie' |
  'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER' |
  'spring' | 'summer' | 'autumn' | 'winter' | 'fall' |
  'Fall' | 'Aestas' | 'Autumnus' | 'Hiems';

export enum GamePhase {
  NORMAL = 'NORMAL',
  SENATE = 'SENATE',
  ACTIONS = 'ACTIONS',
  ECONOMY = 'ECONOMY',
  EVENTS = 'EVENTS',
  DIPLOMACY = 'DIPLOMACY',
  MILITARY = 'MILITARY',
  POLITIQUE = 'POLITIQUE',
  ECONOMIE = 'ECONOMIE',
  MILITAIRE = 'MILITAIRE',
  RELIGION = 'RELIGION',
  SOCIAL = 'SOCIAL',
  SETUP = 'SETUP',
  ELECTION = 'ELECTION',
  ACTION = 'ACTION',
  SENAT = 'SENAT',
  EVENEMENT = 'EVENEMENT',
  ADMINISTRATION = 'ADMINISTRATION'
}

export interface GameDate {
  year: number;
  season: Season;
  phase?: GamePhase | string;
}

export function isGameDate(value: any): value is GameDate {
  return value && 
    typeof value === 'object' && 
    typeof value.year === 'number' && 
    typeof value.season === 'string';
}

export function formatGameDate(date: GameDate): string {
  return `${date.season} ${date.year}`;
}

export function parseStringToGameDate(dateStr: string): GameDate {
  // Format attendu: "708 (Spring)" ou "708 Spring"
  const match = dateStr.match(/(\d+)\s*(?:\(([^)]+)\)|([A-Za-z]+))/);
  if (!match) {
    throw new Error(`Format de date invalide: ${dateStr}`);
  }
  
  const year = parseInt(match[1], 10);
  const season = match[2] || match[3] as Season;
  
  return {
    year,
    season
  };
}
