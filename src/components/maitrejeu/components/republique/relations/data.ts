
// Export all the types that are used in other components
export interface Nation {
  id: string;
  nom: string;
  région: string;
  statut: "Allié" | "Neutre" | "Ennemi" | "Soumis";
  puissanceMilitaire: number;
  richesse: number;
  relationAvecRome: number;
  dateDernierTraité?: string;
}

export interface Traite {
  id: string;
  titre: string;
  parties: string[];
  type: string;
  dateSignature: string;
  duree: string;
  clauses: string[];
  statut: "Actif" | "Expiré" | "Rompu" | "En négociation";
}

export interface Alliance {
  id: string;
  nom: string;
  membres: string[];
  dateFormation: string;
  objectif: string;
  puissanceCombiné: number;
  traitésAssociés: string[];
}

// Mock data for nations
export const nationsMock: Nation[] = [
  {
    id: "1",
    nom: "Carthage",
    région: "Afrique du Nord",
    statut: "Ennemi",
    puissanceMilitaire: 85,
    richesse: 90,
    relationAvecRome: 15,
    dateDernierTraité: "218 av. J.-C."
  },
  {
    id: "2",
    nom: "Macédoine",
    région: "Grèce",
    statut: "Neutre",
    puissanceMilitaire: 70,
    richesse: 75,
    relationAvecRome: 45,
    dateDernierTraité: "220 av. J.-C."
  },
  {
    id: "3",
    nom: "Numidie",
    région: "Afrique du Nord",
    statut: "Allié",
    puissanceMilitaire: 60,
    richesse: 50,
    relationAvecRome: 75,
    dateDernierTraité: "212 av. J.-C."
  },
  {
    id: "4",
    nom: "Gaule Cisalpine",
    région: "Europe",
    statut: "Soumis",
    puissanceMilitaire: 45,
    richesse: 40,
    relationAvecRome: 30,
    dateDernierTraité: "222 av. J.-C."
  },
  {
    id: "5",
    nom: "Royaume de Syracuse",
    région: "Sicile",
    statut: "Allié",
    puissanceMilitaire: 30,
    richesse: 65,
    relationAvecRome: 80,
    dateDernierTraité: "215 av. J.-C."
  }
];

// Mock data for treaties
export const traitesMock: Traite[] = [
  {
    id: "1",
    titre: "Traité de Paix avec Carthage",
    parties: ["Rome", "Carthage"],
    type: "Paix",
    dateSignature: "241 av. J.-C.",
    duree: "20 ans",
    clauses: [
      "Carthage doit évacuer la Sicile",
      "Indemnité de guerre de 3 200 talents à payer sur 10 ans",
      "Libération des prisonniers romains sans rançon"
    ],
    statut: "Rompu"
  },
  {
    id: "2",
    titre: "Alliance défensive avec Syracuse",
    parties: ["Rome", "Syracuse"],
    type: "Alliance",
    dateSignature: "215 av. J.-C.",
    duree: "25 ans",
    clauses: [
      "Assistance militaire mutuelle en cas d'agression",
      "Droits de commerce préférentiels",
      "Fourniture annuelle de blé à Rome"
    ],
    statut: "Actif"
  },
  {
    id: "3",
    titre: "Traité commercial avec la Macédoine",
    parties: ["Rome", "Macédoine"],
    type: "Commerce",
    dateSignature: "220 av. J.-C.",
    duree: "15 ans",
    clauses: [
      "Réduction des droits de douane pour les marchands romains",
      "Accès aux ports macédoniens",
      "Protection des navires marchands"
    ],
    statut: "Actif"
  }
];

// Mock data for military alliances
export const alliancesMock: Alliance[] = [
  {
    id: "1",
    nom: "Ligue Latine",
    membres: ["Rome", "Tibur", "Préneste", "Tusculum"],
    dateFormation: "493 av. J.-C.",
    objectif: "Défense contre les Volsques et les Èques",
    puissanceCombiné: 85,
    traitésAssociés: ["Foedus Cassianum"]
  },
  {
    id: "2",
    nom: "Alliance Italiote",
    membres: ["Rome", "Capoue", "Cumes", "Naples"],
    dateFormation: "338 av. J.-C.",
    objectif: "Organisation militaire de l'Italie centrale",
    puissanceCombiné: 75,
    traitésAssociés: ["Traité de Capoue"]
  },
  {
    id: "3",
    nom: "Coalition Anti-Carthaginoise",
    membres: ["Rome", "Syracuse", "Massilia", "Numidie"],
    dateFormation: "218 av. J.-C.",
    objectif: "Opposition à l'expansion carthaginoise",
    puissanceCombiné: 90,
    traitésAssociés: ["Alliance défensive avec Syracuse", "Pacte de Massilia"]
  }
];
