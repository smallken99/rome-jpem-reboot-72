export enum LoiType {
  ADMINISTRATIVE = "administrative",
  ECONOMIC = "economic",
  RELIGIOUS = "religious",
  MILITARY = "military",
  JUDICIAL = "judicial",
  SOCIAL = "social",
  POLITICAL = "political"
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
  category?: string;
  status?: string;
  statut?: string;
  proposedBy?: string;
  auteur?: string;
  implementationDate?: any;
}
