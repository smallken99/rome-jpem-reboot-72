
// Helper function to ensure we have a valid game date
export const ensureGameDate = (date: any): { year: number; season: string } => {
  if (!date) {
    return { year: 0, season: 'Inconnue' };
  }
  
  if (typeof date === 'string') {
    // Try to parse from string if possible
    const matches = date.match(/An (\d+),?\s+(.+)/);
    if (matches && matches.length >= 3) {
      return {
        year: parseInt(matches[1], 10),
        season: matches[2].trim()
      };
    }
    return { year: 0, season: date };
  }
  
  return date;
};

// Format any date (string or object) to a consistent display format
export const formatAnyGameDate = (date: any): string => {
  const gameDate = ensureGameDate(date);
  return `An ${gameDate.year}, ${gameDate.season}`;
};
