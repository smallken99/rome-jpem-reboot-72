
export enum LoiType {
  ADMINISTRATIVE = "administrative",
  ECONOMIC = "economic",
  RELIGIOUS = "religious",
  MILITARY = "military",
  JUDICIAL = "judicial",
  SOCIAL = "social",
  POLITICAL = "political"
}

export enum LoiState {
  PROPOSED = "Proposée",
  DELIBERATION = "En délibération",
  APPROVED = "Approuvée",
  REJECTED = "Rejetée",
  IMPLEMENTED = "Mise en œuvre",
  EXPIRED = "Expirée"
}

export enum ImportanceType {
  MINOR = "mineure",
  NORMAL = "normale",
  MAJOR = "majeure",
  CRITICAL = "critique"
}

export interface GameDate {
  year: number;
  season: string;
}

export interface Loi {
  id: string;
  titre: string;
  description: string;
  proposeur: string;
  catégorie: string;
  type: string;
  date: {
    year: number;
    season: string;
  };
  dateProposition: {
    year: number;
    season: string;
  };
  état: string;
  importance: string;
  votesPositifs: number;
  votesNégatifs: number;
  abstentions: number;
  commentaires: string;
  impacts: any[];
  conditions?: any[];
  pénalités?: any[];
  effets: string[];
  clauses?: any[];
  tags?: string[];
  
  // Compatibility properties
  title?: string;
  category?: string;
  auteur?: string;
  proposedBy?: string;
  implementationDate?: any;
  votesFor?: number;
  votesAgainst?: number;
  votesAbstention?: number;
  categorieId?: string;
  catégorieId?: string;
  statut?: string;
  status?: string;
  votes?: {
    pour: number;
    contre: number;
    abstention: number;
  };
  soutiens?: string[];
  opposants?: string[];
  contenu?: string;
  notes?: string;
  nom?: string;
  name?: string;
}
