
import { SenateurJouable, Province, Evenement, Election, HistoireEntry, Loi, Equilibre } from '../types';
import { GameDate, Season, GamePhase } from '../types/common';

// Données initiales pour les sénateurs
export const initialSenateurs: SenateurJouable[] = [
  {
    id: "1",
    nom: "Fabius",
    prenom: "Quintus",
    gens: "Fabii",
    statut: "Patricien",
    age: 45,
    joueur: true,
    roles: ["Consul"],
    richesse: 50000,
    influence: 75,
    competences: {
      diplomatie: 8,
      guerre: 9,
      administration: 7,
      eloquence: 6
    },
    famille: "Fabii",
    fonction: "Consul",
    popularite: 70,
    appartenance: "Optimates"
  },
  {
    id: "2",
    nom: "Porcius",
    prenom: "Marcus",
    gens: "Porcii",
    statut: "Plébéien",
    age: 39,
    joueur: true,
    roles: ["Censeur"],
    richesse: 30000,
    influence: 65,
    competences: {
      diplomatie: 5,
      guerre: 6,
      administration: 9,
      eloquence: 8
    },
    famille: "Porcii",
    fonction: "Censeur",
    popularite: 60,
    appartenance: "Populares"
  },
  {
    id: "3",
    nom: "Cornelius",
    prenom: "Publius",
    gens: "Cornelii",
    statut: "Patricien",
    age: 42,
    joueur: false,
    roles: ["Préteur"],
    richesse: 45000,
    influence: 70,
    competences: {
      diplomatie: 7,
      guerre: 8,
      administration: 6,
      eloquence: 7
    },
    famille: "Cornelii",
    fonction: "Préteur",
    popularite: 55,
    appartenance: "Optimates"
  }
];

// Données initiales
export const initialProvinces: Province[] = [];
export const initialEvenements: Evenement[] = [];
export const initialElections: Election[] = [];
export const initialHistoireEntries: HistoireEntry[] = [];
export const initialLois: Loi[] = [];
export const initialEquilibre: Equilibre | null = {
  population: 0,
  armée: 0,
  économie: 0,
  morale: 0,
  loyauté: 0,
  patriciens: 0,
  plébéiens: 0,
  populares: 35,
  optimates: 40,
  neutrales: 0,
  moderates: 25,
  historique: []
};
export const initialDate: GameDate = { year: 632, season: "SPRING" };
export const initialPhase: GamePhase = "POLITIQUE";
