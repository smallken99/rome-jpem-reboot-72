
// Définition des types pour le module d'équilibre

export interface Politique {
  populares: number;
  optimates: number;
  moderates: number;
}

export interface Social {
  patriciens: number;
  plebeiens: number;
  esclaves: number;
  cohesion: number;
}

export interface Economie {
  stabilite: number;
  croissance: number;
  commerce: number;
  agriculture: number;
}

export interface Religion {
  piete: number;
  traditions: number;
  superstition: number;
}

export interface Stabilite {
  senat: number;
  tribuns: number;
  lois: number;
}

export interface Militaire {
  morale: number;
  loyaute: number;
  puissance: number;
  discipline: number;
  effectifs: number;
  equipement: number;
}

export type RiskType = 
  'POLITICAL' | 
  'ECONOMIC' | 
  'MILITARY' | 
  'RELIGIOUS' | 
  'SOCIAL' | 
  'DIPLOMATIC' | 
  'NATURAL' | 
  'INFRASTRUCTURE' |
  'CONSPIRACY' |
  'REVOLT' |
  'INVASION' |
  'PLAGUE' |
  'FAMINE' |
  'SCANDAL';

export interface Risk {
  id: string;
  name: string;
  type: RiskType;
  probability: number;
  impact: number;
  triggers: string[];
  mitigations: string[];
  active: boolean;
  description: string;
  createdAt: Date;
}

export interface Equilibre {
  politique: Politique;
  social: Social;
  economie: Economie;
  religion: Religion;
  stabilite: Stabilite;
  militaire: Militaire;
  risques?: Record<string, any>;
  // Pour compatibilité avec le code existant
  populares?: number;
  optimates?: number;
  moderates?: number;
}

// Types pour les événements politiques
export interface PoliticalEvent {
  id: string;
  title: string;
  description: string;
  date: number | Date | { year: number; season: string };
  type: 'scandal' | 'reform' | 'election' | 'rebellion' | 'war' | 'natural' | 'economic' | 'religious' | 'social';
  impact: {
    politique?: Partial<Politique>;
    social?: Partial<Social>;
    economie?: Partial<Economie>;
    religion?: Partial<Religion>;
    stabilite?: Partial<Stabilite>;
    militaire?: Partial<Militaire>;
  };
  resolved: boolean;
  resolution?: string;
  actors?: string[];
}

// Types pour les entrées d'historique d'équilibre
export interface HistoriqueEntry {
  id: string;
  date: Date | { year: number; season: string };
  description: string;
  changes: {
    politique?: Partial<Politique>;
    social?: Partial<Social>;
    economie?: Partial<Economie>;
    religion?: Partial<Religion>;
    stabilite?: Partial<Stabilite>;
    militaire?: Partial<Militaire>;
  };
  cause: string;
  type: 'political' | 'economic' | 'military' | 'religious' | 'social' | 'other';
}
