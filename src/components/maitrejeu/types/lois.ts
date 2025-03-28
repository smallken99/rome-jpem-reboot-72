
import { LoiType, LoiState, ImportanceType } from '@/components/maitrejeu/components/lois/types/loiTypes';

export interface Loi {
  id: string;
  titre: string;
  title?: string;
  description: string;
  proposeur: string;
  proposedBy?: string;
  auteur?: string;
  catégorie: string;
  category?: string;
  date: { year: number; season: string };
  dateProposition?: { year: number; season: string } | string;
  implementationDate?: { year: number; season: string } | string;
  état: string | LoiState;
  status?: string;
  statut?: string;
  importance: string | ImportanceType;
  votesPositifs: number;
  votesNégatifs: number;
  votesFor?: number;
  votesAgainst?: number;
  abstentions?: number;
  votesAbstention?: number;
  impacts: Record<string, number>;
  type: string | LoiType;
  effets: string[];
  clauses: string[];
  conditions?: string[];
  pénalités?: string[];
  commentaires: string[];
  history: any[];
  tags: string[];
  supporters?: string[];
  soutiens?: string[];
  opposants?: string[];
  votes?: any;
  notes?: string;
  contenu?: string;
  categorieId?: string;
  catégorieId?: string;
}

// Export the enum types to make them available
export { LoiType, LoiState, ImportanceType };
