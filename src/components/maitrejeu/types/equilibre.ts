export interface Equilibre {
  // Political equilibrium
  politique: {
    populaires: number;
    optimates: number;
    moderates: number;
  };
  populaires: number;
  populaires: number;
  optimates: number;
  moderates: number;
  
  // Economic equilibrium
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
  };
  plébéiens?: number; // Alias for backward compatibility
  patriciens?: number; // Additional property for direct access
  
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
  stability?: number;
  armée?: number;
  loyauté?: number;
  morale?: number;
  facteurJuridique?: number;
  
  // History and risks
  historique?: HistoriqueEntry[];
  risques?: Record<string, Risk>;
}

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
  date: Date;
  impact: Record<string, number>;
  type: string;
  importance: "high" | "low" | "medium" | "critical" | string;
}
