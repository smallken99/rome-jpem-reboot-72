
import { Season, GameDate, GamePhase, adaptSeason } from '../types/common';

// Map seasons to their names in various languages
export const seasonNames: Record<Season, string> = {
  'Ver': 'Printemps',
  'Aes': 'Été',
  'Aut': 'Automne',
  'Hie': 'Hiver',
  'Aestas': 'Été',
  'Autumnus': 'Automne',
  'Hiems': 'Hiver',
  'SPRING': 'Printemps',
  'SUMMER': 'Été',
  'AUTUMN': 'Automne',
  'WINTER': 'Hiver',
  'Spring': 'Printemps',
  'Summer': 'Été',
  'Autumn': 'Automne',
  'Winter': 'Hiver',
  'spring': 'printemps',
  'summer': 'été',
  'autumn': 'automne',
  'winter': 'hiver',
  'fall': 'automne',
  'Fall': 'Automne'
};

// Format a GameDate object into a human-readable string
export function formatGameDate(date: GameDate): string {
  if (!date) return '';
  
  const seasonName = seasonNames[date.season] || String(date.season);
  let result = `${date.year} ${seasonName}`;
  
  if (date.day) {
    result += `, Jour ${date.day}`;
  }
  
  if (date.phase) {
    result += ` (${date.phase})`;
  }
  
  return result;
}

// Convert a JavaScript Date to a GameDate
export function jsDateToGameDate(jsDate: Date): GameDate {
  const year = jsDate.getFullYear();
  const month = jsDate.getMonth();
  
  let season: Season;
  if (month >= 0 && month < 3) season = 'Hie';
  else if (month >= 3 && month < 6) season = 'Ver';
  else if (month >= 6 && month < 9) season = 'Aes';
  else season = 'Aut';
  
  return { year, season };
}

// Convert a GameDate to a JavaScript Date (approximate)
export function gameDateToJsDate(gameDate: GameDate): Date {
  const { year, season } = gameDate;
  
  let month = 0;
  switch (season) {
    case 'Ver':
    case 'SPRING':
    case 'Spring':
    case 'spring':
      month = 3; // April
      break;
    case 'Aes':
    case 'Aestas':
    case 'SUMMER':
    case 'Summer':
    case 'summer':
      month = 6; // July
      break;
    case 'Aut':
    case 'Autumnus':
    case 'AUTUMN':
    case 'Autumn':
    case 'autumn':
    case 'Fall':
    case 'fall':
      month = 9; // October
      break;
    case 'Hie':
    case 'Hiems':
    case 'WINTER':
    case 'Winter':
    case 'winter':
      month = 0; // January
      break;
    default:
      month = 0;
  }
  
  const day = gameDate.day || 15;
  return new Date(year, month, day);
}

// Compare two GameDate objects
export function compareGameDates(date1: GameDate, date2: GameDate): number {
  // First compare by year
  if (date1.year !== date2.year) {
    return date1.year - date2.year;
  }
  
  // Then compare by season
  const seasonOrder: Record<Season, number> = {
    'Ver': 0,
    'Aes': 1,
    'Aut': 2,
    'Hie': 3,
    'SPRING': 0,
    'SUMMER': 1,
    'AUTUMN': 2,
    'WINTER': 3,
    'Spring': 0,
    'Summer': 1,
    'Autumn': 2,
    'Winter': 3,
    'spring': 0,
    'summer': 1,
    'autumn': 2,
    'winter': 3,
    'Fall': 2,
    'fall': 2,
    'Aestas': 1,
    'Autumnus': 2,
    'Hiems': 3
  };
  
  const season1Order = seasonOrder[date1.season] || 0;
  const season2Order = seasonOrder[date2.season] || 0;
  
  if (season1Order !== season2Order) {
    return season1Order - season2Order;
  }
  
  // Finally compare by day if available
  if (date1.day !== undefined && date2.day !== undefined) {
    return date1.day - date2.day;
  }
  
  return 0; // They are equal
}

// Parse a string to a GameDate
export function parseStringToGameDate(dateString: string): GameDate | null {
  if (!dateString) return null;
  
  try {
    // Try to parse "YYYY Season" format
    const regex = /(\d+)\s+(\w+)/;
    const match = dateString.match(regex);
    
    if (match) {
      const year = parseInt(match[1], 10);
      const seasonStr = match[2];
      const season = adaptSeason(seasonStr);
      
      return { year, season };
    }
  } catch (e) {
    console.error("Error parsing date string:", dateString, e);
  }
  
  return null;
}

// Convert a GameDate to string
export function stringifyGameDate(date: GameDate): string {
  if (!date) return '';
  return `${date.year} ${date.season}`;
}
