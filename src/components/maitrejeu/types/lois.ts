
import { GameDate } from './common';

export interface Loi {
  id: string;
  title?: string;
  titre?: string;
  description: string;
  proposedBy?: string;
  proposeur?: string;
  auteur?: string;
  date?: GameDate;
  dateProposition?: string | GameDate;
  status?: LoiState;
  statut?: string;
  état?: string;
  category?: string;
  categorieId?: string;
  catégorie?: string;
  votesFor?: number;
  votesAgainst?: number;
  votesPositifs?: number;
  votesNégatifs?: number;
  votesAbstention?: number;
  implementationDate?: GameDate;
  expirationDate?: GameDate;
  notes?: string;
  effets?: string[] | Record<string, any>;
  conditions?: string[];
  penalites?: string[];
  
  // Republique format properties
  clauses?: any[];
  commentaires?: string[];
  importance?: string;
  votes?: {
    pour: number;
    contre: number;
    abstention: number;
  };
  type?: string | LoiType;
  nom?: string;
  tags?: string[];
}

export type LoiType = 
  | 'Agraire' 
  | 'Politique' 
  | 'Militaire' 
  | 'Economique' 
  | 'Sociale' 
  | 'Religieuse' 
  | 'Civile';

export type LoiState = 
  | 'proposed' 
  | 'active' 
  | 'rejected' 
  | 'expired' 
  | 'Promulguée' 
  | 'En délibération' 
  | 'rejetée' 
  | 'adoptée' 
  | 'proposée' 
  | 'en_débat' 
  | 'votée' 
  | 'promulguée';

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
  status?: LoiState;
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
  title?: string;
  titre?: string;
  description: string;
  proposedBy?: string;
  auteur?: string;
  category?: string;
  categorieId?: string;
  effets?: string[];
  conditions?: string[];
  penalites?: string[];
  notes?: string;
  type?: string | LoiType;
}

export interface LoiUpdate extends Partial<LoiCreate> {
  id: string;
  status?: LoiState;
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
