
import { GameDate, ImportanceType } from './common';

export type LoiEtat = 'proposée' | 'adoptée' | 'rejetée' | 'abrogée';
export type LoiCategorie = 'politique' | 'économique' | 'militaire' | 'religieuse' | 'sociale' | 'judiciaire';

export interface Loi {
  id: string;
  titre: string;
  description: string;
  proposeur: string;
  catégorie: string;
  date: GameDate;
  état: LoiEtat;
  importance: ImportanceType;
  votesPositifs: number;
  votesNégatifs: number;
  votesAbstention: number;
  effets: Record<string, number>;
}

export interface LoiHistorique extends Loi {
  conséquences: string;
  amendements?: string[];
}

export interface LoiProposition {
  id: string;
  titre: string;
  description: string;
  proposeur: string;
  catégorie: LoiCategorie;
  effetsEstimés: Record<string, number>;
  dateProposition: GameDate;
  supporteurs: string[];
  opposants: string[];
}

export interface LoiReference {
  id: string;
  titre: string;
  description: string;
  année: number;
  status: LoiEtat;
}
