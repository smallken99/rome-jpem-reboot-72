// Types de bâtiments urbains et leurs descriptions
export interface BuildingDescription {
  name: string;
  description: string;
  advantages: string[];
  initialCost: number;
  maintenanceCost: number;
  prestige: number;
  income?: number;
  piete?: number;
  popularite?: number;
  reputation?: number;
  production?: {
    type: string;
    amount: number;
    unit: string;
  };
}

// Habitations
export const urbanResidentialBuildings: Record<string, BuildingDescription> = {
  insula: {
    name: "Insula",
    description: "Immeuble d'habitation locative à plusieurs étages, avec commerces au rez-de-chaussée. Logement populaire pour la plèbe urbaine.",
    advantages: [
      "Logement pour de nombreuses familles plébéiennes",
      "Développe votre clientèle",
      "Renforce votre popularité auprès du peuple"
    ],
    initialCost: 25000,
    maintenanceCost: 1200,
    prestige: 0,
    popularite: 15
  },
  domus: {
    name: "Domus",
    description: "Maison urbaine patricienne avec atrium central, idéale pour recevoir clients et alliés politiques.",
    advantages: [
      "Résidence digne d'un sénateur",
      "Espace pour réceptions politiques",
      "Symbole de votre dignitas"
    ],
    initialCost: 50000,
    maintenanceCost: 2500,
    prestige: 20,
    popularite: 5
  },
  villa_urbana: {
    name: "Villa Urbana",
    description: "Résidence luxueuse inspirée des villas hellénistiques, avec jardins, fontaines et salles de réception.",
    advantages: [
      "Résidence prestigieuse",
      "Capacité à impressionner les dignitaires",
      "Symbole de richesse et de pouvoir"
    ],
    initialCost: 100000,
    maintenanceCost: 5000,
    prestige: 35,
    popularite: 10
  }
};

// Bâtiments religieux
export const religiousBuildings: Record<string, BuildingDescription> = {
  autel: {
    name: "Autel",
    description: "Structure sacrée dédiée aux dieux domestiques, manifestant votre piété envers les divinités romaines.",
    advantages: [
      "Démontre votre dévotion religieuse",
      "Favorise les présages positifs",
      "Peu coûteux mais efficace"
    ],
    initialCost: 5000,
    maintenanceCost: 500,
    prestige: 5,
    piete: 10
  },
  statuaire: {
    name: "Statuaire",
    description: "Ensemble de statues dédiées aux divinités, installées dans un espace public, affirmant votre dévotion religieuse.",
    advantages: [
      "Visibilité de votre piété",
      "Attire la faveur des prêtres",
      "Embellit l'espace public"
    ],
    initialCost: 15000,
    maintenanceCost: 800,
    prestige: 10,
    piete: 20
  },
  temple: {
    name: "Temple",
    description: "Édifice religieux consacré à une divinité majeure, contribution significative à la vie religieuse de Rome.",
    advantages: [
      "Influence religieuse majeure",
      "Possibilité de sacerdoce",
      "Centre de vie spirituelle"
    ],
    initialCost: 80000,
    maintenanceCost: 4000,
    prestige: 25,
    piete: 40
  }
};

// Bâtiments publics
export const publicBuildings: Record<string, BuildingDescription> = {
  statue: {
    name: "Statue",
    description: "Monument public représentant un membre de votre famille ou un ancêtre illustre, érigé sur le forum.",
    advantages: [
      "Immortalise votre famille",
      "Rappel constant de votre lignée",
      "Investissement modéré"
    ],
    initialCost: 10000,
    maintenanceCost: 500,
    prestige: 8,
    reputation: 15
  },
  maison_indigents: {
    name: "Maison des Indigents",
    description: "Établissement caritatif offrant abri et nourriture aux citoyens démunis, démontrant votre générosité publique.",
    advantages: [
      "Aide aux plus démunis",
      "Image de bienfaiteur",
      "Attire des clients fidèles"
    ],
    initialCost: 30000,
    maintenanceCost: 3000,
    prestige: 15,
    reputation: 25
  },
  thermes: {
    name: "Thermes",
    description: "Bains publics offrant aux citoyens lieux d'hygiène, de socialisation et de loisirs, projet d'envergure témoignant de votre munificence.",
    advantages: [
      "Service public majeur",
      "Lieu d'influence politique",
      "Monument à votre gloire"
    ],
    initialCost: 100000,
    maintenanceCost: 8000,
    prestige: 35,
    reputation: 50
  }
};

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
    prestige: 8,
    income: 10000
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
    prestige: 15,
    income: 15000
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
    prestige: 6,
    income: 9000
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
    prestige: 5,
    income: 8500
  }
};

// Exporte tous les types de bâtiments
export const allBuildingTypes = {
  urbanResidential: urbanResidentialBuildings,
  religious: religiousBuildings,
  public: publicBuildings,
  rural: ruralProperties
};
