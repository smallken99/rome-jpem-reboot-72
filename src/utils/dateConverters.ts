
import { GameDate } from '@/components/maitrejeu/types/common';

// Convertir une date JS en GameDate
export const convertDateToGameDate = (date: Date): GameDate => {
  const year = date.getFullYear();
  
  // Déterminer la saison en fonction du mois
  let season: string;
  const month = date.getMonth();
  
  if (month >= 2 && month <= 4) {
    season = 'SPRING'; // Mars, Avril, Mai
  } else if (month >= 5 && month <= 7) {
    season = 'SUMMER'; // Juin, Juillet, Août
  } else if (month >= 8 && month <= 10) {
    season = 'AUTUMN'; // Septembre, Octobre, Novembre
  } else {
    season = 'WINTER'; // Décembre, Janvier, Février
  }
  
  return { year, season };
};

// Convertir une GameDate en chaîne de caractères formatée
export const formatGameDate = (date: GameDate): string => {
  return `${date.year} ${date.season}`;
};

// Convertir une chaîne de caractères en GameDate
export const parseGameDateString = (dateString: string): GameDate => {
  const parts = dateString.split(' ');
  const year = parseInt(parts[0], 10);
  const season = parts.length > 1 ? parts[1] : 'SPRING';
  
  return { year, season };
};

// Convertir une GameDate en Date JS approximative (pour la visualisation)
export const convertGameDateToJSDate = (gameDate: GameDate): Date => {
  const date = new Date(gameDate.year, 0, 1); // 1er janvier de l'année
  
  // Ajuster le mois en fonction de la saison
  switch (gameDate.season) {
    case 'SPRING':
    case 'Ver':
      date.setMonth(3); // Avril
      break;
    case 'SUMMER':
    case 'Aestas':
      date.setMonth(6); // Juillet
      break;
    case 'AUTUMN':
    case 'Autumnus':
      date.setMonth(9); // Octobre
      break;
    case 'WINTER':
    case 'Hiems':
      date.setMonth(0); // Janvier (de la même année)
      break;
  }
  
  return date;
};
