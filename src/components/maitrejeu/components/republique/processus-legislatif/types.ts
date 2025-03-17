
export interface ProjetLoi {
  id: string;
  titre: string;
  auteur: string;
  date: string;
  statut: 'brouillon' | 'en révision' | 'prêt pour vote' | string;
  description: string;
  contenu: string[];
  tags?: string[];
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
  contenu: string[];  // Adding this missing property
  votes: {
    pour: number;
    contre: number;
    abstention: number;
  };
  statut: 'adopté' | 'rejeté' | string;
  date?: string;
  resultat?: 'Adoptée' | 'Rejetée';
}

export interface HistoriqueLoiTabProps {
  historique: HistoriqueLoi[];
  formatSeason?: (season: string) => string;
  isEditable?: boolean;
}

export interface LoisActivesTabProps {
  lois: any[];
  onViewLoi: (loi?: any) => void;
  onPromulguer: (loiId: string) => void;
  formatSeason?: (season: string) => string;
}

export interface LoisProposeesTabProps {
  lois: any[];
  onViewLoi: (loi?: any) => void;
  onVoterPour: (loiId: string) => void;
  onVoterContre: (loiId: string) => void;
  onVoterAbstention: (loiId: string) => void;
  formatSeason?: (season: string) => string;
}

export interface LoisRejeteesTabProps {
  lois: any[];
  onViewLoi: (loi?: any) => void;
  formatSeason?: (season: string) => string;
}
