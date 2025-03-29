
export type LoiType = 'economie' | 'politique' | 'militaire' | 'judiciaire' | 'religieuse' | 'sociale';
export type LoiState = 'proposée' | 'en_débat' | 'en_vote' | 'adoptée' | 'rejetée' | 'abrogée';
export type ImportanceType = 'mineure' | 'moyenne' | 'majeure' | 'critique';

export interface Loi {
  id: string;
  titre: string;
  description: string;
  proposeur: string;
  catégorie: string;
  date: GameDate;
  état: LoiState;
  importance: ImportanceType;
  impacts?: string[];
  history?: any[];
  votesPositifs: number;
  votesNégatifs: number;
  votesAbstention: number;
  soutiens: string[];
  opposants: string[];
  commentaires: string[];
  effets: string[];
  type: LoiType;
}
