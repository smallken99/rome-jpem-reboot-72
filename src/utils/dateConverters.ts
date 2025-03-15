
import { GameDate } from '@/components/maitrejeu/types/common';

// Convert a GameDate object to a human-readable string
export const formatGameDate = (date: GameDate | string): string => {
  if (typeof date === 'string') {
    return date;
  }
  
  if (!date || !date.year || !date.season) {
    return '-';
  }
  
  const season = formatSeason(date.season);
  return `${season} de l'an ${date.year < 0 ? Math.abs(date.year) + ' av. J.-C.' : date.year + ' ap. J.-C.'}`;
};

// Format a season to a human-readable string in French
export const formatSeason = (season: string): string => {
  switch (season.toUpperCase()) {
    case 'SPRING':
    case 'VER':
      return 'Printemps';
    case 'SUMMER':
    case 'AESTAS':
      return 'Été';
    case 'AUTUMN':
    case 'AUTUMNUS':
      return 'Automne';
    case 'WINTER':
    case 'HIEMS':
      return 'Hiver';
    default:
      return season;
  }
};

// Convert a string date representation to a GameDate object
export const parseGameDate = (dateString: string): GameDate | null => {
  if (!dateString) return null;
  
  const parts = dateString.split(' ');
  if (parts.length >= 2) {
    return {
      year: parseInt(parts[0], 10),
      season: parts[1]
    };
  }
  
  return null;
};
