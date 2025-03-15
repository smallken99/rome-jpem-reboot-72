
import { BuildingDescription } from '../../types/buildingTypes';

// Propriétés rurales agricoles (cultures de plantes)
export const agriculturalDomains: Record<string, BuildingDescription> = {
  domaine_cereales: {
    id: "domaine_cereales",
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
    id: "domaine_vignoble",
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
    id: "domaine_oliviers",
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
  }
};
