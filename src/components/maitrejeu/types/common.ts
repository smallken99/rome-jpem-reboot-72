
export type Season = "SPRING" | "SUMMER" | "AUTUMN" | "WINTER";
export type ImportanceType = "mineure" | "normale" | "majeure";

export interface GameDate {
  year: number;
  season: Season;
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
