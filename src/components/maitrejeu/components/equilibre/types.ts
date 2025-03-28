
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
  populares: number;
  optimates: number;
  moderates: number;
  onUpdate: (populares: number, optimates: number, moderates: number) => void;
  equilibre?: any;
}

export interface SocialStabilityCardProps {
  patricians: number;
  plebeians: number;
  onUpdate: (patricians: number, plebeians: number) => void;
  patriciens?: number;
  plébéiens?: number;
  equilibre?: any;
}

export interface EconomicStabilityCardProps {
  economy: number;
  onUpdate: (economy: number) => void;
  economie?: number;
  equilibre?: any;
}

export interface TimelineItemProps {
  title: string;
  date?: string | { year: number; season: string };
  description?: string;
  icon?: React.ReactNode;
}
