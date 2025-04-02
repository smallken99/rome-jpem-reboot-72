
export interface Politique {
  populares: number;
  optimates: number;
  moderates: number;
  stabilite?: number;
  stability?: number;
  // Added properties for compatibility with existing code
  populaires?: number;
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
  // Added for compatibility
  plébéiens?: number;
}

export interface Militaire {
  morale: number;
  effectifs: number;
  equipement: number;
  discipline: number;
  readiness?: number;
  force?: number;
  moral?: number; // For compatibility
  // Added for compatibility with existing code
  loyaute?: number;
  puissance?: number;
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
  // Added for compatibility with existing code
  senat?: number;
  tribuns?: number;
  lois?: number;
}

export type RiskType = 
  | 'POLITICAL'
  | 'ECONOMIC'
  | 'MILITARY'
  | 'SOCIAL'
  | 'RELIGIOUS'
  | 'EXTERNAL'
  // Add compatibility types
  | 'politique'
  | 'economique'
  | 'militaire'
  | 'religieux'
  | 'social';

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
  createdAt?: Date | string;
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
  populaires?: number;
}

// Add the missing HistoriqueEntry interface
export interface HistoriqueEntry {
  id: string;
  date: Date | string;
  type: string;
  description: string;
  changes?: any;
  cause?: string;
  visible?: boolean;
}

// Add the missing PoliticalEvent interface
export interface PoliticalEvent {
  id: string;
  date: Date | string;
  title: string;
  description: string;
  impact: {
    politique?: Partial<Politique>;
    economie?: Partial<Economie>;
    social?: Partial<Social>;
    militaire?: Partial<Militaire>;
    religion?: Partial<Religion>;
  };
  severity: 'minor' | 'moderate' | 'major' | 'critical';
}

// Define ImportanceType for events
export type ImportanceType = 
  | 'minor'
  | 'moderate'
  | 'major'
  | 'critical'
  | 'normale'
  | 'faible'
  | 'moyenne'
  | 'haute';

// Add RecurringInterval for economy management
export type RecurringInterval = 
  | 'monthly'
  | 'quarterly' 
  | 'biannually' 
  | 'annually' 
  | 'special';
