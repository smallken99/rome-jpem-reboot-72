
import { GameDate, Season, GamePhase } from '../types/common';

// Convert a string representation of a season to the corresponding Season type
export function convertStringToSeason(seasonStr: string): Season {
  if (seasonStr === 'SPRING' || seasonStr === 'Spring' || seasonStr === 'spring' || seasonStr === 'Ver') return 'SPRING';
  if (seasonStr === 'SUMMER' || seasonStr === 'Summer' || seasonStr === 'summer' || seasonStr === 'Aes') return 'SUMMER';
  if (seasonStr === 'AUTUMN' || seasonStr === 'Autumn' || seasonStr === 'autumn' || seasonStr === 'fall' || seasonStr === 'Fall' || seasonStr === 'Aut') return 'AUTUMN';
  if (seasonStr === 'WINTER' || seasonStr === 'Winter' || seasonStr === 'winter' || seasonStr === 'Hie') return 'WINTER';
  return 'SPRING'; // Default to spring if invalid
}

// Generate a readable string from a GameDate
export function formatGameDate(date: GameDate): string {
  return `An ${date.year} (${formatSeason(date.season)})${date.phase ? ` - Phase ${formatPhase(date.phase)}` : ''}`;
}

// Format a season for display
export function formatSeason(season: Season): string {
  if (season === 'SPRING') return 'Printemps';
  if (season === 'SUMMER') return 'Été';
  if (season === 'AUTUMN') return 'Automne';
  if (season === 'WINTER') return 'Hiver';
  return season; // Default to the provided string
}

// Format a phase for display
export function formatPhase(phase: GamePhase): string {
  switch (phase) {
    case 'normal': return 'Normale';
    case 'election': return 'Élections';
    case 'crisis': return 'Crise';
    case 'war': return 'Guerre';
    case 'diplomatic': return 'Diplomatique';
    case 'religious': return 'Religieuse';
    case 'economic': return 'Économique';
    case 'revolt': return 'Révolte';
    case 'triumph': return 'Triomphe';
    case 'games': return 'Jeux';
    case 'scandal': return 'Scandale';
    default: return phase;
  }
}

// Advance to the next season
export function getNextSeason(currentSeason: Season): Season {
  if (currentSeason === 'SPRING') return 'SUMMER';
  if (currentSeason === 'SUMMER') return 'AUTUMN';
  if (currentSeason === 'AUTUMN') return 'WINTER';
  if (currentSeason === 'WINTER') return 'SPRING';
  return 'SPRING'; // Default
}

// Get previous season
export function getPreviousSeason(currentSeason: Season): Season {
  if (currentSeason === 'SPRING') return 'WINTER';
  if (currentSeason === 'SUMMER') return 'SPRING';
  if (currentSeason === 'AUTUMN') return 'SUMMER';
  if (currentSeason === 'WINTER') return 'AUTUMN';
  return 'WINTER'; // Default
}

// Check if a date is in the future compared to another
export function isDateInFuture(date: GameDate, referenceDate: GameDate): boolean {
  if (date.year > referenceDate.year) return true;
  if (date.year < referenceDate.year) return false;
  
  const seasonValues: Record<Season, number> = {
    'SPRING': 0,
    'SUMMER': 1,
    'AUTUMN': 2,
    'WINTER': 3,
    'Ver': 0,
    'Aes': 1,
    'Aut': 2,
    'Hie': 3,
    'Spring': 0,
    'Summer': 1,
    'Autumn': 2,
    'Winter': 3,
    'spring': 0,
    'summer': 1,
    'autumn': 2,
    'winter': 3,
    'fall': 2
  };
  
  return seasonValues[date.season] > seasonValues[referenceDate.season];
}

// Check if two dates are the same
export function areDatesEqual(date1: GameDate, date2: GameDate): boolean {
  return date1.year === date2.year && date1.season === date2.season;
}
