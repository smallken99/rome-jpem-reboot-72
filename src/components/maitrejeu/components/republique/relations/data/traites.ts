
import { Traite } from '../types';
import { generateId } from '@/components/maitrejeu/types/common';

// Données fictives pour les traités
export const traitesMock: Traite[] = [
  {
    id: generateId(),
    title: "Traité Romano-Carthaginois",
    parties: ["Rome", "Carthage"],
    type: "peace",
    dateSignature: "513 AUC",
    dateExpiration: "533 AUC",
    status: "expired",
    clauses: [
      "Non-ingérence dans les colonies respectives",
      "Limitation de la navigation carthaginoise en Italie",
      "Interdiction aux navires romains de commercer avec les colonies puniques"
    ],
    description: "Premier traité signé entre Rome et Carthage, définissant leurs zones d'influence respectives en Méditerranée occidentale.",
    benefits: ["Sécurisation des routes commerciales", "Reconnaissance diplomatique"],
    obligations: ["Respect des zones d'influence", "Assistance mutuelle contre les pirates"]
  },
  {
    id: generateId(),
    title: "Alliance avec la Ligue Étolienne",
    parties: ["Rome", "Ligue Étolienne"],
    type: "military",
    dateSignature: "565 AUC",
    dateExpiration: "575 AUC",
    status: "active",
    clauses: [
      "Assistance militaire mutuelle contre Philippe V de Macédoine",
      "La Ligue conserve les territoires conquis",
      "Rome conserve le butin mobilier"
    ],
    description: "Alliance conclue pour contenir l'expansion macédonienne en Grèce pendant la première guerre macédonienne.",
    benefits: ["Accès à la Grèce continentale", "Affaiblissement de la Macédoine"],
    obligations: ["Engagement de troupes", "Soutien logistique"]
  },
  {
    id: generateId(),
    title: "Accord Commercial de Naples",
    parties: ["Rome", "Naples"],
    type: "trade",
    dateSignature: "520 AUC",
    status: "active",
    clauses: [
      "Exemption de taxes pour les marchands romains à Naples",
      "Protection des navires napolitains par la flotte romaine",
      "Fourniture annuelle de grain à prix préférentiel"
    ],
    description: "Traité commercial garantissant des avantages réciproques et renforçant l'influence romaine en Campanie.",
    benefits: ["Accès préférentiel au port", "Approvisionnement en grain"],
    obligations: ["Protection navale", "Réduction des tarifs douaniers"]
  },
  {
    id: generateId(),
    title: "Protectorat de Sagonte",
    parties: ["Rome", "Sagonte"],
    type: "tribute",
    dateSignature: "535 AUC",
    status: "violated",
    clauses: [
      "Protection militaire romaine",
      "Liberté intérieure de Sagonte",
      "Tribut annuel à Rome",
      "Soutien naval aux opérations romaines"
    ],
    description: "Accord établissant un protectorat romain sur Sagonte, dont la violation par Hannibal déclencha la Deuxième Guerre Punique.",
    benefits: ["Position stratégique en Ibérie", "Revenus du tribut"],
    obligations: ["Défense de la cité", "Intervention militaire si nécessaire"]
  },
  {
    id: generateId(),
    title: "Foedus avec les Herniques",
    parties: ["Rome", "Confédération Hernique"],
    type: "military",
    dateSignature: "486 AUC",
    status: "active",
    clauses: [
      "Défense mutuelle contre les Volsques et les Èques",
      "Partage du butin de guerre",
      "Consultation obligatoire avant toute campagne militaire"
    ],
    description: "Alliance traditionnelle avec les Herniques, peuple italique, pour la défense commune du Latium contre les menaces extérieures.",
    benefits: ["Sécurisation de la frontière orientale", "Troupes auxiliaires"],
    obligations: ["Assistance militaire", "Partage des informations stratégiques"]
  }
];
