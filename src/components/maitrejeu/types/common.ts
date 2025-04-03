
export enum GamePhase {
  NORMAL = "NORMAL",
  WAR = "WAR",
  CRISIS = "CRISIS",
  ELECTION = "ELECTION",
  SETUP = "SETUP",
  SENATE = "SENATE",
  ACTIONS = "ACTIONS",
  ECONOMY = "ECONOMY",
  EVENTS = "EVENTS", 
  DIPLOMACY = "DIPLOMACY",
  MILITARY = "MILITARY",
  POLITIQUE = "POLITIQUE",
  ECONOMIE = "ECONOMIE",
  MILITAIRE = "MILITAIRE",
  RELIGION = "RELIGION",
  SOCIAL = "SOCIAL",
  ACTION = "ACTION",
  SENAT = "SENAT",
  EVENEMENT = "EVENEMENT",
  ADMINISTRATION = "ADMINISTRATION"
}

export type Season = "SPRING" | "SUMMER" | "AUTUMN" | "WINTER" | "Ver" | "Aestas" | "Autumnus" | "Hiems" | 
  "Spring" | "Summer" | "Autumn" | "Winter" | "spring" | "summer" | "autumn" | "winter" | "fall" | 
  "Fall" | "Aes" | "Aut" | "Hie";

export interface GameDate {
  year: number;
  season: Season;
  phase?: string;
  day?: number;
  events?: string[];
}

export function formatGameDate(date: GameDate): string {
  return `Année ${date.year}, ${formatSeason(date.season)}${date.phase ? ` (${date.phase})` : ''}`;
}

export function formatSeason(season: Season): string {
  const seasonMap: Record<string, string> = {
    "SPRING": "Printemps",
    "SUMMER": "Été",
    "AUTUMN": "Automne",
    "WINTER": "Hiver",
    "Ver": "Printemps",
    "Aestas": "Été",
    "Autumnus": "Automne", 
    "Hiems": "Hiver",
    "Spring": "Printemps",
    "Summer": "Été",
    "Autumn": "Automne",
    "Winter": "Hiver",
    "spring": "Printemps",
    "summer": "Été",
    "autumn": "Automne",
    "winter": "Hiver",
    "fall": "Automne",
    "Fall": "Automne",
    "Aes": "Été",
    "Aut": "Automne",
    "Hie": "Hiver"
  };
  
  return seasonMap[season] || season;
}

export function parseStringToGameDate(dateString: string): GameDate {
  // Simple parser for string dates
  try {
    if (typeof dateString === 'object') {
      return dateString as GameDate;
    }
    
    const parts = dateString.split(' ');
    if (parts.length >= 2) {
      return {
        year: parseInt(parts[0]),
        season: parts[1] as Season
      };
    }
    
    // Default fallback
    return { 
      year: new Date().getFullYear(),
      season: "Ver" 
    };
  } catch (e) {
    console.error("Error parsing game date:", e);
    return { 
      year: new Date().getFullYear(),
      season: "Ver" 
    };
  }
}
