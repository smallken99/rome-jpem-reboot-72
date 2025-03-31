
import { GameDate } from './common';

export enum LoiType {
  CIVILE = "civile",
  MILITAIRE = "militaire",
  ECONOMIQUE = "économique",
  RELIGIEUSE = "religieuse",
  CONSTITUTIONNELLE = "constitutionnelle",
  POLITIQUE = "politique"
}

export enum LoiState {
  PROPOSED = "proposed",
  ACTIVE = "active",
  REJECTED = "rejected",
  EXPIRED = "expired"
}

export interface Loi {
  id: string;
  titre: string;
  description: string;
  proposeur: string;
  date: GameDate;
  état: LoiState | string;
  state?: LoiState | string; // English alias
  status?: string; // Additional status field used in some components
  statut?: string; // Additional French status field
  catégorie: string;
  category?: string; // English alias
  votesPositifs: number;
  votesNégatifs: number;
  votesAbstention: number;
  votesFor?: number; // Alias for votesPositifs
  votesAgainst?: number; // Alias for votesNégatifs
  soutenusParFactions: string[];
  opposésParFactions: string[];
  type: LoiType | string;
  importance: ImportanceType | string;
  effets: string[];
  impacts?: Record<string, number>; // For compatibility
  history?: {date: GameDate, event: string}[]; // For compatibility
  
  // Additional fields used in various components
  title?: string; // English alias for titre
  proposedBy?: string; // English alias for proposeur
  positiveVotes?: number; // English alias for votesPositifs
  negativeVotes?: number; // English alias for votesNégatifs
  abstentionVotes?: number; // English alias for votesAbstention
  supportedByFactions?: string[]; // English alias for soutenusParFactions
  opposedByFactions?: string[]; // English alias for opposésParFactions
  effects?: string[]; // English alias for effets
  auteur?: string; // Alternative name for proposeur
  votes?: { pour: number, contre: number, abstention: number };
  dateProposition?: GameDate; // Additional field
  contenu?: string; // Additional field
  clauses?: string[]; // Additional field
  commentaires?: string[]; // Additional field
  notes?: string[]; // Additional field
  tags?: string[]; // Additional field
  categorieId?: string; // Alternative for catégorie
  catégorieId?: string; // Alternative spelling
}

// Re-export ImportanceType from evenements.ts
import { ImportanceType } from './evenements';
export { ImportanceType };
