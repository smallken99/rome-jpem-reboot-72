
import { Traite, Nation, Alliance } from './types';
import { generateId } from '@/components/maitrejeu/types/common';

// Données fictives pour les traités
export const traitesMock: Traite[] = [
  {
    id: generateId(),
    titre: "Traité de Paix avec Carthage",
    type: "Paix",
    parties: ["Rome", "Carthage"],
    dateSignature: "548 AUC",
    duree: "25 ans",
    statut: "Expiré",
    termes: [
      "Carthage paiera 10,000 talents d'argent sur 50 ans",
      "Carthage cède toutes ses possessions en Sicile",
      "Les prisonniers romains seront rendus sans rançon"
    ],
    bénéfices: {
      économiques: 8,
      militaires: 5,
      politiques: 9
    }
  },
  {
    id: generateId(),
    titre: "Alliance défensive avec Athènes",
    type: "Défense",
    parties: ["Rome", "Athènes"],
    dateSignature: "623 AUC",
    duree: "10 ans",
    statut: "Actif",
    termes: [
      "Assistance militaire mutuelle en cas d'attaque",
      "Partage des informations diplomatiques",
      "Accès préférentiel aux ports"
    ]
  },
  {
    id: generateId(),
    titre: "Traité commercial avec l'Égypte",
    type: "Commerce",
    parties: ["Rome", "Égypte ptolémaïque"],
    dateSignature: "605 AUC",
    statut: "Actif",
    termes: [
      "Réduction des taxes sur le blé égyptien",
      "Protection des marchands romains en Égypte",
      "Accès aux ports égyptiens pour la flotte romaine"
    ],
    bénéfices: {
      économiques: 10,
      politiques: 7
    }
  },
  {
    id: generateId(),
    titre: "Accord de protection avec Massilia",
    type: "Protection",
    parties: ["Rome", "Massilia"],
    dateSignature: "542 AUC",
    statut: "Actif",
    termes: [
      "Rome garantit la sécurité de Massilia",
      "Massilia fournit des navires et des informations",
      "Massilia reste neutre dans les conflits romains"
    ]
  },
  {
    id: generateId(),
    titre: "Traité d'alliance avec la Ligue étolienne",
    type: "Alliance",
    parties: ["Rome", "Ligue étolienne"],
    dateSignature: "563 AUC",
    duree: "15 ans",
    statut: "En négociation",
    termes: [
      "Action militaire conjointe contre Philippe V de Macédoine",
      "Partage des territoires conquis",
      "Rome conserve le butin, la Ligue les terres"
    ]
  }
];

// Données fictives pour les nations
export const nationsMock: Nation[] = [
  {
    id: generateId(),
    nom: "Carthage",
    région: "Afrique du Nord",
    statut: "Ennemi",
    puissanceMilitaire: 8,
    richesse: 9,
    relationAvecRome: 2,
    dateDernierTraité: "548 AUC",
    capitale: "Carthage",
    gouvernement: "République oligarchique",
    notes: "Principale rivale de Rome en Méditerranée occidentale. Grande puissance maritime et commerciale."
  },
  {
    id: generateId(),
    nom: "Royaume de Macédoine",
    région: "Grèce",
    statut: "Ennemi",
    puissanceMilitaire: 7,
    richesse: 6,
    relationAvecRome: 3,
    dateDernierTraité: "557 AUC",
    capitale: "Pella",
    gouvernement: "Monarchie",
    notes: "Sous le règne de Philippe V. Cherche à étendre son influence en Grèce et dans l'Égée."
  },
  {
    id: generateId(),
    nom: "Égypte ptolémaïque",
    région: "Afrique / Asie",
    statut: "Allié",
    puissanceMilitaire: 6,
    richesse: 10,
    relationAvecRome: 8,
    dateDernierTraité: "605 AUC",
    capitale: "Alexandrie",
    gouvernement: "Monarchie hellénistique",
    notes: "Riche royaume dirigé par la dynastie ptolémaïque. Principal fournisseur de grain."
  },
  {
    id: generateId(),
    nom: "Royaume séleucide",
    région: "Asie",
    statut: "Neutre",
    puissanceMilitaire: 9,
    richesse: 8,
    relationAvecRome: 5,
    dateDernierTraité: "565 AUC",
    capitale: "Antioche",
    gouvernement: "Monarchie hellénistique",
    notes: "Vaste empire s'étendant de l'Anatolie à l'Inde. En conflit avec l'Égypte ptolémaïque."
  },
  {
    id: generateId(),
    nom: "Numides",
    région: "Afrique du Nord",
    statut: "Allié",
    puissanceMilitaire: 5,
    richesse: 4,
    relationAvecRome: 7,
    dateDernierTraité: "550 AUC",
    capitale: "Cirta",
    gouvernement: "Royaume tribal",
    notes: "Alliés importants contre Carthage. Excellente cavalerie légère."
  },
  {
    id: generateId(),
    nom: "Massilia",
    région: "Gaule",
    statut: "Allié",
    puissanceMilitaire: 3,
    richesse: 7,
    relationAvecRome: 9,
    dateDernierTraité: "542 AUC",
    capitale: "Massilia",
    gouvernement: "République",
    notes: "Colonie grecque et allié fidèle de Rome. Important centre commercial."
  },
  {
    id: generateId(),
    nom: "Ligue achéenne",
    région: "Grèce",
    statut: "Allié",
    puissanceMilitaire: 4,
    richesse: 5,
    relationAvecRome: 6,
    dateDernierTraité: "570 AUC",
    capitale: "Aegium",
    gouvernement: "Confédération",
    notes: "Alliance de cités-États grecques opposées à l'influence macédonienne."
  }
];

// Données fictives pour les alliances militaires
export const alliancesMock: Alliance[] = [
  {
    id: generateId(),
    nom: "Ligue latine",
    type: "Défensive",
    membres: ["Rome", "Tibur", "Praeneste", "Tusculum", "Lanuvium"],
    dateFormation: "496 AUC",
    commandement: "Rome",
    forces: {
      legions: 8,
      auxiliaires: 12000
    },
    statut: "Actif"
  },
  {
    id: generateId(),
    nom: "Alliance italique",
    type: "Offensive",
    membres: ["Rome", "Samnites", "Étrusques", "Ombriens"],
    dateFormation: "550 AUC",
    commandement: "Rome",
    forces: {
      legions: 12,
      auxiliaires: 20000
    },
    statut: "Actif"
  },
  {
    id: generateId(),
    nom: "Coalition anti-macédonienne",
    type: "Offensive",
    membres: ["Rome", "Ligue étolienne", "Pergame", "Rhodes"],
    dateFormation: "563 AUC",
    commandement: "Commandement partagé",
    forces: {
      legions: 6,
      auxiliaires: 15000
    },
    statut: "Actif"
  },
  {
    id: generateId(),
    nom: "Alliance maritime méditerranéenne",
    type: "Défensive",
    membres: ["Rome", "Massilia", "Syracuse", "Rhodes"],
    dateFormation: "537 AUC",
    commandement: "Rome",
    forces: {
      legions: 2,
      auxiliaires: 5000
    },
    statut: "Inactif"
  },
  {
    id: generateId(),
    nom: "Pacte de la Mer Adriatique",
    type: "Commercial/Défensif",
    membres: ["Rome", "Épire", "Corcyre", "Apollonie"],
    dateFormation: "525 AUC",
    commandement: "Conseil commun",
    forces: {
      legions: 3,
      auxiliaires: 8000
    },
    statut: "Actif"
  }
];
