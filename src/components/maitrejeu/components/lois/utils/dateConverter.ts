
import { GameDate } from '@/components/maitrejeu/types/common';

/**
 * Convert a GameDate object to a JavaScript Date object
 * This helps resolve the type incompatibility between GameDate and Date
 */
export const gameDateToDate = (gameDate: GameDate): Date => {
  if (!gameDate || typeof gameDate !== 'object') {
    return new Date();
  }
  
  // Convert the year and season to a JavaScript Date
  // This is a basic implementation; adjust as needed for your game's date system
  const year = gameDate.year || 2023;
  let month = 0; // Default to January
  
  // Map seasons to months (approximate)
  switch (gameDate.season.toUpperCase()) {
    case 'SPRING':
    case 'VER':
      month = 3; // April
      break;
    case 'SUMMER':
    case 'AESTAS':
      month = 6; // July
      break;
    case 'AUTUMN':
    case 'AUTUMNUS':
      month = 9; // October
      break;
    case 'WINTER':
    case 'HIEMS':
      month = 0; // January of the next year
      break;
  }
  
  return new Date(year, month, 1);
};

/**
 * Convert a GameDate object to a string representation
 */
export const gameDateToString = (gameDate: GameDate): string => {
  if (!gameDate || typeof gameDate !== 'object') {
    return '';
  }
  
  return `${gameDate.year} ${gameDate.season}`;
};

/**
 * Convert a GameDate to either a string or Date as needed
 */
export const gameDateToStringOrDate = (gameDate: GameDate): string | Date => {
  // For format functions that expect string|Date, we'll use the Date representation
  return gameDateToDate(gameDate);
};

/**
 * Extract season and year from a Loi object for display
 */
export const extractLoiDateInfo = (loi: any): { saison: string, année: number } => {
  if (loi.date && typeof loi.date === 'object' && 'season' in loi.date && 'year' in loi.date) {
    return {
      saison: loi.date.season,
      année: loi.date.year
    };
  }
  
  return {
    saison: 'Inconnue',
    année: 0
  };
};
