
// Define Season as a union of possible values
export type Season = 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER' | 'Ver' | 'Aestas' | 'Autumnus' | 'Hiems' | 'Spring' | 'Summer' | 'Autumn' | 'Winter';

// Define GamePhase as a union of possible values
export type GamePhase = 'normal' | 'crisis' | 'war' | 'election' | 'senate' | 'assembly' | 'SENATE' | 'ELECTION' | 'CRISIS' | 'WAR' | 'POLITIQUE' | 'ECONOMIE' | 'MILITAIRE' | 'RELIGION' | 'SOCIAL' | 'ADMINISTRATION' | 'ACTIONS' | 'ECONOMY' | 'EVENTS' | 'DIPLOMACY' | 'MILITARY' | 'ACTION' | 'SENAT' | 'EVENEMENT' | 'SETUP';

// Define GameDate interface
export interface GameDate {
  year: number;
  season: Season;
  day?: number;
  phase?: GamePhase;
  
  // Add compatibility method for date-like operations
  toLocaleDateString?: () => string;
  toLocaleString?: () => string;
}

// Parse a string to GameDate
export function parseStringToGameDate(dateString: string): GameDate {
  // Simple implementation - adjust based on your actual date format
  const parts = dateString.split(' ');
  return {
    year: parseInt(parts[parts.length - 1]),
    season: normalizeSeason(parts[0])
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
  
  if (season.toUpperCase() === 'SPRING') return 'SPRING';
  if (season.toUpperCase() === 'SUMMER') return 'SUMMER';
  if (season.toUpperCase() === 'AUTUMN') return 'AUTUMN';
  if (season.toUpperCase() === 'WINTER') return 'WINTER';
  
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

// Export an ImportanceType for use in various components
export type ImportanceType = 'low' | 'medium' | 'high' | 'critical' | 'normale' | 'importante' | 'critique' | 'mineure' | string;

// Helper function to generate a unique ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Helper function to convert date to GameDate
export function dateToGameDate(date: Date): GameDate {
  const seasons: Season[] = ['SPRING', 'SUMMER', 'AUTUMN', 'WINTER'];
  const monthIndex = date.getMonth();
  const seasonIndex = Math.floor(monthIndex / 3) % 4;
  
  return {
    year: date.getFullYear(),
    season: seasons[seasonIndex],
    day: date.getDate()
  };
}
