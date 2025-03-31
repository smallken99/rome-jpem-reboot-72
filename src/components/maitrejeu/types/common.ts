
// Common types used across the application

// GameDate type for consistent date representation
export interface GameDate {
  year: number;
  season: Season;
}

// Season type - both Latin and English names supported
export type Season = 
  // English seasons
  'spring' | 'summer' | 'fall' | 'winter' | 
  // English with capital
  'Spring' | 'Summer' | 'Fall' | 'Winter' |
  // Latin seasons
  'Ver' | 'Aestas' | 'Autumnus' | 'Hiems' |
  // French translations
  'Printemps' | 'Été' | 'Automne' | 'Hiver' |
  // All-caps versions
  'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER' |
  string;

// Game phase type
export type GamePhase = 
  // Standard phases
  'normal' | 'election' | 'crisis' | 'war' | 
  // English phases
  'SENATE' | 'ACTIONS' | 'ECONOMY' | 'EVENTS' | 'DIPLOMACY' | 'MILITARY' |
  // French phases
  'POLITIQUE' | 'ECONOMIE' | 'SOCIAL' | 'MILITAIRE' | 'RELIGION' | 
  'SETUP' | 'ELECTION' | 'ACTION' | 'SENAT' | 'EVENEMENT' | 'ADMINISTRATION' |
  string;

// Importance type used in events and political events
export type ImportanceType = 'low' | 'medium' | 'high' | 'critical' | 'normale' | 'importante' | 'cruciale' | 'mineure' | string;

// Function to format any game date for display
export function formatAnyDate(date: Date | GameDate | { year: number; season: string }): string {
  if (date instanceof Date) {
    return date.toLocaleDateString();
  }
  
  if ('year' in date && 'season' in date) {
    return `${date.season} ${date.year}`;
  }
  
  return 'Invalid date format';
}

// Function to check if an object is a GameDate
export function isGameDate(date: any): date is GameDate | { year: number; season: string } {
  return date && typeof date === 'object' && 'year' in date && 'season' in date;
}

// Generate a unique ID (helper function)
export function generateId(prefix = ''): string {
  return `${prefix}${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Convert a string date to a GameDate object
export function dateToGameDate(dateString: string): GameDate {
  if (!dateString) {
    const now = new Date();
    return {
      year: now.getFullYear(),
      season: 'Spring'
    };
  }
  
  try {
    const [season, yearStr] = dateString.split(' ');
    const year = parseInt(yearStr, 10);
    return {
      year: isNaN(year) ? new Date().getFullYear() : year,
      season: season as Season
    };
  } catch (e) {
    return {
      year: new Date().getFullYear(),
      season: 'Spring'
    };
  }
}

// Parse string to game date (for compatibility)
export function parseStringToGameDate(dateString: string): GameDate {
  return dateToGameDate(dateString);
}

// Mapping for compatibility between different versions of the equilibre structure
export const equilibreMap = {
  politique: {
    populaires: 'populaires',
    populares: 'populares',
    optimates: 'optimates', 
    moderates: 'moderates'
  },
  social: {
    patriciens: 'patriciens',
    plebeiens: 'plebeiens',
    plébéiens: 'plébéiens',
    esclaves: 'esclaves',
    cohesion: 'cohesion'
  },
  economie: 'economie',
  économie: 'économie',
  economy: 'economy',
  economicStability: 'economicStability',
  militaire: 'militaire',
  religion: 'religion',
  stability: 'stability',
  armée: 'armée',
  loyauté: 'loyauté',
  morale: 'morale',
  facteurJuridique: 'facteurJuridique',
  risques: 'risques',
  historique: 'historique'
};
