
// Types for the equilibre (balance) system
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
  stability?: number;
  // For backward compatibility
  populaires?: number;
}

export interface Economie {
  stabilite: number;
  croissance: number;
  commerce: number;
  agriculture: number;
  prosperity?: number;
  production?: number;
  value?: number;
}

export interface Militaire {
  morale: number;
  effectifs: number;
  equipement: number;
  discipline: number;
  readiness?: number;
  force?: number;
  puissance?: number;
  loyaute?: number;
  // For backward compatibility
  moral?: number;
}

export interface Religion {
  piete: number;
  traditions: number;
  superstition: number;
  piety?: number;
}

export interface Social {
  plebeiens: number;
  patriciens: number;
  esclaves: number;
  cohesion: number;
  // For backward compatibility
  plébéiens?: number;
}

// Risk types
export enum RiskType {
  POLITICAL = 'POLITICAL',
  ECONOMIC = 'ECONOMIC',
  MILITARY = 'MILITARY',
  SOCIAL = 'SOCIAL',
  RELIGIOUS = 'RELIGIOUS',
  DIPLOMATIC = 'DIPLOMATIC'
}

export interface Risk {
  id: string;
  type: RiskType;
  probability: number;
  impact: number;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  createdAt?: Date;
  triggeredAt?: Date | null;
  resolvedAt?: Date | null;
  status: 'pending' | 'triggered' | 'resolved' | 'mitigated';
}

export interface PoliticalEvent {
  id: string;
  title: string;
  description: string;
  date: any; // Date or GameDate
  type: 'political' | 'economic' | 'military' | 'social' | 'religious';
  impact: number;
  faction?: string;
  createdBy?: string;
}

export interface HistoriqueEntry {
  id: string;
  date: any; // Date or GameDate
  text: string;
  type: string;
  importance: 'low' | 'medium' | 'high';
  visible?: boolean;
}

export interface Equilibre {
  politique: Politique;
  economie: Economie;
  militaire: Militaire;
  religion: Religion;
  social: Social;
  stabilite: Stabilite | number;
  historique?: HistoriqueEntry[];
  risques?: Record<string, Risk>;
  
  // Legacy fields for backward compatibility
  populaires?: number;
  populares?: number;
  optimates?: number;
  moderates?: number;
  stability?: number;
  armée?: number;
  loyauté?: number;
  morale?: number;
  facteurJuridique?: number;
}
