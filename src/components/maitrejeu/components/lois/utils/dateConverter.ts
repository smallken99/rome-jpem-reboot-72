
import { GameDate } from '@/components/maitrejeu/types/common';

export const gameOrJsDateToDate = (date: GameDate | Date): Date => {
  if (date instanceof Date) {
    return date;
  }
  
  // Convert GameDate to JavaScript Date
  // Assuming winter is Dec, autumn is Sep, summer is Jun, spring is Mar
  const month = date.season === 'winter' ? 11 : 
               date.season === 'autumn' ? 8 : 
               date.season === 'summer' ? 5 : 2;
  
  return new Date(date.year, month, 15); // 15th day of the corresponding month
};

export const formatGameDate = (date: GameDate): string => {
  const seasonMap: Record<string, string> = {
    'spring': 'Printemps',
    'summer': 'Été',
    'autumn': 'Automne',
    'winter': 'Hiver'
  };
  
  return `${date.year} (${seasonMap[date.season] || date.season})`;
};

export const compareGameDates = (a: GameDate, b: GameDate): number => {
  const seasonValue = (season: string): number => {
    switch (season) {
      case 'spring': return 0;
      case 'summer': return 1;
      case 'autumn': return 2;
      case 'winter': return 3;
      default: return 0;
    }
  };
  
  if (a.year !== b.year) {
    return a.year - b.year;
  }
  
  return seasonValue(a.season) - seasonValue(b.season);
};

// Additional utility functions needed
export const gameDateToString = (date: GameDate): string => {
  return formatGameDate(date);
};

export const gameDateToDate = (date: GameDate): Date => {
  return gameOrJsDateToDate(date);
};

export const gameDateToStringOrDate = (date: GameDate | Date): string => {
  if (date instanceof Date) {
    return date.toLocaleDateString();
  }
  return formatGameDate(date);
};

export const extractLoiDateInfo = (date: GameDate): { year: number; season: string } => {
  return {
    year: date.year,
    season: date.season
  };
};
