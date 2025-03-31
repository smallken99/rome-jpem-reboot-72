
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

/**
 * Parse a string representation of a game date into a GameDate object
 * @param dateString String representation of a game date (e.g. "631 Ver")
 * @returns A GameDate object
 */
export const parseStringToGameDate = (dateString: string): GameDate => {
  if (!dateString) {
    return { year: 0, season: 'Ver' }; // Default value
  }
  
  const parts = dateString.split(' ');
  if (parts.length >= 2) {
    const year = parseInt(parts[0], 10);
    if (!isNaN(year)) {
      return {
        year,
        season: parts[1] as Season
      };
    }
  }
  
  // If parsing fails, return default value
  return { year: 0, season: 'Ver' };
};
