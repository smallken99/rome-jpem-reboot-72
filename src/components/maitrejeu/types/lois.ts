
export type LoiState = 'proposée' | 'en délibération' | 'promulguée' | 'rejetée' | 'abrogée';
export type ImportanceType = 'mineure' | 'normale' | 'majeure' | 'critique';

export interface GameDate {
  year: number;
  season: string;
}

export interface Loi {
  id: string;
  titre: string;
  description: string;
  proposeur: string;
  auteur?: string;
  catégorie: string;
  catégorieId?: string;
  date: GameDate;
  état: LoiState;
  statut?: LoiState;
  status?: LoiState;
  importance: ImportanceType;
  votesPositifs: number;
  votesNégatifs: number;
  abstentions: number;
  type: string;
  dateProposition?: GameDate;
  implementationDate?: GameDate;
  proposedBy?: string;
  category?: string;
  clauses?: string[];
  effets?: string[];
  commentaires?: string[];
  conditions?: string;
  pénalités?: string;
  tags?: string[];
}
