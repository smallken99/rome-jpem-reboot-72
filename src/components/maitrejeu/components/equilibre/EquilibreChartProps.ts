
export interface EquilibreChartProps {
  data: any;
}

export interface ThreatAssessmentProps {
  threats: RiskFactor[];
}

export interface PoliticalBalanceCardProps {
  populares: number;
  optimates: number;
  moderates: number;
  equilibre?: any;
  onUpdate: (populares: number, optimates: number, moderates: number) => void;
}

export interface SocialStabilityCardProps {
  patriciens: number;
  plebéiens: number;
  equilibre?: any;
  onUpdate: (patriciens: number, plebéiens: number) => void;
}

export interface EconomicStabilityCardProps {
  economie: number;
  equilibre?: any;
  onUpdate: (economie: number) => void;
}

export interface RecentEventsTableProps {
  events: PoliticalEvent[];
  formatDate: (date: string) => string;
}

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

export interface PoliticalEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  impact: number;
  category: string;
}

export interface Equilibre {
  optimates: number;
  populares: number;
  moderates: number;
  patriciens: number;
  plebéiens: number;
  economie: number;
}
