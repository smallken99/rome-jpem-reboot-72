
import { BuildingDescription } from '../types/buildingTypes';

// Propriétés rurales
export const ruralProperties: Record<string, BuildingDescription> = {
  domaine_cereales: {
    name: "Domaine céréalier",
    description: "Exploitation agricole spécialisée dans la production de blé, orge et autres céréales essentielles.",
    advantages: [
      "Production alimentaire stratégique",
      "Revenus stables",
      "Contrats publics possibles"
    ],
    initialCost: 75000,
    maintenanceCost: 5000,
    prestige: 0,
    income: 8000,
    production: {
      type: "céréales",
      amount: 1000,
      unit: "modii"
    },
    slaves: {
      required: 15,
      optimal: 25,
      maxProfit: 10000
    }
  },
  domaine_vignoble: {
    name: "Vignoble",
    description: "Domaine viticole produisant des vins de qualité, denrée prisée et symbole de raffinement.",
    advantages: [
      "Production de luxe",
      "Revenus élevés",
      "Prestige social"
    ],
    initialCost: 90000,
    maintenanceCost: 6000,
    prestige: 0,
    income: 12000,
    production: {
      type: "vin",
      amount: 500,
      unit: "amphores"
    },
    slaves: {
      required: 20,
      optimal: 30,
      maxProfit: 15000
    }
  },
  domaine_oliviers: {
    name: "Oliveraie",
    description: "Plantation d'oliviers produisant huile d'olive, produit essentiel à la cuisine, l'éclairage et l'hygiène romaine.",
    advantages: [
      "Produit d'exportation recherché",
      "Longévité des arbres (investissement durable)",
      "Multiple usages commercialisables"
    ],
    initialCost: 85000,
    maintenanceCost: 4500,
    prestige: 0,
    income: 10000,
    production: {
      type: "huile d'olive",
      amount: 800,
      unit: "amphores"
    },
    slaves: {
      required: 18,
      optimal: 25,
      maxProfit: 12000
    }
  },
  paturage_equides: {
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
