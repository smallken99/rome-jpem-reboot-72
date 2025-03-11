
export interface ProjetLoi {
  id: string;
  titre: string;
  auteur: string;
  date: string;
  statut: string;
}

export interface VoteLoi {
  id: string;
  titre: string;
  auteur: string;
  dateDebut: string;
  dateFin: string;
  pour: number;
  contre: number;
  abstention: number;
}

export interface HistoriqueLoi {
  id: string;
  titre: string;
  auteur: string;
  date: string;
  resultat: string;
  votes: string;
}
