
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
  importance: string;
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
  economie_value?: number; // For components that use it as a number
  
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

// Create a utility to normalize equilibre objects with different property structures
export function normalizeEquilibre(data: Partial<Equilibre>): Equilibre {
  // Default values
  const defaultEquilibre: Equilibre = {
    politique: { populaires: 33, optimates: 33, moderates: 34 },
    populaires: 33,
    populares: 33, 
    optimates: 33,
    moderates: 34,
    economie: { stabilite: 50, croissance: 50, commerce: 50, agriculture: 50 },
    social: { plebeiens: 85, patriciens: 15, esclaves: 30, cohesion: 50 },
    plébéiens: 85,
    patriciens: 15,
    militaire: { moral: 50, effectifs: 50, equipement: 50, discipline: 50 },
    religion: { piete: 50, traditions: 50, superstition: 50 },
    stability: 50,
    armée: 50,
    loyauté: 50,
    morale: 50,
    facteurJuridique: 50,
    historique: [],
    risques: {}
  };
  
  // Create a new object with both data and default values
  const result = { ...defaultEquilibre, ...data };
  
  // Handle special cases for nested objects with potential different property names
  if (data.politique) {
    result.politique = { ...defaultEquilibre.politique, ...data.politique };
    // Sync between nested and direct properties
    result.populaires = result.politique.populaires;
    result.populares = result.politique.populaires;
    result.optimates = result.politique.optimates;
    result.moderates = result.politique.moderates;
  } else {
    // If politique object is not provided, build it from direct properties
    if (data.populaires) {
      result.politique.populaires = data.populaires;
      result.populares = data.populaires;
    } else if (data.populares) {
      result.politique.populaires = data.populares;
      result.populaires = data.populares;
    }
    
    if (data.optimates) result.politique.optimates = data.optimates;
    if (data.moderates) result.politique.moderates = data.moderates;
  }
  
  // Handle social data sync
  if (data.social) {
    result.social = { ...defaultEquilibre.social, ...data.social };
    // Check for alternate spelling and sync both ways
    if (data.social.plébéiens !== undefined) {
      result.social.plebeiens = data.social.plébéiens;
    } else if (data.social.plebeiens !== undefined) {
      result.social.plébéiens = data.social.plebeiens;
    }
    // Sync between nested and direct properties
    result.plébéiens = result.social.plebeiens;
    result.patriciens = result.social.patriciens;
  } else {
    // If social object is not provided, build it from direct properties
    if (data.plébéiens !== undefined) {
      result.social.plebeiens = data.plébéiens;
      result.social.plébéiens = data.plébéiens;
    }
    if (data.patriciens !== undefined) result.social.patriciens = data.patriciens;
  }
  
  // Handle economie data
  if (data.economie) {
    result.economie = { ...defaultEquilibre.economie, ...data.economie };
  } else if (data.économie) {
    result.economie = { ...defaultEquilibre.economie, ...data.économie };
    result.économie = result.economie;
  }
  
  return result;
}
