
import { GameDate as MaitreJeuGameDate, Season as MaitreJeuSeason } from '../types/common';
import { GameDate as UtilsGameDate, Season as UtilsSeason } from '@/utils/types/gameDate';

/**
 * Convert MaitreJeu GameDate to Utils GameDate
 */
export const convertToUtilsGameDate = (date: MaitreJeuGameDate): UtilsGameDate => {
  let season: UtilsSeason;
  
  // Convert the season format
  if (date.season === 'Ver' || date.season === 'SPRING' || date.season === 'Spring' || date.season === 'spring') {
    season = 'spring';
  } else if (date.season === 'Aestas' || date.season === 'SUMMER' || date.season === 'Summer' || date.season === 'summer') {
    season = 'summer';
  } else if (date.season === 'Autumnus' || date.season === 'AUTUMN' || date.season === 'Autumn' || date.season === 'autumn' || date.season === 'fall') {
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
 * Convert Utils GameDate to MaitreJeu GameDate
 */
export const convertToMaitreJeuGameDate = (date: UtilsGameDate): MaitreJeuGameDate => {
  let season: MaitreJeuSeason;
  
  // Convert the season format
  if (date.season === 'spring') {
    season = 'SPRING';
  } else if (date.season === 'summer') {
    season = 'SUMMER';
  } else if (date.season === 'fall') {
    season = 'AUTUMN';
  } else {
    season = 'WINTER';
  }
  
  return {
    year: date.year,
    season
  };
};

/**
 * Format a GameDate object as a human-readable string
 */
export const formatDateForDisplay = (date: MaitreJeuGameDate): string => {
  const seasonDisplay = {
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
  
  return `${seasonDisplay[date.season]} ${date.year}`;
};

/**
 * Compare two GameDate objects
 * @returns -1 if date1 < date2, 0 if date1 === date2, 1 if date1 > date2
 */
export const compareGameDates = (date1: MaitreJeuGameDate, date2: MaitreJeuGameDate): number => {
  if (date1.year < date2.year) return -1;
  if (date1.year > date2.year) return 1;
  
  // Same year, compare seasons
  const seasonOrder = {
    'Ver': 0, 'SPRING': 0, 'Spring': 0, 'spring': 0,
    'Aestas': 1, 'SUMMER': 1, 'Summer': 1, 'summer': 1,
    'Autumnus': 2, 'AUTUMN': 2, 'Autumn': 2, 'autumn': 2, 'fall': 2,
    'Hiems': 3, 'WINTER': 3, 'Winter': 3, 'winter': 3
  };
  
  const season1Value = seasonOrder[date1.season] || 0;
  const season2Value = seasonOrder[date2.season] || 0;
  
  return season1Value - season2Value;
};
