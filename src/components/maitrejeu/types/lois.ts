
// Enum types for Loi
export type LoiState = 'Proposée' | 'En discussion' | 'Adoptée' | 'Rejetée' | 'Promulguée' | 'En vigueur' | 'Abrogée' | 
                      'proposée' | 'adoptée' | 'rejetée' | 'promulguée' | 'En délibération' | 'active' | 'rejected' | 'proposed' | 'expired' | 'en_débat' | 'votée';
export type ImportanceType = 'faible' | 'normale' | 'haute' | 'critique' | 'mineure' | 'majeure';
export type LoiType = 'Politique' | 'Economique' | 'Militaire' | 'Sociale' | 'Religieuse' | 'Civile' | 'Judiciaire' | 'Agraire' | 'Administrative' | 'Electorale' | 'Fiscale';

export interface Loi {
  id: string;
  titre?: string;
  name?: string; // Pour compatibilité
  title?: string; // Pour compatibilité
  proposeur?: string;
  auteur?: string; // Pour compatibilité
  proposedBy?: string; // Pour compatibilité
  date?: string | { year: number; season: string };
  état: LoiState;
  status?: LoiState; // Pour compatibilité
  statut?: LoiState; // Pour compatibilité
  description?: string;
  contenu?: string | string[];
  votes?: {
    pour: number;
    contre: number;
    abstention: number;
  };
  votesPositifs?: number; // Pour compatibilité
  votesNégatifs?: number; // Pour compatibilité
  votesAbstention?: number; // Pour compatibilité
  votesFor?: number; // Pour compatibilité
  votesAgainst?: number; // Pour compatibilité
  catégorieId?: string;
  categorieId?: string; // Pour compatibilité
  catégorie?: string;
  category?: string; // Pour compatibilité
  importance?: ImportanceType;
  type?: LoiType; // Type de loi
  // Champs additionnels
  dateProposition?: string | { year: number; season: string };
  dateVote?: string | { year: number; season: string };
  datePromulgation?: string | { year: number; season: string };
  dateAbrogation?: string | { year: number; season: string };
  implementationDate?: string | { year: number; season: string }; // Pour compatibilité
  expirationDate?: string | { year: number; season: string }; // Pour compatibilité
  propositionSénateur?: string;
  coCauteurs?: string[];
  amendements?: any[];
  effets?: Record<string, any> | string[];
  clauses?: any[]; // Pour compatibilité
  commentaires?: string[]; // Pour compatibilité
  notes?: string; // Pour compatibilité
  tags?: string[];
  conditions?: string[]; // Pour compatibilité
  pénalités?: string[]; // Pour compatibilité
}

export interface LoiFilter {
  état?: string[];
  catégorie?: string[];
  importance?: string[];
  searchTerm?: string;
  proposeur?: string;
  dateDebut?: string;
  dateFin?: string;
}

export interface LoiSort {
  field: 'titre' | 'date' | 'proposeur' | 'état' | 'importance';
  direction: 'asc' | 'desc';
}

export interface LoiVote {
  loiId: string;
  sénateurId: string;
  vote: 'pour' | 'contre' | 'abstention';
  date: string;
  motif?: string;
}

export interface LoiCatégorie {
  id: string;
  name: string;
  description: string;
  color?: string;
}

export interface LoiAmendement {
  id: string;
  loiId: string;
  texte: string;
  proposeur: string;
  date: string;
  accepté?: boolean;
}
