
import { GameDate, Season } from '@/utils/types/gameDate';

export const extractLoiDateInfo = (date: any): { year: number; season: Season } => {
  if (typeof date === 'object' && date !== null) {
    if ('year' in date && 'season' in date) {
      return { 
        year: date.year, 
        season: date.season as Season 
      };
    }
  }
  
  // Fallback to current date if invalid
  const currentDate = new Date();
  return {
    year: currentDate.getFullYear(),
    season: 'spring' // Default season
  };
};

export const gameDateToStringOrDate = (date: GameDate | Date): string => {
  if (date instanceof Date) {
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  }
  
  if (typeof date === 'object' && date !== null && 'year' in date && 'season' in date) {
    return `${seasonToFrench(date.season)} ${date.year}`;
  }
  
  return "Date inconnue";
};

export const seasonToFrench = (season: Season): string => {
  const translations: Record<Season, string> = {
    winter: 'Hiver',
    spring: 'Printemps',
    summer: 'Été',
    fall: 'Automne'
  };
  
  return translations[season] || 'Saison inconnue';
};

export const gameOrJsDateToDate = (date: GameDate | Date): Date => {
  if (date instanceof Date) {
    return date;
  }
  
  if (typeof date === 'object' && date !== null && 'year' in date && 'season' in date) {
    const monthByseason: Record<Season, number> = {
      winter: 0, // January
      spring: 3, // April
      summer: 6, // July
      fall: 9   // October
    };
    
    return new Date(date.year, monthByseason[date.season], 15);
  }
  
  return new Date();
};

export const gameDateToDate = (gameDate: GameDate): Date => {
  const monthByseason: Record<Season, number> = {
    winter: 0, // January
    spring: 3, // April
    summer: 6, // July
    fall: 9   // October
  };
  
  return new Date(gameDate.year, monthByseason[gameDate.season], 15);
};
