
export enum LoiType {
  ECONOMIQUE = 'economique',
  MILITAIRE = 'militaire',
  SOCIALE = 'sociale',
  POLITIQUE = 'politique',
  RELIGIEUSE = 'religieuse',
  JUDICIAIRE = 'judiciaire',
  ADMINISTRATIVE = 'administrative',
  DIPLOMATIQUE = 'diplomatique',
  CULTURELLE = 'culturelle',
  FISCALE = 'fiscale'
}

export enum LoiState {
  DRAFT = 'draft',
  PROPOSED = 'proposed',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  IMPLEMENTED = 'implemented',
  AMENDED = 'amended',
  EXPIRED = 'expired',
  VETOED = 'vetoed'
}

export enum ImportanceType {
  MINOR = 'minor',
  MODERATE = 'moderate',
  MAJOR = 'major',
  CRITICAL = 'critical'
}

export interface Loi {
  id: string;
  titre: string;
  description: string;
  proposeur: string;
  catégorie: string;
  date: { year: number; season: string };
  état: string | LoiState;
  importance: string | ImportanceType;
  votesPositifs: number;
  votesNégatifs: number;
  impacts: Record<string, number>;
  type: string | LoiType;
  effets: string[];
  clauses: string[];
  commentaires: string[];
  history: any[];
  tags: string[];
  supporters?: string[];
  opposants?: string[];
  
  // Additional properties for compatibility
  title?: string;
  proposedBy?: string;
  auteur?: string;
  status?: string;
  statut?: string;
  category?: string;
  votesFor?: number;
  votesAgainst?: number;
  abstentions?: number;
  votesAbstention?: number;
  dateProposition?: string;
  votes?: any;
  conditions?: string[];
  pénalités?: string[];
  soutiens?: string[];
}
