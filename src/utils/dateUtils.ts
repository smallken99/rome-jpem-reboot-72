
import { GameDate, Season } from '@/components/maitrejeu/types/common';

/**
 * Convert GameDate from one format to another for compatibility
 */
export const convertToUtilsGameDate = (date: GameDate): any => {
  if (!date) return null;
  
  // Simply pass through the date properties, adapting as needed
  return {
    year: date.year,
    season: date.season,
    day: date.day || 1,
    phase: date.phase
  };
};

/**
 * Format a GameDate to a readable string
 */
export const formatGameDate = (date: GameDate): string => {
  if (!date) return '';
  
  const seasonMap: Record<string, string> = {
    'Ver': 'Printemps',
    'Aes': 'Été',
    'Aut': 'Automne',
    'Hie': 'Hiver',
    'Spring': 'Printemps',
    'Summer': 'Été',
    'Autumn': 'Automne',
    'Winter': 'Hiver',
    'spring': 'Printemps',
    'summer': 'Été',
    'autumn': 'Automne',
    'winter': 'Hiver',
    'SPRING': 'Printemps',
    'SUMMER': 'Été',
    'AUTUMN': 'Automne',
    'WINTER': 'Hiver',
    'Aestas': 'Été',
    'Autumnus': 'Automne',
    'Hiems': 'Hiver'
  };
  
  const seasonDisplay = seasonMap[date.season as string] || date.season;
  return `${seasonDisplay} de l'an ${date.year} AUC`;
};

/**
 * Safely determine the GamePhase (for type compatibility)
 */
export const resolveGamePhase = (phase: string | undefined): string => {
  const validPhases = [
    'Normal', 'normal', 'NORMAL',
    'Election', 'election', 'ELECTION',
    'Crisis', 'crisis', 'CRISIS',
    'War', 'war', 'WAR',
    'Diplomatic', 'diplomatic', 'DIPLOMATIC',
    'Religious', 'religious', 'RELIGIOUS',
    'Economic', 'economic', 'ECONOMIC',
    'Revolt', 'revolt', 'REVOLT',
    'Triumph', 'triumph', 'TRIUMPH',
    'Games', 'games', 'GAMES',
    'Scandal', 'scandal', 'SCANDAL',
    'SENATE', 'ACTIONS', 'ECONOMY', 'EVENTS',
    'SETUP', 'ACTION', 'SENAT',
    'Military', 'MILITARY', 'MILITAIRE',
    'Politique', 'POLITIQUE',
    'Economie', 'ECONOMIE',
    'Social', 'SOCIAL',
    'Evenements', 'EVENEMENT',
    'Administration', 'ADMINISTRATION'
  ];
  
  return validPhases.includes(phase || '') ? phase || 'Normal' : 'Normal';
};
