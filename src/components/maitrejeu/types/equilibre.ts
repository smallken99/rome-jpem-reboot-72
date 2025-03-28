
export interface Equilibre {
  // Base political factions
  populares: number;
  optimates: number;
  moderates: number;
  
  // Social classes
  patricians: number;
  plebeians: number;
  
  // Economic factors  
  economy: number;
  stability: number;
  militaryStrength: number;
  publicOrder: number;
  corruption: number;
  inflation: number;
  foodSupply: number;
  unrestThreshold: number;
  indiceCrime: number;
  
  // Additional properties (French variants)
  économie?: number;
  armée?: number;
  loyauté?: number;
  morale?: number;
  patriciens?: number;
  plébéiens?: number;
  populaires?: number;
  
  // Special factors
  facteurSenat?: number;
  facteurPatriciens?: number;
  facteurPlebs?: number;
  facteurMilitaire?: number;
  facteurReligieux?: number;
  economicStability?: number;
  population?: number;
}

export interface PoliticalEvent {
  id: string;
  title: string;
  name?: string;
  description: string;
  date: string | { year: number; season: string };
  type: string;
  impact: Record<string, number>;
  severity: 'low' | 'medium' | 'high' | 'critical';
  importance?: string;
  source?: string;
  faction?: string;
  resolved?: boolean;
  relatedTo?: string[];
}

export interface GameDate {
  year: number;
  season: string;
}

export interface RiskFactor {
  id: string;
  name: string;
  severity: string;
  description: string;
  level: number;
  type: string;
  impact: Record<string, number>;
  trend: 'increasing' | 'decreasing' | 'stable';
}

export interface EquilibreChartProps {
  data: any;
}

export interface RecentEventsTableProps {
  events: PoliticalEvent[];
  formatDate: (date: any) => string;
}

export interface PoliticalBalanceCardProps {
  equilibre: Equilibre;
  onUpdate: (populares: number, optimates: number, moderates: number) => void;
}

export interface SocialStabilityCardProps {
  equilibre: Equilibre;
  onUpdate: (patriciens: number, plébéiens: number) => void;
}

export interface EconomicStabilityCardProps {
  equilibre: Equilibre;
  onUpdate: (economie: number) => void;
}

export interface ThreatAssessmentProps {
  threats: any[];
}
