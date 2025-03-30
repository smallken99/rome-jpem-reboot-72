
export type Season = 'spring' | 'summer' | 'fall' | 'winter';

export interface GameDate {
  year: number;
  season: Season;
}

export interface GameDateWithPhase extends GameDate {
  phase?: string;
}
