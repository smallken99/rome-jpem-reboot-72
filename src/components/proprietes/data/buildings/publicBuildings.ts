
import { BuildingDescription } from '../types/buildingTypes';

// Bâtiments publics
export const publicBuildings: Record<string, BuildingDescription> = {
  // Bâtiments Administratifs et Politiques
  curie: {
    id: "curie",
    name: "Curie",
    description: "Lieu où se réunit le Sénat pour débattre et prendre des décisions politiques majeures. C'est le cœur du pouvoir républicain.",
    advantages: [
      "Centre du pouvoir politique",
      "Indispensable aux débats sénatoriaux",
      "Prestige républicain considérable"
    ],
    initialCost: 150000,
    maintenanceCost: 8000,
    prestige: 40,
    reputation: 30,
    piete: 5,
    slaves: {
      required: 5,
      optimal: 10,
      maxProfit: 0 // Pas de profit direct
    }
  },
  archives_etat: {
    id: "archives_etat",
    name: "Archives d'État",
    description: "Permet de conserver les lois, les traités, les recensements et autres documents officiels servant à l'administration de la République.",
    advantages: [
      "Conservation des documents officiels",
      "Améliore l'efficacité administrative",
      "Préserve la mémoire républicaine"
    ],
    initialCost: 80000,
    maintenanceCost: 4000,
    prestige: 20,
    reputation: 10,
    slaves: {
      required: 8,
      optimal: 15,
      maxProfit: 0 // Pas de profit direct
    }
  },
  forum_republicain: {
    id: "forum_republicain",
    name: "Forum Républicain",
    description: "Grande place publique servant de centre économique, politique et social, où les citoyens se rassemblent pour échanger, commercer et assister aux annonces officielles.",
    advantages: [
      "Centre de la vie civique",
      "Favorise le commerce et les échanges",
      "Augmente l'influence politique"
    ],
    initialCost: 300000,
    maintenanceCost: 15000,
    prestige: 45,
    reputation: 40,
    popularite: 25,
    slaves: {
      required: 20,
      optimal: 35,
      maxProfit: 0 // Pas de profit direct
    }
  },
  
  // Bâtiments de Sécurité et d'Ordre Public
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
  },
  
  // Bâtiments de Divertissement et de Culture
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
  },
  
  // Bâtiments d'Utilité Publique
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
  },
  
  // Autres bâtiments publics existants
  statue: {
    id: "statue",
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
    reputation: 15,
    slaves: {
      required: 0,
      optimal: 1,
      maxProfit: 0 // Pas de profit direct
    }
  },
  maison_indigents: {
    id: "maison_indigents",
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
    reputation: 25,
    slaves: {
      required: 3,
      optimal: 6,
      maxProfit: 0 // Pas de profit direct
    }
  }
};
