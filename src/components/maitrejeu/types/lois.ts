
export type LoiState = 'proposée' | 'en délibération' | 'promulguée' | 'rejetée' | 'abrogée' | 'Proposée' | 'En délibération' | 'Promulguée' | 'Rejetée' | 'active' | 'rejected' | 'adoptée' | 'proposed' | 'expired' | 'En vigueur' | 'en_débat' | 'En discussion';
export type ImportanceType = 'mineure' | 'normale' | 'majeure' | 'critique' | 'haute';
export type LoiType = string;

export interface GameDate {
  year: number;
  season: string;
}

export interface Loi {
  id: string;
  titre: string;
  title?: string;
  nom?: string;
  name?: string;
  description: string;
  proposeur: string;
  auteur?: string;
  proposedBy?: string;
  catégorie: string;
  category?: string;
  catégorieId?: string;
  categorieId?: string;
  date: GameDate;
  état: LoiState;
  statut?: LoiState;
  status?: LoiState;
  importance: ImportanceType;
  votesPositifs: number;
  votesNégatifs: number;
  abstentions: number;
  votesFor?: number;
  votesAgainst?: number;
  votesAbstention?: number;
  type: string;
  dateProposition?: GameDate;
  implementationDate?: GameDate;
  expirationDate?: GameDate;
  clauses?: any[];
  effets?: any;
  commentaires?: string[];
  conditions?: any;
  pénalités?: any;
  tags?: string[];
  notes?: any;
  contenu?: string;
  votes?: {
    pour: number;
    contre: number;
    abstention: number;
  };
}
