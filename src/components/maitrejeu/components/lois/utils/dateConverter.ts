
import { GameDate, Season } from '@/utils/types/gameDate';

export const extractLoiDateInfo = (loi: any): { year: number; season: Season } => {
  if (!loi || !loi.date) {
    return { year: 0, season: 'spring' };
  }

  if (typeof loi.date === 'object' && 'year' in loi.date && 'season' in loi.date) {
    return {
      year: loi.date.year,
      season: normalizeSeason(loi.date.season)
    };
  }

  // Fallback à la date actuelle
  const now = new Date();
  return {
    year: now.getFullYear(),
    season: getCurrentSeason()
  };
};

export const gameDateToDate = (gameDate: GameDate | undefined): Date => {
  if (!gameDate) {
    return new Date();
  }

  const year = gameDate.year;
  let month = 0;

  switch (gameDate.season) {
    case 'spring': month = 2; break; // Mars
    case 'summer': month = 5; break; // Juin
    case 'autumn': month = 8; break; // Septembre
    case 'winter': month = 11; break; // Décembre
  }

  return new Date(year, month, 15);
};

export const gameOrJsDateToDate = (date: Date | GameDate): Date => {
  if (date instanceof Date) {
    return date;
  }
  return gameDateToDate(date);
};

export const gameDateToStringOrDate = (date: GameDate | Date | string): string => {
  if (typeof date === 'string') {
    return date;
  }

  if (date instanceof Date) {
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  const seasonNames = {
    spring: 'Printemps',
    summer: 'Été',
    autumn: 'Automne',
    winter: 'Hiver'
  };

  return `${seasonNames[date.season]} ${date.year}`;
};

const normalizeSeason = (season: string): Season => {
  const normalized = season.toLowerCase();
  
  if (normalized.includes('print')) return 'spring';
  if (normalized.includes('été') || normalized.includes('ete') || normalized.includes('summ')) return 'summer';
  if (normalized.includes('automn') || normalized.includes('fall')) return 'autumn';
  if (normalized.includes('hiver') || normalized.includes('wint')) return 'winter';
  
  return 'spring';
};

const getCurrentSeason = (): Season => {
  const month = new Date().getMonth();
  
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'autumn';
  return 'winter';
};
