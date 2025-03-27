
// Types pour les lois
export type LoiType = 'Politique' | 'Judiciaire' | 'Sociale' | 'Militaire' | 'Economique' | 'Religieuse';
export type LoiState = 'Proposée' | 'En discussion' | 'Adoptée' | 'Rejetée' | 'Promulguée' | 'En vigueur' | 'Abrogée';
export type ImportanceType = 'mineure' | 'normale' | 'majeure' | 'faible' | 'haute' | 'critique';

export interface Loi {
  id: string;
  titre: string;
  description: string;
  proposeur: string;
  catégorie: 'Agraire' | 'Politique' | 'Militaire' | 'Economique' | 'Sociale' | 'Religieuse';
  date: {
    year: number;
    season: string;
  };
  état: LoiState;
  importance: ImportanceType;
  votesPositifs: number;
  votesNégatifs: number;
  votesAbstention: number;
  effets?: Record<string, any>;
  
  // Propriétés requises par LoiModal et loisAdapter
  type: LoiType | string;
  clauses: any[];
  commentaires: string[];
  tags: string[];
  
  // Propriétés alternatives pour compatibilité
  statut?: string;
  votes?: {
    pour: number;
    contre: number;
    abstention: number;
  };
  title?: string;
  proposedBy?: string;
  category?: string;
  auteur?: string;
  catégorieId?: string;
  dateProposition?: string | { year: number; season: string };
  implementationDate?: { year: number; season: string };
  expirationDate?: { year: number; season: string };
  votesFor?: number;
  votesAgainst?: number;
  status?: string;
  nom?: string;
}
