
import { GameDate } from './common';

export interface Loi {
  id: string;
  title: string;
  description: string;
  proposedBy: string;
  date: GameDate;
  status: 'proposed' | 'active' | 'rejected' | 'expired';
  category: string;
  votesFor?: number;
  votesAgainst?: number;
  implementationDate?: GameDate;
  expirationDate?: GameDate;
  notes?: string;
  effets?: string[];
  conditions?: string[];
  penalites?: string[];
  
  // Legacy properties
  titre?: string;
  proposeur?: string;
  catégorie?: string;
  état?: string;
  importance?: string;
  votesPositifs?: number;
  votesNégatifs?: number;
  votesAbstention?: number;
  dateProposition?: string;
  type?: string;
  clauses?: any[];
  commentaires?: string[];
  votes?: {
    pour: number;
    contre: number;
    abstention: number;
  };
}

export type LoiType = 'Agraire' | 'Politique' | 'Militaire' | 'Economique' | 'Sociale' | 'Religieuse' | 'Civile';
export type LoiState = 'proposed' | 'active' | 'rejected' | 'expired' | 'Promulguée' | 'En délibération' | 'rejetée' | 'adoptée' | 'proposée';

export interface CategorieLoi {
  id: string;
  name: string;
  description: string;
}

export interface LoiVote {
  id: string;
  loiId: string;
  senateurId: string;
  vote: 'for' | 'against' | 'abstain';
  comment?: string;
  date: GameDate;
}

export interface LoiFilters {
  status?: 'proposed' | 'active' | 'rejected' | 'expired';
  category?: string;
  proposedBy?: string;
  dateRange?: [Date, Date] | null;
  searchTerm?: string;
}

export interface LoiSorting {
  field: keyof Loi;
  direction: 'asc' | 'desc';
}

export interface LoiCreate {
  title: string;
  description: string;
  proposedBy: string;
  category: string;
  effets?: string[];
  conditions?: string[];
  penalites?: string[];
  notes?: string;
}

export interface LoiUpdate extends Partial<LoiCreate> {
  id: string;
  status?: 'proposed' | 'active' | 'rejected' | 'expired';
  votesFor?: number;
  votesAgainst?: number;
  implementationDate?: GameDate;
  expirationDate?: GameDate;
}

export interface Clause {
  id: string;
  type: 'effet' | 'condition' | 'penalite';
  content: string;
}
