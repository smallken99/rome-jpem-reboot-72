
export type Season = 'Spring' | 'Summer' | 'Autumn' | 'Winter' | 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER' | 'Ver' | 'Aes' | 'Aut' | 'Hie';

export interface GameDate {
  year: number;
  season: Season;
}
