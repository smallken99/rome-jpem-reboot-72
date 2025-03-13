
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
  notes?: string;                // Notes sur l'état actuel
}
