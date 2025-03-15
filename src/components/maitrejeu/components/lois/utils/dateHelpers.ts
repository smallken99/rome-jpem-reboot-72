
import { GameDate } from '@/components/maitrejeu/types/common';

// Ensure a consistent GameDate structure regardless of input format
export const ensureGameDate = (date: any): GameDate => {
  if (!date) {
    return { year: new Date().getFullYear() - 1800, season: 'SPRING' };
  }
  
  if (typeof date === 'string') {
    const parts = date.split(' ');
    if (parts.length >= 2) {
      return {
        year: parseInt(parts[0], 10),
        season: parts[1]
      };
    }
    return { year: new Date().getFullYear() - 1800, season: 'SPRING' };
  }
  
  if (date && typeof date === 'object') {
    if ('year' in date && 'season' in date) {
      return {
        year: date.year,
        season: date.season
      };
    }
  }
  
  return { year: new Date().getFullYear() - 1800, season: 'SPRING' };
};

// Format any date representation to a consistent string
export const formatAnyGameDate = (date: any): string => {
  const gameDate = ensureGameDate(date);
  return `${gameDate.year} ${gameDate.season}`;
};

// Format a season name to a human-readable format
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
