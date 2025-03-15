
import { BuildingDescription } from '../../types/buildingTypes';

// Autres bâtiments publics - Monuments et établissements caritatifs
export const publicMonuments: Record<string, BuildingDescription> = {
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
