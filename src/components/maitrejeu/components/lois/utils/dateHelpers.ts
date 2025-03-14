
import { GameDate, Season } from '@/components/maitrejeu/types/common';
import { formatDate, formatSeasonDisplay } from '@/utils/timeSystem';

/**
 * Ensures a consistent GameDate object regardless of input format
 */
export const ensureGameDate = (date: string | GameDate | undefined): GameDate => {
  if (!date) {
    return { year: new Date().getFullYear(), season: 'Ver' };
  }
  
  if (typeof date === 'string') {
    // Try to parse string format like "750 Ver"
    const parts = date.split(' ');
    if (parts.length >= 2) {
      const year = parseInt(parts[0], 10);
      const season = parts[1];
      if (!isNaN(year)) {
        return { year, season };
      }
    }
    return { year: new Date().getFullYear(), season: 'Ver' };
  }
  
  return date;
};

/**
 * Formats any date format (string or GameDate) to a human-readable string
 */
export const formatAnyGameDate = (date: string | GameDate | undefined): string => {
  if (!date) return '';
  
  const gameDate = ensureGameDate(date);
  
  return `${formatSeasonDisplay(gameDate.season)} de l'an ${Math.abs(gameDate.year)} ${gameDate.year < 0 ? 'av. J.-C.' : 'ap. J.-C.'}`;
};

/**
 * Safe accessor for getting year from potentially string or GameDate
 */
export const getYear = (date: string | GameDate | undefined): number => {
  return ensureGameDate(date).year;
};

/**
 * Safe accessor for getting season from potentially string or GameDate
 */
export const getSeason = (date: string | GameDate | undefined): string => {
  return ensureGameDate(date).season;
};
