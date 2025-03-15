
import { BuildingDescription } from '../../types/buildingTypes';

// Bâtiments d'Utilité Publique
export const utilityBuildings: Record<string, BuildingDescription> = {
  aqueduc: {
    id: "aqueduc",
    name: "Aqueduc",
    description: "Permet l'acheminement de l'eau potable vers la ville, assurant un accès constant aux ressources hydriques pour les habitants.",
    advantages: [
      "Approvisionnement en eau potable",
      "Amélioration de l'hygiène publique",
      "Développement urbain facilité"
    ],
    initialCost: 200000,
    maintenanceCost: 12000,
    prestige: 30,
    reputation: 35,
    popularite: 30,
    slaves: {
      required: 20,
      optimal: 40,
      maxProfit: 0 // Pas de profit direct
    }
  },
  thermes: {
    id: "thermes",
    name: "Thermes Publics",
    description: "Espaces de bain accessibles à la population, offrant un lieu de détente et d'hygiène pour toutes les classes sociales.",
    advantages: [
      "Service public majeur",
      "Lieu d'influence politique",
      "Monument à votre gloire"
    ],
    initialCost: 180000,
    maintenanceCost: 15000,
    prestige: 35,
    reputation: 30,
    popularite: 35,
    slaves: {
      required: 25,
      optimal: 40,
      maxProfit: 0 // Pas de profit direct
    }
  },
  granarium: {
    id: "granarium",
    name: "Granarium Public",
    description: "Grand entrepôt servant à stocker les céréales et autres denrées alimentaires, permettant de réguler les prix et d'éviter les famines.",
    advantages: [
      "Sécurité alimentaire",
      "Stabilisation des prix des denrées",
      "Protection contre les famines"
    ],
    initialCost: 120000,
    maintenanceCost: 10000,
    prestige: 20,
    reputation: 25,
    popularite: 30,
    slaves: {
      required: 30,
      optimal: 50,
      maxProfit: 0 // Pas de profit direct
    }
  }
};
