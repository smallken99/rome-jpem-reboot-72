
import { Traite } from '../types';
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
