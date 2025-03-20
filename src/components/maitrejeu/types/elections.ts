
// Types pour les élections

export interface Election {
  id: string;
  magistrature: string;
  année: number;
  saison: string;
  statut: 'planifiée' | 'en cours' | 'terminée' | 'annulée';
  candidats?: string[];
  vainqueur?: string;
  
  // Propriétés manquantes et alias pour compatibilité
  year?: number; // Alias pour année
  season?: string; // Alias pour saison
  status?: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'; // Alias pour statut en anglais
  poste?: string; // Alias pour magistrature
  annee?: number; // Alternative à année (sans accent)
  results?: any; // Résultats détaillés de l'élection
}
