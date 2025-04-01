
export type Season = 
  | "Ver" 
  | "Aes" 
  | "Aut" 
  | "Hie" 
  | "SPRING" 
  | "SUMMER" 
  | "AUTUMN" 
  | "WINTER" 
  | "Spring" 
  | "Summer" 
  | "Autumn" 
  | "Winter" 
  | "spring" 
  | "summer" 
  | "autumn" 
  | "winter" 
  | "fall" 
  | "Fall"
  | "Aestas"
  | "Autumnus"
  | "Hiems";

export interface GameDate {
  year: number;
  season: Season;
  day?: number;
  phase?: GamePhase;
}

export type GamePhase = 
  | "Normal" | "normal" | "NORMAL"
  | "Election" | "election" | "ELECTION"
  | "Crisis" | "crisis" | "CRISIS"
  | "War" | "war" | "WAR"
  | "Diplomatic" | "diplomatic" | "DIPLOMATIC"
  | "Religious" | "religious" | "RELIGIOUS"
  | "Economic" | "economic" | "ECONOMIC"
  | "Revolt" | "revolt" | "REVOLT"
  | "Triumph" | "triumph" | "TRIUMPH"
  | "Games" | "games" | "GAMES"
  | "Scandal" | "scandal" | "SCANDAL"
  | "SENATE" | "ACTIONS" | "ECONOMY" | "EVENTS"
  | "SETUP" | "ACTION" | "SENAT"
  | "Military" | "MILITARY" | "MILITAIRE" 
  | "Politique" | "POLITIQUE"
  | "Economie" | "ECONOMIE" 
  | "Social" | "SOCIAL"
  | "Evenements" | "EVENEMENT"
  | "Administration" | "ADMINISTRATION"
  | "EVENTS" | "Events"
  | "DIPLOMACY" | "DIPLOMATIC"
  | "RELIGION" | "Religious"
  | "ELECTION";

// Helper function to adapt any string to a valid Season value
export function adaptSeason(seasonStr: string): Season {
  const seasonMap: Record<string, Season> = {
    "Ver": "Ver",
    "Aes": "Aes",
    "Aut": "Aut",
    "Hie": "Hie",
    "SPRING": "SPRING",
    "SUMMER": "SUMMER",
    "AUTUMN": "AUTUMN",
    "WINTER": "WINTER",
    "Spring": "Spring",
    "Summer": "Summer",
    "Autumn": "Autumn",
    "Winter": "Winter",
    "spring": "spring",
    "summer": "summer",
    "autumn": "autumn",
    "winter": "winter",
    "fall": "fall",
    "Fall": "Fall",
    "Aestas": "Aestas", 
    "Autumnus": "Autumnus",
    "Hiems": "Hiems"
  };

  return seasonMap[seasonStr] || "Ver";
}

// Helper function to adapt any string to a valid GamePhase value
export function adaptGamePhase(phaseStr: string): GamePhase {
  if (!phaseStr) return "Normal";
  
  // Try to match directly
  const validPhases: Record<string, GamePhase> = {
    "Normal": "Normal",
    "normal": "normal",
    "NORMAL": "NORMAL",
    "Election": "Election",
    "election": "election",
    "ELECTION": "ELECTION",
    "Crisis": "Crisis",
    "crisis": "crisis",
    "CRISIS": "CRISIS",
    "War": "War",
    "war": "war",
    "WAR": "WAR",
    "Diplomatic": "Diplomatic",
    "diplomatic": "diplomatic",
    "DIPLOMATIC": "DIPLOMATIC",
    "Religious": "Religious",
    "religious": "religious",
    "RELIGIOUS": "RELIGIOUS",
    "Economic": "Economic",
    "economic": "economic",
    "ECONOMIC": "ECONOMIC",
    "Revolt": "Revolt",
    "revolt": "revolt",
    "REVOLT": "REVOLT",
    "Triumph": "Triumph",
    "triumph": "triumph",
    "TRIUMPH": "TRIUMPH",
    "Games": "Games",
    "games": "games",
    "GAMES": "GAMES",
    "Scandal": "Scandal",
    "scandal": "scandal",
    "SCANDAL": "SCANDAL",
    "SENATE": "SENATE",
    "ACTIONS": "ACTIONS",
    "ECONOMY": "ECONOMY",
    "EVENTS": "EVENTS",
    "SETUP": "SETUP",
    "ACTION": "ACTION",
    "SENAT": "SENAT",
    "Military": "Military",
    "MILITARY": "MILITARY",
    "MILITAIRE": "MILITAIRE",
    "Politique": "Politique",
    "POLITIQUE": "POLITIQUE",
    "Economie": "Economie",
    "ECONOMIE": "ECONOMIE",
    "Social": "Social",
    "SOCIAL": "SOCIAL",
    "Evenements": "Evenements",
    "EVENEMENT": "EVENEMENT",
    "Administration": "Administration",
    "ADMINISTRATION": "ADMINISTRATION"
  };
  
  if (validPhases[phaseStr]) {
    return validPhases[phaseStr];
  }
  
  // Default to Normal
  return "Normal";
}

