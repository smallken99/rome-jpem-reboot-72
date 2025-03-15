
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

// Format uptime in human-readable format (days, hours, minutes)
export const formatUptime = (seconds: number): string => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (days > 0) {
    return `${days}j ${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
};

// Format currency values (alias pour formatMoney pour assurer la compatibilité)
export const formatCurrency = (amount: number): string => {
  return `${amount.toLocaleString()} as`;
};

// Format numeric values with thousands separators
export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};
