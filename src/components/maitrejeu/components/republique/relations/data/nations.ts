
import { Nation } from '../types';
import { generateId } from '@/components/maitrejeu/types/common';

// Données fictives pour les nations
export const nationsMock: Nation[] = [
  {
    id: generateId(),
    name: "Carthage",
    region: "Afrique du Nord",
    status: "enemy",
    population: 750000,
    militaryStrength: 8,
    diplomaticInfluence: 7,
    tradeValue: 9,
    lastContact: "548 AUC",
    description: "Principale rivale de Rome en Méditerranée occidentale. Grande puissance maritime et commerciale.",
    leaders: ["Hannibal Barca", "Hasdrubal"]
  },
  {
    id: generateId(),
    name: "Royaume de Macédoine",
    region: "Grèce",
    status: "enemy",
    population: 500000,
    militaryStrength: 7,
    diplomaticInfluence: 6,
    tradeValue: 5,
    lastContact: "557 AUC",
    description: "Sous le règne de Philippe V. Cherche à étendre son influence en Grèce et dans l'Égée.",
    leaders: ["Philippe V", "Démétrios"]
  },
  {
    id: generateId(),
    name: "Égypte ptolémaïque",
    region: "Afrique / Asie",
    status: "ally",
    population: 3000000,
    militaryStrength: 6,
    diplomaticInfluence: 8,
    tradeValue: 10,
    lastContact: "605 AUC",
    description: "Riche royaume dirigé par la dynastie ptolémaïque. Principal fournisseur de grain.",
    leaders: ["Ptolémée IV", "Cléopâtre I"]
  },
  {
    id: generateId(),
    name: "Royaume séleucide",
    region: "Asie",
    status: "neutral",
    population: 5000000,
    militaryStrength: 9,
    diplomaticInfluence: 7,
    tradeValue: 8,
    lastContact: "565 AUC",
    description: "Vaste empire s'étendant de l'Anatolie à l'Inde. En conflit avec l'Égypte ptolémaïque.",
    leaders: ["Antiochos III", "Séleucos IV"]
  },
  {
    id: generateId(),
    name: "Numides",
    region: "Afrique du Nord",
    status: "ally",
    population: 300000,
    militaryStrength: 5,
    diplomaticInfluence: 4,
    tradeValue: 3,
    lastContact: "550 AUC",
    description: "Alliés importants contre Carthage. Excellente cavalerie légère.",
    leaders: ["Massinissa", "Syphax"]
  },
  {
    id: generateId(),
    name: "Massilia",
    region: "Gaule",
    status: "ally",
    population: 25000,
    militaryStrength: 3,
    diplomaticInfluence: 5,
    tradeValue: 7,
    lastContact: "542 AUC",
    description: "Colonie grecque et allié fidèle de Rome. Important centre commercial.",
    leaders: ["Pythéas", "Eumachos"]
  },
  {
    id: generateId(),
    name: "Ligue achéenne",
    region: "Grèce",
    status: "ally",
    population: 200000,
    militaryStrength: 4,
    diplomaticInfluence: 6,
    tradeValue: 5,
    lastContact: "570 AUC",
    description: "Alliance de cités-États grecques opposées à l'influence macédonienne.",
    leaders: ["Aratos de Sicyone", "Philopœmen"]
  }
];
