
import { BuildingDescription } from '../types/buildingTypes';

// Bâtiments militaires
export const militaryBuildings: Record<string, BuildingDescription> = {
  castra: {
    name: "Castra",
    description: "Camp militaire servant de base aux légionnaires stationnés à proximité de la ville. C'est un centre de formation et de commandement.",
    advantages: [
      "Formation des troupes",
      "Renforcement de la défense",
      "Centre de commandement militaire"
    ],
    initialCost: 200000,
    maintenanceCost: 18000,
    prestige: 25,
    reputation: 20,
    slaves: {
      required: 20,
      optimal: 40,
      maxProfit: 0 // Pas de profit direct
    }
  },
  arsenal: {
    name: "Arsenal Républicain",
    description: "Lieu où sont fabriquées et stockées les armes et armures destinées aux troupes de la République.",
    advantages: [
      "Production d'armement",
      "Équipement des troupes",
      "Indépendance stratégique"
    ],
    initialCost: 150000,
    maintenanceCost: 12000,
    prestige: 20,
    reputation: 15,
    slaves: {
      required: 25,
      optimal: 50,
      maxProfit: 0 // Pas de profit direct
    },
    production: {
      type: "armement",
      amount: 500,
      unit: "pièces"
    }
  },
  champ_mars: {
    name: "Champs de Mars",
    description: "Grand terrain d'entraînement militaire où les recrues s'exercent aux tactiques de combat et aux manœuvres.",
    advantages: [
      "Entraînement des troupes",
      "Amélioration de l'efficacité militaire",
      "Exercices tactiques"
    ],
    initialCost: 100000,
    maintenanceCost: 8000,
    prestige: 15,
    reputation: 20,
    slaves: {
      required: 10,
      optimal: 20,
      maxProfit: 0 // Pas de profit direct
    }
  },
  portus_militum: {
    name: "Portus Militum",
    description: "Infrastructure portuaire militaire servant à l'entretien et à l'organisation de la flotte navale républicaine.",
    advantages: [
      "Soutien à la flotte navale",
      "Protection des routes maritimes",
      "Projection de puissance"
    ],
    initialCost: 250000,
    maintenanceCost: 20000,
    prestige: 30,
    reputation: 25,
    slaves: {
      required: 30,
      optimal: 60,
      maxProfit: 0 // Pas de profit direct
    }
  },
  muraille: {
    name: "Muraille et Fortifications",
    description: "Défenses construites pour protéger la ville contre les invasions et maintenir la sécurité aux frontières.",
    advantages: [
      "Protection contre les invasions",
      "Sécurité des citoyens",
      "Symbole de puissance"
    ],
    initialCost: 300000,
    maintenanceCost: 15000,
    prestige: 35,
    reputation: 30,
    slaves: {
      required: 40,
      optimal: 80,
      maxProfit: 0 // Pas de profit direct
    }
  }
};
