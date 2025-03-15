
import { GameDate } from '@/components/maitrejeu/types/common';

// Format a GameDate for display
export const formatDate = (date: GameDate | string): string => {
  if (typeof date === 'string') return date;
  
  // Format season name
  const season = formatSeasonDisplay(date.season);
  
  return `${season} ${date.year} AUC`;
};

// Format a season name for display
export const formatSeasonDisplay = (season: string): string => {
  switch (season) {
    case 'Ver':
      return 'Printemps';
    case 'Aestas':
      return 'Été';
    case 'Autumnus':
      return 'Automne';
    case 'Hiems':
      return 'Hiver';
    default:
      return season;
  }
};
