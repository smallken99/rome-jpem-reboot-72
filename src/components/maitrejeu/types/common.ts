// Common date types
export type Season = 
  // English variants
  'spring' | 'summer' | 'fall' | 'winter' | 
  'Spring' | 'Summer' | 'Fall' | 'Winter' |
  // Latin variants
  'Ver' | 'Aestas' | 'Autumnus' | 'Hiems' |
  // All uppercase variants
  'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER';

// Game phase types for state machine
export type GamePhase = 
  // Standard phases
  'normal' | 'election' | 'crisis' | 'war' | 
  // Economy phases
  'ECONOMY' | 'EVENTS' | 'DIPLOMACY' | 'MILITARY' | 
  // French phases
  'POLITIQUE' | 'ECONOMIE' | 'SOCIAL' | 'MILITAIRE' | 'RELIGION' |
  // Other phases
  'SETUP' | 'PLANNING' | 'ACTIONS' | 'ACTION' | 'EVENEMENT' | 'ADMINISTRATION';

// Common importance levels
export type ImportanceType = 'low' | 'medium' | 'high' | 'critical' | 'normale' | 'faible' | 'haute' | string;

// Common date object
export interface GameDate {
  year: number;
  season: Season;
  day?: number;
  phase?: GamePhase;
}

// Function to generate a random ID with a prefix
export function generateId(prefix: string = 'item'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

// Convert string to GameDate
export function parseStringToGameDate(dateStr: string): GameDate | undefined {
  if (!dateStr) return undefined;
  
  const parts = dateStr.split(' ');
  if (parts.length >= 2) {
    const year = parseInt(parts[0], 10);
    const season = parts[1] as Season;
    
    if (!isNaN(year)) {
      return { year, season };
    }
  }
  
  return undefined;
}

// Format GameDate to string
export function formatGameDate(date: GameDate): string {
  return `${date.year} ${date.season}${date.day ? ` jour ${date.day}` : ''}`;
}
