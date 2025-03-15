
import { BuildingDescription } from '../../types/buildingTypes';

// Propriétés rurales d'élevage (animaux)
export const livestockFarms: Record<string, BuildingDescription> = {
  paturage_equides: {
    id: "paturage_equides",
    name: "Élevage d'équidés",
    description: "Domaine d'élevage de chevaux et mules, animaux précieux pour l'armée, le transport et les courses.",
    advantages: [
      "Prestige social de l'élevage équin",
      "Demande militaire constante",
      "Possibilité de participer aux courses de chars"
    ],
    initialCost: 100000,
    maintenanceCost: 8000,
    prestige: 0,
    income: 15000,
    production: {
      type: "chevaux",
      amount: 50,
      unit: "têtes"
    },
    slaves: {
      required: 12,
      optimal: 20,
      maxProfit: 18000
    }
  },
  paturage_bovins: {
    id: "paturage_bovins",
    name: "Élevage de bovins",
    description: "Exploitation d'élevage bovin pour la viande, le cuir et la force de traction agricole.",
    advantages: [
      "Production diversifiée (viande, cuir, lait)",
      "Demande constante pour les sacrifices religieux",
      "Besoins militaires en cuir et viande"
    ],
    initialCost: 80000,
    maintenanceCost: 6000,
    prestige: 0,
    income: 9000,
    production: {
      type: "bovins",
      amount: 100,
      unit: "têtes"
    },
    slaves: {
      required: 10,
      optimal: 18,
      maxProfit: 11000
    }
  },
  paturage_moutons: {
    id: "paturage_moutons",
    name: "Élevage de moutons",
    description: "Élevage ovin fournissant laine de qualité pour l'industrie textile romaine florissante.",
    advantages: [
      "Matière première indispensable pour les toges",
      "Revenus réguliers et prévisibles",
      "Entretien relativement simple"
    ],
    initialCost: 70000,
    maintenanceCost: 4000,
    prestige: 0,
    income: 8500,
    production: {
      type: "laine",
      amount: 500,
      unit: "balles"
    },
    slaves: {
      required: 8,
      optimal: 15,
      maxProfit: 10000
    }
  }
};
