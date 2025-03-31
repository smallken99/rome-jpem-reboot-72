
export enum LoiType {
  POLITIQUE = "POLITIQUE",
  ECONOMIQUE = "ECONOMIQUE",
  SOCIALE = "SOCIALE",
  RELIGIEUSE = "RELIGIEUSE",
  MILITAIRE = "MILITAIRE",
  JUDICIAIRE = "JUDICIAIRE",
  ADMINISTRATIVE = "ADMINISTRATIVE",
  COMMERCIALE = "COMMERCIALE"
}

export enum LoiState {
  PROPOSAL = "PROPOSAL",
  VOTING = "VOTING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  IMPLEMENTED = "IMPLEMENTED",
  SUSPENDED = "SUSPENDED",
  // French equivalents
  PROPOSEE = "proposée",
  EN_DELIBERATION = "En délibération",
  ADOPTEE = "adoptée",
  REJETEE = "Rejetée",
  PROMULGUEE = "Promulguée"
}

export enum ImportanceType {
  MINEURE = "mineure",
  NORMALE = "normale",
  MAJEURE = "majeure",
  CRITIQUE = "critique"
}

export interface Loi {
  id: string;
  titre: string;
  description: string;
  proposeur: string;
  catégorie: string;
  date: { year: number; season: string };
  état: LoiState | string;
  importance: ImportanceType | string;
  votesPositifs: number;
  votesNégatifs: number;
  votesAbstention: number;
  effets: string[];
  impacts: Record<string, number>[];
  type: LoiType | string;
  commentaires?: string[];
  tags?: string[];
  clauses?: string[];
  partisans?: string[];
  opposants?: string[];
  soutenusParFactions?: string[];
  opposésParFactions?: string[];
  
  // English alias fields for compatibility
  title?: string;
  proposedBy?: string;
  auteur?: string;
  status?: string;
  statut?: string;
  category?: string;
  votesFor?: number;
  votesAgainst?: number;
  abstentions?: number;
  dateProposition?: any;
  votes?: any;
  conditions?: string[];
  pénalités?: string[];
  soutiens?: string[];
}
