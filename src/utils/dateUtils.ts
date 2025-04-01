
import { format, parse, isValid, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

export type Season = 'Spring' | 'Summer' | 'Fall' | 'Winter';

export interface GameDate {
  year: number;
  season: Season;
}

/**
 * Formats a date to a localized string
 */
export function formatDate(date: Date | string | number | GameDate): string {
  if (!date) return '';
  
  // Handle GameDate object
  if (typeof date === 'object' && 'year' in date && 'season' in date) {
    return `${date.season} ${date.year} AUC`;
  }
  
  // Handle string that might be ISO
  if (typeof date === 'string') {
    try {
      const parsedDate = parseISO(date);
      if (isValid(parsedDate)) {
        return format(parsedDate, 'dd MMMM yyyy', { locale: fr });
      }
    } catch (e) {
      console.error('Error parsing date string:', e);
    }
  }
  
  // Handle regular Date objects
  try {
    const dateObj = new Date(date);
    if (isValid(dateObj)) {
      return format(dateObj, 'dd MMMM yyyy', { locale: fr });
    }
  } catch (e) {
    console.error('Error formatting date:', e);
  }
  
  return String(date);
}

/**
 * Formats a GameDate to a string
 */
export function formatGameDate(gameDate: GameDate): string {
  if (!gameDate) return '';
  return `${gameDate.season} ${gameDate.year} AUC`;
}

/**
 * Gets all seasons coming after a specified game date
 */
export function getSeasonsAfter(gameDate: GameDate, count: number = 4): GameDate[] {
  if (!gameDate) return [];
  
  const seasons: Season[] = ['Spring', 'Summer', 'Fall', 'Winter'];
  const currentSeasonIndex = seasons.indexOf(gameDate.season);
  
  const result: GameDate[] = [];
  let year = gameDate.year;
  let seasonIndex = currentSeasonIndex;
  
  for (let i = 0; i < count; i++) {
    seasonIndex = (seasonIndex + 1) % 4;
    if (seasonIndex === 0) {
      year++;
    }
    
    result.push({
      year,
      season: seasons[seasonIndex]
    });
  }
  
  return result;
}

/**
 * Convert a string, date, or GameDate to a standard GameDate object
 */
export function ensureGameDate(date: string | Date | GameDate | any): GameDate {
  // If it's already a GameDate
  if (date && typeof date === 'object' && 'year' in date && 'season' in date) {
    return {
      year: date.year,
      season: normalizeSeason(date.season)
    };
  }
  
  // If it's a Date object
  if (date instanceof Date) {
    const month = date.getMonth();
    let season: Season;
    
    if (month >= 2 && month <= 4) season = 'Spring';
    else if (month >= 5 && month <= 7) season = 'Summer';
    else if (month >= 8 && month <= 10) season = 'Fall';
    else season = 'Winter';
    
    return {
      year: date.getFullYear(),
      season
    };
  }
  
  // Default fallback
  return {
    year: new Date().getFullYear(),
    season: 'Spring'
  };
}

/**
 * Normalize various season formats to the standard Season type
 */
function normalizeSeason(season: string): Season {
  const seasonMap: Record<string, Season> = {
    'spring': 'Spring',
    'summer': 'Summer',
    'fall': 'Fall',
    'autumn': 'Fall',
    'winter': 'Winter',
    'ver': 'Spring',
    'aestas': 'Summer',
    'autumnus': 'Fall',
    'hiems': 'Winter'
  };
  
  const normalizedSeason = seasonMap[season.toLowerCase()];
  return normalizedSeason || 'Spring';
}
