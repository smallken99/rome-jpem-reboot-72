
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

export interface Transaction {
  id: string;
  date: Date;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  source?: string;
}

export const useEconomy = (initialBalance = 100000) => {
  const [balance, setBalance] = useState(initialBalance);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  // Vérifie si les fonds sont suffisants
  const canAfford = useCallback((amount: number): boolean => {
    return balance >= amount;
  }, [balance]);
  
  // Effectuer un paiement (dépense)
  const makePayment = useCallback((amount: number, recipient: string, category: string, description?: string): boolean => {
    if (!canAfford(amount)) {
      toast.error(`Fonds insuffisants pour ce paiement (${amount.toLocaleString()} As)`);
      return false;
    }
    
    const transaction: Transaction = {
      id: `t-${Date.now()}`,
      date: new Date(),
      amount: amount,
      type: 'expense',
      category,
      description: description || `Paiement à ${recipient}`,
      source: recipient
    };
    
    setTransactions(prev => [transaction, ...prev]);
    setBalance(prev => prev - amount);
    
    return true;
  }, [canAfford]);
  
  // Recevoir un paiement (revenu)
  const receivePayment = useCallback((amount: number, source: string, category: string, description?: string): void => {
    const transaction: Transaction = {
      id: `t-${Date.now()}`,
      date: new Date(),
      amount: amount,
      type: 'income',
      category,
      description: description || `Paiement reçu de ${source}`,
      source
    };
    
    setTransactions(prev => [transaction, ...prev]);
    setBalance(prev => prev + amount);
  }, []);
  
  // Obtenir les transactions récentes
  const getRecentTransactions = useCallback((limit = 10): Transaction[] => {
    return transactions.slice(0, limit);
  }, [transactions]);
  
  // Obtenir le solde
  const getBalance = useCallback((): number => {
    return balance;
  }, [balance]);
  
  // Calculer les statistiques financières
  const getFinancialStats = useCallback(() => {
    // Filtre pour les 30 derniers jours
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentTransactions = transactions.filter(t => t.date >= thirtyDaysAgo);
    
    const monthlyIncome = recentTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
      
    const monthlyExpenses = recentTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    // Catégories
    const incomeByCategory = transactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {} as Record<string, number>);
      
    const expensesByCategory = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {} as Record<string, number>);
    
    return {
      balance,
      monthlyIncome,
      monthlyExpenses,
      netIncome: monthlyIncome - monthlyExpenses,
      incomeByCategory,
      expensesByCategory
    };
  }, [balance, transactions]);
  
  return {
    balance,
    transactions,
    canAfford,
    makePayment,
    receivePayment,
    getRecentTransactions,
    getBalance,
    getFinancialStats
  };
};
