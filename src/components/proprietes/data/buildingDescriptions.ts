
// Types de bâtiments urbains et leurs descriptions
export interface BuildingDescription {
  name: string;
  description: string;
  advantages: string[];
  initialCost: number;
  maintenanceCost: number;
  prestige: number;
  income?: number;
  imageUrl?: string;
}

// Habitations
export const urbanResidentialBuildings: Record<string, BuildingDescription> = {
  insula: {
    name: "Insula",
    description: "Immeuble d'habitation locative à plusieurs étages, avec commerces au rez-de-chaussée. Logement populaire pour la plèbe urbaine.",
    advantages: [
      "Revenu locatif régulier",
      "Abrite nombreux clients potentiels",
      "Faible prestige mais rendement élevé"
    ],
    initialCost: 25000,
    maintenanceCost: 1200,
    prestige: 2,
    income: 400
  },
  domus: {
    name: "Domus",
    description: "Maison urbaine patricienne avec atrium central, idéale pour recevoir clients et alliés politiques.",
    advantages: [
      "Augmente considérablement votre prestige",
      "Espace pour réceptions politiques",
      "Témoigne de votre dignitas"
    ],
    initialCost: 50000,
    maintenanceCost: 2500,
    prestige: 15,
    income: 0
  },
  villa_urbana: {
    name: "Villa Urbana",
    description: "Résidence luxueuse inspirée des villas hellénistiques, avec jardins, fontaines et salles de réception.",
    advantages: [
      "Prestige immense",
      "Capacité à impressionner les dignitaires étrangers",
      "Décoration somptueuse témoignant de votre richesse"
    ],
    initialCost: 100000,
    maintenanceCost: 5000,
    prestige: 30,
    income: 0
  }
};

// Bâtiments religieux
export const religiousBuildings: Record<string, BuildingDescription> = {
  autel: {
    name: "Autel",
    description: "Structure sacrée dédiée aux dieux domestiques, manifestant votre piété envers les divinités romaines.",
    advantages: [
      "Augmente votre réputation de piété",
      "Favorise les présages positifs",
      "Coût modeste pour un gain de prestige significatif"
    ],
    initialCost: 5000,
    maintenanceCost: 500,
    prestige: 5,
    income: 0
  },
  statuaire: {
    name: "Statuaire",
    description: "Ensemble de statues dédiées aux divinités, installées dans un espace public, affirmant votre dévotion religieuse.",
    advantages: [
      "Renforce votre image de défenseur des traditions",
      "Visibilité publique de votre piété",
      "Attire la faveur des prêtres et des collèges religieux"
    ],
    initialCost: 15000,
    maintenanceCost: 800,
    prestige: 10,
    income: 0
  },
  temple: {
    name: "Temple",
    description: "Édifice religieux consacré à une divinité majeure, contribution significative à la vie religieuse de Rome.",
    advantages: [
      "Prestige considérable auprès du peuple et du Sénat",
      "Influence dans les affaires religieuses de la République",
      "Possibilité de nomination au sacerdoce associé"
    ],
    initialCost: 80000,
    maintenanceCost: 4000,
    prestige: 25,
    income: 0
  }
};

// Bâtiments publics
export const publicBuildings: Record<string, BuildingDescription> = {
  statue: {
    name: "Statue",
    description: "Monument public représentant un membre de votre famille ou un ancêtre illustre, érigé sur le forum.",
    advantages: [
      "Immortalise la gloria familiale",
      "Rappel constant de votre lignée aux citoyens",
      "Investissement modéré pour un gain de réputation"
    ],
    initialCost: 10000,
    maintenanceCost: 500,
    prestige: 8,
    income: 0
  },
  maison_indigents: {
    name: "Maison des Indigents",
    description: "Établissement caritatif offrant abri et nourriture aux citoyens démunis, démontrant votre générosité publique.",
    advantages: [
      "Popularité significative auprès de la plèbe",
      "Renforce votre image de bienfaiteur",
      "Attire de nouveaux clients fidèles"
    ],
    initialCost: 30000,
    maintenanceCost: 3000,
    prestige: 15,
    income: 0
  },
  thermes: {
    name: "Thermes",
    description: "Bains publics offrant aux citoyens lieux d'hygiène, de socialisation et de loisirs, projet d'envergure témoignant de votre munificence.",
    advantages: [
      "Popularité importante et durable",
      "Lieu d'influence politique informelle",
      "Visibilité permanente de votre générosité"
    ],
    initialCost: 100000,
    maintenanceCost: 8000,
    prestige: 35,
    income: 500
  }
};

// Propriétés rurales
export const ruralProperties: Record<string, BuildingDescription> = {
  domaine_cereales: {
    name: "Domaine céréalier",
    description: "Exploitation agricole spécialisée dans la production de blé, orge et autres céréales essentielles.",
    advantages: [
      "Production alimentaire stratégique",
      "Revenus stables et prévisibles",
      "Possibilité de contrats publics d'approvisionnement"
    ],
    initialCost: 75000,
    maintenanceCost: 5000,
    prestige: 5,
    income: 8000
  },
  domaine_vignoble: {
    name: "Vignoble",
    description: "Domaine viticole produisant des vins de qualité, denrée prisée et symbole de raffinement.",
    advantages: [
      "Produit de luxe à forte valeur ajoutée",
      "Prestige social associé à la viticulture",
      "Rendements potentiellement élevés"
    ],
    initialCost: 90000,
    maintenanceCost: 6000,
    prestige: 12,
    income: 12000
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