/**
 * Convert a string to a GameDate object
 * @param dateString The string representation of a date (e.g., "750 Ver")
 * @returns A GameDate object
 */
export function stringToGameDate(dateString: string): GameDate {
  if (!dateString) {
    return { year: 700, season: 'Ver' };
  }
  
  // Try to parse "YEAR SEASON" format
  const parts = dateString.trim().split(/\s+/);
  if (parts.length >= 2) {
    const year = parseInt(parts[0], 10);
    const seasonStr = parts[1];
    
    if (!isNaN(year)) {
      return {
        year: year,
        season: adaptSeason(seasonStr)
      };
    }
  }
  
  // Try to parse more complex formats: "YEAR AUC, SEASON"
  const aucMatch = dateString.match(/(\d+)\s*(?:AUC)?,\s*(\w+)/i);
  if (aucMatch) {
    const year = parseInt(aucMatch[1], 10);
    const seasonStr = aucMatch[2];
    
    if (!isNaN(year)) {
      return {
        year: year,
        season: adaptSeason(seasonStr)
      };
    }
  }
  
  // Default values if parsing fails
  return { year: 700, season: 'Ver' };
}

/**
 * Convert a GameDate to a formatted string
 * @param date The GameDate to format
 * @returns A string representation of the date
 */
export function formatGameDate(date: GameDate): string {
  if (!date) return '';
  
  const seasonDisplayMap: Record<string, string> = {
    'Ver': 'Printemps',
    'Aes': 'Été',
    'Aut': 'Automne',
    'Hie': 'Hiver',
    'SPRING': 'Printemps',
    'SUMMER': 'Été',
    'AUTUMN': 'Automne',
    'WINTER': 'Hiver',
    'Spring': 'Printemps',
    'Summer': 'Été',
    'Autumn': 'Automne',
    'Winter': 'Hiver',
    'spring': 'Printemps',
    'summer': 'Été',
    'autumn': 'Automne',
    'winter': 'Hiver',
    'fall': 'Automne',
    'Fall': 'Automne',
    'Aestas': 'Été',
    'Autumnus': 'Automne',
    'Hiems': 'Hiver'
  };
  
  const seasonDisplay = seasonDisplayMap[date.season] || date.season;
  return `${seasonDisplay} de l'an ${date.year} AUC`;
}

/**
 * Parse a string to a GameDate
 * For compatibility with other functions
 */
export function parseStringToGameDate(dateString: string): GameDate | null {
  try {
    return stringToGameDate(dateString);
  } catch (error) {
    console.error("Error parsing date string:", dateString, error);
    return null;
  }
}

/**
 * Convert a JS Date to a GameDate
 */
export function dateToGameDate(date: Date): GameDate {
  const year = date.getFullYear() - 753; // Convert to AUC format (753 BC = year 1)
  const month = date.getMonth();
  
  let season: Season;
  if (month >= 2 && month <= 4) { // March-May
    season = 'Ver';
  } else if (month >= 5 && month <= 7) { // June-August
    season = 'Aestas';
  } else if (month >= 8 && month <= 10) { // September-November
    season = 'Autumnus';
  } else { // December-February
    season = 'Hiems';
  }
  
  return { year, season };
}
