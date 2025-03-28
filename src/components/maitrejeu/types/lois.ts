
import { LoiType, LoiState, ImportanceType } from '@/components/maitrejeu/components/lois/types/loiTypes';

export interface Loi {
  id: string;
  titre: string;
  description: string;
  proposeur: string;
  catégorie: string;
  date: { year: number; season: string };
  état: string | LoiState;
  importance: string | ImportanceType;
  votesPositifs: number;
  votesNégatifs: number;
  impacts: Record<string, number>;
  type: string | LoiType;
  effets: string[];
  clauses: string[];
  commentaires: string[];
  history: any[];
  tags: string[];
  supporters?: string[];
  opposants?: string[];
  
  // Additional properties for compatibility
  title?: string;
  proposedBy?: string;
  auteur?: string;
  status?: string;
  statut?: string;
  category?: string;
  votesFor?: number;
  votesAgainst?: number;
  abstentions?: number;
  votesAbstention?: number;
  dateProposition?: { year: number; season: string } | string;
  votes?: any;
  conditions?: string[];
  pénalités?: string[];
  soutiens?: string[];
}
