
import { create } from 'zustand';
import { toast } from 'sonner';

export type EconomyStats = {
  monthlyIncome: number;
  monthlyExpenses: number;
  annualTaxes: number;
  inflation: number;
  propertyValue: number;
};

export type EconomicReport = {
  startDate: Date;
  endDate: Date;
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  categories: {
    [key: string]: {
      income: number;
      expenses: number;
    };
  };
};

type Transaction = {
  id: string;
  amount: number;
  sender: string;
  recipient: string;
  category: string;
  description: string;
  date: Date;
  type: 'income' | 'expense';
};

type EconomyState = {
  balance: number;
  transactions: Transaction[];
  economyStats: EconomyStats;
  
  // Actions
  makePayment: (amount: number, recipient: string, category: string, description: string) => boolean;
  receivePayment: (amount: number, sender: string, category: string, description: string) => void;
  canAfford: (amount: number) => boolean;
  
  // Reporting
  getRecentTransactions: (count?: number) => Transaction[];
  getCategoryTotals: (type: 'income' | 'expense') => {category: string, total: number}[];
  generateEconomicReport: (startDate: Date, endDate: Date) => EconomicReport;
  
  // Additional functionality
  transferTo: (amount: number, recipientName: string, description: string) => boolean;
  simulateInvestment: (amount: number, riskLevel: 'low' | 'medium' | 'high') => {
    potentialReturn: number;
    timeFrame: number;
    riskFactor: number;
  };
  estimatePropertyTaxes: (propertyValue: number) => number;
  
  // Stats
  updateEconomyStats: (stats: Partial<EconomyStats>) => void;
};

export const useEconomy = create<EconomyState>((set, get) => ({
  balance: 5000000, // 5 millions d'As - solde de départ pour une famille sénatoriale
  transactions: [],
  economyStats: {
    monthlyIncome: 125000,
    monthlyExpenses: 85000,
    annualTaxes: 45000,
    inflation: 0.5,
    propertyValue: 3450000
  },
  
  // Effectuer un paiement
  makePayment: (amount: number, recipient: string, category: string, description: string) => {
    const { balance } = get();
    
    // Vérifier si le joueur peut payer
    if (balance < amount) {
      toast.error("Fonds insuffisants pour effectuer cette transaction");
      return false;
    }
    
    // Créer une nouvelle transaction
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      amount,
      sender: "Pater Familias",
      recipient,
      category,
      description,
      date: new Date(),
      type: 'expense'
    };
    
    // Mettre à jour l'état
    set(state => ({
      balance: state.balance - amount,
      transactions: [newTransaction, ...state.transactions]
    }));
    
    return true;
  },
  
  // Recevoir un paiement
  receivePayment: (amount: number, sender: string, category: string, description: string) => {
    // Créer une nouvelle transaction
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      amount,
      sender,
      recipient: "Pater Familias",
      category,
      description,
      date: new Date(),
      type: 'income'
    };
    
    // Mettre à jour l'état
    set(state => ({
      balance: state.balance + amount,
      transactions: [newTransaction, ...state.transactions]
    }));
  },
  
  // Vérifier si le joueur peut payer
  canAfford: (amount: number) => {
    return get().balance >= amount;
  },
  
  // Récupérer les transactions récentes
  getRecentTransactions: (count = 10) => {
    return get().transactions.slice(0, count);
  },
  
  // Calculer les totaux par catégorie
  getCategoryTotals: (type: 'income' | 'expense') => {
    const { transactions } = get();
    const filteredTransactions = transactions.filter(t => t.type === type);
    
    const categories: Record<string, number> = {};
    
    filteredTransactions.forEach(transaction => {
      const { category, amount } = transaction;
      if (!categories[category]) {
        categories[category] = 0;
      }
      categories[category] += amount;
    });
    
    return Object.entries(categories).map(([category, total]) => ({
      category,
      total
    }));
  },
  
  // Générer un rapport économique
  generateEconomicReport: (startDate: Date, endDate: Date) => {
    const { transactions } = get();
    
    // Filtrer les transactions dans la période demandée
    const filteredTransactions = transactions.filter(t => 
      t.date >= startDate && t.date <= endDate
    );
    
    // Initialiser l'objet rapport
    const report: EconomicReport = {
      startDate,
      endDate,
      totalIncome: 0,
      totalExpenses: 0,
      balance: 0,
      categories: {}
    };
    
    // Remplir le rapport avec les données
    filteredTransactions.forEach(transaction => {
      const { amount, category, type } = transaction;
      
      // Mettre à jour les totaux
      if (type === 'income') {
        report.totalIncome += amount;
      } else {
        report.totalExpenses += amount;
      }
      
      // Initialiser la catégorie si elle n'existe pas
      if (!report.categories[category]) {
        report.categories[category] = {
          income: 0,
          expenses: 0
        };
      }
      
      // Mettre à jour les montants de la catégorie
      if (type === 'income') {
        report.categories[category].income += amount;
      } else {
        report.categories[category].expenses += amount;
      }
    });
    
    // Calculer l'équilibre
    report.balance = report.totalIncome - report.totalExpenses;
    
    return report;
  },
  
  // Transférer de l'argent
  transferTo: (amount: number, recipientName: string, description: string) => {
    return get().makePayment(amount, recipientName, "Transfert", description);
  },
  
  // Simuler un investissement
  simulateInvestment: (amount: number, riskLevel: 'low' | 'medium' | 'high') => {
    let returnRate, timeFrame, riskFactor;
    
    switch (riskLevel) {
      case 'low':
        returnRate = 0.05 + Math.random() * 0.03; // 5-8%
        timeFrame = 12; // 12 mois
        riskFactor = 0.1; // 10% de risque de perte
        break;
      case 'medium':
        returnRate = 0.08 + Math.random() * 0.06; // 8-14%
        timeFrame = 8; // 8 mois
        riskFactor = 0.25; // 25% de risque de perte
        break;
      case 'high':
        returnRate = 0.12 + Math.random() * 0.18; // 12-30%
        timeFrame = 6; // 6 mois
        riskFactor = 0.4; // 40% de risque de perte
        break;
    }
    
    const potentialReturn = Math.round(amount * (1 + returnRate));
    
    return {
      potentialReturn,
      timeFrame,
      riskFactor
    };
  },
  
  // Estimer les impôts fonciers
  estimatePropertyTaxes: (propertyValue: number) => {
    // Taux d'imposition de base pour les propriétés: 0.5%
    const baseTaxRate = 0.005;
    
    // Ajustement en fonction de la valeur (les propriétés plus chères sont taxées à un taux plus élevé)
    let adjustedRate = baseTaxRate;
    
    if (propertyValue > 1000000) {
      adjustedRate = 0.008; // 0.8% pour les propriétés de grande valeur
    } else if (propertyValue > 500000) {
      adjustedRate = 0.006; // 0.6% pour les propriétés de valeur moyenne-haute
    }
    
    return Math.round(propertyValue * adjustedRate);
  },
  
  // Mettre à jour les statistiques économiques
  updateEconomyStats: (stats: Partial<EconomyStats>) => {
    set(state => ({
      economyStats: {
        ...state.economyStats,
        ...stats
      }
    }));
  }
}));
