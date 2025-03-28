
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
  date: string;
  description: string;
  impact: string;
  type: string;
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
}

export interface EquilibreChartProps {
  data: any;
}

export interface RecentEventsTableProps {
  events: PoliticalEvent[];
  formatDate: (date: string) => string;
}

export interface PoliticalBalanceCardProps {
  populares: number;
  optimates: number;
  moderates: number;
  onUpdate: (populares: number, optimates: number, moderates: number) => void;
}

export interface SocialStabilityCardProps {
  patriciens: number;
  plebeiens: number;
  onUpdate: (patriciens: number, plebeiens: number) => void;
}

export interface EconomicStabilityCardProps {
  economie: number;
  onUpdate: (economie: number) => void;
}

export interface ThreatAssessmentProps {
  threats: RiskFactor[];
}
