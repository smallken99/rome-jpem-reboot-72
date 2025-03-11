
import { Season } from './common';

export type LoiState = 'En délibération' | 'Promulguée' | 'Rejetée' | 'proposée' | 'adoptée';
export type LoiType = 'civile' | 'militaire' | 'religieuse' | 'économique' | 'politique';

export interface Impact {
  description: string;
  valeur: number;
  cible: string;
}

export interface Loi {
  id: string;
  titre: string;
  nom: string;
  description: string;
  type: LoiType;
  proposeur: string;
  dateProposition: {
    year: number;
    season: Season;
  };
  date?: {
    year: number;
    season: Season;
  };
  catégorie?: string;
  état: LoiState;
  importance?: 'majeure' | 'normale' | 'mineure';
  votesPositifs?: number;
  votesNégatifs?: number;
  votesAbstention?: number;
  clauses: string[];
  impacts: Impact[];
  effets?: Record<string, number>;
}
