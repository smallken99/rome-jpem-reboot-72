import { GameDate } from './common';

export interface HistoriqueEntry {
  id: string;
  date: GameDate | Date;
  event: string;
  impact: number | Record<string, number>;
  type: string;
  description?: string;
}

export type RiskType = 'political' | 'economic' | 'military' | 'social' | 'religious';

export interface Risk {
  id: string;
  type: RiskType;
  name: string;
  description: string;
  severity: number; // 1-10
  createdAt: string;
  active: boolean;
  impact: Record<string, number>; // e.g. { "populaires": -5, "optimates": +3 }
}

export interface EquilibreHistoryEntry {
  date: string;
  values: Record<string, number>;
  event?: string;
  description?: string;
}

export interface Equilibre {
  id: string;
  
  // Political balance
  political: {
    populaires: number;
    optimates: number;
    moderates: number;
  };
  
  // These are aliases for the political values above for compatibility
  populaires: number;
  populares: number; // Another alias sometimes used
  optimates: number;
  moderates: number;
  
  // Social balance
  social: {
    patriciens: number;
    plébéiens: number;
  };
  
  // These are aliases for the social values above for compatibility
  patriciens: number;
  plébéiens: number;
  
  // Economic stability (0-100)
  economie: number;
  economy: number; // Alias for compatibility
  économie: number; // Alias with accent for compatibility
  economicStability: number; // Another alias sometimes used
  
  // Other stability factors (0-100)
  stability: number;
  armée: number;
  loyauté: number;
  morale: number;
  religion: number;
  facteurJuridique: number;
  
  // Risks affecting equilibrium
  risques: Risk[];
  
  // History of equilibrium changes
  historique: EquilibreHistoryEntry[];
}

export interface PoliticalEvent {
  id: string;
  date: GameDate;
  title: string;
  description: string;
  impact: number;
  type: string;
  resolved?: boolean;
}

export interface SocialStabilityCardProps {
  patriciens: number;
  plebeiens: number;
  onUpdate: (patriciens: number, plebeiens: number) => void;
  equilibre: Equilibre;
}

export interface PoliticalBalanceCardProps {
  populaires: number;
  optimates: number;
  moderates: number;
  onUpdate: (populaires: number, optimates: number, moderates: number) => void;
  equilibre: Equilibre;
}

export interface EconomicStabilityCardProps {
  economy: number;
  onUpdate: (economy: number) => void;
  equilibre: Equilibre;
}

export interface RecentEventsTableProps {
  events: PoliticalEvent[];
}
