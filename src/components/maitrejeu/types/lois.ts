
import { SenateurJouable } from './senateurs';

export type LoiState = 'proposée' | 'en délibération' | 'promulguée' | 'rejetée' | 'abrogée' | 'Proposée' | 'En délibération' | 'Promulguée' | 'Rejetée' | 'active' | 'rejected' | 'proposed' | 'expired' | 'En discussion' | 'adoptée' | 'En vigueur';
export type ImportanceType = 'mineure' | 'normale' | 'majeure' | 'critique' | 'haute';
export type LoiType = string;

export interface GameDate {
  year: number;
  season: string;
}

export interface Loi {
  id: string;
  titre: string;
  title?: string;
  description: string;
  proposeur: string;
  catégorie: string;
  catégorieId?: string;
  categorieId?: string;
  type: string;
  date: GameDate | string;
  dateProposition?: GameDate;
  état: LoiState;
  importance: ImportanceType;
  votesPositifs: number;
  votesNégatifs: number;
  abstentions: number;
  votesAbstention?: number;
  votes?: any;
  votesFor?: number;
  votesAgainst?: number;
  clauses?: string[] | string;
  commentaires?: string[] | string;
  tags?: string[];
  conditions?: any;
  effets?: string[];
  pénalités?: any;
  soutiens?: SenateurJouable[];
  opposants?: SenateurJouable[];
  texte?: string;
  notes?: string;
  contenu?: string;
  status?: string;
  statut?: string;
  auteur?: string;
  proposedBy?: string;
  category?: string;
  implementationDate?: GameDate;
  name?: string;
}
