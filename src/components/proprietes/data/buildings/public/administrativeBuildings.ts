
import { BuildingDescription } from '../../types/buildingTypes';

// Bâtiments Administratifs et Politiques
export const administrativeBuildings: Record<string, BuildingDescription> = {
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
  }
};
