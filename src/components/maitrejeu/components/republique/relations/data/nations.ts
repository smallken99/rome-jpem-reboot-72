
import { Nation } from '../types';
import { generateId } from '@/components/maitrejeu/types/common';

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
