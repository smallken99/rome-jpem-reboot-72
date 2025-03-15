
export interface ProjetLoi {
  id: string;
  titre: string;
  auteur: string;
  date: string;
  statut: string;
  description?: string;
  contenu?: string;
  votes?: {
    pour: number;
    contre: number;
    abstention: number;
  };
}

export interface VoteLoi {
  id: string;
  titre: string;
  auteur: string;
  dateDebut: string;
  dateFin: string;
  description?: string;
  contenu?: string;
  pour: number;
  contre: number;
  abstention: number;
}

export interface HistoriqueLoi {
  id: string;
  titre: string;
  auteur: string;
  date: string;
  resultat: 'Adoptée' | 'Rejetée';
  votes: string;
  description?: string;
}
