
import { create } from 'zustand';
import { toast } from 'sonner';

type Transaction = {
  id: string;
  amount: number;
  sender: string;
  recipient: string;
  category: string;
  description: string;
  timestamp: Date;
  type: 'income' | 'expense';
};

type EconomyState = {
  balance: number;
  transactions: Transaction[];
  
  // Actions
  makePayment: (amount: number, recipient: string, category: string, description: string) => boolean;
  receivePayment: (amount: number, sender: string, category: string, description: string) => void;
  canAfford: (amount: number) => boolean;
  
  // Helpers
  getRecentTransactions: (count?: number) => Transaction[];
  getCategoryTotals: (type: 'income' | 'expense') => {category: string, total: number}[];
};

export const useEconomy = create<EconomyState>((set, get) => ({
  balance: 5000000, // 5 millions d'As - solde de départ pour une famille sénatoriale
  transactions: [],
  
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
      timestamp: new Date(),
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
      timestamp: new Date(),
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
  }
}));
