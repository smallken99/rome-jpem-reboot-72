
export type Season = 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER' | string;
export type PlayerSeason = 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER' | string;

export interface GameDate {
  year: number;
  season: Season | PlayerSeason;
}

export type GamePhase = 'EVENT' | 'ACTION' | 'RESOLUTION' | 'ELECTION' | 'VOTE';
