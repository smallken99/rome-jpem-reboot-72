
import { GameDate, Season } from '@/utils/types/gameDate';

export const formatGameDate = (date: GameDate): string => {
  const { year, season } = date;
  return `${getSeasonName(season)} ${year}`;
};

export const getSeasonName = (season: Season): string => {
  switch (season) {
    case 'spring': return 'Printemps';
    case 'summer': return 'Été';
    case 'autumn': return 'Automne';
    case 'winter': return 'Hiver';
    default: return 'Saison inconnue';
  }
};

export const gameDateToDate = (gameDate: GameDate): Date => {
  const { year, season } = gameDate;
  const month = getMonthFromSeason(season);
  return new Date(year, month, 15);
};

export const getMonthFromSeason = (season: Season): number => {
  switch (season) {
    case 'spring': return 2; // Mars
    case 'summer': return 5; // Juin
    case 'autumn': return 8; // Septembre
    case 'winter': return 11; // Décembre
    default: return 0;
  }
};

export const extractLoiDateInfo = (date: GameDate): { year: number; season: string } => {
  return {
    year: date.year,
    season: date.season
  };
};

export const gameDateToStringOrDate = (date: GameDate | Date): string => {
  if (date instanceof Date) {
    return date.toLocaleDateString('fr-FR');
  }
  
  return formatGameDate(date);
};

export const gameOrJsDateToDate = (date: GameDate | Date): Date => {
  if (date instanceof Date) {
    return date;
  }
  
  return gameDateToDate(date);
};
