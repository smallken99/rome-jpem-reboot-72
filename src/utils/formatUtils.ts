
import { GameDate } from '@/components/maitrejeu/types/common';

// Format a date in GameDate format to a human-readable string
export const formatDate = (date: GameDate | string): string => {
  if (!date) return '-';
  
  if (typeof date === 'string') {
    return date;
  }
  
  if (date && 'year' in date && 'season' in date) {
    return `${date.year} ${formatSeason(date.season)}`;
  }
  
  return '-';
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

// Format money values in denarii/as format
export const formatMoney = (amount: number): string => {
  return `${amount.toLocaleString()} as`;
};

// Format percentage values
export const formatPercentage = (value: number): string => {
  return `${Math.round(value * 100)}%`;
};
