import { SenateurJouable, Province, Evenement, Election, HistoireEntry, Loi, Equilibre } from '../types';
import { EconomieRecord, TreasuryStatus, EconomicFactors, EconomieCategory } from '../types/economie';
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

// Données initiales pour les familles
export const initialFamilles = [
  {
    id: "f1",
    nom: "Julii",
    gens: "Julia",
    statut: "Patricien" as const,
    prestige: 70,
    influence: 65,
    richesse: 50000,
    description: "Ancienne et prestigieuse famille patricienne qui se réclame d'Énée et de Vénus.",
    devise: "Fortune favors the bold",
    membres: ["mf1", "mf2", "mf3"],
    alliances: ["a1"],
    chefId: "mf1",
    matrone: "mf2",
    couleurPrimaire: "#B22234",
    couleurSecondaire: "#D4AF37"
  },
  {
    id: "f2",
    nom: "Claudii",
    gens: "Claudia",
    statut: "Patricien" as const,
    prestige: 65,
    influence: 60,
    richesse: 45000,
    description: "Une des plus anciennes familles patriciennes, connue pour son conservatisme.",
    devise: "Through tradition, power",
    membres: ["mf4", "mf5"],
    alliances: ["a1"],
    chefId: "mf4",
    matrone: "mf5",
    couleurPrimaire: "#3C3B6E",
    couleurSecondaire: "#D4AF37"
  }
];

// Données initiales pour les membres des familles
export const initialMembres = [
  {
    id: "mf1",
    nom: "Julius",
    prenom: "Gaius",
    age: 45,
    genre: "male" as const,
    statut: "Patricien" as const,
    statutMatrimonial: "Marié" as const,
    role: "Pater Familias",
    education: "Rhétorique, Droit",
    popularite: 60,
    piete: 55,
    joueur: false,
    description: "Chef de la famille Julii, il est respecté au Sénat pour son éloquence."
  },
  {
    id: "mf2",
    nom: "Julia",
    prenom: "Cornelia",
    age: 40,
    genre: "female" as const,
    statut: "Patricien" as const,
    statutMatrimonial: "Marié" as const,
    role: "Mater Familias",
    education: "Arts, Littérature",
    popularite: 45,
    piete: 70,
    joueur: false,
    description: "Épouse de Gaius Julius, elle est connue pour ses dons dans l'organisation de banquets."
  },
  {
    id: "mf3",
    nom: "Julius",
    prenom: "Marcus",
    age: 18,
    genre: "male" as const,
    statut: "Patricien" as const,
    statutMatrimonial: "Célibataire" as const,
    role: "Fils aîné",
    pere: "mf1",
    mere: "mf2",
    education: "Militaire, Rhétorique",
    popularite: 35,
    piete: 40,
    joueur: false,
    description: "Fils prometteur des Julii, il commence sa carrière dans l'armée."
  },
  {
    id: "mf4",
    nom: "Claudius",
    prenom: "Tiberius",
    age: 50,
    genre: "male" as const,
    statut: "Patricien" as const,
    statutMatrimonial: "Marié" as const,
    role: "Pater Familias",
    education: "Philosophie, Droit",
    popularite: 50,
    piete: 65,
    joueur: false,
    description: "Chef de la famille Claudii, connu pour son conservatisme et son respect des traditions."
  },
  {
    id: "mf5",
    nom: "Claudia",
    prenom: "Livia",
    age: 45,
    genre: "female" as const,
    statut: "Patricien" as const,
    statutMatrimonial: "Marié" as const,
    role: "Mater Familias",
    education: "Musique, Poésie",
    popularite: 55,
    piete: 75,
    joueur: false,
    description: "Épouse de Tiberius Claudius, très respectée pour sa piété."
  }
];

// Données initiales pour les alliances
export const initialAlliances = [
  {
    id: "a1",
    famille1Id: "f1",
    famille2Id: "f2",
    type: "politique" as const,
    dateDebut: new Date("710-01-01").toISOString(),
    termes: "Alliance politique entre les Julii et les Claudii pour soutenir mutuellement leurs candidats au Sénat.",
    benefices: ["Soutien politique", "Partage d'informations"],
    statut: "active" as const,
    membres: ["mf1", "mf4"]
  }
];

// Données initiales pour les mariages
export const initialMariages = [
  {
    id: "m1",
    epoux: "mf1",
    epouse: "mf2",
    familleEpoux: "f1",
    familleEpouse: "f1", // Même famille dans ce cas
    dot: 10000,
    date: new Date("695-05-15").toISOString(),
    statut: "actif" as const
  },
  {
    id: "m2",
    epoux: "mf4",
    epouse: "mf5",
    familleEpoux: "f2",
    familleEpouse: "f2", // Même famille dans ce cas
    dot: 8000,
    date: new Date("690-07-20").toISOString(),
    statut: "actif" as const
  }
];

