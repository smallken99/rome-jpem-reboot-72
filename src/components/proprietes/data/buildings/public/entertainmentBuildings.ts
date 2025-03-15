
import { BuildingDescription } from '../../types/buildingTypes';

// Bâtiments de Divertissement et de Culture
export const entertainmentBuildings: Record<string, BuildingDescription> = {
  amphitheatre: {
    id: "amphitheatre",
    name: "Amphithéâtre",
    description: "Édifice destiné aux combats de gladiateurs, aux spectacles de chasse et aux exécutions publiques, garantissant le divertissement du peuple.",
    advantages: [
      "Divertissement populaire majeur",
      "Gain de popularité considérable",
      "Prestige important pour la cité"
    ],
    initialCost: 250000,
    maintenanceCost: 20000,
    prestige: 35,
    reputation: 20,
    popularite: 40,
    slaves: {
      required: 30,
      optimal: 50,
      maxProfit: 0 // Pas de profit direct
    }
  },
  cirque: {
    id: "cirque",
    name: "Cirque",
    description: "Immense structure permettant d'accueillir des courses de chars et des festivités grandioses.",
    advantages: [
      "Événements populaires majeurs",
      "Augmente considérablement la popularité",
      "Symbole de prospérité"
    ],
    initialCost: 280000,
    maintenanceCost: 25000,
    prestige: 40,
    reputation: 25,
    popularite: 45,
    slaves: {
      required: 35,
      optimal: 60,
      maxProfit: 0 // Pas de profit direct
    }
  },
  odeon: {
    id: "odeon",
    name: "Odeon",
    description: "Salle dédiée aux représentations musicales, poétiques et théâtrales, favorisant la culture et l'éducation publique.",
    advantages: [
      "Promotion des arts et de la culture",
      "Éducation du peuple",
      "Prestige intellectuel"
    ],
    initialCost: 100000,
    maintenanceCost: 8000,
    prestige: 25,
    reputation: 15,
    popularite: 20,
    slaves: {
      required: 15,
      optimal: 25,
      maxProfit: 0 // Pas de profit direct
    }
  }
};
