
export type Season = 'Ver' | 'Aestas' | 'Autumnus' | 'Hiems' | 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER';

export type GamePhase = 
  'normal' | 'SENATE' | 'ACTIONS' | 'ECONOMY' | 'EVENTS' | 'DIPLOMACY' | 'MILITARY' |
  'POLITIQUE' | 'ECONOMIE' | 'MILITAIRE' | 'RELIGION' | 'SOCIAL' | 'SETUP' | 
  'ELECTION' | 'ACTION' | 'SENAT' | 'EVENEMENT' | 'ADMINISTRATION';

export interface GameDate {
  year: number;
  season: Season;
}

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
