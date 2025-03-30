
export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export interface GameDate {
  year: number;
  season: Season;
  toLocaleDateString?: () => string;
}
