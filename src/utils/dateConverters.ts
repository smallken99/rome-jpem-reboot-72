
import { GameDate, Season } from '@/components/maitrejeu/types/common';

// Convert a JS Date to GameDate
export const convertDateToGameDate = (date: Date): GameDate => {
  const year = date.getFullYear();
  
  // Determine season based on month
  let season: Season;
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

// Enhanced parsing function to handle all date formats
export const parseGameDate = (dateVal: string | Date | GameDate): GameDate => {
  // If it's already a GameDate
  if (typeof dateVal === 'object' && 'year' in dateVal && 'season' in dateVal) {
    return dateVal as GameDate;
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
          season: parts[1] as Season
        };
      }
    } catch (error) {
      console.error("Error parsing date string:", error);
    }
  }
  
  // Default fallback
  return { year: new Date().getFullYear(), season: 'SPRING' };
};

// Convert any date format to string representation
export const formatGameDate = (date: GameDate | string | Date): string => {
  const gameDate = parseGameDate(date);
  return `${gameDate.year} ${gameDate.season}`;
};

// Function to convert Date objects to GameDate and vice versa
export const dateToGameDate = (date: Date): GameDate => {
  return convertDateToGameDate(date);
};

export const gameDateToDate = (gameDate: GameDate): Date => {
  // Approximate conversion - this is simplified, in a real app you'd want more precision
  const month = gameDate.season === 'SPRING' ? 3 : 
               gameDate.season === 'SUMMER' ? 6 : 
               gameDate.season === 'AUTUMN' ? 9 : 0;
  
  return new Date(gameDate.year, month, 15);
};
