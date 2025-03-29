
import { GameDate } from './common';

export type LoiType = 
  | 'political' 
  | 'economic' 
  | 'social' 
  | 'military' 
  | 'religious' 
  | 'constitutional' 
  | 'judicial'
  | string;

export type LoiState = 
  | 'proposed' 
  | 'debated' 
  | 'voted' 
  | 'implemented' 
  | 'rejected'
  | 'proposée'
  | 'débattue'
  | 'votée'
  | 'implémentée'
  | 'promulguée'
  | 'rejetée';

export type ImportanceType = 'low' | 'medium' | 'high' | 'critical';

export interface Loi {
  id: string;
  titre: string;
  description: string;
  proposeur: string;
  catégorie: string;
  date: GameDate;
  dateProposition?: GameDate;
  état: LoiState;
  importance: ImportanceType;
  votesPositifs: number;
  votesNégatifs: number;
  votesAbstention: number;
  soutiens: string[];
  opposants: string[];
  clauses?: string[];
  commentaires?: string[];
  type: LoiType;
  impacts: Record<string, number>;
  effets: string[];
  history: LoiHistory[];
  tags?: string[];
}

export interface LoiHistory {
  date: GameDate;
  status: LoiState;
  notes?: string;
}

export interface LoiTimelineProps {
  lois: Loi[];
  loi?: Loi;
}
