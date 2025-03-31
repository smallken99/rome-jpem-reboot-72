
export type Season = 'spring' | 'summer' | 'fall' | 'winter';

export interface GameDate {
  year: number;
  season: Season;
  
  // Add compatibility method for date-like operations
  toLocaleDateString?: () => string;
  toLocaleString?: () => string;
}

export function formatGameDate(date: GameDate): string {
  return `${date.season} ${date.year}`;
}

// Add additional helper functions
export function isGameDate(date: any): date is GameDate {
  return date && typeof date === 'object' && 'year' in date && 'season' in date;
}

export function seasonToString(season: Season): string {
  const seasonMap = {
    'spring': 'Printemps',
    'summer': 'Été',
    'fall': 'Automne',
    'winter': 'Hiver'
  };
  
  return seasonMap[season] || season;
}

export function formatSeasonDisplay(season: string): string {
  const upperSeason = season.toUpperCase();
  if (upperSeason === 'SPRING' || upperSeason === 'VER') return 'Printemps';
  if (upperSeason === 'SUMMER' || upperSeason === 'AESTAS') return 'Été';
  if (upperSeason === 'AUTUMN' || upperSeason === 'FALL' || upperSeason === 'AUTUMNUS') return 'Automne';
  if (upperSeason === 'WINTER' || upperSeason === 'HIEMS') return 'Hiver';
  return season;
}
