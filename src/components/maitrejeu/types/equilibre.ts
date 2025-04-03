
export interface Stabilite {
  value: number;
  trend: string;
  index?: number;
  crisisRisk?: number;
  senat?: number;
  lois?: number;
  tribuns?: number;
}

export interface Politique {
  populares: number;
  optimates: number;
  moderates: number;
}

export interface Social {
  plebeiens: number;
  patriciens: number;
  esclaves: number;
  cohesion: number;
}

export interface Militaire {
  moral: number;
  effectifs: number;
  equipement: number;
  discipline: number;
  morale: number;
  force: number;
}

export interface Religion {
  piete: number;
  traditions: number;
  superstition: number;
}

export enum RiskType {
  POLITICAL = 'POLITICAL',
  ECONOMIC = 'ECONOMIC',
  MILITARY = 'MILITARY',
  RELIGIOUS = 'RELIGIOUS',
  SOCIAL = 'SOCIAL'
}

export interface Risk {
  id: string;
  type: RiskType;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  probability: number;
  impact: number;
  createdAt: Date;
  active: boolean;
}

export interface Equilibre {
  politique: Politique;
  economie: Economie;
  social: Social;
  militaire: Militaire;
  religion: Religion;
  stabilite: number | Stabilite;
  stability?: number;
  armée?: number;
  loyauté?: number;
  morale?: number;
  facteurJuridique?: number;
  historique?: any[];
  risques?: Record<string, Risk>;
  populares?: number;
  optimates?: number;
  moderates?: number;
  plebeiens?: number;
  patriciens?: number;
}

export interface HistoriqueEntry {
  id: string;
  date: string | Date;
  type: string;
  description: string;
  impact: 'positive' | 'negative' | 'neutral';
  domain: 'political' | 'economic' | 'social' | 'military' | 'religious';
  significance: number;
  tags?: string[];
}
