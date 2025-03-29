
export interface Equilibre {
  id: string;
  political: {
    populares: number;
    optimates: number;
    moderates: number;
  };
  social: {
    patriciens: number;
    plebeiens: number;
  };
  economy: number;
  stability: number;
  criminalityIndex?: number;
  rebellionThreshold?: number;
  historique?: HistoriqueEntry[];
  
  // Additional properties (French variants)
  économie?: number;
  armée?: number;
  loyauté?: number;
  morale?: number;
  patriciens?: number;
  plébéiens?: number;
  populaires?: number;
  
  // Political factions
  optimates?: number;
  moderates?: number;
  
  // Special factors
  facteurSenat?: number;
  facteurPatriciens?: number;
  facteurPlebs?: number;
  facteurMilitaire?: number;
  facteurReligieux?: number;
  economicStability?: number;
  population?: number;
}

export interface HistoriqueEntry {
  date: Date | { year: number; season: string };
  event: string;
  impact: {
    political?: number;
    social?: number;
    economic?: number;
    stability?: number;
  };
}

export type RiskFactorLevel = 'low' | 'medium' | 'high' | 'critical';

export interface RiskFactor {
  id: string;
  name: string;
  level: RiskFactorLevel;
  type: 'military' | 'political' | 'economic' | 'social' | string;
  description: string;
  threat: number;
}

export interface PoliticalBalanceCardProps {
  populares: number;
  optimates: number;
  moderates: number;
  equilibre?: Equilibre;
  onUpdate: (populares: number, optimates: number, moderates: number) => void;
}

export interface SocialStabilityCardProps {
  patriciens: number;
  plebeiens: number;
  equilibre?: Equilibre;
  onUpdate: (patriciens: number, plebeiens: number) => void;
}

export interface EconomicStabilityCardProps {
  economy: number;
  equilibre?: Equilibre;
  onUpdate: (economy: number) => void;
}

// Additional types
export interface GameDate {
  year: number;
  season: string;
}

export interface PoliticalEvent {
  id: string;
  title: string;
  name?: string;
  description: string;
  date: string | { year: number; season: string };
  endDate?: string | { year: number; season: string };
  type: string;
  impact: Record<string, number>;
  severity: 'low' | 'medium' | 'high' | 'critical';
  importance?: string;
  source?: string;
  faction?: string;
  resolved?: boolean;
  relatedTo?: string[];
  tags?: string[];
  actions?: any[];
  nom?: string;
}

export interface EquilibreChartProps {
  data: any;
}

export interface RecentEventsTableProps {
  events: PoliticalEvent[];
  formatDate: (date: any) => string;
}

export interface ThreatAssessmentProps {
  threats: RiskFactor[];
}
