
import { GameDate } from '@/components/maitrejeu/types/common';

// Function to ensure a value is a GameDate object
export const ensureGameDate = (date: any): GameDate => {
  if (!date) {
    // Default date if none provided
    return { year: new Date().getFullYear(), season: 'SPRING' };
  }
  
  if (typeof date === 'string') {
    // Try to parse from string format like "632 SUMMER"
    const parts = date.split(' ');
    if (parts.length >= 2) {
      return {
        year: parseInt(parts[0], 10),
        season: parts[1]
      };
    }
    
    // If can't parse, return current date
    return { year: new Date().getFullYear(), season: 'SPRING' };
  }
  
  if (typeof date === 'object') {
    if (date instanceof Date) {
      // Convert JS Date to GameDate
      const months = ['WINTER', 'WINTER', 'SPRING', 'SPRING', 'SPRING', 
                      'SUMMER', 'SUMMER', 'SUMMER', 
                      'AUTUMN', 'AUTUMN', 'AUTUMN', 'WINTER'];
      return {
        year: date.getFullYear(),
        season: months[date.getMonth()]
      };
    }
    
    if ('year' in date && 'season' in date) {
      // Already a GameDate
      return date as GameDate;
    }
  }
  
  // Default fallback
  return { year: new Date().getFullYear(), season: 'SPRING' };
};

// Format any date type to a readable string
export const formatAnyGameDate = (date: any): string => {
  if (!date) return '';
  
  if (typeof date === 'string') {
    return date;
  }
  
  const gameDate = ensureGameDate(date);
  
  // Format the date
  return `${gameDate.season} ${gameDate.year}`;
};

// Convert a GameDate to a JS Date (approximate - for sorting purposes)
export const gameDateToJsDate = (gameDate: GameDate): Date => {
  const seasonMonths: Record<string, number> = {
    'SPRING': 3,
    'Ver': 3,
    'SUMMER': 6,
    'Aestas': 6,
    'AUTUMN': 9,
    'Autumnus': 9,
    'WINTER': 12,
    'Hiems': 12
  };
  
  const month = seasonMonths[gameDate.season] || 1;
  return new Date(gameDate.year, month, 1);
};
