
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
