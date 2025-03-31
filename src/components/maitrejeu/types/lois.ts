
import { GameDate } from './common';

export type LoiType = 'civile' | 'militaire' | 'économique' | 'religieuse' | 'constitutionnelle';
export type LoiState = 'proposed' | 'active' | 'rejected' | 'expired';
export type ImportanceType = 'mineure' | 'normale' | 'majeure' | 'critique';

export interface Loi {
  id: string;
  titre: string;
  description: string;
  proposeur: string;
  date: GameDate;
  état: LoiState;
  state?: LoiState; // Alias anglais pour compatibilité
  catégorie: string;
  votesPositifs: number;
  votesNégatifs: number;
  votesAbstention: number;
  soutenusParFactions: string[];
  opposésParFactions: string[];
  type: LoiType;
  importance: ImportanceType;
  effets: string[];
  impacts?: Record<string, number>; // Pour compatibilité
  history?: {date: GameDate, event: string}[]; // Pour compatibilité
  
  // Champs anglais pour compatibilité
  title?: string;
  proposedBy?: string;
  category?: string;
  positiveVotes?: number;
  negativeVotes?: number;
  abstentionVotes?: number;
  supportedByFactions?: string[];
  opposedByFactions?: string[];
  effects?: string[];
  auteur?: string;
}
