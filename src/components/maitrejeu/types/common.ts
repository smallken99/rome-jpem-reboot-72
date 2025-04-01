
// Common types used across the application

export type Season = 
  // Latin seasons
  'Ver' | 'Aes' | 'Aut' | 'Hie' | 
  // Latin seasons - extended format
  'Aestas' | 'Autumnus' | 'Hiems' | 
  // English - uppercase
  'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER' | 
  // English - capitalized
  'Spring' | 'Summer' | 'Autumn' | 'Winter' | 
  // English - lowercase
  'spring' | 'summer' | 'autumn' | 'winter' | 'fall' | 
  // English - misc
  'Fall';

export interface GameDate {
  year: number;
  season: Season;
  day?: number;
  phase?: GamePhase;
}

export type GamePhase = 
  // Roman names for game phases
  'Politique' | 'Economie' | 'Militaire' | 'Religieuse' | 
  'Sociale' | 'Administration' | 'Diplomatie' | 
  'Evenements' | 'FinDeTour' | 
  // Compatibility aliases
  'Politik' | 'Military' | 'Economic' | 'Religious' | 
  'Social' | 'Administrative' | 'Diplomatic' | 
  'Events' | 'EndTurn';

// Function to adapt seasons between different formats
export function adaptSeason(season: string): Season {
  // Map of valid season values
  const validSeasons: Record<string, Season> = {
    'ver': 'Ver',
    'aes': 'Aes',
    'aut': 'Aut',
    'hie': 'Hie',
    'aestas': 'Aestas',
    'autumnus': 'Autumnus',
    'hiems': 'Hiems',
    'spring': 'spring',
    'summer': 'summer',
    'autumn': 'autumn',
    'winter': 'winter',
    'fall': 'fall',
    // Add uppercase and capitalized variations
    'SPRING': 'SPRING',
    'SUMMER': 'SUMMER',
    'AUTUMN': 'AUTUMN',
    'WINTER': 'WINTER',
    'Spring': 'Spring',
    'Summer': 'Summer',
    'Autumn': 'Autumn',
    'Winter': 'Winter',
    'Fall': 'Fall'
  };
  
  // Normalize and return valid season or default to 'Ver'
  const normalized = season ? season.toLowerCase() : '';
  return validSeasons[normalized] || validSeasons[season] || 'Ver';
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
      day: date.day,
      phase: date.phase
    };
  }
  
  // Default fallback
  return { year: new Date().getFullYear(), season: 'Ver' };
}

// Function to convert a string to a GameDate object
export function stringToGameDate(dateStr: string): GameDate {
  try {
    if (!dateStr) return { year: new Date().getFullYear(), season: 'Ver' };
    
    // Parse the string format (e.g., "722 Ver")
    const parts = dateStr.split(' ');
    const year = parseInt(parts[0], 10);
    const season = parts[1] as Season;
    
    return { year, season: adaptSeason(season) };
  } catch (e) {
    console.error("Error parsing date string:", dateStr, e);
    return { year: new Date().getFullYear(), season: 'Ver' };
  }
}

// Function to format a GameDate as a string
export function formatGameDate(date: GameDate): string {
  if (!date) return '';
  return `${date.year} ${date.season}`;
}

// Function to convert a GameDate to a JavaScript Date
export function dateToGameDate(jsDate: Date): GameDate {
  const year = jsDate.getFullYear();
  const month = jsDate.getMonth();
  
  let season: Season;
  if (month >= 0 && month < 3) season = 'Hie';
  else if (month >= 3 && month < 6) season = 'Ver';
  else if (month >= 6 && month < 9) season = 'Aes';
  else season = 'Aut';
  
  return { year, season };
}

// Function to parse a string to a GameDate
export function parseStringToGameDate(str: string): GameDate | null {
  if (!str) return null;
  
  try {
    const parts = str.split(' ');
    if (parts.length >= 2) {
      const year = parseInt(parts[0], 10);
      const season = parts[1] as Season;
      
      if (!isNaN(year)) {
        return { year, season: adaptSeason(season) };
      }
    }
  } catch (e) {
    console.error("Error parsing date string:", str, e);
  }
  
  return null;
}
