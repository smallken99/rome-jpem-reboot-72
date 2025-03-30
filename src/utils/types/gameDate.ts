
export type Season = 'winter' | 'spring' | 'summer' | 'fall';

export interface GameDate {
  year: number;
  season: Season;
  day?: number;
  month?: number;
  endDate?: GameDate;
  toLocaleDateString?: () => string;
}

export type NormalizedDate = {
  year: number;
  month: number;
  day: number;
};

export const isGameDate = (date: any): date is GameDate => {
  return date && typeof date === 'object' && 'year' in date && 'season' in date;
};

export const convertToNormalizedDate = (date: GameDate): NormalizedDate => {
  const seasonToMonth = {
    winter: 1,
    spring: 4,
    summer: 7,
    fall: 10
  };
  
  return {
    year: date.year,
    month: seasonToMonth[date.season],
    day: date.day || 15
  };
};

export const gameDateToDate = (gameDate: GameDate): Date => {
  const { year, month, day } = convertToNormalizedDate(gameDate);
  return new Date(year, month - 1, day);
};

export const gameDateToString = (gameDate: GameDate): string => {
  const { season, year } = gameDate;
  return `${season} ${year}`;
};

export const gameDateToStringOrDate = (date: GameDate | Date): string => {
  if (isGameDate(date)) {
    return gameDateToString(date);
  }
  return date.toLocaleDateString('fr-FR');
};
