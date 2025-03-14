
import { GameDate } from '@/components/maitrejeu/types/common';

// Convert a JS Date to GameDate
export const convertDateToGameDate = (date: Date): GameDate => {
  const year = date.getFullYear();
  
  // Determine season based on month
  let season: string;
  const month = date.getMonth();
  
  if (month >= 2 && month <= 4) {
    season = 'SPRING'; // March, April, May
  } else if (month >= 5 && month <= 7) {
    season = 'SUMMER'; // June, July, August
  } else if (month >= 8 && month <= 10) {
    season = 'AUTUMN'; // September, October, November
  } else {
    season = 'WINTER'; // December, January, February
  }
  
  return { year, season };
};

// Fixed version of the function to parse strings/dates to GameDate
export const parseGameDate = (dateVal: string | Date | GameDate): GameDate => {
  // If it's already a GameDate
  if (typeof dateVal === 'object' && 'year' in dateVal && 'season' in dateVal) {
    return dateVal;
  }
  
  // If it's a Date object
  if (dateVal instanceof Date) {
    return convertDateToGameDate(dateVal);
  }
  
  // If it's a string
  if (typeof dateVal === 'string') {
    try {
      if (dateVal.includes('-')) {
        // Standard date format: YYYY-MM-DD
        return convertDateToGameDate(new Date(dateVal));
      } else if (dateVal.includes(' ')) {
        // Format: "YEAR SEASON"
        const parts = dateVal.split(' ');
        return {
          year: parseInt(parts[0], 10),
          season: parts[1]
        };
      }
    } catch (error) {
      console.error("Error parsing date string:", error);
    }
  }
  
  // Default fallback
  return { year: new Date().getFullYear(), season: 'SPRING' };
};
