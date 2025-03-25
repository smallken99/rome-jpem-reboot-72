
// Types pour l'équilibre de la République

export interface Equilibre {
  // Propriétés pour l'équilibre politique
  populaires: number;
  optimates: number;
  moderates: number;
  
  // Alias pour compatibilité
  populares?: number;
  
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
  neutrales?: number;
  
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
  description: string;
  type: string;
  importance: 'mineure' | 'majeure' | 'critique' | 'normale';
  name?: string; // Pour compatibilité
  date?: Date | { year: number; season: string };
  effects?: Record<string, any>;
  tags?: string[];
  impact?: Record<string, number>; // Pour compatibilité
}
