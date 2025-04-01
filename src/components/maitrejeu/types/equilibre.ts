
export interface Politique {
  populaires: number;
  optimates: number;
  moderates: number;
}

export interface Social {
  patriciens: number;
  plebeiens: number;
  esclaves?: number;
  cohesion?: number;
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

export interface Equilibre {
  politique: Politique;
  social: Social;
  economie: Economie;
  religion: Religion;
  stabilite: Stabilite;
  risques?: Record<string, any>;
}

// Type for historical political events
export interface PoliticalEvent {
  id: string;
  date: {
    year: number;
    season: string;
  };
  title: string;
  description: string;
  impact: {
    type: string;
    value: number;
  }[];
  actors?: string[];
  consequences?: string[];
}

// Type for a risk that could materialize
export interface Risk {
  id: string;
  type: RiskType;
  name: string;
  probability: number;
  severity: number;
  description: string;
  triggers?: string[];
  mitigations?: string[];
}

export type RiskType = 'POLITICAL' | 'ECONOMIC' | 'SOCIAL' | 'RELIGIOUS' | 'MILITARY' | 'DIPLOMATIC';

// Type for history entries in the equilibre system
export interface HistoriqueEntry {
  id: string;
  date: {
    year: number;
    season: string;
  };
  type: 'EQUILIBRE_CHANGE' | 'EVENT' | 'DECISION' | 'CRISIS';
  description: string;
  changes?: {
    category: string;
    property: string;
    from: number;
    to: number;
  }[];
  actors?: string[];
}
