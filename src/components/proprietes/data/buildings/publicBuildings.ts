
import { BuildingDescription } from '../types/buildingTypes';

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
