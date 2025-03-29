
export type LoiType = 'economic' | 'political' | 'military' | 'religious' | 'social' | string;
export type LoiState = 'draft' | 'proposed' | 'approved' | 'rejected' | 'in_effect' | string;
export type ImportanceType = 'low' | 'medium' | 'high' | 'critical' | string;

export interface Loi {
  id: string;
  titre: string;
  title?: string;
  description: string;
  proposeur: string;
  catégorie: string;
  date: GameDate;
  état: LoiState;
  importance: ImportanceType;
  votesPositifs: number;
  votesNégatifs: number;
  votesAbstention?: number;
  soutiens?: string[];
  opposants?: string[];
  type: LoiType;
  effets: string[];
  impacts?: any[];
  history?: any[];
  commentaires?: string[];
  clauses?: any[];
  tags?: string[];
}
