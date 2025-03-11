
import { Nation, Alliance, Traite } from './types';

// Export all the types that are used in other components
export type { Nation, Alliance, Traite };

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
    dateDernierTraité: "218 av. J.-C.",
    capitale: "Carthage",
    gouvernement: "République oligarchique",
    notes: "Principal rival de Rome en Méditerranée occidentale"
  },
  {
    id: "2",
    nom: "Macédoine",
    région: "Grèce",
    statut: "Neutre",
    puissanceMilitaire: 70,
    richesse: 75,
    relationAvecRome: 45,
    dateDernierTraité: "220 av. J.-C.",
    capitale: "Pella",
    gouvernement: "Monarchie",
    notes: "Royaume hellénistique puissant"
  },
  {
    id: "3",
    nom: "Numidie",
    région: "Afrique du Nord",
    statut: "Allié",
    puissanceMilitaire: 60,
    richesse: 50,
    relationAvecRome: 75,
    dateDernierTraité: "212 av. J.-C.",
    capitale: "Cirta",
    gouvernement: "Monarchie",
    notes: "Allié important contre Carthage"
  },
  {
    id: "4",
    nom: "Gaule Cisalpine",
    région: "Europe",
    statut: "Soumis",
    puissanceMilitaire: 45,
    richesse: 40,
    relationAvecRome: 30,
    dateDernierTraité: "222 av. J.-C.",
    capitale: "Mediolanum",
    gouvernement: "Tribus confédérées",
    notes: "Région stratégique pour l'expansion romaine vers le nord"
  },
  {
    id: "5",
    nom: "Royaume de Syracuse",
    région: "Sicile",
    statut: "Allié",
    puissanceMilitaire: 30,
    richesse: 65,
    relationAvecRome: 80,
    dateDernierTraité: "215 av. J.-C.",
    capitale: "Syracuse",
    gouvernement: "Tyrannie",
    notes: "Centre culturel et commercial important en Méditerranée"
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
    type: "Défensive",
    dateFormation: "493 av. J.-C.",
    objectif: "Défense contre les Volsques et les Èques",
    puissanceCombiné: 85,
    traitésAssociés: ["Foedus Cassianum"],
    dateCreation: "493 av. J.-C.",
    commandement: "Rome",
    forces: {
      legions: 4,
      auxiliaires: 8000,
      navires: 0
    },
    statut: "Actif"
  },
  {
    id: "2",
    nom: "Alliance Italiote",
    membres: ["Rome", "Capoue", "Cumes", "Naples"],
    type: "Militaire",
    dateFormation: "338 av. J.-C.",
    objectif: "Organisation militaire de l'Italie centrale",
    puissanceCombiné: 75,
    traitésAssociés: ["Traité de Capoue"],
    dateCreation: "338 av. J.-C.",
    commandement: "Rome",
    forces: {
      legions: 3,
      auxiliaires: 6000,
      navires: 12
    },
    statut: "Actif"
  },
  {
    id: "3",
    nom: "Coalition Anti-Carthaginoise",
    membres: ["Rome", "Syracuse", "Massilia", "Numidie"],
    type: "Offensive",
    dateFormation: "218 av. J.-C.",
    objectif: "Opposition à l'expansion carthaginoise",
    puissanceCombiné: 90,
    traitésAssociés: ["Alliance défensive avec Syracuse", "Pacte de Massilia"],
    dateCreation: "218 av. J.-C.",
    commandement: "Rome",
    forces: {
      legions: 8,
      auxiliaires: 15000,
      navires: 120
    },
    statut: "Actif"
  }
];
