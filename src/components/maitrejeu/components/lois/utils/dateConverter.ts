
import { GameDate } from '@/components/maitrejeu/types/equilibre';

/**
 * Converts a GameDate object to a JavaScript Date object
 * @param gameDate The game date to convert
 * @returns JavaScript Date object
 */
export const gameDateToDate = (gameDate: GameDate | string | Date): Date => {
  if (gameDate instanceof Date) {
    return gameDate;
  }
  
  if (typeof gameDate === 'string') {
    return new Date(gameDate);
  }
  
  // Using 1 BC as our reference point (year 1 in game = 1 BC)
  // Seasons are mapped to quarters of the year
  const year = gameDate.year;
  let month = 0; // Default to January
  
  switch (gameDate.season.toLowerCase()) {
    case 'spring':
    case 'printemps':
      month = 2; // March
      break;
    case 'summer':
    case 'été':
      month = 5; // June
      break;
    case 'fall':
    case 'autumn':
    case 'automne':
      month = 8; // September
      break;
    case 'winter':
    case 'hiver':
      month = 11; // December
      break;
  }
  
  // Convert to BC/AD calendar (e.g., year -100 in real history = 100 BC)
  const adjustedYear = -year + 1; // +1 because there was no year 0
  
  return new Date(adjustedYear, month, 1);
};

/**
 * Formats a GameDate for display
 * @param gameDate The game date to format
 * @returns Formatted date string (e.g., "Spring, 100 BC")
 */
export const formatGameDate = (gameDate: GameDate | Date | string): string => {
  if (!gameDate) return 'Unknown date';
  
  if (gameDate instanceof Date) {
    const year = -gameDate.getFullYear() + 1;
    const month = gameDate.getMonth();
    let season = 'Winter';
    
    if (month >= 2 && month < 5) {
      season = 'Spring';
    } else if (month >= 5 && month < 8) {
      season = 'Summer';
    } else if (month >= 8 && month < 11) {
      season = 'Fall';
    }
    
    return `${season}, ${Math.abs(year)} ${year < 0 ? 'AD' : 'BC'}`;
  }
  
  if (typeof gameDate === 'string') {
    try {
      return formatGameDate(new Date(gameDate));
    } catch (e) {
      return gameDate;
    }
  }
  
  return `${gameDate.season}, Year ${gameDate.year}`;
};

/**
 * Extracts information about a law's date
 */
export const extractLoiDateInfo = (date: GameDate): { year: number; season: string } => {
  if (typeof date === 'string') {
    // Try to parse a string date
    return { year: 0, season: 'Unknown' };
  }
  
  return { year: date.year, season: date.season };
};

/**
 * Compares two game dates
 * @returns -1 if date1 is earlier, 0 if equal, 1 if date1 is later
 */
export const compareGameDates = (date1: GameDate, date2: GameDate): number => {
  if (date1.year !== date2.year) {
    return date1.year < date2.year ? -1 : 1;
  }
  
  const seasonOrder = {
    'winter': 0,
    'hiver': 0,
    'spring': 1,
    'printemps': 1,
    'summer': 2,
    'été': 2,
    'fall': 3,
    'autumn': 3,
    'automne': 3
  };
  
  const season1 = date1.season.toLowerCase();
  const season2 = date2.season.toLowerCase();
  
  if (seasonOrder[season1] !== seasonOrder[season2]) {
    return seasonOrder[season1] < seasonOrder[season2] ? -1 : 1;
  }
  
  return 0;
};
