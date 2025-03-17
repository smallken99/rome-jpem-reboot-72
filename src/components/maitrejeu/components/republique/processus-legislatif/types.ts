
// Types pour le processus législatif
export interface ProjetLoi {
  id: string;
  titre: string;
  auteur: string;
  date?: string;
  description: string;
  contenu: string[];
  categorieId?: string;
  categorie?: string;
  importance?: 'faible' | 'normale' | 'haute' | 'critique';
}

export interface VoteLoi {
  id: string;
  titre: string;
  auteur: string;
  dateDebut: string;
  dateFin: string;
  description: string;
  contenu: string[];
  pour: number;
  contre: number;
  abstention: number;
  categorieId?: string;
  categorie?: string;
}

export interface HistoriqueLoi {
  id: string;
  titre: string;
  auteur: string;
  dateProposition: string;
  dateAdoption: string;
  description: string;
  contenu: string[];
  votes: {
    pour: number;
    contre: number;
    abstention: number;
  };
  statut: 'adopté' | 'rejeté' | 'abrogé';
  resultat: string;
  date: string;
  categorieId?: string;
  categorie?: string;
}
