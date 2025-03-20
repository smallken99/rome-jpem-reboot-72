
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
  
  // Propriétés manquantes dans l'interface mais utilisées dans le code
  titre?: string;
  title?: string; // Alias pour titre
  year?: number; // Pour compatibilité
}
