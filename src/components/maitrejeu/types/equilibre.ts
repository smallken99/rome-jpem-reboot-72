
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
  
  // Autres propriétés pour compatibilité
  population: number;            
  armée: number;                 
  économie: number;              
  morale: number;                
  loyauté: number;               
  patriciens: number;            
  plébéiens: number;             
  populares: number;             // Alias pour populaires
  neutrales: number;             
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
