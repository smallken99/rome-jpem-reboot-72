
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
  name: string;
  level: RiskFactorLevel;
  type: 'military' | 'political' | 'economic' | 'social';
  description: string;
  threat: number;
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
  economy: number;
  onUpdate: (economy: number) => void;
}
