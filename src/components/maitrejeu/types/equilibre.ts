
export enum SeverityLevel {
  MINOR = "mineure",
  NORMAL = "normale",
  MAJOR = "majeure",
  CRITICAL = "critique",
  HIGH = "haute"
}

export interface RiskFactor {
  id: string;
  name: string;
  severity: string;
  description: string;
  level: number;
  type: string;
  impact: number;
  trend: 'up' | 'down' | 'stable';
}

export interface PoliticalEvent {
  id: string;
  title: string;
  date: string | { year: number; season: string };
  description: string;
  impact: string | Record<string, number>;
  type: string;
  name?: string;
  importance?: string;
}

export interface Equilibre {
  political: {
    populares: number;
    optimates: number;
    moderates: number;
  };
  social: {
    patriciens: number;
    plebeiens: number;
  };
  economic: number;
  
  // Additional properties used in code
  populares: number;
  populaires: number;
  optimates: number;
  moderates: number;
  patriciens: number;
  plébéiens: number;
  économie: number;
  armée: number;
  loyauté: number;
  morale: number;
  facteurSenat?: number;
  economicStability?: number;
  facteurMilitaire?: number;
  facteurPatriciens?: number;
  facteurPlebs?: number;
  facteurReligieux?: number;
  population?: number;
  criminalityIndex?: number;
  indiceCrime?: number;
  foodSupply?: number;
}

export interface EquilibreChartProps {
  data: any;
}

export interface RecentEventsTableProps {
  events: PoliticalEvent[];
  formatDate: (date: string | { year: number; season: string }) => string;
}

export interface PoliticalBalanceCardProps {
  populares: number;
  optimates: number;
  moderates: number;
  equilibre: Equilibre;
  onUpdate: (populares: number, optimates: number, moderates: number) => void;
}

export interface SocialStabilityCardProps {
  patriciens: number;
  plebeiens: number;
  equilibre: Equilibre;
  onUpdate: (patriciens: number, plebeiens: number) => void;
}

export interface EconomicStabilityCardProps {
  economie: number;
  equilibre: Equilibre;
  onUpdate: (economie: number) => void;
}

export interface ThreatAssessmentProps {
  threats: RiskFactor[];
}
