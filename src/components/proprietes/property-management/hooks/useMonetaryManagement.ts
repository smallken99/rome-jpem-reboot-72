import { useState, useCallback } from 'react';
import { toast } from 'sonner';

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  type: TransactionType;
  date: string;
  source?: string;
  recipient?: string;
}

export interface EconomyStats {
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  incomeByCategory: Record<string, number>;
  expensesByCategory: Record<string, number>;
}

export const useMonetaryManagement = (initialBalance: number = 0) => {
  const [balance, setBalance] = useState<number>(initialBalance);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Check if user can afford a payment
  const canAfford = useCallback((amount: number): boolean => {
    return balance >= amount;
  }, [balance]);

  // Make a payment (expense)
  const makePayment = useCallback((amount: number, recipient: string, category: string): boolean => {
    if (!canAfford(amount)) {
      toast.error(`Fonds insuffisants pour effectuer ce paiement de ${amount} as.`);
      return false;
    }

    const newTransaction: Transaction = {
      id: `trans-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      amount: -Math.abs(amount), // Ensure negative
      description: `Paiement à ${recipient}`,
      category,
      type: 'expense',
      date: new Date().toISOString(),
      recipient
    };

    setTransactions(prev => [newTransaction, ...prev]);
    setBalance(prev => prev - Math.abs(amount));
    
    toast.success(`Paiement de ${amount} as effectué à ${recipient}.`);
    return true;
  }, [canAfford]);

  // Receive a payment (income)
  const receivePayment = useCallback((amount: number, source: string, category: string): boolean => {
    if (amount <= 0) {
      toast.error(`Le montant reçu doit être positif.`);
      return false;
    }

    const newTransaction: Transaction = {
      id: `trans-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      amount: Math.abs(amount), // Ensure positive
      description: `Paiement reçu de ${source}`,
      category,
      type: 'income',
      date: new Date().toISOString(),
      source
    };

    setTransactions(prev => [newTransaction, ...prev]);
    setBalance(prev => prev + Math.abs(amount));
    
    toast.success(`Paiement de ${amount} as reçu de ${source}.`);
    return true;
  }, []);

  // Calculate economy statistics
  const calculateEconomyStats = useCallback((): EconomyStats => {
    const stats: EconomyStats = {
      totalIncome: 0,
      totalExpenses: 0,
      netProfit: 0,
      incomeByCategory: {},
      expensesByCategory: {}
    };

    transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        stats.totalIncome += transaction.amount;
        
        // Add to category
        const category = transaction.category || 'Autre';
        stats.incomeByCategory[category] = (stats.incomeByCategory[category] || 0) + transaction.amount;
      } else {
        stats.totalExpenses += Math.abs(transaction.amount);
        
        // Add to category
        const category = transaction.category || 'Autre';
        stats.expensesByCategory[category] = (stats.expensesByCategory[category] || 0) + Math.abs(transaction.amount);
      }
    });

    stats.netProfit = stats.totalIncome - stats.totalExpenses;
    return stats;
  }, [transactions]);

  // Get transactions for a specific period
  const getTransactionsForPeriod = useCallback((startDate: Date, endDate: Date): Transaction[] => {
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= startDate && transactionDate <= endDate;
    });
  }, [transactions]);

  // Get transactions by category
  const getTransactionsByCategory = useCallback((category: string): Transaction[] => {
    return transactions.filter(transaction => transaction.category === category);
  }, [transactions]);

  // Add a transaction directly
  const addTransaction = useCallback((transactionData: Omit<Transaction, 'id' | 'date'>): string => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: `trans-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      date: new Date().toISOString()
    };

    setTransactions(prev => [newTransaction, ...prev]);
    
    // Update balance
    if (transactionData.type === 'income') {
      setBalance(prev => prev + transactionData.amount);
    } else {
      setBalance(prev => prev - Math.abs(transactionData.amount));
    }
    
    return newTransaction.id;
  }, []);

  // Record income (for compatibility with existing code)
  const recordIncome = useCallback((income: number, source: string, category: string) => {
    addTransaction({
      amount: income,
      description: `Revenu: ${source}`,
      category: category,
      type: 'income'
    });
  }, [addTransaction]);

  // Calculate economy stats once
  const economyStats = calculateEconomyStats();

  return {
    balance,
    transactions,
    economyStats,
    canAfford,
    makePayment,
    receivePayment,
    getTransactionsForPeriod,
    getTransactionsByCategory,
    addTransaction,
    recordIncome
  };
};
