
import { Alliance } from '../types';
import { generateId } from '@/components/maitrejeu/types/common';

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
