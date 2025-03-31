
export enum Season {
  SPRING = "SPRING",
  SUMMER = "SUMMER",
  AUTUMN = "AUTUMN",
  WINTER = "WINTER",
  // Latin names
  VER = "Ver",
  AESTAS = "Aestas",
  AUTUMNUS = "Autumnus",
  HIEMS = "Hiems",
  // French names
  PRINTEMPS = "Printemps",
  ETE = "Été",
  AUTOMNE = "Automne",
  HIVER = "Hiver"
}

export type GameDate = {
  year: number;
  season: string | Season;
  day?: number;
};

export enum GamePhase {
  SETUP = "SETUP",
  POLITICS = "POLITICS",
  MILITARY = "MILITARY",
  ECONOMY = "ECONOMY",
  RESOLUTION = "RESOLUTION",
  // French phases
  PREPARATION = "Préparation",
  POLITIQUE = "Politique",
  MILITAIRE = "Militaire",
  ECONOMIE = "Économie",
  RESOLUTION_FR = "Résolution"
}

// Helper function to convert string to GameDate
export function parseStringToGameDate(dateStr: string): GameDate {
  // Example format: "750 AUC, Spring"
  try {
    const [yearPart, seasonPart] = dateStr.split(',').map(s => s.trim());
    const year = parseInt(yearPart.replace(/\D/g, ''), 10);
    
    // Try to match a season
    let season: Season | string = Season.SPRING;
    
    if (seasonPart) {
      const normalizedSeason = seasonPart.toLowerCase();
      if (normalizedSeason.includes('spring') || normalizedSeason.includes('ver') || normalizedSeason.includes('printemps')) {
        season = Season.SPRING;
      } else if (normalizedSeason.includes('summer') || normalizedSeason.includes('aestas') || normalizedSeason.includes('été')) {
        season = Season.SUMMER;
      } else if (normalizedSeason.includes('autumn') || normalizedSeason.includes('autumnus') || normalizedSeason.includes('automne')) {
        season = Season.AUTUMN;
      } else if (normalizedSeason.includes('winter') || normalizedSeason.includes('hiems') || normalizedSeason.includes('hiver')) {
        season = Season.WINTER;
      } else {
        season = seasonPart; // Use as-is if no match
      }
    }
    
    return { year, season };
  } catch (e) {
    // Return a default date if parsing fails
    return { year: 750, season: Season.SPRING };
  }
}

// Helper to convert GameDate to string
export function gameDateToString(date: GameDate): string {
  return `${date.year} AUC, ${date.season}`;
}
