
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
