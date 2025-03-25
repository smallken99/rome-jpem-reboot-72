
export interface Loi {
  id: string;
  titre?: string;
  name?: string; // Pour compatibilité
  proposeur?: string;
  auteur?: string; // Pour compatibilité
  date?: string | { year: number; season: string };
  état: 'Proposée' | 'En discussion' | 'Adoptée' | 'Rejetée' | 'Promulguée' | 'En vigueur' | 'Abrogée';
  description?: string;
  contenu?: string | string[];
  votes?: {
    pour: number;
    contre: number;
    abstention: number;
  };
  catégorieId?: string;
  catégorie?: string;
  importance?: 'faible' | 'normale' | 'haute' | 'critique';
  // Champs additionnels
  dateProposition?: string;
  dateVote?: string;
  datePromulgation?: string;
  dateAbrogation?: string;
  propositionSénateur?: string;
  coCauteurs?: string[];
  amendements?: any[];
  effets?: Record<string, any>;
  tags?: string[];
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
