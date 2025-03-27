
export interface RiskFactor {
  id: string;
  name: string;
  severity: string;
  description: string;
  level: number;
  type: string;
  impact: string;
  trend: string;
}

export interface ThreatAssessmentProps {
  threats: RiskFactor[];
}

export interface PoliticalBalanceCardProps {
  populares: number;
  optimates: number;
  moderates: number;
  onUpdate: (populares: number, optimates: number, moderates: number) => void;
}

export interface SocialStabilityCardProps {
  patriciens: number;
  plebéiens: number;
  onUpdate: (patriciens: number, plebéiens: number) => void;
}

export interface EconomicStabilityCardProps {
  economie: number;
  onUpdate: (economie: number) => void;
}

export interface EquilibreChartProps {
  data: any;
}

export interface RecentEventsTableProps {
  events: PoliticalEvent[];
  formatDate: (date: string) => string;
}

export interface PoliticalEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  impact: number;
  category: string;
}
