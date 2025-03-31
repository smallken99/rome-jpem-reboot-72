
// Season type for strict type checking
export type Season = 'spring' | 'summer' | 'fall' | 'winter' | 'Spring' | 'Summer' | 'Fall' | 'Autumn' | 'Winter';

// Game phase types
export type GamePhase = 
  | 'normal' 
  | 'election' 
  | 'crisis' 
  | 'war' 
  | 'POLITIQUE' 
  | 'ECONOMIE' 
  | 'SOCIAL' 
  | 'MILITAIRE' 
  | 'RELIGION'
  | 'ACTIONS' 
  | 'ELECTION'
  | 'SENAT'
  | 'SENATE';

// Standard game date format
export interface GameDate {
  year: number;
  season: Season;
}

// Function to check if a value is a GameDate
export function isGameDate(value: any): value is GameDate {
  return (
    value &&
    typeof value === 'object' &&
    typeof value.year === 'number' &&
    typeof value.season === 'string'
  );
}

// Format any date for display
export function formatAnyDate(date: Date | GameDate | string): string {
  if (isGameDate(date)) {
    return `${date.year} (${formatSeason(date.season)})`;
  }
  if (date instanceof Date) {
    return date.toLocaleDateString();
  }
  // Try to parse as a GameDate from string
  try {
    const jsonDate = JSON.parse(date);
    if (isGameDate(jsonDate)) {
      return `${jsonDate.year} (${formatSeason(jsonDate.season)})`;
    }
  } catch (e) {
    // Not a JSON string
  }
  return String(date);
}

// Format a season name
export function formatSeason(season: string): string {
  const seasonMap: Record<string, string> = {
    spring: 'Printemps',
    summer: 'Été',
    fall: 'Automne',
    winter: 'Hiver',
    Spring: 'Printemps',
    Summer: 'Été',
    Fall: 'Automne',
    Autumn: 'Automne',
    Winter: 'Hiver',
    ver: 'Printemps',
    aestas: 'Été',
    autumnus: 'Automne',
    hiems: 'Hiver',
  };
  return seasonMap[season] || season;
}

// Season dictionary maps for compatibility across components
export const SAISONS = {
  SPRING: 'spring',
  SUMMER: 'summer',
  AUTUMN: 'fall',
  WINTER: 'winter',
  PRINTEMPS: 'spring',
  ETE: 'summer',
  AUTOMNE: 'fall',
  HIVER: 'winter'
};

// Parse string to GameDate
export function parseStringToGameDate(dateStr: string): GameDate | null {
  try {
    // Try to parse as JSON
    const parsed = JSON.parse(dateStr);
    if (parsed && typeof parsed.year === 'number' && typeof parsed.season === 'string') {
      return {
        year: parsed.year,
        season: parsed.season as Season
      };
    }
  } catch (e) {
    // Try to parse other formats
    const dateMatch = dateStr.match(/(\d+)\s*\(([^)]+)\)/);
    if (dateMatch) {
      const year = parseInt(dateMatch[1], 10);
      let season = dateMatch[2].trim().toLowerCase();
      
      // Map to standard season
      if (season.includes('printemps')) season = 'spring';
      else if (season.includes('été') || season.includes('ete')) season = 'summer';
      else if (season.includes('automne')) season = 'fall';
      else if (season.includes('hiver')) season = 'winter';
      
      return { year, season: season as Season };
    }
  }
  return null;
}
