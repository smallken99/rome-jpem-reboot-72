
/**
 * Date utilities for handling different date formats in the application
 */

import { format, parseISO, isValid } from 'date-fns';
import { fr } from 'date-fns/locale';

export type Season = 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER' | 
                    'Ver' | 'Aes' | 'Aut' | 'Hie' |
                    'Spring' | 'Summer' | 'Autumn' | 'Winter' |
                    'spring' | 'summer' | 'autumn' | 'winter' | 'fall';

export interface GameDate {
  year: number;
  season: Season;
}

/**
 * Format a date for display
 */
export const formatDate = (date: Date | string | GameDate | undefined, formatStr: string = 'PP'): string => {
  if (!date) return '';
  
  // Handle GameDate
  if (typeof date === 'object' && 'year' in date && 'season' in date) {
    return `${date.year} ${formatSeason(date.season)}`;
  }
  
  // Handle string dates
  if (typeof date === 'string') {
    try {
      const parsedDate = parseISO(date);
      if (isValid(parsedDate)) {
        return format(parsedDate, formatStr, { locale: fr });
      }
    } catch (error) {
      console.error('Error parsing date string:', error);
    }
    return date;
  }
  
  // Handle Date objects
  try {
    return format(date, formatStr, { locale: fr });
  } catch (error) {
    console.error('Error formatting date:', error);
    return String(date);
  }
};

/**
 * Format a season name consistently
 */
export const formatSeason = (season: Season): string => {
  const seasonFormatMap: Record<Season, string> = {
    'SPRING': 'Printemps',
    'SUMMER': 'Été',
    'AUTUMN': 'Automne',
    'WINTER': 'Hiver',
    'Ver': 'Printemps',
    'Aes': 'Été',
    'Aut': 'Automne',
    'Hie': 'Hiver',
    'Spring': 'Printemps',
    'Summer': 'Été',
    'Autumn': 'Automne',
    'Winter': 'Hiver',
    'spring': 'Printemps',
    'summer': 'Été',
    'autumn': 'Automne',
    'fall': 'Automne',
    'winter': 'Hiver'
  };
  
  return seasonFormatMap[season] || String(season);
};

/**
 * Parse a string into a GameDate object
 */
export const stringToGameDate = (dateString: string): GameDate | undefined => {
  if (!dateString) return undefined;
  
  // Handle format "YYYY Season"
  const dateRegex = /(\d+)\s+(\w+)/;
  const matches = dateString.match(dateRegex);
  
  if (matches && matches.length >= 3) {
    const year = parseInt(matches[1], 10);
    const seasonStr = matches[2];
    
    // Map season string to Season type
    let season: Season;
    const seasonLower = seasonStr.toLowerCase();
    
    if (seasonLower.includes('prin') || seasonLower.includes('ver') || seasonLower.includes('spring')) {
      season = 'SPRING';
    } else if (seasonLower.includes('été') || seasonLower.includes('aes') || seasonLower.includes('summer')) {
      season = 'SUMMER';
    } else if (seasonLower.includes('autom') || seasonLower.includes('aut') || seasonLower.includes('fall')) {
      season = 'AUTUMN';
    } else if (seasonLower.includes('hiver') || seasonLower.includes('hie') || seasonLower.includes('winter')) {
      season = 'WINTER';
    } else {
      // Default to spring if unknown
      season = 'SPRING';
    }
    
    return { year, season };
  }
  
  return undefined;
};

/**
 * Convert GameDate to Date object (approximation)
 */
export const gameDateToDate = (gameDate: GameDate): Date => {
  const seasonToMonth: Record<Season, number> = {
    'SPRING': 2, // March
    'SUMMER': 5, // June
    'AUTUMN': 8, // September
    'WINTER': 11, // December
    'Ver': 2,
    'Aes': 5,
    'Aut': 8,
    'Hie': 11,
    'Spring': 2,
    'Summer': 5,
    'Autumn': 8,
    'Winter': 11,
    'spring': 2,
    'summer': 5,
    'autumn': 8,
    'fall': 8,
    'winter': 11
  };
  
  const month = seasonToMonth[gameDate.season] || 0;
  return new Date(gameDate.year, month, 1);
};

/**
 * Get seasons after a specific date
 */
export const getSeasonsAfter = (date: GameDate): Season[] => {
  const seasons: Season[] = ['SPRING', 'SUMMER', 'AUTUMN', 'WINTER'];
  const currentSeasonIndex = seasons.indexOf(date.season as Season);
  
  if (currentSeasonIndex === -1) {
    return seasons;
  }
  
  return seasons.slice(currentSeasonIndex + 1);
};

/**
 * Compare two GameDate objects
 * Returns negative if a < b, 0 if equal, positive if a > b
 */
export const compareGameDates = (a: GameDate, b: GameDate): number => {
  if (a.year !== b.year) {
    return a.year - b.year;
  }
  
  const seasons: Season[] = ['SPRING', 'SUMMER', 'AUTUMN', 'WINTER'];
  const aIndex = seasons.indexOf(a.season as Season);
  const bIndex = seasons.indexOf(b.season as Season);
  
  return aIndex - bIndex;
};
