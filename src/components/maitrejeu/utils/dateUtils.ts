
import { GameDate, Season } from '../types/common';

export function formatGameDateForRender(date: GameDate | string | Date | null | undefined): string {
  if (!date) return '';
  
  if (typeof date === 'string') return date;
  
  if (date instanceof Date) {
    return date.toLocaleDateString();
  }
  
  // GameDate object
  return `${date.year} ${date.season}`;
}

export function isGameDate(date: any): date is GameDate {
  return date && 
    typeof date === 'object' && 
    typeof date.year === 'number' && 
    typeof date.season === 'string';
}

// Function to ensure a value is a proper GameDate
export function ensureGameDate(date: any): GameDate {
  if (isGameDate(date)) {
    return date;
  }
  
  if (date instanceof Date) {
    return {
      year: date.getFullYear(),
      season: seasonFromMonth(date.getMonth()) as Season
    };
  }
  
  if (typeof date === 'string') {
    const parts = date.split(' ');
    if (parts.length >= 2) {
      const year = parseInt(parts[0], 10);
      if (!isNaN(year)) {
        return {
          year,
          season: parts[1] as Season
        };
      }
    }
    
    // Try to parse as standard date string
    const parsedDate = new Date(date);
    if (!isNaN(parsedDate.getTime())) {
      return {
        year: parsedDate.getFullYear(),
        season: seasonFromMonth(parsedDate.getMonth()) as Season
      };
    }
  }
  
  // Default to current date
  const now = new Date();
  return {
    year: now.getFullYear(),
    season: seasonFromMonth(now.getMonth()) as Season
  };
}

function seasonFromMonth(month: number): string {
  if (month >= 2 && month <= 4) return 'Ver';
  if (month >= 5 && month <= 7) return 'Aestas';
  if (month >= 8 && month <= 10) return 'Autumnus';
  return 'Hiems';
}

export function formatAnyGameDate(date: any): string {
  return formatGameDateForRender(ensureGameDate(date));
}
