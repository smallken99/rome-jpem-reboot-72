
export interface Equilibre {
  id: string;
  political?: {
    populaires: number;
    optimates: number;
    moderates: number;
  };
  social?: {
    patriciens: number;
    plébéiens: number;
  };
  economy?: number;
  economie?: number; // Alternative spelling used in some components
  stability?: number;
  
  // Military factors
  armée?: number;
  loyauté?: number;
  morale?: number;
  
  // Additional properties used in various components
  facteurReligieux?: number;
  facteurPatriciens?: number;
  facteurPlebs?: number;
  facteurSenat?: number;
  facteurMilitaire?: number;
  population?: number;
  indiceCrime?: number;
  
  // Historical tracking
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

export interface RiskFactor {
  id: string;
  name: string;
  level: string;
  type: string;
  description: string;
  threat: number;
}

export type RiskFactorLevel = 'low' | 'medium' | 'high' | 'critical';

export interface PoliticalEvent {
  id: string;
  title: string;
  description: string;
  date: Date | { year: number; season: string };
  impact: Record<string, number>;
  type: string;
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

export interface EconomicStabilityCardProps {
  economy: number;
  economie?: number;
  onUpdate: (economy: number) => void;
  equilibre?: Equilibre;
}
