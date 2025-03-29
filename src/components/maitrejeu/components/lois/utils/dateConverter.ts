
import { GameDate } from '@/types/game';

export const formatGameDateForRender = (date: GameDate | Date): string => {
  if (date instanceof Date) {
    return date.toLocaleDateString();
  }
  
  return `${date.season} ${date.year} AUC`;
};

export const gameToJsDate = (gameDate: GameDate): Date => {
  // Nous convertissons une date de jeu en date JavaScript
  // Cette implémentation est simplifiée et ne prend pas en compte les saisons de manière précise
  const season = {
    'winter': 0, // Janvier
    'spring': 3, // Avril
    'summer': 6, // Juillet
    'fall': 9    // Octobre
  };
  
  // Nous utilisons 753 AV. J.-C. comme point de référence pour la fondation de Rome
  const yearAD = gameDate.year - 753;
  
  return new Date(yearAD, season[gameDate.season], 1);
};

export const jsToGameDate = (date: Date): GameDate => {
  // Nous convertissons une date JavaScript en date de jeu
  const month = date.getMonth();
  let season: Season;
  
  if (month >= 0 && month < 3) {
    season = 'winter';
  } else if (month >= 3 && month < 6) {
    season = 'spring';
  } else if (month >= 6 && month < 9) {
    season = 'summer';
  } else {
    season = 'fall';
  }
  
  // Nous ajoutons 753 pour obtenir l'année AUC (ab urbe condita)
  const yearAUC = date.getFullYear() + 753;
  
  return {
    year: yearAUC,
    season
  };
};
