
export interface Equilibre {
  // Base political factions
  populares: number;
  optimates: number;
  moderates: number;
  
  // Social classes
  patricians: number;
  plebeians: number;
  
  // Economic factors  
  economy: number;
  stability: number;
  militaryStrength: number;
  publicOrder: number;
  corruption: number;
  inflation: number;
  foodSupply: number;
  unrestThreshold: number;
  indiceCrime: number;
  
  // Additional properties (French variants)
  économie?: number;
  armée?: number;
  loyauté?: number;
  morale?: number;
  patriciens?: number;
  plébéiens?: number;
  populaires?: number;
  
  // Special factors
  facteurSenat?: number;
  facteurPatriciens?: number;
  facteurPlebs?: number;
  facteurMilitaire?: number;
  economicStability?: number;
}

export interface PoliticalEvent {
  id: string;
  title: string;
  description: string;
  date: string | { year: number; season: string };
  type: string;
  impact: Record<string, number>;
  severity: 'low' | 'medium' | 'high' | 'critical';
}
