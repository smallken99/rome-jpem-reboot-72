
// Define Season as a union of possible values
export type Season = 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER' | 'Ver' | 'Aestas' | 'Autumnus' | 'Hiems';

// Define GamePhase as a union of possible values
export type GamePhase = 'normal' | 'crisis' | 'war' | 'election' | 'senate' | 'assembly' | 'SENATE' | 'ELECTION' | 'CRISIS' | 'WAR';

// Define GameDate interface
export interface GameDate {
  year: number;
  season: Season;
  day?: number;
}

// Parse a string to GameDate
export function parseStringToGameDate(dateString: string): GameDate {
  // Simple implementation - adjust based on your actual date format
  const parts = dateString.split(' ');
  return {
    year: parseInt(parts[parts.length - 1]),
    season: parts[0] as Season
  };
}

// Function to format a GameDate for display
export function formatGameDate(date: GameDate): string {
  return `${date.season} ${date.year}`;
}

// Function to convert string season to Season type
export function normalizeSeason(season: string): Season {
  const seasonMap: Record<string, Season> = {
    'spring': 'SPRING',
    'summer': 'SUMMER',
    'autumn': 'AUTUMN',
    'winter': 'WINTER',
    'ver': 'Ver',
    'aestas': 'Aestas',
    'autumnus': 'Autumnus',
    'hiems': 'Hiems',
  };
  
  return (seasonMap[season.toLowerCase()] || 'SPRING') as Season;
}

// Function to check if an object is a GameDate
export function isGameDate(obj: any): obj is GameDate {
  return obj && 
         typeof obj === 'object' && 
         'year' in obj && 
         'season' in obj &&
         typeof obj.year === 'number' &&
         typeof obj.season === 'string';
}

// Helper function to format a Date or GameDate for display
export function formatAnyDate(date: Date | GameDate): string {
  if (isGameDate(date)) {
    return formatGameDate(date);
  } else {
    return date.toLocaleDateString();
  }
}
