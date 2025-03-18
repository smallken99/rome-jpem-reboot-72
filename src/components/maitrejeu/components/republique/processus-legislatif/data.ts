
export interface ProjetLoi {
  id: string;
  titre: string;
  auteur: string;
  date: string;
  statut: string;
  description?: string;
  contenu?: string | string[];
  votes?: {
    pour: number;
    contre: number;
    abstention: number;
  };
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
  description?: string;
  contenu?: string | string[];
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
  date: string;
  resultat: 'Adoptée' | 'Rejetée';
  votes: string | {
    pour: number;
    contre: number;
    abstention: number;
  };
  description?: string;
  contenu?: string | string[];
  categorieId?: string;
  categorie?: string;
}

// Projets de loi en cours
export const projetsData: ProjetLoi[] = [
  {
    id: "proj-1",
    titre: "Lex Agraria de coloniis",
    auteur: "Marcus Licinius Crassus",
    date: "5 Mai 705 AUC",
    statut: "En révision",
    description: "Loi sur la distribution des terres aux vétérans des légions ayant servi plus de 16 ans."
  },
  {
    id: "proj-2",
    titre: "Lex Gabinia de provinciis",
    auteur: "Aulus Gabinius",
    date: "12 Mai 705 AUC",
    statut: "Prêt pour vote",
    description: "Loi organisant l'administration des nouvelles provinces orientales."
  },
  {
    id: "proj-3",
    titre: "Lex de maiestate minuta",
    auteur: "Quintus Lutatius Catulus",
    date: "18 Mai 705 AUC",
    statut: "Brouillon",
    description: "Loi redéfinissant les crimes de lèse-majesté et leurs sanctions."
  }
];

// Votes de loi en cours
export const votesData: VoteLoi[] = [
  {
    id: "vote-1",
    titre: "Lex Porcia de provocatione",
    auteur: "Marcus Porcius Cato",
    dateDebut: "1 Mai 705 AUC",
    dateFin: "8 Mai 705 AUC",
    description: "Extension du droit d'appel aux citoyens romains dans les provinces.",
    pour: 87,
    contre: 32,
    abstention: 11
  },
  {
    id: "vote-2",
    titre: "Lex Manlia de tributis",
    auteur: "Titus Manlius Torquatus",
    dateDebut: "3 Mai 705 AUC",
    dateFin: "10 Mai 705 AUC",
    description: "Réforme du système de taxation des provinces asiatiques.",
    pour: 65,
    contre: 58,
    abstention: 7
  }
];

// Historique des lois votées
export const historiqueData: HistoriqueLoi[] = [
  {
    id: "hist-1",
    titre: "Lex Julia de repetundis",
    auteur: "Gaius Julius Caesar",
    date: "15 Avril 705 AUC",
    resultat: "Adoptée",
    votes: "142-35-13",
    description: "Réforme des procédures judiciaires concernant l'extorsion par les gouverneurs de province."
  },
  {
    id: "hist-2",
    titre: "Lex Claudia de sociis",
    auteur: "Appius Claudius Pulcher",
    date: "8 Avril 705 AUC",
    resultat: "Rejetée",
    votes: "45-125-20",
    description: "Proposition d'extension de la citoyenneté romaine aux alliés italiens ayant servi dans les légions pendant 10 ans."
  },
  {
    id: "hist-3",
    titre: "Lex Caecilia de vectigalibus",
    auteur: "Quintus Caecilius Metellus",
    date: "1 Avril 705 AUC",
    resultat: "Adoptée",
    votes: "156-24-10",
    description: "Révision des taxes douanières sur les importations de luxe d'Orient."
  }
];
