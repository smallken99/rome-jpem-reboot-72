
export interface GameDate {
  year: number;
  season: string;
}

export const gameDateToString = (date: GameDate): string => {
  return `An ${date.year}, ${date.season}`;
};

export const stringToGameDate = (dateString: string): GameDate => {
  const parts = dateString.split(', ');
  if (parts.length !== 2) {
    return { year: 0, season: 'Printemps' };
  }
  
  const yearStr = parts[0].replace('An ', '');
  const year = parseInt(yearStr, 10);
  const season = parts[1];
  
  return { year, season };
};

export const gameOrJsDateToDate = (gameDate: GameDate | Date): Date => {
  if (gameDate instanceof Date) {
    return gameDate;
  }
  
  // Convert game date to JS Date (approximate)
  const baseYear = 2000; // Arbitrary base year
  const seasonMonths = {
    'Printemps': 3, // Spring
    'Été': 6,       // Summer
    'Automne': 9,   // Fall
    'Hiver': 12     // Winter
  };
  
  const month = seasonMonths[gameDate.season as keyof typeof seasonMonths] || 1;
  return new Date(baseYear + gameDate.year, month, 1);
};

export const gameDateToDate = (gameDate: GameDate): Date => {
  // Same implementation as above but with stricter typing
  const baseYear = 2000;
  const seasonMonths = {
    'Printemps': 3,
    'Été': 6,
    'Automne': 9,
    'Hiver': 12
  };
  
  const month = seasonMonths[gameDate.season as keyof typeof seasonMonths] || 1;
  return new Date(baseYear + gameDate.year, month, 1);
};

export const extractLoiDateInfo = (date: GameDate | Date): string => {
  if (date instanceof Date) {
    return `${date.getFullYear()}, ${getSeasonFromMonth(date.getMonth())}`;
  }
  
  return `${date.year}, ${date.season}`;
};

export const getSeasonFromMonth = (month: number): string => {
  if (month >= 2 && month <= 4) return 'Printemps';
  if (month >= 5 && month <= 7) return 'Été';
  if (month >= 8 && month <= 10) return 'Automne';
  return 'Hiver';
};

export const gameDateToStringOrDate = (date: GameDate | Date): string => {
  if (date instanceof Date) {
    return date.toLocaleDateString();
  }
  
  return gameDateToString(date);
};
