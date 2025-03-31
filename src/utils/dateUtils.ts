
import { GameDate, Season } from '@/components/maitrejeu/types/common';

// Format a date to a string representation
export function formatDate(date: Date | GameDate | string): string {
  if (typeof date === 'string') {
    try {
      const parsedDate = JSON.parse(date);
      if (parsedDate && parsedDate.year && parsedDate.season) {
        return `${parsedDate.year} (${formatSeason(parsedDate.season)})`;
      }
    } catch (e) {
      // Not a JSON string
      return date;
    }
  }
  
  if (date instanceof Date) {
    return date.toLocaleDateString();
  }
  
  if (date && typeof date === 'object' && 'year' in date && 'season' in date) {
    return `${date.year} (${formatSeason(date.season)})`;
  }
  
  return String(date);
}

// Check if an object is a GameDate
export function isGameDate(date: any): date is GameDate {
  return date && typeof date === 'object' && typeof date.year === 'number' && typeof date.season === 'string';
}

// Format a season name for display
export function formatSeason(season: Season | string): string {
  const seasonMap: Record<string, string> = {
    'spring': 'Printemps',
    'summer': 'Été',
    'fall': 'Automne',
    'winter': 'Hiver',
    'ver': 'Printemps',
    'aestas': 'Été',
    'autumnus': 'Automne',
    'hiems': 'Hiver',
    'SPRING': 'Printemps',
    'SUMMER': 'Été',
    'AUTUMN': 'Automne',
    'WINTER': 'Hiver',
    'Spring': 'Printemps',
    'Summer': 'Été',
    'Autumn': 'Automne',
    'Winter': 'Hiver',
  };

  return seasonMap[season.toLowerCase()] || season;
}

// Get seasons after a given season
export function getSeasonsAfter(startSeason: Season, count: number = 3): Season[] {
  const seasons: Season[] = ['spring', 'summer', 'fall', 'winter'];
  const normalizedSeason = startSeason.toLowerCase();
  const startIndex = seasons.indexOf(normalizedSeason as Season);
  
  if (startIndex === -1) return [];
  
  const result: Season[] = [];
  for (let i = 1; i <= count; i++) {
    const index = (startIndex + i) % seasons.length;
    result.push(seasons[index] as Season);
  }
  
  return result;
}

// Get the GameDate for the next year's same season
export function getNextYear(date: GameDate): GameDate {
  return {
    ...date,
    year: date.year + 1
  };
}

// Get the GameDate for the next season
export function getNextSeason(date: GameDate): GameDate {
  const seasons: Season[] = ['winter', 'spring', 'summer', 'fall'];
  const normalizedSeason = date.season.toLowerCase();
  const currentSeasonIndex = seasons.indexOf(normalizedSeason as Season);
  
  if (currentSeasonIndex === -1) {
    return date; // Can't determine the next season
  }
  
  const nextSeasonIndex = (currentSeasonIndex + 1) % seasons.length;
  const nextSeason = seasons[nextSeasonIndex];
  
  // If we're moving from winter to spring, increment the year
  if (nextSeason === 'spring' && normalizedSeason === 'winter') {
    return {
      year: date.year + 1,
      season: nextSeason
    };
  }
  
  return {
    year: date.year,
    season: nextSeason
  };
}
