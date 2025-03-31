
import { format, parseISO } from 'date-fns';
import { GameDate, Season } from '@/components/maitrejeu/types/common';

// Format date for display
export const formatDate = (date: string | Date): string => {
  if (!date) return '';
  
  try {
    if (typeof date === 'string') {
      // Handle ISO date strings
      return format(parseISO(date), 'PP');
    } else {
      // Handle JavaScript Date objects
      return format(date, 'PP');
    }
  } catch (error) {
    console.error('Error formatting date:', error);
    return String(date);
  }
};

// Format date time for display
export const formatDateTime = (date: string | Date): string => {
  if (!date) return '';
  
  try {
    if (typeof date === 'string') {
      return format(parseISO(date), 'PPp');
    } else {
      return format(date, 'PPp');
    }
  } catch (error) {
    console.error('Error formatting date time:', error);
    return String(date);
  }
};

// Format a game date for display
export const formatGameDate = (gameDate: GameDate): string => {
  if (!gameDate) return '';
  return `${gameDate.year} (${gameDate.season})`;
};

// Handle date objects of different types
export const formatAnyDate = (date: GameDate | Date | string): string => {
  if (!date) return '';
  
  if (isGameDate(date)) {
    return formatGameDate(date);
  } else if (date instanceof Date) {
    return formatDate(date);
  } else {
    return String(date);
  }
};

// Check if an object is a GameDate
export function isGameDate(date: any): date is GameDate {
  return date && typeof date === 'object' && 
    typeof date.year === 'number' && 
    typeof date.season === 'string';
}

// Convert a string like "510 (spring)" to a GameDate object
export function parseStringToGameDate(dateString: string): GameDate {
  const match = dateString.match(/(\d+)\s*\(\s*(\w+)\s*\)/);
  if (match) {
    const year = parseInt(match[1], 10);
    const seasonStr = match[2].toLowerCase();
    
    // Map to standard season names
    let season: Season;
    if (seasonStr.includes('spring') || seasonStr.includes('ver')) {
      season = 'spring';
    } else if (seasonStr.includes('summer') || seasonStr.includes('aestas')) {
      season = 'summer';
    } else if (seasonStr.includes('fall') || seasonStr.includes('autumn') || seasonStr.includes('autumnus')) {
      season = 'fall';
    } else if (seasonStr.includes('winter') || seasonStr.includes('hiems')) {
      season = 'winter';
    } else {
      season = 'spring'; // Default
    }
    
    return { year, season };
  }
  
  // Default fallback
  return { year: new Date().getFullYear(), season: 'spring' };
}

// Get seasons after a given season
export const getSeasonsAfter = (currentSeason: Season, count: number = 1): Season[] => {
  const seasons: Season[] = ['spring', 'summer', 'fall', 'winter'];
  const currentIndex = seasons.indexOf(currentSeason.toLowerCase() as Season);
  
  if (currentIndex === -1) return [];
  
  const result: Season[] = [];
  for (let i = 1; i <= count; i++) {
    const index = (currentIndex + i) % seasons.length;
    result.push(seasons[index] as Season);
  }
  
  return result;
};

// Normalize season strings to the standard Season type
export function normalizeSeasonString(season: string): Season {
  const lowerSeason = season.toLowerCase();
  
  if (lowerSeason.includes('spring') || lowerSeason === 'ver') {
    return 'spring';
  } else if (lowerSeason.includes('summer') || lowerSeason === 'aestas') {
    return 'summer';
  } else if (lowerSeason.includes('fall') || lowerSeason.includes('autumn') || lowerSeason === 'autumnus') {
    return 'fall';
  } else if (lowerSeason.includes('winter') || lowerSeason === 'hiems') {
    return 'winter';
  }
  
  return 'spring'; // Default fallback
}
