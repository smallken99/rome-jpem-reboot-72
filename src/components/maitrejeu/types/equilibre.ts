
export interface Politique {
  populaires: number;
  optimates: number;
  moderates: number;
  // Provide compatibility with references using 'populares'
  populares?: number;
}

export interface Social {
  patriciens: number;
  plebeiens: number;
  esclaves?: number;
  cohesion?: number;
  // Provide compatibility for misspelled variations
  plébéiens?: number;
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
  armée: number;
  loyauté: number;
  morale: number;
}

export interface Equilibre {
  politique: Politique;
  social: Social;
  economie: Economie;
  religion: Religion;
  stabilite: Stabilite;
  militaire?: Militaire;
  risques?: Record<string, any>;
  
  // Compatibility properties to match the existing references
  populares?: number;
  optimates?: number;
  moderates?: number;
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
  createdAt?: Date;
  active?: boolean;
  impact?: any;
}

export type RiskType = 'POLITICAL' | 'ECONOMIC' | 'SOCIAL' | 'RELIGIOUS' | 'MILITARY' | 'DIPLOMATIC' | 
                        'politique' | 'economique' | 'militaire' | 'religieux' | 'social';

// Type for history entries in the equilibre system
export interface HistoriqueEntry {
  id: string;
  date: {
    year: number;
    season: string;
  };
  type: 'EQUILIBRE_CHANGE' | 'EVENT' | 'DECISION' | 'CRISIS';
  description: string;
  visible?: boolean;
  changes?: {
    category: string;
    property: string;
    from: number;
    to: number;
  }[];
  actors?: string[];
}
