
import { Building, Shield, Users, Coins, ChartBar, Scale, Flag } from 'lucide-react';

export interface RepublicData {
  id: string;
  year: number;
  population: PopulationData;
  treasury: TreasuryData;
  buildings: BuildingsData;
  politics: PoliticsData;
  military: MilitaryData;
  territories: TerritoriesData;
}

export interface PopulationData {
  total: number;
  patricians: number;
  plebeians: number;
  slaves: number;
  growth: number; // Taux de croissance annuel
  satisfaction: number; // 0-100
  healthStatus: number; // 0-100
  employmentRate: number; // 0-100
  regions: RegionPopulation[];
}

export interface RegionPopulation {
  name: string;
  population: number;
  density: number;
}

export interface TreasuryData {
  balance: number; // En As
  annualRevenue: number;
  annualExpenses: number;
  reserves: number;
  loans: TreasuryLoan[];
  taxCollection: TaxCollectionData;
  lastAnnualReport: {
    year: number;
    balance: number;
    surplus: number;
  };
}

export interface TreasuryLoan {
  id: string;
  amount: number;
  creditor: string;
  interestRate: number;
  startYear: number;
  durationYears: number;
  isPaid: boolean;
}

export interface TaxCollectionData {
  totalCollected: number;
  byProvince: Record<string, number>;
  byType: Record<string, number>;
  collectionRate: number; // 0-100, efficacité de collecte
}

export interface BuildingsData {
  total: number;
  byType: Record<string, number>;
  conditions: {
    excellent: number;
    good: number;
    average: number;
    poor: number;
    critical: number;
  };
  maintenanceBudget: number;
  underConstruction: number;
}

export interface PoliticsData {
  senateApproval: number; // 0-100
  plebsApproval: number; // 0-100
  patricianApproval: number; // 0-100
  factions: PoliticalFaction[];
  currentPolicies: string[];
  politicalStability: number; // 0-100
}

export interface PoliticalFaction {
  id: string;
  name: string;
  leader: string;
  power: number; // 0-100
  influence: number; // 0-100
  alignment: 'populares' | 'optimates' | 'neutral';
  supportBase: string;
}

export interface MilitaryData {
  legions: number;
  totalSoldiers: number;
  navalStrength: number;
  militaryBudget: number;
  readiness: number; // 0-100
  morale: number; // 0-100
  generals: MilitaryGeneral[];
}

export interface MilitaryGeneral {
  id: string;
  name: string;
  loyalty: number; // 0-100
  skill: number; // 0-100
  experience: number; // 0-100
  commandedLegions: number;
}

export interface TerritoriesData {
  provinces: Province[];
  tributaries: string[];
  expansionGoals: string[];
}

export interface Province {
  id: string;
  name: string;
  governor: string;
  population: number;
  taxRevenue: number;
  resources: string[];
  stability: number; // 0-100
  loyalty: number; // 0-100
}

