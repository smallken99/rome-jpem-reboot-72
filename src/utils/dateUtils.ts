
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
