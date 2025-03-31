
export type Season = 'Ver' | 'Aestas' | 'Autumnus' | 'Hiems' | 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER' | 'Spring' | 'Summer' | 'Autumn' | 'Winter' | 'spring' | 'summer' | 'autumn' | 'fall' | 'winter';

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
    let season = parts[1] as Season;
    
    // No need to normalize here since we've broadened the Season type
    
    if (!isNaN(year)) {
      return {
        year,
        season
      };
    }
  }
  
  // If parsing fails, return default value
  return { year: 0, season: 'Ver' };
};

/**
 * Safely convert any date representation to a GameDate object
 * @param date Date to convert (can be string or GameDate)
 * @returns A normalized GameDate object
 */
export const ensureGameDate = (date: string | GameDate): GameDate => {
  if (typeof date === 'string') {
    return parseStringToGameDate(date);
  }
  return date;
};

/**
 * Format a GameDate object as a string
 * @param date GameDate object to format
 * @returns Formatted string (e.g. "631 Ver")
 */
export const formatGameDate = (date: GameDate): string => {
  return `${date.year} ${date.season}`;
};

/**
 * Convert a Date object to a GameDate object
 * @param date JavaScript Date object
 * @returns Equivalent GameDate
 */
export const dateToGameDate = (date: Date): GameDate => {
  const year = date.getFullYear();
  const month = date.getMonth();
  
  let season: Season;
  if (month >= 2 && month <= 4) season = 'SPRING';
  else if (month >= 5 && month <= 7) season = 'SUMMER';
  else if (month >= 8 && month <= 10) season = 'AUTUMN';
  else season = 'WINTER';
  
  return { year, season };
};

/**
 * Normalize a season string to a consistent format
 * @param season Season string to normalize
 * @returns Normalized season string
 */
export const normalizeSeasonString = (season: string): Season => {
  season = season.toLowerCase();
  if (season === 'spring' || season === 'ver') return 'SPRING';
  if (season === 'summer' || season === 'aestas') return 'SUMMER';
  if (season === 'autumn' || season === 'fall' || season === 'autumnus') return 'AUTUMN';
  if (season === 'winter' || season === 'hiems') return 'WINTER';
  return 'SPRING'; // Default
};

/**
 * Convert between different season formats
 * @param season Season to convert
 * @param targetFormat Desired format ('roman', 'uppercase', 'lowercase')
 * @returns Converted season
 */
export const convertSeason = (season: Season, targetFormat: 'roman' | 'uppercase' | 'lowercase'): Season => {
  const normalized = normalizeSeasonString(season);
  
  if (targetFormat === 'roman') {
    if (normalized === 'SPRING') return 'Ver';
    if (normalized === 'SUMMER') return 'Aestas';
    if (normalized === 'AUTUMN') return 'Autumnus';
    if (normalized === 'WINTER') return 'Hiems';
  } else if (targetFormat === 'lowercase') {
    if (normalized === 'SPRING') return 'spring';
    if (normalized === 'SUMMER') return 'summer';
    if (normalized === 'AUTUMN') return 'fall';
    if (normalized === 'WINTER') return 'winter';
  }
  
  return normalized; // uppercase is the normalized format
};
