
// Game date types
export type Season = 'VER' | 'AESTAS' | 'AUTUMNUS' | 'HIEMS' | 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER' | 'Ver' | 'Aestas' | 'Autumnus' | 'Hiems' | string;

export interface GameDate {
  year: number;
  season: Season;
}

// Game phase types
export type GamePhase = 'normal' | 'crisis' | 'war' | 'civil_war' | 'election' | 'expansion' | 'reform' | 'prosperity' | 'decline' | 'ELECTION' | 'WAR' | 'CRISIS' | 'SENATE' | 'ECONOMY' | 'MILITARY' | 'RELIGION' | 'NORMAL' | string;

export function formatGameDate(date: GameDate): string {
  return `${date.season} ${date.year}`;
}

export function formatAnyDate(date: Date | GameDate | string): string {
  if (typeof date === 'string') {
    return date;
  } else if ('year' in date && 'season' in date) {
    return formatGameDate(date);
  } else if (date instanceof Date) {
    return date.toLocaleDateString();
  }
  return String(date);
}

export function isGameDate(date: any): date is GameDate {
  return date && typeof date === 'object' && 'year' in date && 'season' in date;
}

export function dateToGameDate(date: Date): GameDate {
  const month = date.getMonth();
  let season: Season;
  
  if (month >= 2 && month <= 4) {
    season = 'VER';
  } else if (month >= 5 && month <= 7) {
    season = 'AESTAS';
  } else if (month >= 8 && month <= 10) {
    season = 'AUTUMNUS';
  } else {
    season = 'HIEMS';
  }
  
  // Adjust year (game years are from founding of Rome, approx 753 BCE)
  const gameYear = date.getFullYear() + 753;
  
  return {
    year: gameYear,
    season
  };
}

export function gameYearToDate(gameYear: number): Date {
  // Convert from AUC (ab urbe condita) to CE
  const ceYear = gameYear - 753;
  return new Date(ceYear, 0, 1);
}

export function seasonToMonth(season: Season): number {
  const seasonUpper = season.toUpperCase();
  if (seasonUpper === 'VER' || seasonUpper === 'SPRING') return 3; // March
  if (seasonUpper === 'AESTAS' || seasonUpper === 'SUMMER') return 6; // June
  if (seasonUpper === 'AUTUMNUS' || seasonUpper === 'AUTUMN') return 9; // September
  if (seasonUpper === 'HIEMS' || seasonUpper === 'WINTER') return 0; // January
  return 0; // Default to January
}

export function parseStringToGameDate(dateStr: string): GameDate | null {
  if (!dateStr) return null;
  
  const parts = dateStr.split(' ');
  if (parts.length !== 2) return null;
  
  const season = parts[0] as Season;
  const year = parseInt(parts[1], 10);
  
  if (isNaN(year)) return null;
  
  return { year, season };
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

// Re-exporting ImportanceType
export type ImportanceType = 'mineure' | 'normale' | 'majeure' | 'critique' | 'low' | 'medium' | 'high' | 'critical' | string;
