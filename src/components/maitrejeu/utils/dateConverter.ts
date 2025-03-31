
import { GameDate, Season } from '../types/common';
import { GameDate as UtilsGameDate, Season as UtilsSeason } from '@/utils/types/gameDate';

/**
 * Converti un GameDate du maitrejeu en GameDate utilisable par les composants utils
 */
export const convertToUtilsGameDate = (date: GameDate): UtilsGameDate => {
  let season: UtilsSeason;
  
  // Conversion des saisons
  if (['Ver', 'SPRING', 'Spring', 'spring'].includes(date.season)) {
    season = 'spring';
  } else if (['Aestas', 'SUMMER', 'Summer', 'summer'].includes(date.season)) {
    season = 'summer';
  } else if (['Autumnus', 'AUTUMN', 'Autumn', 'autumn', 'fall'].includes(date.season)) {
    season = 'fall';
  } else {
    season = 'winter';
  }
  
  return {
    year: date.year,
    season
  };
};

/**
 * Converti un GameDate des utils en GameDate standard du maitre de jeu
 */
export const convertToMaitreJeuGameDate = (date: UtilsGameDate): GameDate => {
  let season: Season;
  
  // Conversion des saisons
  if (date.season === 'spring') {
    season = 'Ver';
  } else if (date.season === 'summer') {
    season = 'Aestas';
  } else if (date.season === 'fall') {
    season = 'Autumnus';
  } else {
    season = 'Hiems';
  }
  
  return {
    year: date.year,
    season
  };
};

/**
 * Convertion d'une chaine de caractères en GameDate
 */
export const stringToGameDate = (dateString: string): GameDate => {
  // Format attendu: "705 AUC, Printemps" ou "705, Été" etc.
  const parts = dateString.split(',');
  
  if (parts.length < 2) {
    // Format fallback: extract year and assume Spring
    const yearMatch = dateString.match(/\d+/);
    return {
      year: yearMatch ? parseInt(yearMatch[0]) : 700,
      season: 'Ver'
    };
  }
  
  const yearPart = parts[0].trim();
  const seasonPart = parts[1].trim();
  
  // Extract year (before "AUC" or just the number)
  const yearMatch = yearPart.match(/\d+/);
  const year = yearMatch ? parseInt(yearMatch[0]) : 700;
  
  // Map season to standard format
  let season: Season;
  if (['Printemps', 'Ver', 'SPRING', 'Spring', 'spring'].includes(seasonPart)) {
    season = 'Ver';
  } else if (['Été', 'Aestas', 'SUMMER', 'Summer', 'summer'].includes(seasonPart)) {
    season = 'Aestas';
  } else if (['Automne', 'Autumnus', 'AUTUMN', 'Autumn', 'autumn', 'Fall', 'fall'].includes(seasonPart)) {
    season = 'Autumnus';
  } else {
    season = 'Hiems';
  }
  
  return { year, season };
};

/**
 * Conversion d'une date à un format lisible
 */
export const gameDateToReadableString = (date: GameDate): string => {
  const seasonDisplay: Record<Season, string> = {
    'Ver': 'Printemps',
    'Aestas': 'Été',
    'Autumnus': 'Automne',
    'Hiems': 'Hiver',
    'SPRING': 'Printemps',
    'SUMMER': 'Été',
    'AUTUMN': 'Automne',
    'WINTER': 'Hiver',
    'Spring': 'Printemps',
    'Summer': 'Été',
    'Autumn': 'Automne',
    'Winter': 'Hiver',
    'spring': 'Printemps',
    'summer': 'Été',
    'autumn': 'Automne',
    'fall': 'Automne',
    'winter': 'Hiver'
  };

  return `${date.year} AUC, ${seasonDisplay[date.season]}`;
};

/**
 * Comparaison de deux GameDate
 * Retourne:
 * - négatif si date1 est antérieure à date2
 * - 0 si les dates sont identiques
 * - positif si date1 est postérieure à date2
 */
export const compareGameDates = (date1: GameDate, date2: GameDate): number => {
  if (date1.year !== date2.year) {
    return date1.year - date2.year;
  }
  
  // Ordre des saisons
  const seasonOrder: Record<Season, number> = {
    'Ver': 0, 'SPRING': 0, 'Spring': 0, 'spring': 0,
    'Aestas': 1, 'SUMMER': 1, 'Summer': 1, 'summer': 1,
    'Autumnus': 2, 'AUTUMN': 2, 'Autumn': 2, 'autumn': 2, 'fall': 2,
    'Hiems': 3, 'WINTER': 3, 'Winter': 3, 'winter': 3
  };
  
  return seasonOrder[date1.season] - seasonOrder[date2.season];
};

/**
 * Conversion d'une Date JavaScript en GameDate
 */
export const dateToGameDate = (date: Date): GameDate => {
  const year = date.getFullYear() - 753; // Convertir en années AUC (ab urbe condita)
  const month = date.getMonth();
  
  let season: Season;
  if (month >= 2 && month <= 4) { // Mars-Mai
    season = 'Ver';
  } else if (month >= 5 && month <= 7) { // Juin-Août
    season = 'Aestas';
  } else if (month >= 8 && month <= 10) { // Septembre-Novembre
    season = 'Autumnus';
  } else { // Décembre-Février
    season = 'Hiems';
  }
  
  return { year, season };
};
