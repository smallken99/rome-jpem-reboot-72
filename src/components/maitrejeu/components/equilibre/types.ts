
export interface EquilibreChartProps {
  data: any[];
}

export interface RecentEventsTableProps {
  events: any[];
  formatDate: (date: any) => string;
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

export interface ThreatAssessmentProps {
  threats: RiskFactor[];
}

export interface PoliticalBalanceCardProps {
  equilibre: any;
  onUpdate: (populares: number, optimates: number, moderates: number) => void;
}

export interface SocialStabilityCardProps {
  equilibre: any;
  onUpdate: (patriciens: number, plebéiens: number) => void;
}

export interface EconomicStabilityCardProps {
  equilibre: any;
  onUpdate: (economie: number) => void;
}
