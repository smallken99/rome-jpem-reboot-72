
import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  type: 'income' | 'expense';
  date: string;
}

export const useTransactions = (initialBalance = 100000) => {
  const [balance, setBalance] = useState(initialBalance);
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
  
  // Obtenir les transactions récentes
  const getRecentTransactions = useCallback((limit = 10) => {
    return transactions
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  }, [transactions]);
  
  // Obtenir les transactions par catégorie
  const getTransactionsByCategory = useCallback((category: string) => {
    return transactions.filter(t => t.category === category);
  }, [transactions]);
  
  // Obtenir les transactions par type
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
