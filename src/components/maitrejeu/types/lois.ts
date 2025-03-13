
// Types pour les lois

export type LoiType = 'politique' | 'économique' | 'sociale' | 'judiciaire' | 'militaire' | 'religieuse';
export type LoiStatut = 'proposée' | 'adoptée' | 'rejetée' | 'Promulguée' | 'En délibération';

// Clause d'une loi
export interface Clause {
  id: string;
  texte: string;
  explication?: string;
}

// Impact d'une loi sur différents domaines
export interface Impact {
  domaine: string;
  valeur: number;
  explication?: string;
}

// Interface principale pour une loi
export interface Loi {
  id: string;
  titre: string;
  description: string;
  type: LoiType;
  catégorie?: string;
  proposeur: string;
  dateProposition: {
    year: number;
    season: string;
  };
  date: {
    year: number;
    season: string;
  };
  état: LoiStatut;
  votesPositifs: number;
  votesNégatifs: number;
  votesAbstention: number;
  votes: {
    pour: number;
    contre: number;
    abstention: number;
  };
  clauses?: Clause[];
  impacts?: Impact[];
  effets: string[];
  dateVote?: {
    year: number;
    season: string;
  };
  commentaires?: string;
}
