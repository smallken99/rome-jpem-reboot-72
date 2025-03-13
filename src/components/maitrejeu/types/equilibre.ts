
// Types pour l'équilibre de la République

export interface Equilibre {
  // Facteurs principaux
  facteurSenat: number;          // 0-100
  facteurPlebs: number;          // 0-100
  facteurPatriciens: number;     // 0-100
  facteurMilitaire: number;      // 0-100
  facteurReligieux: number;      // 0-100
  
  // Factions politiques
  populaires: number;            // Pourcentage (0-100)
  optimates: number;             // Pourcentage (0-100)
  moderates: number;             // Pourcentage (0-100)
  
  // Autres propriétés
  population: number;            // Compatibilité
  armée: number;                 // Compatibilité
  économie: number;              // Compatibilité
  morale: number;                // Compatibilité
  loyauté: number;               // Compatibilité
  patriciens: number;            // Compatibilité
  plébéiens: number;             // Compatibilité
  populares: number;             // Alias pour populaires (compatibilité)
  neutrales: number;             // Compatibilité
  historique?: any[];            // Historique des changements
  
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
  importance?: 'mineure' | 'normale' | 'majeure';
  faction?: string;
  year?: number;        // Pour compatibilité avec certains composants
  season?: string;      // Pour compatibilité avec certains composants
}