// Statistiques de la République pour l'année en cours (705 AUC)
export const currentRepublicData: RepublicData = {
  id: "rome-705",
  year: 705,
  population: {
    total: 750000,
    patricians: 25000,
    plebeians: 525000,
    slaves: 200000,
    growth: 2.3,
    satisfaction: 68,
    healthStatus: 72,
    employmentRate: 85,
    regions: [
      { name: "Rome", population: 350000, density: 12500 },
      { name: "Italia", population: 400000, density: 45 }
    ]
  },
  treasury: {
    balance: 15000000,
    annualRevenue: 5000000,
    annualExpenses: 4800000,
    reserves: 3000000,
    loans: [
      {
        id: "loan-1",
        amount: 500000,
        creditor: "Crassus",
        interestRate: 8,
        startYear: 703,
        durationYears: 5,
        isPaid: false
      }
    ],
    taxCollection: {
      totalCollected: 3500000,
      byProvince: {
        "Italia": 1500000,
        "Hispania": 800000,
        "Gallia": 750000,
        "Sicilia": 450000
      },
      byType: {
        "tributum": 2000000,
        "portoria": 800000,
        "scriptura": 350000,
        "decumae": 350000
      },
      collectionRate: 78
    },
    lastAnnualReport: {
      year: 704,
      balance: 14800000,
      surplus: 200000
    }
  },
  buildings: {
    total: 85,
    byType: {
      "temple": 15,
      "aqueduct": 4,
      "forum": 2,
      "basilica": 3,
      "theater": 2,
      "bath": 8,
      "market": 12,
      "granary": 7,
      "barracks": 5,
      "villa": 18,
      "port": 3,
      "bridge": 6
    },
    conditions: {
      excellent: 15,
      good: 35,
      average: 20,
      poor: 10,
      critical: 5
    },
    maintenanceBudget: 750000,
    underConstruction: 7
  },
  politics: {
    senateApproval: 65,
    plebsApproval: 58,
    patricianApproval: 72,
    factions: [
      {
        id: "optimates-1",
        name: "Conservateurs",
        leader: "Quintus Caecilius Metellus",
        power: 78,
        influence: 81,
        alignment: "optimates",
        supportBase: "Patriciens, grands propriétaires terriens"
      },
      {
        id: "populares-1",
        name: "Réformateurs",
        leader: "Gaius Sempronius Gracchus",
        power: 65,
        influence: 70,
        alignment: "populares",
        supportBase: "Plébéiens, chevaliers"
      },
      {
        id: "neutral-1",
        name: "Modérés",
        leader: "Marcus Tullius Cicero",
        power: 60,
        influence: 75,
        alignment: "neutral",
        supportBase: "Intellectuels, classe moyenne"
      }
    ],
    currentPolicies: [
      "Lex Frumentaria",
      "Lex Agraria",
      "Lex Militaris"
    ],
    politicalStability: 62
  },
  military: {
    legions: 25,
    totalSoldiers: 125000,
    navalStrength: 85,
    militaryBudget: 2500000,
    readiness: 75,
    morale: 80,
    generals: [
      {
        id: "gen-1",
        name: "Lucius Cornelius Sulla",
        loyalty: 78,
        skill: 90,
        experience: 85,
        commandedLegions: 4
      },
      {
        id: "gen-2",
        name: "Gnaeus Pompeius Magnus",
        loyalty: 82,
        skill: 88,
        experience: 80,
        commandedLegions: 5
      }
    ]
  },
  territories: {
    provinces: [
      {
        id: "italia",
        name: "Italia",
        governor: "Titus Quinctius Flamininus",
        population: 4000000,
        taxRevenue: 1500000,
        resources: ["grain", "wine", "olive oil", "marble"],
        stability: 90,
        loyalty: 95
      },
      {
        id: "hispania",
        name: "Hispania",
        governor: "Publius Cornelius Scipio",
        population: 2000000,
        taxRevenue: 800000,
        resources: ["silver", "copper", "grain", "horses"],
        stability: 75,
        loyalty: 70
      },
      {
        id: "gallia",
        name: "Gallia",
        governor: "Gaius Julius Caesar",
        population: 3000000,
        taxRevenue: 750000,
        resources: ["gold", "timber", "livestock", "iron"],
        stability: 60,
        loyalty: 50
      },
      {
        id: "sicilia",
        name: "Sicilia",
        governor: "Marcus Porcius Cato",
        population: 1000000,
        taxRevenue: 450000,
        resources: ["grain", "fish", "sulfur"],
        stability: 80,
        loyalty: 75
      }
    ],
    tributaries: ["Numidia", "Armenia", "Pergamon"],
    expansionGoals: ["Britannia", "Germania", "Parthia"]
  }
};

// Icônes pour les différentes sections
export const republicDataIcons = {
  population: Users,
  treasury: Coins,
  buildings: Building,
  politics: Flag,
  military: Shield,
  justice: Scale,
  economy: ChartBar
};

// Fonction pour obtenir les données actuelles de la République
export const getRepublicData = () => {
  return currentRepublicData;
};
