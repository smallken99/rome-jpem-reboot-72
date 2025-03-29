
import { GameDate } from '@/types/gameDate';

export const gameDateToString = (date: GameDate | Date): string => {
  if (date instanceof Date) {
    return date.toLocaleDateString('fr-FR');
  }
  
  return `${date.season} de l'an ${date.year}`;
};

export const gameDateToStringOrDate = (date: GameDate | Date | string): string => {
  if (typeof date === 'string') {
    return date;
  }
  
  if (date instanceof Date) {
    return date.toLocaleDateString('fr-FR');
  }
  
  return `${date.season} de l'an ${date.year}`;
};

export const isGameDate = (date: any): date is GameDate => {
  return date && typeof date === 'object' && 'year' in date && 'season' in date;
};

export const gameOrJsDateToDate = (date: GameDate | Date): Date => {
  if (date instanceof Date) {
    return date;
  }
  
  // Convert GameDate to a JavaScript Date (approximate conversion)
  const seasonMonths = {
    'Printemps': 3, // March
    'Été': 6,       // June
    'Automne': 9,   // September
    'Hiver': 12     // December
  };
  
  const month = seasonMonths[date.season as keyof typeof seasonMonths] || 1;
  return new Date(date.year, month - 1, 1);
};

export const extractLoiDateInfo = (loi: any): GameDate => {
  if (loi && loi.date && typeof loi.date === 'object' && 'year' in loi.date && 'season' in loi.date) {
    return loi.date as GameDate;
  }
  return { year: 0, season: '' };
};
