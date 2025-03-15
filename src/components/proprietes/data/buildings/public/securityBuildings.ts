
import { BuildingDescription } from '../../types/buildingTypes';

// Bâtiments de Sécurité et d'Ordre Public
export const securityBuildings: Record<string, BuildingDescription> = {
  praesidium: {
    id: "praesidium",
    name: "Præsidium",
    description: "Poste central des vigiles chargé de la sécurité urbaine, de la lutte contre les incendies et du maintien de l'ordre public.",
    advantages: [
      "Réduit la criminalité",
      "Protection contre les incendies",
      "Maintien de l'ordre public"
    ],
    initialCost: 100000,
    maintenanceCost: 7000,
    prestige: 15,
    reputation: 20,
    popularite: 15,
    slaves: {
      required: 10,
      optimal: 20,
      maxProfit: 0 // Pas de profit direct
    }
  },
  caserne_garde: {
    id: "caserne_garde",
    name: "Caserne de la Garde Urbaine",
    description: "Siège des troupes affectées à la surveillance de la ville et à l'application des lois républicaines.",
    advantages: [
      "Renforce la sécurité urbaine",
      "Augmente l'efficacité des forces de l'ordre",
      "Dissuade les perturbateurs"
    ],
    initialCost: 120000,
    maintenanceCost: 10000,
    prestige: 20,
    reputation: 15,
    slaves: {
      required: 5,
      optimal: 10,
      maxProfit: 0 // Pas de profit direct
    }
  },
  prison: {
    id: "prison",
    name: "Prison Républicaine",
    description: "Lieu de détention réservé aux criminels d'État et aux personnes en attente de jugement.",
    advantages: [
      "Dissuasion des crimes",
      "Maintien de la justice",
      "Protection de la société"
    ],
    initialCost: 80000,
    maintenanceCost: 5000,
    prestige: 10,
    reputation: 10,
    slaves: {
      required: 15,
      optimal: 25,
      maxProfit: 0 // Pas de profit direct
    }
  }
};
