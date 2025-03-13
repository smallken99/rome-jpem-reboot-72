import { Season, PlayerSeason, reverseSeasonMapping } from '@/components/maitrejeu/types/common';

/**
 * Formats a number as Roman currency (As)
 */
export const formatMoney = (amount: number): string => {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(2)}M As`;
  } else if (amount >= 1000) {
    return `${(amount / 1000).toFixed(1)}K As`;
  } else {
    return `${amount} As`;
  }
};

/**
 * Formats a game date as readable text
 */
export const formatDate = (year: number, season: string): string => {
  const seasonNames: Record<string, string> = {
    'SPRING': 'Ver',
    'SUMMER': 'Aestas',
    'AUTUMN': 'Autumnus',
    'WINTER': 'Hiems'
  };
  
  return `${seasonNames[season]} ${year} AUC`;
};

/**
 * Formats a percentage
 */
export const formatPercentage = (value: number, decimalPlaces: number = 1): string => {
  return `${value.toFixed(decimalPlaces)}%`;
};

/**
 * Formats a large number
 */
export const formatLargeNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(2)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

/**
 * Calculates the percentage change between two values
 */
export const calculatePercentageChange = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

/**
 * Formats uptime in a readable format
 */
export const formatUptime = (uptimeInSeconds: number): string => {
  const days = Math.floor(uptimeInSeconds / 86400);
  const hours = Math.floor((uptimeInSeconds % 86400) / 3600);
  const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
  
  if (days > 0) {
    return `${days}j ${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
};

/**
 * Converts a season from the time system to the Game Master season
 */
export const convertTimeSeasonToMaitreJeuSeason = (season: string): Season => {
  const seasonMap: Record<string, Season> = {
    'SPRING': 'Ver',
    'SUMMER': 'Aestas',
    'AUTUMN': 'Autumnus',
    'WINTER': 'Hiems',
    'Ver': 'Ver',
    'Aestas': 'Aestas',
    'Autumnus': 'Autumnus',
    'Hiems': 'Hiems'
  };
  
  return seasonMap[season] || 'Ver';
};

/**
 * Formats a complete date for display
 */
export const formatFullDate = (date: { year: number, season: string }): string => {
  return `${convertTimeSeasonToMaitreJeuSeason(date.season)} ${date.year} AUC`;
};

/**
 * Converts a numeric value to Roman notation of quality/influence
 */
export const numberToRomanInfluence = (value: number): string => {
  if (value >= 90) return '++++';
  if (value >= 70) return '+++';
  if (value >= 50) return '++';
  if (value >= 30) return '+';
  return '-';
};
