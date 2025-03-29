
/**
 * Utility functions for converting between different date formats
 */

// Convert game date to string
export const gameDateToString = (date: { year: number; season: string }): string => {
  return `An ${date.year}, ${date.season}`;
};

// Convert string or game date object to string
export const gameDateToStringOrDate = (date: string | { year: number; season: string }): string => {
  if (typeof date === 'string') {
    return date;
  }
  return gameDateToString(date);
};

// Helper to format a season
export const formatSeason = (season: string): string => {
  const seasonMap: Record<string, string> = {
    'SPRING': 'Printemps',
    'SUMMER': 'Été',
    'AUTUMN': 'Automne',
    'WINTER': 'Hiver',
    'Ver': 'Printemps',
    'Aestas': 'Été',
    'Autumnus': 'Automne',
    'Hiems': 'Hiver',
  };
  
  return seasonMap[season] || season;
};

// Convert game date to JavaScript Date object (mock date)
export const gameDateToDate = (date: { year: number; season: string }): Date => {
  // Map seasons to months (0-based)
  const seasonToMonth: Record<string, number> = {
    'Printemps': 2, // March
    'Été': 5, // June
    'Automne': 8, // September
    'Hiver': 11, // December
    'Spring': 2,
    'Summer': 5,
    'Autumn': 8,
    'Winter': 11
  };
  
  const month = seasonToMonth[date.season] || 0;
  return new Date(date.year, month, 1);
};

// Convert JavaScript Date to game date format
export const dateToGameDate = (date: Date): { year: number; season: string } => {
  const month = date.getMonth();
  let season = 'Printemps';
  
  if (month >= 9) season = 'Hiver';
  else if (month >= 6) season = 'Automne';
  else if (month >= 3) season = 'Été';
  
  return {
    year: date.getFullYear(),
    season
  };
};

// Extract year and season from a loi date object
export const extractLoiDateInfo = (date: any): { year: number; season: string } => {
  if (!date) return { year: 0, season: 'Inconnue' };
  
  if (typeof date === 'object' && date.year !== undefined && date.season !== undefined) {
    return { year: date.year, season: date.season };
  }
  
  if (typeof date === 'string') {
    const matches = date.match(/An (\d+),?\s+(.+)/);
    if (matches && matches.length >= 3) {
      return {
        year: parseInt(matches[1], 10),
        season: matches[2].trim()
      };
    }
  }
  
  return { year: 0, season: 'Inconnue' };
};
