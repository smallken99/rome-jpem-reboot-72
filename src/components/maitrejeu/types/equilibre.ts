
export interface Equilibre {
  // Facteurs politiques
  populaires: number;
  populares: number; // Alias pour compatibilité
  optimates: number;
  moderates: number;
  
  // Facteurs économiques
  économie: number; 
  economicStability: number; // Alias pour compatibilité
  
  // Facteurs sociaux
  armée: number;
  facteurMilitaire: number; // Alias pour compatibilité
  morale: number;
  facteurPlebs: number;
  plébéiens: number; // Alias pour compatibilité
  facteurPatriciens: number;
  patriciens: number; // Alias pour compatibilité
  
  // Facteurs de stabilité
  stabilité: number;
  mécontentement: number;
  corruption: number;
  influence_extérieure: number;
  
  // Ajout des propriétés manquantes
  facteurSenat: number;
  facteurReligieux: number;
  notes?: string;
  population?: number;
  criminalityIndex?: number;
  indiceCrime?: number;
  foodSupply?: number;
  publicOrder?: number;
  unrestThreshold?: number;
  rebellionThreshold?: number;
  historique?: any[];
  loyauté?: number;
  neutrales?: number;
}

export interface PoliticalEvent {
  id: string;
  title: string;
  description: string;
  year: number;
  date?: {
    year: number;
    season: string;
  };
  importance?: 'mineure' | 'normale' | 'majeure' | 'critique';
  effects: {
    populaires?: number;
    optimates?: number;
    moderates?: number;
    économie?: number;
    armée?: number;
    morale?: number;
    plébéiens?: number;
    patriciens?: number;
    stabilité?: number;
    mécontentement?: number;
    corruption?: number;
    influence_extérieure?: number;
  };
  resolved: boolean;
  type?: string;
  faction?: string;
}

// Types d'alias pour assurer la compatibilité entre les interfaces
export interface RepublicEquilibre {
  populares: number;
  populaires: number;
  optimates: number;
  moderates: number;
  économie: number;
  economicStability: number;
  armée: number;
  facteurMilitaire: number;
  morale: number;
  facteurPlebs: number;
  plébéiens: number;
  facteurPatriciens: number;
  patriciens: number;
  stabilité: number;
  mécontentement: number;
  corruption: number;
  influence_extérieure: number;
  // Ajout des propriétés manquantes
  facteurSenat: number;
  facteurReligieux: number;
  notes?: string;
}
