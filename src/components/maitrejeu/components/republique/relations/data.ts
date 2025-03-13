
import { Nation, Traite, Alliance } from './types';

// Nations mock data
export const nationsMock: Nation[] = [
  {
    id: "1",
    nom: "Carthage",
    région: "Afrique du Nord",
    statut: "Ennemi",
    puissanceMilitaire: 85,
    richesse: 80,
    relationAvecRome: 10,
    dateDernierTraité: "AUC 608",
    capitale: "Carthage",
    gouvernement: "République marchande",
    notes: "Rival historique de Rome, puissante flotte marchande et militaire"
  },
  {
    id: "2",
    nom: "Grèce",
    région: "Méditerranée orientale",
    statut: "Neutre",
    puissanceMilitaire: 60,
    richesse: 75,
    relationAvecRome: 45,
    dateDernierTraité: "AUC 587",
    capitale: "Athènes",
    gouvernement: "Diverses cités-États",
    notes: "Centre culturel important, alliances fluctuantes"
  },
  {
    id: "3",
    nom: "Égypte Ptolémaïque",
    région: "Afrique du Nord-Est",
    statut: "Allié",
    puissanceMilitaire: 65,
    richesse: 90,
    relationAvecRome: 70,
    dateDernierTraité: "AUC 623",
    capitale: "Alexandrie",
    gouvernement: "Monarchie",
    notes: "Fournisseur de grain vital pour Rome"
  },
  {
    id: "4",
    nom: "Numidie",
    région: "Afrique du Nord",
    statut: "Soumis",
    puissanceMilitaire: 45,
    richesse: 40,
    relationAvecRome: 60,
    dateDernierTraité: "AUC 605",
    capitale: "Cirta",
    gouvernement: "Royaume tribal",
    notes: "Cavalerie légendaire, allié contre Carthage"
  },
  {
    id: "5",
    nom: "Parthie",
    région: "Asie",
    statut: "Allié",
    puissanceMilitaire: 75,
    richesse: 70,
    relationAvecRome: 50,
    dateDernierTraité: "AUC 615",
    capitale: "Ctésiphon",
    gouvernement: "Empire dynastique",
    notes: "Cavalerie d'élite, contrôle les routes commerciales orientales"
  }
];

// Traités mock data
export const traitesMock: Traite[] = [
  {
    id: "1",
    titre: "Traité de paix romain-carthaginois",
    type: "Paix",
    parties: ["Rome", "Carthage"],
    dateSignature: "AUC 608",
    duree: "25 ans",
    statut: "Actif",
    termes: [
      "Carthage doit payer un tribut annuel de 10,000 talents",
      "Carthage doit diminuer sa flotte à 10 navires de guerre",
      "Carthage ne peut pas déclarer la guerre sans l'approbation de Rome"
    ],
    bénéfices: {
      économiques: 8,
      militaires: 6,
      politiques: 9
    }
  },
  {
    id: "2",
    titre: "Alliance commerciale avec l'Égypte",
    type: "Commercial",
    parties: ["Rome", "Égypte Ptolémaïque"],
    dateSignature: "AUC 623",
    duree: "10 ans",
    statut: "Actif",
    termes: [
      "Tarifs préférentiels pour l'importation de grain égyptien",
      "Protection des marchands romains en Égypte",
      "Accès aux ports égyptiens pour les navires romains"
    ],
    bénéfices: {
      économiques: 9,
      politiques: 7,
      militaires: 3
    }
  },
  {
    id: "3",
    titre: "Traité d'amitié avec la Grèce",
    type: "Diplomatique",
    parties: ["Rome", "Athènes", "Sparte", "Corinthe"],
    dateSignature: "AUC 587",
    duree: "Indéterminée",
    statut: "Actif",
    termes: [
      "Non-agression mutuelle",
      "Échanges culturels et éducatifs",
      "Résolution pacifique des conflits"
    ],
    bénéfices: {
      politiques: 8,
      économiques: 5,
      militaires: 2
    }
  },
  {
    id: "4",
    titre: "Traité de vassalité numide",
    type: "Vassalité",
    parties: ["Rome", "Numidie"],
    dateSignature: "AUC 605",
    statut: "Actif",
    termes: [
      "La Numidie fournit des troupes auxiliaires à Rome",
      "La Numidie paie un tribut annuel",
      "Rome garantit la protection de la Numidie"
    ],
    bénéfices: {
      militaires: 7,
      politiques: 6,
      économiques: 4
    }
  },
  {
    id: "5",
    titre: "Traité commercial avec la Parthie",
    type: "Commercial",
    parties: ["Rome", "Empire Parthe"],
    dateSignature: "AUC 615",
    duree: "15 ans",
    statut: "En négociation",
    termes: [
      "Sécurisation des routes commerciales",
      "Tarifs réduits sur les produits de luxe",
      "Échange d'ambassadeurs permanents"
    ]
  }
];

// Alliances mock data
export const alliancesMock: Alliance[] = [
  {
    id: "1",
    nom: "Ligue latine",
    type: "Défensive",
    membres: ["Rome", "Villes latines", "Colonies romaines"],
    dateFormation: "AUC 493",
    dateCreation: "AUC 493",
    objectif: "Défense commune contre les Èques et les Volsques",
    puissanceCombiné: 75,
    traitésAssociés: ["Foedus Cassianum"],
    commandement: "Rome",
    forces: {
      légions: 4,
      auxiliaires: 10000
    },
    statut: "Actif"
  },
  {
    id: "2",
    nom: "Alliance hellénique",
    type: "Culturelle et militaire",
    membres: ["Rome", "Athènes", "Sparte", "Rhodes"],
    dateFormation: "AUC 587",
    dateCreation: "AUC 587",
    objectif: "Protection des intérêts grecs et romains en Méditerranée orientale",
    puissanceCombiné: 65,
    traitésAssociés: ["Traité d'amitié avec la Grèce"],
    commandement: "Conseil mixte",
    forces: {
      légions: 2,
      auxiliaires: 5000
    },
    statut: "Actif"
  },
  {
    id: "3",
    nom: "Coalition anti-carthaginoise",
    type: "Militaire",
    membres: ["Rome", "Numidie", "Cités grecques de Sicile"],
    dateFormation: "AUC 605",
    dateCreation: "AUC 605",
    objectif: "Opposition à l'expansion carthaginoise",
    puissanceCombiné: 90,
    traitésAssociés: ["Traité de paix romain-carthaginois", "Traité de vassalité numide"],
    commandement: "Rome",
    forces: {
      légions: 6,
      auxiliaires: 15000
    },
    statut: "Actif"
  }
];
