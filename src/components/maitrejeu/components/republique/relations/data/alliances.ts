
import { Alliance } from '../types';
import { generateId } from '@/components/maitrejeu/types/common';

// Données fictives pour les alliances militaires
export const alliancesMock: Alliance[] = [
  {
    id: generateId(),
    name: "Ligue latine",
    members: ["Rome", "Tibur", "Praeneste", "Tusculum", "Lanuvium"],
    type: "defensive", // Changed from "Défensive" to "defensive"
    dateCreation: "496 AUC",
    duration: 10,
    status: "active",
    militarySupport: 8000,
    economicBenefits: ["Accès aux marchés", "Réduction des taxes commerciales"],
    commitments: ["Défense mutuelle", "Non-agression"],
    description: "Alliance défensive des cités latines sous la direction de Rome."
  },
  {
    id: generateId(),
    name: "Alliance italique",
    members: ["Rome", "Samnites", "Étrusques", "Ombriens"],
    type: "offensive", // Changed from "Offensive" to "offensive"
    dateCreation: "550 AUC",
    duration: 15,
    status: "active",
    militarySupport: 20000,
    economicBenefits: ["Partage des ressources", "Contrôle des routes commerciales"],
    commitments: ["Participation aux campagnes militaires", "Fourniture de troupes"],
    description: "Coalition offensive pour la conquête du sud de l'Italie."
  },
  {
    id: generateId(),
    name: "Coalition anti-macédonienne",
    members: ["Rome", "Ligue étolienne", "Pergame", "Rhodes"],
    type: "offensive", // Changed from "Offensive" to "offensive"
    dateCreation: "563 AUC",
    duration: 8,
    status: "active",
    militarySupport: 15000,
    economicBenefits: ["Accès aux marchés égéens", "Protection des navires marchands"],
    commitments: ["Participation aux campagnes", "Contribution financière"],
    description: "Alliance formée pour contrer l'expansion macédonienne en Grèce."
  },
  {
    id: generateId(),
    name: "Alliance maritime méditerranéenne",
    members: ["Rome", "Massilia", "Syracuse", "Rhodes"],
    type: "defensive", // Changed from "Défensive" to "defensive"
    dateCreation: "537 AUC",
    duration: 12,
    status: "expired",
    militarySupport: 5000,
    economicBenefits: ["Libre circulation maritime", "Réduction des taxes portuaires"],
    commitments: ["Protection des navires alliés", "Lutte contre la piraterie"],
    description: "Pacte naval pour la sécurité des routes commerciales en Méditerranée."
  },
  {
    id: generateId(),
    name: "Pacte de la Mer Adriatique",
    members: ["Rome", "Épire", "Corcyre", "Apollonie"],
    type: "full", // Changed from "Commercial/Défensif" to "full"
    dateCreation: "525 AUC",
    duration: 10,
    status: "active",
    militarySupport: 8000,
    economicBenefits: ["Contrôle du commerce adriatique", "Accès aux ports"],
    commitments: ["Protection mutuelle", "Consultations régulières"],
    description: "Alliance commerciale et militaire pour le contrôle de l'Adriatique."
  }
];
