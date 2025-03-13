
export type Season = "Ver" | "Aestas" | "Autumnus" | "Hiems";
export type ImportanceType = "mineure" | "normale" | "majeure";

export interface GameDate {
  year: number;
  season: Season;
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
