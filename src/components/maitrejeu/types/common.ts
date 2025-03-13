
export type Season = "Ver" | "Aestas" | "Autumnus" | "Hiems";
export type PlayerSeason = "SPRING" | "SUMMER" | "AUTUMN" | "WINTER";
export type ImportanceType = "mineure" | "normale" | "majeure";

export interface GameDate {
  year: number;
  season: Season | PlayerSeason;
  phase?: GamePhase;
  day?: number;
}

export type GamePhase = 
  | "SENATE" 
  | "ACTIONS" 
  | "ECONOMY" 
  | "EVENTS" 
  | "DIPLOMACY" 
  | "MILITARY" 
  | "POLITIQUE" 
  | "ECONOMIE" 
  | "MILITAIRE" 
  | "RELIGION" 
  | "SOCIAL" 
  | "SETUP" 
  | "ELECTION" 
  | "ACTION" 
  | "SENAT" 
  | "EVENEMENT" 
  | "ADMINISTRATION";

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Mapping between Roman seasons and player seasons
export const seasonMapping: Record<Season, PlayerSeason> = {
  "Ver": "SPRING",
  "Aestas": "SUMMER",
  "Autumnus": "AUTUMN",
  "Hiems": "WINTER"
};

// Reverse mapping
export const reverseSeasonMapping: Record<PlayerSeason, Season> = {
  "SPRING": "Ver",
  "SUMMER": "Aestas",
  "AUTUMN": "Autumnus",
  "WINTER": "Hiems"
};

// Helper function to convert between season types
export const convertSeason = (season: Season | PlayerSeason): Season | PlayerSeason => {
  if (season === "Ver" || season === "Aestas" || season === "Autumnus" || season === "Hiems") {
    return seasonMapping[season as Season];
  } else {
    return reverseSeasonMapping[season as PlayerSeason];
  }
};

// Format a season to display name in French
export const formatSeasonDisplay = (season: Season | PlayerSeason): string => {
  // Convert to Season type first if needed
  const romanSeason = season === "SPRING" || season === "SUMMER" || season === "AUTUMN" || season === "WINTER" 
    ? reverseSeasonMapping[season as PlayerSeason] 
    : season as Season;
    
  switch (romanSeason) {
    case "Ver": return "Printemps";
    case "Aestas": return "Été";
    case "Autumnus": return "Automne";
    case "Hiems": return "Hiver";
    default: return "Printemps";
  }
};
