
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
  | "Administration" | "ADMINISTRATION";

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
