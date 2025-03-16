
export interface ProjetLoi {
  id: string;
  titre: string;
  auteur: string;
  date: string;
  statut: 'brouillon' | 'en révision' | 'prêt pour vote' | string;
  description: string;
  contenu: string[];
  tags?: string[];
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
  statut: 'adopté' | 'rejeté' | string;
}
