
import { GameDate, ImportanceType } from './common';

export interface Loi {
  id: string;
  titre: string;
  description: string;
  proposeur: string;
  catégorie: string;
  date: GameDate;
  état: string;
  importance: ImportanceType;
  votesPositifs: number;
  votesNégatifs: number;
  votesAbstention: number;
  effets: Record<string, number>;
}

export interface LoisTableProps {
  lois: Loi[];
  onUpdate?: (loi: Loi) => void;
}
