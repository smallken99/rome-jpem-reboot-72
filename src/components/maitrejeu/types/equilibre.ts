
// Types pour l'équilibre de la République

export interface Equilibre {
  facteurSenat: number;          // 0-100
  facteurPlebs: number;          // 0-100
  facteurPatriciens: number;     // 0-100
  facteurMilitaire: number;      // 0-100
  facteurReligieux: number;      // 0-100
  populaires: number;            // Pourcentage (0-100)
  optimates: number;             // Pourcentage (0-100)
  moderates: number;             // Pourcentage (0-100)
  
  // Propriétés additionnelles pour la compatibilité
  population?: number;
  armée?: number;
  économie?: number;
  morale?: number;
  loyauté?: number;
  patriciens?: number;
  plébéiens?: number;
  populares?: number;
  neutrales?: number;
  historique?: any[];
  
  notes?: string;                // Notes sur l'état actuel
}

// Type pour les événements politiques dans la timeline
export interface PoliticalEvent {
  id: string;
  title: string;
  description: string;
  date: Date | string;
  type: string;
  impact: number;
  faction?: string;
}
