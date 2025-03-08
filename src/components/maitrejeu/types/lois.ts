
import { GameDate, ImportanceType } from './common';

export type LoiStatus = 'proposée' | 'votée' | 'rejetée' | 'en attente';
export type LoiCategory = 'politique' | 'économique' | 'militaire' | 'judiciaire' | 'sociale' | 'religieuse';

export interface Loi {
  id: string;
  titre: string;
  description: string;
  proposeur: string;
  catégorie: string;
  date: GameDate;
  état: LoiStatus;
  importance: ImportanceType;
  votesPositifs: number;
  votesNégatifs: number;
  votesAbstention: number;
  effets: Record<string, any>;
}

export interface LoisTableProps {
  lois: Loi[];
  onVote?: (id: string, vote: 'pour' | 'contre' | 'abstention') => void;
}
