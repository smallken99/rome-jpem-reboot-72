import { GameDate, Season } from '@/utils/timeSystem';

// Add missing formatDate export
export const formatDate = (date: GameDate | string): string => {
  if (!date) return '';
  
  if (typeof date === 'object' && 'year' in date && 'season' in date) {
    return `${Math.abs(date.year)} ${date.year < 0 ? 'av. J.-C.' : 'ap. J.-C.'} - ${formatSeason(date.season as Season)}`;
  }
  
  return String(date);
};

// Format season helper
export const formatSeason = (season: Season | string): string => {
  const seasonMappings: Record<string, string> = {
    SPRING: 'Printemps',
    SUMMER: 'Été',
    AUTUMN: 'Automne',
    WINTER: 'Hiver',
    Ver: 'Printemps',
    Aestas: 'Été',
    Autumnus: 'Automne',
    Hiems: 'Hiver'
  };
  
  return seasonMappings[season] || season;
};

// Add a safeFormatDate to handle string dates
export const safeFormatDate = (date: string | GameDate | undefined): string => {
  if (!date) return '';
  
  if (typeof date === 'string') {
    try {
      // Try to parse the string as a GameDate
      const parts = date.split(' ');
      if (parts.length >= 2) {
        const year = parseInt(parts[0], 10);
        const season = parts[1];
        if (!isNaN(year)) {
          return formatDate({ year, season: season as Season });
        }
      }
      return date;
    } catch (e) {
      console.error('Error parsing date string:', e);
      return date;
    }
  }
  
  return formatDate(date);
};

// Enhanced parsing function to handle all date formats
export const convertDateToGameDate = (date: Date): GameDate => {
  const year = date.getFullYear();
  
  // Determine season based on month
  let season: Season;
  const month = date.getMonth();
  
  if (month >= 2 && month <= 4) {
    season = 'SPRING'; // March, April, May
  } else if (month >= 5 && month <= 7) {
    season = 'SUMMER'; // June, July, August
  } else if (month >= 8 && month <= 10) {
    season = 'AUTUMN'; // September, October, November
  } else {
    season = 'WINTER'; // December, January, February
  }
  
  return { year, season };
};

// Enhanced parsing function to handle all date formats
export const parseGameDate = (dateVal: string | Date | GameDate): GameDate => {
  // If it's already a GameDate
  if (typeof dateVal === 'object' && 'year' in dateVal && 'season' in dateVal) {
    return dateVal as GameDate;
  }
  
  // If it's a Date object
  if (dateVal instanceof Date) {
    return convertDateToGameDate(dateVal);
  }
  
  // If it's a string
  if (typeof dateVal === 'string') {
    try {
      if (dateVal.includes('-')) {
        // Standard date format: YYYY-MM-DD
        return convertDateToGameDate(new Date(dateVal));
      } else if (dateVal.includes(' ')) {
        // Format: "YEAR SEASON"
        const parts = dateVal.split(' ');
        return {
          year: parseInt(parts[0], 10),
          season: parts[1] as Season
        };
      }
    } catch (error) {
      console.error("Error parsing date string:", error);
    }
  }
  
  // Default fallback
  return { year: new Date().getFullYear(), season: 'SPRING' };
};

// Enhanced parsing function for strings that should be GameDate
export const parseStringToGameDate = (dateVal: string | GameDate): GameDate => {
  // If it's already a GameDate
  if (typeof dateVal === 'object' && 'year' in dateVal && 'season' in dateVal) {
    return dateVal as GameDate;
  }
  
  // If it's a string
  if (typeof dateVal === 'string') {
    try {
      if (dateVal.includes('-')) {
        // Standard date format: YYYY-MM-DD
        return convertDateToGameDate(new Date(dateVal));
      } else if (dateVal.includes(' ')) {
        // Format: "YEAR SEASON"
        const parts = dateVal.split(' ');
        return {
          year: parseInt(parts[0], 10),
          season: parts[1] as Season
        };
      }
    } catch (error) {
      console.error("Error parsing date string:", error);
    }
  }
  
  // Default fallback
  return { year: new Date().getFullYear(), season: 'SPRING' };
};

export const formatGameDate = formatDate; // Alias for backward compatibility

// Function to convert Date objects to GameDate and vice versa
export const dateToGameDate = (date: Date): GameDate => {
  return convertDateToGameDate(date);
};

export const gameDateToDate = (gameDate: GameDate): Date => {
  // Approximate conversion - this is simplified, in a real app you'd want more precision
  const month = gameDate.season === 'SPRING' ? 3 : 
               gameDate.season === 'SUMMER' ? 6 : 
               gameDate.season === 'AUTUMN' ? 9 : 0;
  
  return new Date(gameDate.year, month, 15);
};
