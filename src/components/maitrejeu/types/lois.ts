
import { GameDate } from './common';

// Base interface with common properties shared by all loi types
interface BaseLoi {
  id: string;
  description: string;
  tags: string[];
  
  // Optional properties with different naming conventions
  title?: string;
  titre?: string;
  nom?: string;
  
  proposedBy?: string;
  proposeur?: string;
  auteur?: string;
  
  category?: string;
  categorieId?: string;
  catégorie?: string;
}

// Core loi type with all required properties
export interface Loi extends BaseLoi {
  // Core required properties
  type: LoiType;
  importance: ImportanceType;
  clauses: any[];
  commentaires: string[];
  
  // Date properties
  date?: GameDate | string;
  dateProposition?: string | GameDate;
  implementationDate?: GameDate;
  expirationDate?: GameDate;
  dateVote?: string; // Added this
  datePromulgation?: string; // Added this
  dateExpiration?: string; // Added this
  
  // Status properties with different naming conventions
  status?: LoiState;
  statut?: string;
  état?: string;
  
  // Vote properties with different naming conventions
  votesFor?: number;
  votesAgainst?: number;
  votesPositifs?: number;
  votesNégatifs?: number;
  votesAbstention?: number;
  votes?: Vote;
  
  // Additional properties
  notes?: string;
  effets?: string[] | Record<string, any>;
  conditions?: string[];
  pénalités?: string[];
}

// Type for Vote object
export interface Vote {
  pour: number;
  contre: number;
  abstention: number;
}

// Type aliases for better type safety
export type LoiType = 
  | 'Agraire' 
  | 'Politique' 
  | 'Militaire' 
  | 'Economique' 
  | 'Sociale' 
  | 'Religieuse' 
  | 'Civile'
  | 'Electorale'
  | 'Administrative'
  | 'Judiciaire'
  | 'Fiscale';

export type ImportanceType = 'mineure' | 'normale' | 'majeure';

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
  | 'promulguée'
  | 'expirée';

// Category-related types
export interface CategorieLoi {
  id: string;
  name: string;
  description: string;
}

// Vote-related types
export interface LoiVote {
  id: string;
  loiId: string;
  senateurId: string;
  vote: 'for' | 'against' | 'abstain';
  comment?: string;
  date: GameDate;
}

// Filtering and sorting types
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

// Creation and update types
export interface LoiCreate extends BaseLoi {
  type?: LoiType;
  effets?: string[];
  conditions?: string[];
  penalites?: string[];
  notes?: string;
}

export interface LoiUpdate extends Partial<LoiCreate> {
  id: string;
  status?: LoiState;
  votesFor?: number;
  votesAgainst?: number;
  implementationDate?: GameDate;
  expirationDate?: GameDate;
}

// Individual clause
export interface Clause {
  id: string;
  type: 'effet' | 'condition' | 'penalite';
  content: string;
}
