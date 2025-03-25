
// Types pour l'équilibre de la République

export interface Equilibre {
  // Propriétés pour l'équilibre politique
  populaires: number;
  populares?: number; // Alias pour compatibilité
  optimates: number;
  moderates: number;
  neutrales?: number;
  
  // Facteurs d'équilibre
  facteurSenat?: number;
  facteurPlebs?: number;
  facteurPatriciens?: number;
  facteurMilitaire?: number;
  facteurReligieux?: number;
  
  // Statut de la population
  population: number;
  criminalityIndex?: number;
  indiceCrime?: number;
  economicStability?: number;
  foodSupply?: number;
  publicOrder?: number;
  
  // Seuils de risque
  unrestThreshold?: number;
  rebellionThreshold?: number;
  
  // Historique des changements
  historique?: any[];
  
  // Propriétés supplémentaires
  armée?: number;
  économie?: number;
  morale?: number;
  loyauté?: number;
  patriciens?: number;
  plébéiens?: number;
  
  // Nouveaux paramètres requis
  stabilité?: number;
  mécontentement?: number;
  corruption?: number;
  influence_extérieure?: number;
  
  // Notes
  notes?: string;
}

export interface PoliticalEvent {
  id: string;
  title: string;
  name?: string; // Pour compatibilité
  description: string;
  type: string;
  importance: 'mineure' | 'majeure' | 'critique' | 'normale';
  date?: Date | { year: number; season: string };
  effects?: Record<string, any>;
  tags?: string[];
  impact?: Record<string, number>; // Pour compatibilité
  faction?: string; // Pour compatibilité
}
