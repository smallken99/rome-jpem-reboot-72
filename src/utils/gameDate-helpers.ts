
import { GameDate } from '@/components/maitrejeu/types/common';

/**
 * Convert a GameDate object to a JavaScript Date
 * @param gameDate The GameDate object to convert
 * @returns A JavaScript Date object
 */
export const gameToJsDate = (gameDate: GameDate): Date => {
  // Basic conversion for simplicity - adjust as needed
  const year = gameDate.year;
  let month = 0;
  
  // Map seasons to months
  switch (gameDate.season.toUpperCase()) {
    case 'SPRING':
    case 'VER':
      month = 2; // March
      break;
    case 'SUMMER':
    case 'AESTAS':
      month = 5; // June
      break;
    case 'AUTUMN':
    case 'AUTUMNUS':
      month = 8; // September
      break;
    case 'WINTER':
    case 'HIEMS':
      month = 11; // December
      break;
  }
  
  return new Date(year, month);
};

/**
 * Convert a GameDate object to string
 * @param gameDate The GameDate object to convert
 * @returns A string representation of the GameDate
 */
export const gameToString = (gameDate: GameDate): string => {
  return `${gameDate.year} ${gameDate.season}`;
};

/**
 * Convert GameDate to either string or Date based on usage
 * @param gameDate The GameDate object to convert
 * @returns Either a string or Date depending on context
 */
export const gameToStringOrDate = (gameDate: GameDate): string | Date => {
  // Default to using the Date representation for compatibility
  return gameToJsDate(gameDate);
};

/**
 * Convert GameDate to a format usable by date-related functions
 * This is a special adapter function that helps pass GameDate to functions
 * that expect Date or string
 */
export const gameToCompatibleDate = (gameDate: GameDate): string | Date => {
  // Convert to ISO string which is broadly compatible
  return gameToJsDate(gameDate).toISOString();
};
