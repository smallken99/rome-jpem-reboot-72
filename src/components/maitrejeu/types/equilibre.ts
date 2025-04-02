
export interface Politique {
  populares: number;
  optimates: number;
  moderates: number;
  stabilite?: number;
  stability?: number;
}

export interface Economie {
  stabilite: number;
  croissance: number;
  commerce: number;
  agriculture: number;
  prosperity?: number;
  value?: number;
  production?: number;
}

export interface Social {
  plebeiens: number;
  patriciens: number;
  esclaves: number;
  cohesion: number;
}

export interface Militaire {
  morale: number;
  effectifs: number;
  equipement: number;
  discipline: number;
  readiness?: number;
  force?: number;
  moral?: number; // For compatibility
}

export interface Religion {
  piete: number;
  traditions: number;
  superstition: number;
  piety?: number; // For compatibility
}

export interface Stabilite {
  value: number;
  trend: 'up' | 'down' | 'stable';
  index?: number;
  crisisRisk?: number;
}

export type RiskType = 
  | 'POLITICAL'
  | 'ECONOMIC'
  | 'MILITARY'
  | 'SOCIAL'
  | 'RELIGIOUS'
  | 'EXTERNAL';

export interface Risk {
  id: string;
  type: RiskType;
  name: string;
  description: string;
  probability: number;
  impact: number;
  active: boolean;
  triggeredAt?: Date;
  resolvedAt?: Date;
  severity?: number;
}

export interface Equilibre {
  politique: Politique;
  economie: Economie;
  social: Social;
  militaire: Militaire;
  religion: Religion;
  stabilite: Stabilite | number;
  
  // For compatibility with existing code
  populares?: number;
  optimates?: number;
  moderates?: number;
  patriciens?: number;
  plébéiens?: number;
  plebeiens?: number;
  stability?: number;
  armée?: number;
  loyauté?: number;
  morale?: number;
  facteurJuridique?: number;
  historique?: any[];
  risques?: Record<string, Risk>;
  population?: number;
  
  // Additional properties found in equilibre adapter
  populaires?: number;
}
