
// Types pour les élections

export interface Election {
  id: string;
  magistrature: string;
  année: number;
  saison: string;
  statut: 'planifiée' | 'en cours' | 'terminée' | 'annulée';
  candidats?: string[];
  vainqueur?: string;
  
  // Propriétés manquantes dans l'interface mais utilisées dans le code
  year?: number; // Alias pour année
  season?: string; // Alias pour saison
  status?: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'; // Alias pour statut en anglais
  poste?: string; // Alias pour magistrature
}
