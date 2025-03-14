
import { GameDate } from './common';

export interface Loi {
  id: string;
  // Propriétés de titre (différentes conventions de nommage)
  title?: string;
  titre?: string;
  nom?: string;
  
  // Propriétés principales
  description: string;
  
  // Propriétés d'auteur/proposeur (différentes conventions de nommage)
  proposedBy?: string;
  proposeur?: string;
  auteur?: string;
  
  // Propriétés de date
  date?: GameDate | string;
  dateProposition?: string | GameDate;
  
  // Propriétés de statut (différentes conventions de nommage)
  status?: LoiState;
  statut?: string;
  état?: string;
  
  // Propriétés de catégorie (différentes conventions de nommage)
  category?: string;
  categorieId?: string;
  catégorie?: string;
  
  // Propriétés de vote (différentes conventions de nommage)
  votesFor?: number;
  votesAgainst?: number;
  votesPositifs?: number;
  votesNégatifs?: number;
  votesAbstention?: number;
  
  // Propriétés de période de validité
  implementationDate?: GameDate;
  expirationDate?: GameDate;
  
  // Propriétés OBLIGATOIRES manquantes qui causent des erreurs
  type: string | LoiType;
  importance: string;
  clauses: any[];
  commentaires: string[];
  tags: string[];
  
  // Propriétés facultatives
  votes?: {
    pour: number;
    contre: number;
    abstention: number;
  };
  
  // Propriétés supplémentaires
  notes?: string;
  effets?: string[] | Record<string, any>;
  conditions?: string[];
  penalites?: string[];
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
