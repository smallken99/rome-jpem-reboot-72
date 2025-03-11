
import { Season } from './common';

export type LoiState = 'En délibération' | 'Promulguée' | 'Rejetée' | 'proposée' | 'adoptée';

export interface Loi {
  id: string;
  nom: string;
  description: string;
  type: 'civile' | 'militaire' | 'religieuse' | 'économique' | 'politique';
  proposeur: string;
  dateProposition: {
    year: number;
    season: Season;
  };
  dateVote?: {
    year: number;
    season: Season;
  };
  état: LoiState;
  votes?: {
    pour: number;
    contre: number;
    abstention: number;
  };
  clauses: string[];
  impacts: {
    description: string;
    valeur: number;
    cible: string;
  }[];
  // Propriétés utilisées par les composants existants
  titre?: string;
  date?: {
    year: number;
    season: Season;
  };
  catégorie?: string;
  importance?: 'majeure' | 'normale' | 'mineure';
  votesPositifs?: number;
  votesNégatifs?: number;
  votesAbstention?: number;
  effets?: Record<string, number>;
}
