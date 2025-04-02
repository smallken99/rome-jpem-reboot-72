
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
  SCANDAL = 'scandal'
}

// Define game date structure
export interface GameDate {
  year: number;
  season: Season;
  phase?: GamePhase;
}

export function isValidPhase(phase: string): phase is GamePhase {
  return Object.values(GamePhase).includes(phase as GamePhase);
}

export function formatGameDate(date: GameDate): string {
  return `${date.year} (${date.season})`;
}
