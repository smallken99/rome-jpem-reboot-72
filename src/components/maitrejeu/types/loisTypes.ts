
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
  SUSPENDED = "SUSPENDED"
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
  état: string;
  importance: string;
  votesPositifs: number;
  votesNégatifs: number;
  votesAbstention: number;
  effets: string[];
  impacts: Record<string, number>[];
  type: string;
  commentaires?: string[];
  tags?: string[];
  clauses?: string[];
  partisans?: string[];
  opposants?: string[];
}
