
/**
 * Common types used across the maître-jeu module
 */

// Game phases
export type GamePhase = 'preparation' | 'action' | 'resolution' | 'administration' | 'events' | 'normal' | 'election' | 'crisis' | 'war' | 'diplomatic' | 'religious' | 'economic' | 'revolt' | 'triumph' | 'games' | 'scandal';

// Define all possible season variations for better compatibility
export type Season = 
  | 'Ver' | 'Aes' | 'Aut' | 'Hie' 
  | 'Spring' | 'Summer' | 'Autumn' | 'Winter' 
  | 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER' 
  | 'Fall' | 'Aestas' | 'Autumnus' | 'Hiems'
  | 'spring' | 'summer' | 'autumn' | 'winter' | 'fall';

// GameDate interface
export interface GameDate {
  year: number;
  season: Season;
  day?: number;
  phase?: GamePhase;
}

// Functions for date operations
export function formatSeasonName(season: Season): string {
  switch (season) {
    case 'Ver':
    case 'Spring':
    case 'SPRING':
    case 'spring':
      return 'Printemps';
    case 'Aes':
    case 'Aestas':
    case 'Summer':
    case 'SUMMER':
    case 'summer':
      return 'Été';
    case 'Aut':
    case 'Autumnus':
    case 'Autumn':
    case 'Fall':
    case 'AUTUMN':
    case 'autumn':
    case 'fall':
      return 'Automne';
    case 'Hie':
    case 'Hiems':
    case 'Winter':
    case 'WINTER':
    case 'winter':
      return 'Hiver';
    default:
      return season;
  }
}

export function formatGameDate(date: GameDate): string {
  return `${formatSeasonName(date.season)} ${date.year}${date.day ? ` (jour ${date.day})` : ''}`;
}

export function getSeasonOrder(season: Season): number {
  switch (season) {
    case 'Ver':
    case 'Spring':
    case 'SPRING':
    case 'spring':
      return 0;
    case 'Aes':
    case 'Aestas':
    case 'Summer':
    case 'SUMMER':
    case 'summer':
      return 1;
    case 'Aut':
    case 'Autumnus':
    case 'Autumn':
    case 'Fall':
    case 'AUTUMN':
    case 'autumn':
    case 'fall':
      return 2;
    case 'Hie':
    case 'Hiems':
    case 'Winter':
    case 'WINTER':
    case 'winter':
      return 3;
    default:
      return 0;
  }
}

export function compareGameDates(date1: GameDate, date2: GameDate): number {
  if (date1.year !== date2.year) {
    return date1.year - date2.year;
  }
  
  return getSeasonOrder(date1.season) - getSeasonOrder(date2.season);
}

export function advanceGameDate(date: GameDate): GameDate {
  const newDate = { ...date };
  
  switch (newDate.season) {
    case 'Ver':
    case 'Spring':
    case 'SPRING':
    case 'spring':
      newDate.season = 'Aes';
      break;
    case 'Aes':
    case 'Aestas':
    case 'Summer':
    case 'SUMMER':
    case 'summer':
      newDate.season = 'Aut';
      break;
    case 'Aut':
    case 'Autumnus':
    case 'Autumn':
    case 'Fall':
    case 'AUTUMN':
    case 'autumn':
    case 'fall':
      newDate.season = 'Hie';
      break;
    case 'Hie':
    case 'Hiems':
    case 'Winter':
    case 'WINTER':
    case 'winter':
      newDate.season = 'Ver';
      newDate.year += 1;
      break;
  }
  
  return newDate;
}

// Add stringToGameDate function to fix import errors
export function stringToGameDate(dateString: string): GameDate {
  // Default result
  const defaultResult: GameDate = { year: 700, season: 'Ver' };
  
  if (!dateString) return defaultResult;
  
  // Try to extract year and season from string like "705 AUC, Printemps"
  const yearMatch = dateString.match(/(\d+)/);
  const year = yearMatch ? parseInt(yearMatch[1]) : 700;
  
  // Match season
  let season: Season = 'Ver';
  if (dateString.includes('Printemps') || dateString.includes('Spring')) {
    season = 'Ver';
  } else if (dateString.includes('Été') || dateString.includes('Summer')) {
    season = 'Aes';
  } else if (dateString.includes('Automne') || dateString.includes('Autumn') || dateString.includes('Fall')) {
    season = 'Aut';
  } else if (dateString.includes('Hiver') || dateString.includes('Winter')) {
    season = 'Hie';
  }
  
  return { year, season };
}

// Add parseStringToGameDate for EconomieManagement
export function parseStringToGameDate(dateString: string): GameDate {
  return stringToGameDate(dateString);
}

// Add isGameDate function for RecentEventsTable
export function isGameDate(date: any): date is GameDate {
  return date && typeof date === 'object' && 
         'year' in date && typeof date.year === 'number' &&
         'season' in date && typeof date.season === 'string';
}

// Add adaptSeason for BuildingRevenue
export function adaptSeason(season: Season): Season {
  // Map any season format to the standard one
  if (['Ver', 'Spring', 'SPRING', 'spring'].includes(season)) {
    return 'Ver';
  } else if (['Aes', 'Aestas', 'Summer', 'SUMMER', 'summer'].includes(season)) {
    return 'Aes';
  } else if (['Aut', 'Autumnus', 'Autumn', 'Fall', 'AUTUMN', 'autumn', 'fall'].includes(season)) {
    return 'Aut';
  } else if (['Hie', 'Hiems', 'Winter', 'WINTER', 'winter'].includes(season)) {
    return 'Hie';
  }
  return season;
}
