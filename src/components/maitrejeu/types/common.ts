
/**
 * Common types used across the maître-jeu module
 */

// Game phases
export type GamePhase = 'preparation' | 'action' | 'resolution' | 'administration' | 'events';

// Seasons
export type Season = 'Ver' | 'Aes' | 'Aut' | 'Hie' | 'Spring' | 'Summer' | 'Autumn' | 'Winter' | 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER' | 'Fall' | 'Aestas' | 'Autumnus' | 'Hiems';

// GameDate interface
export interface GameDate {
  year: number;
  season: Season;
  day?: number;
}

// Functions for date operations
export function formatSeasonName(season: Season): string {
  switch (season) {
    case 'Ver':
    case 'Spring':
    case 'SPRING':
      return 'Printemps';
    case 'Aes':
    case 'Aestas':
    case 'Summer':
    case 'SUMMER':
      return 'Été';
    case 'Aut':
    case 'Autumnus':
    case 'Autumn':
    case 'Fall':
    case 'AUTUMN':
      return 'Automne';
    case 'Hie':
    case 'Hiems':
    case 'Winter':
    case 'WINTER':
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
      return 0;
    case 'Aes':
    case 'Aestas':
    case 'Summer':
    case 'SUMMER':
      return 1;
    case 'Aut':
    case 'Autumnus':
    case 'Autumn':
    case 'Fall':
    case 'AUTUMN':
      return 2;
    case 'Hie':
    case 'Hiems':
    case 'Winter':
    case 'WINTER':
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
      newDate.season = 'Aes';
      break;
    case 'Aes':
    case 'Aestas':
    case 'Summer':
    case 'SUMMER':
      newDate.season = 'Aut';
      break;
    case 'Aut':
    case 'Autumnus':
    case 'Autumn':
    case 'Fall':
    case 'AUTUMN':
      newDate.season = 'Hie';
      break;
    case 'Hie':
    case 'Hiems':
    case 'Winter':
    case 'WINTER':
      newDate.season = 'Ver';
      newDate.year += 1;
      break;
  }
  
  return newDate;
}
