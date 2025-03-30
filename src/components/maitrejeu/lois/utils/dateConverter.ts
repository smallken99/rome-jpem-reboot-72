
import { GameDate } from '@/utils/types/gameDate';

export const gameToReadableDate = (date: GameDate): string => {
  const seasonMap = {
    spring: 'Printemps',
    summer: 'Été',
    fall: 'Automne',
    winter: 'Hiver'
  };
  
  return `${seasonMap[date.season]} ${date.year} AUC`;
};

export const dateToGameDate = (date: Date): GameDate => {
  const month = date.getMonth();
  let season: 'spring' | 'summer' | 'fall' | 'winter';
  
  if (month >= 2 && month <= 4) season = 'spring';
  else if (month >= 5 && month <= 7) season = 'summer';
  else if (month >= 8 && month <= 10) season = 'fall';
  else season = 'winter';
  
  return {
    year: date.getFullYear(),
    season
  };
};

export const gameDateToDate = (gameDate: GameDate): Date => {
  const seasonMonthMap = {
    spring: 3,
    summer: 6,
    fall: 9,
    winter: 0
  };
  
  return new Date(gameDate.year, seasonMonthMap[gameDate.season], 15);
};

export const formatGameDate = (date: GameDate | Date): string => {
  if (date instanceof Date) {
    return date.toLocaleDateString();
  }
  
  return gameToReadableDate(date);
};
