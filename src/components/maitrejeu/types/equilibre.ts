
export interface Equilibre {
  id?: string;
  economie: number;
  populaires?: number;
  optimates?: number;
  moderates?: number;
  patriciens: number;
  plebeiens: number;
  stability?: number;
  historique?: HistoriqueEntry[];
  
  // Additional properties found in usage
  armée?: number;
  loyauté?: number;
  morale?: number;
  facteurPatriciens?: number;
  facteurPlebs?: number;
  facteurReligieux?: number;
  facteurSenat?: number;
  indiceCrime?: number;
  facteurMilitaire?: number;
  economicStability?: number;
  
  // Alternative naming for backward compatibility
  populares?: number;
  économie?: number;
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

export interface RiskFactor {
  id: string;
  name: string;
  level: string;
  type: string;
  description: string;
  threat: number;
  impact?: string;
  trend?: string;
  severity?: string;
}

export type RiskFactorLevel = 'low' | 'medium' | 'high' | 'critical';

export interface PoliticalEvent {
  id: string;
  title: string;
  date: { year: number; season: string };
  description: string;
  impact: {
    political?: number;
    social?: number;
    economic?: number;
    stability?: number;
  };
  tags?: string[];
  type?: string;
}

export interface EconomicStabilityCardProps {
  economy?: number;
  economie?: number;
  onUpdate: (economy: number) => void;
  equilibre?: Equilibre;
}

export interface PoliticalBalanceCardProps {
  populares: number;
  optimates: number;
  moderates: number;
  onUpdate: (populares: number, optimates: number, moderates: number) => void;
  equilibre?: Equilibre;
}

export interface SocialStabilityCardProps {
  patriciens: number;
  plebeiens: number;
  onUpdate: (patriciens: number, plebeiens: number) => void;
  equilibre?: Equilibre;
}

export interface EquilibreChartProps {
  data: any[];
}

export interface RecentEventsTableProps {
  events: any[];
  formatDate: (date: any) => string;
}

export interface ThreatAssessmentProps {
  threats: RiskFactor[];
}

export interface TimelineItemProps {
  title: string;
  date?: string | { year: number; season: string };
  description?: string;
  icon?: React.ReactNode;
}
