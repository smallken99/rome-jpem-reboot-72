
import { BuildingDescription } from '../types/buildingTypes';

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
    prestige: 5,
    popularite: 15,
    slaves: {
      required: 2,
      optimal: 4,
      maxProfit: 0 // Pas de profit direct
    }
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
    popularite: 10,
    slaves: {
      required: 5,
      optimal: 8,
      maxProfit: 0 // Pas de profit direct
    }
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
    popularite: 15,
    slaves: {
      required: 10,
      optimal: 15,
      maxProfit: 0 // Pas de profit direct
    }
  }
};
