
import { Ceremony } from '../types';

// Données mockées des cérémonies
export const ceremonies: Ceremony[] = [
  {
    id: "ceremony-1",
    name: "Lupercalia",
    type: "festival",
    date: "15 Février",
    deity: "Faunus",
    prestige: 85,
    attendance: 25000,
    cost: 35000,
    description: "Festival de purification et de fertilité avec des prêtres parcourant la ville.",
    pieteBonus: 12,
    populariteBonus: 15,
    nextCelebration: 0
  },
  {
    id: "ceremony-2",
    name: "Saturnalia",
    type: "festival",
    date: "17-23 Décembre",
    deity: "Saturne",
    prestige: 95,
    attendance: 100000,
    cost: 95000,
    description: "Festival populaire avec des banquets, des cadeaux et l'inversion temporaire des rôles sociaux.",
    pieteBonus: 10,
    populariteBonus: 25,
    nextCelebration: 180
  },
  {
    id: "ceremony-3",
    name: "Jeux Floraux",
    type: "jeux",
    date: "28 Avril - 3 Mai",
    deity: "Flore",
    prestige: 80,
    attendance: 40000,
    cost: 65000,
    description: "Jeux en l'honneur de la déesse Flore, déesse des fleurs et du printemps.",
    pieteBonus: 8,
    populariteBonus: 18,
    nextCelebration: 60
  },
  {
    id: "ceremony-4",
    name: "Sacrifice à Mars",
    type: "sacrifice",
    date: "1 Mars",
    deity: "Mars",
    prestige: 75,
    attendance: 15000,
    cost: 25000,
    description: "Sacrifice annuel dédié à Mars pour assurer le succès militaire de Rome.",
    pieteBonus: 15,
    populariteBonus: 5,
    nextCelebration: 30
  },
  {
    id: "ceremony-5",
    name: "Procession des Vestales",
    type: "procession",
    date: "9 Juin",
    deity: "Vesta",
    prestige: 90,
    attendance: 35000,
    cost: 40000,
    description: "Procession solennelle des Vestales à travers le Forum Romain.",
    pieteBonus: 20,
    populariteBonus: 10,
    nextCelebration: 90
  }
];
