
import { GameDate } from '@/types/game';

export const gameOrJsDateToDate = (date: GameDate | Date): Date => {
  if (date instanceof Date) return date;
  
  // If it's a GameDate, convert to a JS Date
  const seasonMonth: Record<string, number> = {
    winter: 0, // January
    spring: 3, // April
    summer: 6, // July
    fall: 9 // October
  };
  
  return new Date(date.year, seasonMonth[date.season] || 0, 1);
};

export const gameDateToString = (date: GameDate): string => {
  const seasonName: Record<string, string> = {
    winter: 'Hiver',
    spring: 'Printemps',
    summer: 'Été',
    fall: 'Automne'
  };
  
  return `${seasonName[date.season]} ${date.year}`;
};

export const extractLoiDateInfo = (loi: any): { year: number; season: string } => {
  if (loi?.date?.year && loi?.date?.season) {
    return { year: loi.date.year, season: loi.date.season };
  }
  return { year: new Date().getFullYear(), season: 'winter' };
};

export const gameDateToStringOrDate = (date: GameDate | Date): string => {
  if (date instanceof Date) {
    return date.toLocaleDateString();
  }
  return gameDateToString(date as GameDate);
};
