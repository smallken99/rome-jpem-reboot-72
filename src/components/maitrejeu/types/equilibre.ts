
export type EquilibreLevel = 'high' | 'medium' | 'low' | 'critical';
export type RiskLevel = 'high' | 'medium' | 'low' | 'critical';
export type RiskType = 'political' | 'military' | 'economic' | 'social' | string;

export interface RiskFactor {
  id: string;
  name: string;
  level: RiskLevel;
  type: RiskType;
  description: string;
  threat: number;
}

export interface HistoriqueEntry {
  date: { year: number; season: string };
  event: string;
  impact: number;
}

export interface PoliticalEvent {
  id: string;
  title: string;
  description: string;
  date: { year: number; season: string };
  type: string;
  impact: number;
}

export interface Equilibre {
  id: string;
  year: number;
  season: string;
  senat: number;
  plebs: number;
  populaires: number;
  optimates: number;
  moderates: number;
  patriciens: number;
  plébéiens: number;
  economie: number;
  économie?: number;
  armée?: number;
  loyauté?: number;
  morale?: number;
  facteurMilitaire?: number;
  facteurPatriciens?: number;
  facteurPlebs?: number;
  facteurSenat?: number;
  economicStability?: number;
  risques: RiskFactor[];
  evenements: string[];
  historique?: HistoriqueEntry[];
  indiceCrime?: number;
  political?: any;
  social?: any;
  economy?: any;
}

export interface PoliticalBalanceCardProps {
  equilibre: Equilibre;
  onUpdate: (populaires: number, optimates: number, moderates: number) => void;
}

export interface SocialStabilityCardProps {
  equilibre: Equilibre;
  onUpdate: (patriciens: number, plébéiens: number) => void;
}

export interface EconomicStabilityCardProps {
  equilibre: Equilibre;
  onUpdate: (economie: number) => void;
}
