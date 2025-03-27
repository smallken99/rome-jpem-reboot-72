
export type LoiType = "standard" | "constitutionnelle" | "judiciaire" | "administrative" | "urgence" | string;

export type LoiState = 
  "pending" | "debated" | "approved" | "rejected" | "active" | "expired" | 
  "proposée" | "En délibération" | "adoptée" | "rejetée" | "promulguée" |
  "Proposée" | "En discussion" | "Rejetée" | "Promulguée" | "En vigueur" | 
  "haute";

export type ImportanceType = "mineure" | "normale" | "majeure" | "critique" | "haute";

export interface LoiBase {
  id: string;
  title: string;
  description: string;
  proposeur: string;
  category: string;
  date: {
    year: number;
    season: string;
  };
  status: LoiState;
  importance: ImportanceType;
  positiveVotes: number;
  negativeVotes: number;
  abstentionVotes: number;
}

export interface Loi {
  id: string;
  titre: string;
  description: string;
  proposeur: string;
  catégorie: string;
  catégorieId?: string;
  date: {
    year: number;
    season: string;
  };
  état: LoiState;
  importance: ImportanceType;
  votesPositifs: number;
  votesNégatifs: number;
  abstentions: number;
  contenu?: string;
  pénalités?: string;
  conditions?: string[];
  notes?: string[];
  votes?: {
    pour: number;
    contre: number;
    abstention: number;
  };
  type?: string;
  name?: string; // Pour la compatibilité avec certains composants
  
  // Propriétés alternatives pour compatibilité
  title?: string;
  proposedBy?: string;
  category?: string;
  auteur?: string;
  categorieId?: string;
  dateProposition?: string | { year: number; season: string };
  implementationDate?: { year: number; season: string };
  votesFor?: number;
  votesAgainst?: number;
  votesAbstention?: number;
  status?: string;
  statut?: string;
  clauses?: any[];
  commentaires?: string[];
  tags?: string[];
  effets?: Record<string, any>;
}

export interface TimelineItemProps {
  title: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  isCompleted?: boolean;
  date?: string;
  description?: string;
}

export interface SenateurJouable {
  id: string;
  nom: string;
  faction: string;
  influence: number;
  richesse: number;
  militaire: number;
  caractere: string[];
  actif: boolean;
}
