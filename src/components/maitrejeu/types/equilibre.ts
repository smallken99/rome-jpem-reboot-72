export type RiskType = 'revolte' | 'guerre' | 'politique' | 'economique' | 'religieux' | 'military' | 'political' | 'economic' | 'social' | 'religious' | string;

export interface Risk {
  id: string;
  type: RiskType;
  name: string;
  description: string;
  severity: number;
  createdAt: string;
  active: boolean;
  impact: Record<string, any>;
}

export interface HistoriqueEntry {
  date: string | Date;
  event: string;
  values: Record<string, number>;
}

export interface PoliticalEvent {
  id: string;
  title: string;
  description: string;
  date: Date | { year: number; season: string };
  type: string;
  importance: "high" | "low" | "medium" | "critical" | string;
  impact?: Record<string, number>;
  event?: string;
}

export interface Equilibre {
  // Political equilibrium - both forms supported for compatibility
  politique: {
    populaires: number;
    optimates: number;
    moderates: number;
  };
  
  // Direct access properties (used in many components)
  populaires: number;
  populares: number; // alias
  optimates: number;
  moderates: number;
  
  // Economic equilibrium - support both object and number format
  economie: {
    stabilite: number;
    croissance: number;
    commerce: number;
    agriculture: number;
  };
  
  // Social equilibrium
  social: {
    plebeiens: number;
    patriciens: number;
    esclaves: number;
    cohesion: number;
    plébéiens?: number; // Alternative spelling
  };
  plébéiens: number; // Direct access property for compatibility
  patriciens: number; // Additional property for direct access
  
  // Military equilibrium
  militaire: {
    moral: number;
    effectifs: number;
    equipement: number;
    discipline: number;
  };
  
  // Religious equilibrium
  religion: {
    piete: number;
    traditions: number;
    superstition: number;
  };
  
  // Other stability factors
  stability: number;
  armée: number;
  loyauté: number;
  morale: number;
  facteurJuridique: number;
  
  // History and risks
  historique: HistoriqueEntry[];
  risques: Record<string, Risk>;
  
  // Aliased names for compatibility
  économie?: {
    stabilite: number;
    croissance: number;
    commerce: number;
    agriculture: number;
  };
  
  // Political object for compatibility
  political?: {
    populares: number;
    optimates: number;
    moderates: number;
  };
}
