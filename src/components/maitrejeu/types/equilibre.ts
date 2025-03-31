export interface Equilibre {
  // Political equilibrium
  politique: {
    populaires: number;
    optimates: number;
    moderates: number;
  };
  populaires: number;
  populares: number;
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
  
  // Other properties
  facteurJuridique?: number;
  historique?: any[];
  risques?: Record<string, number>;
}

export enum RiskType {
  REVOLTE = 'revolte',
  GUERRE = 'guerre',
  POLITIQUE = 'politique',
  ECONOMIQUE = 'economique',
  RELIGIEUX = 'religieux'
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
