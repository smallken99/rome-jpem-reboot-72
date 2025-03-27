
export type LoiType = "standard" | "constitutionnelle" | "judiciaire" | "administrative" | "urgence" | string;

export type LoiState = 
  "pending" | "debated" | "approved" | "rejected" | "active" | "expired" | 
  "proposée" | "En délibération" | "adoptée" | "rejetée" | "promulguée";

export type ImportanceType = "mineure" | "normale" | "majeure" | "critique" | "haute";

export interface LoiBase {
  id: string;
  title: string;
  description: string;
  proposer: string;
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