// Données initiales pour les relations familiales
export const initialRelations = [
  {
    id: "r1",
    membre1Id: "mf1",
    membre2Id: "mf3",
    type: "Père" as const
  },
  {
    id: "r2",
    membre1Id: "mf2",
    membre2Id: "mf3",
    type: "Mère" as const
  },
  {
    id: "r3",
    membre1Id: "mf1",
    membre2Id: "mf2",
    type: "Époux" as const
  },
  {
    id: "r4",
    membre1Id: "mf4",
    membre2Id: "mf5",
    type: "Époux" as const
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
    backstory: "Grand propriétaire terrien qui possède des domaines en Campanie. Fournit du grain à la Ville.",
    lastInteraction: new Date().toISOString()
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
    lastInteraction: new Date().toISOString(),
    assignedToSenateurId: "3"
  }
];

// État initial pour l'économie
export const initialEconomieRecords: EconomieRecord[] = [
  {
    id: "econ-1",
    date: { year: 700, season: "SPRING" },
    source: "Impôts",
    category: "Impôts" as EconomieCategory,
    amount: 500000,
    description: "Collecte d'impôts trimestrielle",
    type: "income",
    isRecurring: true,
    recurringInterval: "seasonal",
    tags: ["impôts", "revenus réguliers"],
    approved: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "econ-2",
    date: { year: 700, season: "SPRING" },
    source: "Armée",
    category: "Armée" as EconomieCategory,
    amount: 300000,
    description: "Financement de la campagne militaire en Hispanie",
    type: "expense",
    isRecurring: false,
    tags: ["militaire", "campagne"],
    approved: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "econ-3",
    date: { year: 700, season: "SUMMER" },
    source: "Commerce extérieur",
    category: "Commerce" as EconomieCategory,
    amount: 150000,
    description: "Revenus des taxes douanières",
    type: "income",
    isRecurring: true,
    recurringInterval: "seasonal",
    tags: ["commerce", "taxes"],
    approved: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "econ-4",
    date: { year: 700, season: "SUMMER" },
    source: "Construction",
    category: "Construction" as EconomieCategory,
    amount: 200000,
    description: "Construction d'un nouveau temple de Jupiter",
    type: "expense",
    isRecurring: false,
    tags: ["religion", "construction"],
    approved: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const initialTreasury: TreasuryStatus = {
  id: "treasury-1",
  balance: 2000000,
  totalIncome: 500000,
  totalExpenses: 300000,
  surplus: 200000,
  projectedBalance: 2500000,
  lastUpdated: { year: 700, season: "SUMMER" },
  inflationRate: 2.5,
  taxRate: 8.0,
  comments: "Finances saines, mais vigilance requise sur les dépenses militaires croissantes."
};

export const initialEconomicFactors: EconomicFactors = {
  tradeStability: 85,
  militaryExpense: 450000,
  publicWorksExpense: 200000,
  religiousCeremonyExpense: 75000,
  adminExpense: 120000,
  taxCollection: 600000,
  provinceRevenue: 350000,
  tradeRevenue: 280000,
  warSpoilsRevenue: 100000,
  loanInterestRate: 5.0
};

// Données initiales
export const initialProvinces: Province[] = [];
export const initialEvenements: Evenement[] = [];
export const initialElections: Election[] = [];
export const initialHistoireEntries: HistoireEntry[] = [];
export const initialLois: Loi[] = [];

// Ajustement de l'initialEquilibre pour inclure à la fois populaires et populares
export const initialEquilibre: Equilibre = {
  facteurSenat: 60,
  facteurPlebs: 40,
  facteurPatriciens: 75,
  facteurMilitaire: 80,
  facteurReligieux: 65,
  
  // Political alignment
  populares: 35,
  optimates: 40,
  moderates: 25,
  
  // City indicators
  population: 200000,
  criminalityIndex: 15,
  indiceCrime: 15,
  indiceCorruption: 20,
  indiceMecontentement: 30,
  stressPolitique: 25,
  stabiliteGlobale: 70,
  economicStability: 75,
  foodSupply: 80,
  publicOrder: 70,
  
  // EquilibreBarChart properties
  armée: 80,
  économie: 75,
  morale: 65,
  loyauté: 70,
  patriciens: 75,
  plébéiens: 40,
  neutrales: 50,
  
  // Thresholds
  unrestThreshold: 60,
  rebellionThreshold: 80,
  
  // History
  historique: [],
  
  // Notes
  notes: "Équilibre initial de la République"
};

export const initialDate: GameDate = {
  year: 752,
  season: 'SPRING'
};

export const initialPhase: GamePhase = "SENATE";
