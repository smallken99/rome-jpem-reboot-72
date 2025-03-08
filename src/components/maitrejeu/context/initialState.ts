
import { SenateurJouable, Province, Evenement, Election, HistoireEntry, Loi, Equilibre } from '../types';
import { GameDate, Season, GamePhase } from '../types/common';
import { Client } from '../types/clients';
import { v4 as uuidv4 } from 'uuid';

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

// Données initiales pour les clients
export const initialClients: Client[] = [
  {
    id: uuidv4(),
    name: "Marcus Tullius",
    type: "artisan_commercant",
    subType: "Forgeron",
    location: "Forum",
    loyalty: "moyenne",
    influences: {
      political: 3,
      popular: 6,
      religious: 2
    },
    competencePoints: 5,
    specialAbilities: ["Armurerie", "Contacts militaires"],
    activeStatus: "active",
    relationshipLevel: 4,
    backstory: "Forgeron réputé qui équipe les légions romaines, bien vu par les militaires.",
    lastInteraction: new Date().toISOString(),
    assignedToSenateurId: "1"
  },
  {
    id: uuidv4(),
    name: "Lucius Cornelius",
    type: "religieux",
    subType: "Augure",
    location: "Capitole",
    loyalty: "forte",
    influences: {
      political: 7,
      popular: 4,
      religious: 9
    },
    competencePoints: 8,
    specialAbilities: ["Divination", "Influence religieuse"],
    activeStatus: "active",
    relationshipLevel: 7,
    backstory: "Augure estimé qui interprète les présages. Ses prédictions sont écoutées par le Sénat.",
    lastInteraction: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: "Gaius Marius",
    type: "politicien",
    subType: "Orateur du Forum",
    location: "Forum",
    loyalty: "faible",
    influences: {
      political: 8,
      popular: 7,
      religious: 3
    },
    competencePoints: 6,
    specialAbilities: ["Éloquence", "Intrigue politique"],
    activeStatus: "active",
    relationshipLevel: 3,
    backstory: "Orateur populaire capable de retourner une foule. Il vend ses talents au plus offrant.",
    lastInteraction: new Date().toISOString(),
    assignedToSenateurId: "2"
  },
  {
    id: uuidv4(),
    name: "Publius Licinius",
    type: "proprietaire",
    subType: "Propriétaire terrien",
    location: "Palatin",
    loyalty: "moyenne",
    influences: {
      political: 5,
      popular: 3,
      religious: 2
    },
    competencePoints: 4,
    specialAbilities: ["Commerce agricole", "Réseau d'approvisionnement"],
    activeStatus: "active",
    relationshipLevel: 5,
    backstory: "Grand propriétaire terrien qui possède des domaines en Campanie. Fournit du grain à la Ville."
  },
  {
    id: uuidv4(),
    name: "Titus Flavius",
    type: "pegre",
    subType: "Chef de gang",
    location: "Subure",
    loyalty: "forte",
    influences: {
      political: 4,
      popular: 8,
      religious: 1
    },
    competencePoints: 7,
    specialAbilities: ["Intimidation", "Réseau souterrain"],
    activeStatus: "probation",
    relationshipLevel: 6,
    backstory: "Contrôle les rues de la Subure. Utile pour influencer les votes ou faire taire des opposants.",
    assignedToSenateurId: "3"
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
