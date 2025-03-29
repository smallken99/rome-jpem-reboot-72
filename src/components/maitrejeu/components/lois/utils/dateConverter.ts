
export interface GameDate {
  year: number;
  season: string;
}

export const gameDateToString = (gameDate: GameDate): string => {
  return `An ${gameDate.year}, ${gameDate.season}`;
};

export const gameOrJsDateToDate = (date: Date | GameDate): Date => {
  if (date instanceof Date) {
    return date;
  }
  
  // Convert game date to JS Date
  // This is a simplified conversion that places game dates on our calendar
  // Year 1 = 1 AD, Spring = March, Summer = June, Autumn = September, Winter = December
  const seasonToMonth: Record<string, number> = {
    'Printemps': 2, // March (0-indexed)
    'Été': 5,       // June
    'Automne': 8,   // September
    'Hiver': 11,    // December
    'Spring': 2,
    'Summer': 5,
    'Autumn': 8,
    'Winter': 11
  };
  
  const month = seasonToMonth[date.season] || 0;
  return new Date(date.year, month, 1);
};

export const extractLoiDateInfo = (date: any): GameDate => {
  if (!date) {
    return { year: new Date().getFullYear(), season: 'Printemps' };
  }
  
  if (typeof date === 'object' && 'year' in date && 'season' in date) {
    return date as GameDate;
  }
  
  // Try to parse from JS Date
  if (date instanceof Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    let season = 'Printemps';
    if (month >= 2 && month < 5) season = 'Printemps';
    else if (month >= 5 && month < 8) season = 'Été';
    else if (month >= 8 && month < 11) season = 'Automne';
    else season = 'Hiver';
    
    return { year, season };
  }
  
  return { year: new Date().getFullYear(), season: 'Printemps' };
};

export const gameDateToStringOrDate = (date: GameDate | Date): string => {
  if (date instanceof Date) {
    return date.toLocaleDateString();
  }
  return gameDateToString(date);
};
