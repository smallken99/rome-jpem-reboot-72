
import { useState, useCallback } from 'react';
import { Transaction } from '@/types/patrimoine';
import { v4 as uuidv4 } from 'uuid';

export const useTransactions = (initialBalance = 500000) => {
  const [balance, setBalance] = useState<number>(initialBalance);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "trans-1",
      amount: 25000,
      description: "Revenus du domaine de Campanie",
      category: "Revenus fonciers",
      type: "income",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 7 jours avant
    },
    {
      id: "trans-2",
      amount: -5000,
      description: "Entretien de la Villa du Palatin",
      category: "Entretien",
      type: "expense",
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 jours avant
    },
    {
      id: "trans-3",
      amount: -8000,
      description: "Personnel domestique",
      category: "Personnel",
      type: "expense",
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // hier
    }
  ]);

  const addTransaction = useCallback((transactionData: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction = {
      ...transactionData,
      id: uuidv4(),
      date: new Date().toISOString()
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    
    // Mettre à jour le solde
    if (transactionData.type === 'income') {
      setBalance(prev => prev + transactionData.amount);
    } else {
      setBalance(prev => prev - Math.abs(transactionData.amount));
    }
    
    return newTransaction.id;
  }, []);

  const getRecentTransactions = useCallback((limit = 10) => {
    return transactions.slice(0, limit);
  }, [transactions]);

  const getTransactionsByCategory = useCallback((category: string) => {
    return transactions.filter(t => t.category === category);
  }, [transactions]);

  const getTransactionsByType = useCallback((type: 'income' | 'expense') => {
    return transactions.filter(t => t.type === type);
  }, [transactions]);

  return {
    balance,
    transactions,
    addTransaction,
    getRecentTransactions,
    getTransactionsByCategory,
    getTransactionsByType,
    setBalance
  };
};
