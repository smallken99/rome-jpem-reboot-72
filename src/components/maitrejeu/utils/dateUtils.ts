
import { GameDate, Season } from "../types/common";

export function formatGameDate(date: GameDate): string {
  if (!date) return "";
  
  const seasonNames: Record<string, string> = {
    "Ver": "Printemps",
    "Aes": "Été",
    "Aut": "Automne",
    "Hie": "Hiver",
    "SPRING": "Printemps",
    "SUMMER": "Été",
    "AUTUMN": "Automne",
    "WINTER": "Hiver"
  };
  
  const seasonName = seasonNames[date.season] || date.season;
  
  return `${date.year} ${seasonName}`;
}

export function compareGameDates(date1: GameDate, date2: GameDate): number {
  // First compare years
  if (date1.year !== date2.year) {
    return date1.year - date2.year;
  }
  
  // Then compare seasons
  const seasonOrder: Record<string, number> = {
    "Ver": 0,
    "Aes": 1,
    "Aut": 2,
    "Hie": 3,
    "SPRING": 0,
    "SUMMER": 1,
    "AUTUMN": 2,
    "WINTER": 3,
    "Spring": 0,
    "Summer": 1,
    "Autumn": 2,
    "Winter": 3
  };
  
  const season1Value = seasonOrder[date1.season] || 0;
  const season2Value = seasonOrder[date2.season] || 0;
  
  return season1Value - season2Value;
}

// Added for compatibility with other components
export function convertToUtilsGameDate(gameDate: GameDate): any {
  if (!gameDate) return null;
  
  return {
    year: gameDate.year,
    season: gameDate.season
  };
}

export function getCurrentSeason(): Season {
  const month = new Date().getMonth();
  
  if (month >= 2 && month <= 4) return "Ver"; // Spring: March-May
  if (month >= 5 && month <= 7) return "Aes"; // Summer: June-August
  if (month >= 8 && month <= 10) return "Aut"; // Autumn: September-November
  return "Hie"; // Winter: December-February
}

export function getSeasonsAfter(startDate: GameDate, count: number): GameDate[] {
  const results: GameDate[] = [];
  let currentYear = startDate.year;
  let currentSeasonIndex = 0;
  
  const seasonsList = ["Ver", "Aes", "Aut", "Hie"];
  
  // Find the index of the starting season
  if (typeof startDate.season === 'string') {
    const index = seasonsList.indexOf(startDate.season as string);
    if (index !== -1) {
      currentSeasonIndex = index;
    } else {
      // Handle alternative season names
      const seasonMap: Record<string, number> = {
        "SPRING": 0, "Spring": 0, "spring": 0,
        "SUMMER": 1, "Summer": 1, "summer": 1,
        "AUTUMN": 2, "Autumn": 2, "autumn": 2, "FALL": 2, "Fall": 2, "fall": 2,
        "WINTER": 3, "Winter": 3, "winter": 3
      };
      currentSeasonIndex = seasonMap[startDate.season] || 0;
    }
  }
  
  for (let i = 0; i < count; i++) {
    currentSeasonIndex = (currentSeasonIndex + 1) % 4;
    if (currentSeasonIndex === 0) {
      currentYear++;
    }
    
    results.push({
      year: currentYear,
      season: seasonsList[currentSeasonIndex] as Season
    });
  }
  
  return results;
}

// Helper function to determine if a date is in the past
export function isDateInPast(date: GameDate, currentDate: GameDate): boolean {
  return compareGameDates(date, currentDate) < 0;
}

// Helper function to determine if a date is in the future
export function isDateInFuture(date: GameDate, currentDate: GameDate): boolean {
  return compareGameDates(date, currentDate) > 0;
}

// Helper function to determine if a date is the current date
export function isDateCurrent(date: GameDate, currentDate: GameDate): boolean {
  return compareGameDates(date, currentDate) === 0;
}
