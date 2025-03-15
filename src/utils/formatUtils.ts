
import { Season } from './timeSystem';

/**
 * Format a currency value in Roman as
 */
export const formatCurrency = (value: number): string => {
  return `${value.toLocaleString()} as`;
};

/**
 * Format a date in Roman style
 */
export const formatDate = (date: any): string => {
  if (typeof date === 'string') return date;
  
  if (date?.year && date?.season) {
    return `${formatSeason(date.season)} ${date.year} AUC`;
  }
  
  return "Date inconnue";
};

/**
 * Format a season in Latin
 */
export const formatSeason = (season: Season | string): string => {
  if (typeof season !== 'string') {
    season = String(season);
  }
  
  const seasons: Record<string, string> = {
    'VER': 'Ver',
    'AES': 'Aestas',
    'AUT': 'Autumnus',
    'HIE': 'Hiems'
  };
  
  return seasons[season.toUpperCase()] || season;
};

/**
 * Format a number with thousand separators
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

/**
 * Format uptime in human-readable format
 */
export const formatUptime = (seconds: number): string => {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (days > 0) {
    return `${days}j ${hours}h ${minutes}m`;
  }
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  
  return `${minutes}m`;
};

/**
 * Format a percentage with 1 decimal point
 */
export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};
