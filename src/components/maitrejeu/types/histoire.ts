
// Types pour l'histoire

export interface HistoireEntry {
  id: string;
  date: {
    year: number;
    season: string;
  };
  contenu: string;
  type: string;
  importance: 'mineure' | 'majeure' | 'critique' | 'normale';
  sources?: string[];
  auteur?: string;
  tags?: string[];
  
  // Propriétés additionnelles nécessaires
  titre?: string;
  title?: string; // Alias pour titre
  year?: number; // Pour compatibilité
  description?: string; // Alias pour contenu
  catégorie?: string; // Alias pour type
  personnagesImpliqués?: string[]; // Personnages impliqués dans l'événement
  visible?: boolean; // Visibilité de l'entrée d'histoire
}
