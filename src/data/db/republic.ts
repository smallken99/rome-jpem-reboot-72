
// Base de données de la République Romaine

// Types de données
export interface PopulationData {
  total: number;
  citizens: number;
  patricians: number;
  plebeians: number;
  slaves: number;
  regions: Record<string, number>;
  growthRate: number;
  lastCensus: string;
}

export interface TreasuryData {
  balance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  reserves: number;
  loans: Loan[];
  fiscalYear: string;
  taxRate: number;
  taxCollection?: number;
}

export interface Loan {
  id: string;
  amount: number;
  creditor: string;
  interestRate: number;
  startDate: string;
  dueDate: string;
  paid: boolean;
}

export interface BuildingCategory {
  id: string;
  name: string;
  count: number;
  totalValue: number;
  maintenanceCost: number;
  condition: number; // 0-100 average
}

// Données mockées
export const populationData: PopulationData = {
  total: 950000,
  citizens: 450000,
  patricians: 15000,
  plebeians: 435000,
  slaves: 500000,
  regions: {
    "Rome": 450000,
    "Latium": 120000,
    "Campanie": 180000,
    "Étrurie": 90000,
    "Ombrie": 60000,
    "Samnium": 50000
  },
  growthRate: 1.2,
  lastCensus: "703 AUC"
};

export const treasuryData: TreasuryData = {
  balance: 15000000,
  monthlyIncome: 1200000,
  monthlyExpenses: 1050000,
  reserves: 5000000,
  loans: [
    {
      id: "loan-1",
      amount: 1000000,
      creditor: "Marcus Licinius Crassus",
      interestRate: 5,
      startDate: "704 AUC",
      dueDate: "707 AUC",
      paid: false
    },
    {
      id: "loan-2",
      amount: 500000,
      creditor: "Temple de Saturne",
      interestRate: 3,
      startDate: "703 AUC",
      dueDate: "706 AUC",
      paid: false
    }
  ],
  fiscalYear: "705 AUC",
  taxRate: 5,
  taxCollection: 1000000
};

export const buildingsData: BuildingCategory[] = [
  {
    id: "temples",
    name: "Temples",
    count: 42,
    totalValue: 9000000,
    maintenanceCost: 350000,
    condition: 85
  },
  {
    id: "governmental",
    name: "Bâtiments Gouvernementaux",
    count: 25,
    totalValue: 12000000,
    maintenanceCost: 500000,
    condition: 90
  },
  {
    id: "aqueducts",
    name: "Aqueducs",
    count: 4,
    totalValue: 8000000,
    maintenanceCost: 300000,
    condition: 80
  },
  {
    id: "roads",
    name: "Routes et Voies",
    count: 120,
    totalValue: 15000000,
    maintenanceCost: 600000,
    condition: 75
  },
  {
    id: "entertainment",
    name: "Bâtiments de Divertissement",
    count: 18,
    totalValue: 7000000,
    maintenanceCost: 400000,
    condition: 82
  },
  {
    id: "military",
    name: "Infrastructures Militaires",
    count: 35,
    totalValue: 10000000,
    maintenanceCost: 450000,
    condition: 88
  }
];

// Fonctions pour récupérer les données
export const getPopulationData = (): PopulationData => {
  return populationData;
};

export const getTreasuryData = (): TreasuryData => {
  return treasuryData;
};

export const getBuildingsData = (): BuildingCategory[] => {
  return buildingsData;
};

// Fonctions pour mettre à jour les données
export const updatePopulationData = (updates: Partial<PopulationData>): PopulationData => {
  // Dans une véritable application, ce serait une mise à jour de base de données
  Object.assign(populationData, updates);
  return populationData;
};

export const updateTreasuryData = (updates: Partial<TreasuryData>): TreasuryData => {
  // Dans une véritable application, ce serait une mise à jour de base de données
  Object.assign(treasuryData, updates);
  return treasuryData;
};

export const addLoan = (loan: Omit<Loan, 'id'>): Loan => {
  const newLoan: Loan = {
    ...loan,
    id: `loan-${treasuryData.loans.length + 1}`
  };
  
  treasuryData.loans.push(newLoan);
  treasuryData.balance += loan.amount;
  
  return newLoan;
};

export const repayLoan = (loanId: string, amount: number): boolean => {
  const loan = treasuryData.loans.find(l => l.id === loanId);
  
  if (!loan || loan.paid) {
    return false;
  }
  
  if (treasuryData.balance < amount) {
    return false;
  }
  
  loan.paid = true;
  treasuryData.balance -= amount;
  
  return true;
};

export const updateBuildingCategory = (categoryId: string, updates: Partial<BuildingCategory>): BuildingCategory | null => {
  const category = buildingsData.find(cat => cat.id === categoryId);
  
  if (!category) {
    return null;
  }
  
  Object.assign(category, updates);
  return category;
};
