
import { Season, formatDate as timeSystemFormatDate, GameDate } from '@/utils/timeSystem';
import { formatDate as convertersFormatDate } from '@/utils/dateConverters';

// This is a unified date helper to handle both types of GameDate objects
export const formatAnyGameDate = (date: any): string => {
  if (!date) return '';
  
  // Handle string dates
  if (typeof date === 'string') {
    return date;
  }
  
  // Handle GameDate objects
  if (typeof date === 'object' && 'year' in date && 'season' in date) {
    try {
      // Try the timeSystem formatter first
      return timeSystemFormatDate(date as any);
    } catch (e) {
      // Fall back to dateConverters formatter
      try {
        return convertersFormatDate(date as any);
      } catch (e2) {
        // Ultimate fallback
        return `${date.year} ${date.season}`;
      }
    }
  }
  
  // Return the original if we can't format it
  return String(date);
};

// Safely cast a string or object to a GameDate
export const ensureGameDate = (value: any): GameDate => {
  if (!value) return { year: 0, season: 'Ver' as Season };
  
  if (typeof value === 'object' && 'year' in value && 'season' in value) {
    return {
      year: value.year,
      season: value.season as Season
    };
  }
  
  if (typeof value === 'string') {
    try {
      const parts = value.split(' ');
      if (parts.length >= 2) {
        return {
          year: parseInt(parts[0], 10) || 0,
          season: parts[1] as Season
        };
      }
    } catch (e) {
      console.error('Failed to parse game date:', value);
    }
  }
  
  return { year: 0, season: 'Ver' as Season };
};
