
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
  risques: RiskFactor[];
  evenements: string[];
  historique?: any[];
  indiceCrime?: number;
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
