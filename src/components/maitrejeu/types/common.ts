
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
