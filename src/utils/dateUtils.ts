
import { GameDate } from '@/components/maitrejeu/types/common';

/**
 * Get an array of seasons after a specific date
 * @param startDate The starting game date
 * @param count Number of seasons to generate
 * @returns Array of GameDate objects
 */
export const getSeasonsAfter = (startDate: GameDate, count: number): GameDate[] => {
  const seasons: GameDate[] = [];
  const seasonOrder: Array<GameDate['season']> = ['spring', 'summer', 'fall', 'winter'];
  
  let currentYear = startDate.year;
  let currentSeasonIndex = seasonOrder.indexOf(startDate.season as any);
  
  if (currentSeasonIndex === -1) {
    // Handle non-standard season names
    if (startDate.season === 'Ver' || startDate.season === 'SPRING') {
      currentSeasonIndex = 0;
    } else if (startDate.season === 'Aestas' || startDate.season === 'SUMMER') {
      currentSeasonIndex = 1;
    } else if (startDate.season === 'Autumnus' || startDate.season === 'AUTUMN') {
      currentSeasonIndex = 2;
    } else if (startDate.season === 'Hiems' || startDate.season === 'WINTER') {
      currentSeasonIndex = 3;
    } else {
      currentSeasonIndex = 0; // Default to spring
    }
  }
  
  for (let i = 0; i < count; i++) {
    // Add the current season
    seasons.push({
      year: currentYear,
      season: seasonOrder[currentSeasonIndex]
    });
    
    // Move to the next season
    currentSeasonIndex = (currentSeasonIndex + 1) % 4;
    // If we've completed a full year, increment the year
    if (currentSeasonIndex === 0) {
      currentYear++;
    }
  }
  
  return seasons;
};

export const formatGameDate = (date: GameDate): string => {
  return `${date.year} ${date.season}`;
};

export const parseGameDate = (dateStr: string): GameDate | null => {
  const parts = dateStr.split(' ');
  if (parts.length < 2) return null;
  
  const year = parseInt(parts[0], 10);
  const season = parts[1].toLowerCase() as GameDate['season'];
  
  if (isNaN(year)) return null;
  
  return { year, season };
};

export const compareGameDates = (date1: GameDate, date2: GameDate): number => {
  // First compare years
  if (date1.year !== date2.year) {
    return date1.year - date2.year;
  }
  
  // If years are the same, compare seasons
  const seasonOrder: { [key: string]: number } = {
    'spring': 0,
    'Ver': 0,
    'SPRING': 0,
    'summer': 1,
    'Aestas': 1,
    'SUMMER': 1,
    'fall': 2,
    'autumn': 2,
    'Autumnus': 2,
    'AUTUMN': 2,
    'winter': 3,
    'Hiems': 3,
    'WINTER': 3
  };
  
  const season1Value = seasonOrder[date1.season] ?? 0;
  const season2Value = seasonOrder[date2.season] ?? 0;
  
  return season1Value - season2Value;
};
