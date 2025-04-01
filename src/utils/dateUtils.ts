
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

/**
 * Format a date for display
 */
export const formatDate = (date: GameDate | Date | string): string => {
  if (!date) return '';
  
  if (typeof date === 'string') {
    return date;
  }
  
  if (date instanceof Date) {
    return date.toLocaleDateString();
  }
  
  // Handle GameDate
  return formatGameDate(date as GameDate);
};

/**
 * Get the seasons after a given date
 */
export const getSeasonsAfter = (date: GameDate, count: number = 4): GameDate[] => {
  const seasons: Season[] = ['Ver', 'Aes', 'Aut', 'Hie'];
  const result: GameDate[] = [];
  
  // Find the index of the current season
  const currentSeasonIndex = seasons.indexOf(date.season as Season);
  if (currentSeasonIndex === -1) return result;
  
  let year = date.year;
  let seasonIndex = currentSeasonIndex;
  
  for (let i = 0; i < count; i++) {
    seasonIndex = (seasonIndex + 1) % 4;
    if (seasonIndex === 0) {
      year++;
    }
    
    result.push({
      year,
      season: seasons[seasonIndex],
      day: 1
    });
  }
  
  return result;
};

/**
 * Convert a string to a GameDate
 */
export const stringToGameDate = (dateString: string): GameDate | null => {
  if (!dateString) return null;
  
  // Try to parse the format "Season Year" (e.g., "Ver 752")
  const seasonYearRegex = /^([A-Za-z]+)\s+(\d+)$/;
  const match = dateString.match(seasonYearRegex);
  
  if (match) {
    const seasonStr = match[1];
    const year = parseInt(match[2], 10);
    
    // Map the season string to a known season
    const seasonMap: Record<string, Season> = {
      'Ver': 'Ver',
      'Printemps': 'Ver',
      'Spring': 'Ver',
      'Aes': 'Aes',
      'Été': 'Aes',
      'Summer': 'Aes',
      'Aut': 'Aut',
      'Automne': 'Aut',
      'Autumn': 'Aut',
      'Hie': 'Hie',
      'Hiver': 'Hie',
      'Winter': 'Hie'
    };
    
    const season = seasonMap[seasonStr];
    
    if (season && !isNaN(year)) {
      return { year, season, day: 1 };
    }
  }
  
  // Try to parse as a regular date
  const dateObj = new Date(dateString);
  if (!isNaN(dateObj.getTime())) {
    // Convert regular date to GameDate
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();
    
    // Map month to season
    let season: Season;
    if (month >= 2 && month <= 4) {
      season = 'Ver'; // Spring (March-May)
    } else if (month >= 5 && month <= 7) {
      season = 'Aes'; // Summer (June-August)
    } else if (month >= 8 && month <= 10) {
      season = 'Aut'; // Autumn (September-November)
    } else {
      season = 'Hie'; // Winter (December-February)
    }
    
    return {
      year,
      season,
      day: dateObj.getDate()
    };
  }
  
  return null;
};
