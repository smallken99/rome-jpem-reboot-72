
// Common types used across the application

export type Season = 'Ver' | 'Aes' | 'Aut' | 'Hie' | 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER' | 'Spring' | 'Summer' | 'Autumn' | 'Winter' | 'spring' | 'summer' | 'autumn' | 'winter' | 'fall' | 'Fall' | 'Aestas' | 'Autumnus' | 'Hiems';

export interface GameDate {
  year: number;
  season: Season;
  day?: number;
}

export type GamePhase = 'Politique' | 'Economie' | 'Militaire' | 'Religieuse' | 'Sociale' | 'Administration' | 'Diplomatie' | 'Evenements' | 'FinDeTour';

// Function to adapt seasons between different formats
export function adaptSeason(season: string): Season {
  // Normalize to known Season type or default to 'Ver'
  const normalizedSeason = season as Season;
  return normalizedSeason || 'Ver';
}

// Function to ensure we have a valid GameDate object
export function ensureValidGameDate(date: any): GameDate {
  if (!date) {
    return { year: new Date().getFullYear(), season: 'Ver' };
  }
  
  if (typeof date === 'object' && 'year' in date && 'season' in date) {
    return {
      year: date.year,
      season: adaptSeason(date.season),
      day: date.day
    };
  }
  
  // Default fallback
  return { year: new Date().getFullYear(), season: 'Ver' };
}
