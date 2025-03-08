
import { ImportanceType, GameDate } from './common';

export interface Loi {
  id: string;
  titre: string;
  description: string;
  proposeur: string;
  catégorie: string;
  date: GameDate;
  état: 'proposée' | 'votée' | 'rejetée' | 'amendée';
  importance: ImportanceType;
  votesPositifs: number;
  votesNégatifs: number;
  votesAbstention: number;
  effets: {
    stabilité?: number;
    trésorPublique?: number;
    prestigeRome?: number;
    religion?: number;
    influence?: number;
    finance?: number;
    militaire?: number;
    economie?: number;
    autre?: string;
  };
  impact?: any; // Pour compatibilité avec le code existant
}

export interface LoisTableProps {
  lois: Loi[];
  searchTerm?: string;
  onVote?: (id: string, vote: 'pour' | 'contre' | 'abstention') => void;
}
