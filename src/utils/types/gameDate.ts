
/**
 * Types pour les dates du jeu
 */

export type Season = 'Ver' | 'Aes' | 'Aut' | 'Hie' | 'Spring' | 'Summer' | 'Autumn' | 'Winter' | 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER' | 'Fall';

export interface GameDate {
  year: number;
  season: Season;
  day?: number;
}

export function formatGameDate(date: GameDate): string {
  let seasonName: string;
  
  // Convert to standardized season name
  switch (date.season) {
    case 'Ver':
    case 'Spring':
    case 'SPRING':
      seasonName = 'Printemps';
      break;
    case 'Aes':
    case 'Summer':
    case 'SUMMER':
      seasonName = 'Été';
      break;
    case 'Aut':
    case 'Autumn':
    case 'Fall':
    case 'AUTUMN':
      seasonName = 'Automne';
      break;
    case 'Hie':
    case 'Winter':
    case 'WINTER':
      seasonName = 'Hiver';
      break;
    default:
      seasonName = String(date.season);
  }
  
  if (date.day) {
    return `${date.day} ${seasonName} ${date.year}`;
  }
  
  return `${seasonName} ${date.year}`;
}

export function compareGameDates(a: GameDate, b: GameDate): number {
  // Compare years first
  if (a.year !== b.year) {
    return a.year - b.year;
  }
  
  // If years are equal, compare seasons
  const seasonValues: Record<Season, number> = {
    'Ver': 0,
    'Spring': 0,
    'SPRING': 0,
    'Aes': 1,
    'Summer': 1,
    'SUMMER': 1,
    'Aut': 2,
    'Autumn': 2,
    'AUTUMN': 2,
    'Fall': 2,
    'Hie': 3,
    'Winter': 3,
    'WINTER': 3
  };
  
  if (a.season in seasonValues && b.season in seasonValues) {
    return seasonValues[a.season] - seasonValues[b.season];
  }
  
  // If one of the seasons is not recognized, convert to string for direct comparison
  return String(a.season).localeCompare(String(b.season));
}

export function advanceGameDate(date: GameDate): GameDate {
  const newDate = { ...date };
  
  // Advance season first
  switch (newDate.season) {
    case 'Ver':
    case 'Spring':
    case 'SPRING':
      newDate.season = 'Aes';
      break;
    case 'Aes':
    case 'Summer':
    case 'SUMMER':
      newDate.season = 'Aut';
      break;
    case 'Aut':
    case 'Autumn':
    case 'Fall':
    case 'AUTUMN':
      newDate.season = 'Hie';
      break;
    case 'Hie':
    case 'Winter':
    case 'WINTER':
      newDate.season = 'Ver';
      newDate.year++;
      break;
  }
  
  return newDate;
}
