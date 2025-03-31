
import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  type: 'income' | 'expense' | 'transfer';
  date: string;
  recipient?: string;
  source?: string;
  tags?: string[];
  recurring?: boolean;
  recurringInterval?: 'monthly' | 'quarterly' | 'yearly';
  relatedItemId?: string;
}

export interface TransactionSummary {
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
  topIncomeCategories: {category: string; amount: number}[];
  topExpenseCategories: {category: string; amount: number}[];
  recentTransactions: Transaction[];
}

export interface TransactionFilter {
  type?: 'income' | 'expense' | 'transfer' | 'all';
  category?: string;
  minAmount?: number;
  maxAmount?: number;
  startDate?: string;
  endDate?: string;
  searchTerm?: string;
}

export const useTransactionManager = (initialBalance = 0) => {
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
      toast.success(`Revenu de ${transaction.amount} As ajouté`);
    } else if (transaction.type === 'expense') {
      setBalance(prev => prev - transaction.amount);
      toast.info(`Dépense de ${transaction.amount} As enregistrée`);
    } else if (transaction.type === 'transfer') {
      // Pour les transferts, le solde net ne change pas
      toast.info(`Transfert de ${transaction.amount} As effectué`);
    }
    
    return newTransaction.id;
  }, []);
  
  // Supprimer une transaction
  const removeTransaction = useCallback((id: string) => {
    const transaction = transactions.find(t => t.id === id);
    
    if (!transaction) {
      toast.error("Transaction introuvable");
      return false;
    }
    
    setTransactions(prev => prev.filter(t => t.id !== id));
    
    // Mise à jour du solde
    if (transaction.type === 'income') {
      setBalance(prev => prev - transaction.amount);
    } else if (transaction.type === 'expense') {
      setBalance(prev => prev + transaction.amount);
    }
    
    toast.success("Transaction supprimée avec succès");
    return true;
  }, [transactions]);
  
  // Vérifier si une dépense est possible
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
      type: 'expense',
      recipient
    });
    
    return true;
  }, [canAfford, addTransaction]);
  
  // Recevoir un paiement
  const receivePayment = useCallback((amount: number, source: string, category: string, description?: string): string => {
    const id = addTransaction({
      amount,
      category,
      description: description || `Paiement reçu de ${source}`,
      type: 'income',
      source
    });
    
    return id;
  }, [addTransaction]);
  
  // Filtrer les transactions
  const filterTransactions = useCallback((filter: TransactionFilter): Transaction[] => {
    return transactions.filter(transaction => {
      // Filtre par type
      if (filter.type && filter.type !== 'all' && transaction.type !== filter.type) {
        return false;
      }
      
      // Filtre par catégorie
      if (filter.category && transaction.category !== filter.category) {
        return false;
      }
      
      // Filtre par montant minimum
      if (filter.minAmount !== undefined && transaction.amount < filter.minAmount) {
        return false;
      }
      
      // Filtre par montant maximum
      if (filter.maxAmount !== undefined && transaction.amount > filter.maxAmount) {
        return false;
      }
      
      // Filtre par date de début
      if (filter.startDate && new Date(transaction.date) < new Date(filter.startDate)) {
        return false;
      }
      
      // Filtre par date de fin
      if (filter.endDate && new Date(transaction.date) > new Date(filter.endDate)) {
        return false;
      }
      
      // Filtre par terme de recherche
      if (filter.searchTerm) {
        const searchLower = filter.searchTerm.toLowerCase();
        return (
          transaction.description.toLowerCase().includes(searchLower) ||
          transaction.category.toLowerCase().includes(searchLower) ||
          (transaction.recipient && transaction.recipient.toLowerCase().includes(searchLower)) ||
          (transaction.source && transaction.source.toLowerCase().includes(searchLower))
        );
      }
      
      return true;
    });
  }, [transactions]);
  
  // Obtenir un résumé des transactions
  const getTransactionSummary = useCallback((): TransactionSummary => {
    const categorizedIncome: Record<string, number> = {};
    const categorizedExpense: Record<string, number> = {};
    let totalIncome = 0;
    let totalExpenses = 0;
    
    transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        totalIncome += transaction.amount;
        categorizedIncome[transaction.category] = (categorizedIncome[transaction.category] || 0) + transaction.amount;
      } else if (transaction.type === 'expense') {
        totalExpenses += transaction.amount;
        categorizedExpense[transaction.category] = (categorizedExpense[transaction.category] || 0) + transaction.amount;
      }
    });
    
    // Trier les catégories par montant
    const topIncomeCategories = Object.entries(categorizedIncome)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);
      
    const topExpenseCategories = Object.entries(categorizedExpense)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);
    
    // Obtenir les transactions récentes
    const recentTransactions = [...transactions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10);
    
    return {
      totalIncome,
      totalExpenses,
      netBalance: totalIncome - totalExpenses,
      topIncomeCategories,
      topExpenseCategories,
      recentTransactions
    };
  }, [transactions]);
  
  // Obtenir les transactions par période
  const getTransactionsByPeriod = useCallback((period: 'day' | 'week' | 'month' | 'year') => {
    const now = new Date();
    let startDate = new Date();
    
    switch (period) {
      case 'day':
        startDate.setDate(now.getDate() - 1);
        break;
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
    }
    
    return transactions.filter(t => new Date(t.date) >= startDate);
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
    filterTransactions,
    getTransactionSummary,
    getTransactionsByPeriod
  };
};
