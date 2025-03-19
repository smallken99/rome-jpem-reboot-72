
import { useState, useCallback, useEffect } from 'react';
import { Transaction } from '@/types/patrimoine';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

export interface EconomySummary {
  balance: number;
  totalIncome: number;
  totalExpenses: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  profit: number;
  inflation: number;
  topIncomeCategories: { category: string; amount: number }[];
  topExpenseCategories: { category: string; amount: number }[];
}

export const useEconomyManager = (initialBalance = 100000) => {
  const [balance, setBalance] = useState<number>(initialBalance);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  // Ajouter une transaction
  const addTransaction = useCallback((transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: uuidv4(),
      date: new Date().toISOString()
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    
    // Mettre à jour le solde
    if (transaction.type === 'income') {
      setBalance(prev => prev + transaction.amount);
    } else {
      setBalance(prev => prev - transaction.amount);
    }
    
    return newTransaction.id;
  }, []);
  
  // Supprimer une transaction
  const removeTransaction = useCallback((id: string) => {
    const transaction = transactions.find(t => t.id === id);
    
    if (transaction) {
      setTransactions(prev => prev.filter(t => t.id !== id));
      
      // Recalculer le solde
      if (transaction.type === 'income') {
        setBalance(prev => prev - transaction.amount);
      } else {
        setBalance(prev => prev + transaction.amount);
      }
    }
  }, [transactions]);
  
  // Vérifier si on peut se permettre une dépense
  const canAfford = useCallback((amount: number): boolean => {
    return balance >= amount;
  }, [balance]);
  
  // Effectuer un paiement
  const makePayment = useCallback((amount: number, recipient: string, category: string, description?: string): boolean => {
    if (!canAfford(amount)) {
      toast.error("Fonds insuffisants pour effectuer ce paiement");
      return false;
    }
    
    addTransaction({
      amount,
      category,
      description: description || `Paiement à ${recipient}`,
      type: 'expense'
    });
    
    toast.success(`Paiement de ${amount} As effectué`);
    return true;
  }, [canAfford, addTransaction]);
  
  // Recevoir un paiement
  const receivePayment = useCallback((amount: number, source: string, category: string, description?: string): void => {
    addTransaction({
      amount,
      category,
      description: description || `Paiement reçu de ${source}`,
      type: 'income'
    });
    
    toast.success(`Paiement de ${amount} As reçu`);
  }, [addTransaction]);
  
  // Calculer le résumé économique
  const calculateSummary = useCallback((): EconomySummary => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
      
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    // Calculer les revenus et dépenses mensuels (30 derniers jours)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const monthlyIncome = transactions
      .filter(t => t.type === 'income' && new Date(t.date) >= thirtyDaysAgo)
      .reduce((sum, t) => sum + t.amount, 0);
      
    const monthlyExpenses = transactions
      .filter(t => t.type === 'expense' && new Date(t.date) >= thirtyDaysAgo)
      .reduce((sum, t) => sum + t.amount, 0);
    
    // Calculer les principales catégories
    const incomeByCategory: Record<string, number> = {};
    const expensesByCategory: Record<string, number> = {};
    
    transactions.forEach(t => {
      if (t.type === 'income') {
        incomeByCategory[t.category] = (incomeByCategory[t.category] || 0) + t.amount;
      } else {
        expensesByCategory[t.category] = (expensesByCategory[t.category] || 0) + t.amount;
      }
    });
    
    const topIncomeCategories = Object.entries(incomeByCategory)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);
      
    const topExpenseCategories = Object.entries(expensesByCategory)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);
    
    return {
      balance,
      totalIncome,
      totalExpenses,
      monthlyIncome,
      monthlyExpenses,
      profit: totalIncome - totalExpenses,
      inflation: 2.5, // Valeur fixe pour l'exemple
      topIncomeCategories,
      topExpenseCategories
    };
  }, [transactions, balance]);
  
  // Obtenir les transactions récentes
  const getRecentTransactions = useCallback((limit = 10) => {
    return transactions
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  }, [transactions]);
  
  // Filtrer les transactions par catégorie
  const getTransactionsByCategory = useCallback((category: string) => {
    return transactions.filter(t => t.category === category);
  }, [transactions]);
  
  // Filtrer les transactions par type
  const getTransactionsByType = useCallback((type: 'income' | 'expense') => {
    return transactions.filter(t => t.type === type);
  }, [transactions]);
  
  return {
    balance,
    setBalance,
    transactions,
    addTransaction,
    removeTransaction,
    canAfford,
    makePayment,
    receivePayment,
    calculateSummary,
    getRecentTransactions,
    getTransactionsByCategory,
    getTransactionsByType
  };
};
