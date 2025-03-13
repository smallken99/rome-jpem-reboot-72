
import { useState, useCallback } from 'react';
import { Transaction, TransactionCreationParams, EconomyStats } from '@/types/EconomyTypes';
import { v4 as uuidv4 } from 'uuid';

export const useEconomy = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Statistiques par défaut
  const [economyStats, setEconomyStats] = useState<EconomyStats>({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    transactionCount: 0,
    categoryBreakdown: {},
    annualIncome: 0,
    annualExpenses: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    annualTaxes: 0,
    annualTithes: 0,
    inflation: 0
  });
  
  // Fonction pour obtenir le solde actuel
  const getBalance = useCallback(() => {
    return transactions.reduce((acc, transaction) => {
      if (transaction.type === 'income') {
        return acc + transaction.amount;
      } else {
        return acc - transaction.amount;
      }
    }, 0);
  }, [transactions]);

  // Fonction pour vérifier si on peut se permettre une dépense
  const canAfford = useCallback((amount: number) => {
    return getBalance() >= amount;
  }, [getBalance]);

  // Fonction pour ajouter une transaction
  const addTransaction = useCallback((transactionParams: TransactionCreationParams): Transaction => {
    const newTransaction: Transaction = {
      id: uuidv4(),
      date: new Date(),
      ...transactionParams
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    
    // Mettre à jour les statistiques
    setEconomyStats(prev => ({
      ...prev,
      balance: getBalance() + (transactionParams.type === 'income' ? transactionParams.amount : -transactionParams.amount),
      transactionCount: prev.transactionCount + 1,
      totalIncome: transactionParams.type === 'income' ? prev.totalIncome + transactionParams.amount : prev.totalIncome,
      totalExpenses: transactionParams.type === 'expense' ? prev.totalExpenses + transactionParams.amount : prev.totalExpenses
    }));
    
    return newTransaction;
  }, [getBalance]);

  // Fonction pour recevoir un paiement
  const receivePayment = useCallback((amount: number, description: string, category: string = 'Divers'): boolean => {
    try {
      addTransaction({
        type: 'income',
        amount,
        description,
        category
      });
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la réception du paiement');
      return false;
    }
  }, [addTransaction]);

  // Fonction pour effectuer un paiement
  const makePayment = useCallback((
    amount: number, 
    description: string, 
    category: string = 'Divers',
    requireFunds: boolean = true
  ): boolean => {
    try {
      if (requireFunds && !canAfford(amount)) {
        throw new Error('Fonds insuffisants pour effectuer ce paiement');
      }
      
      addTransaction({
        type: 'expense',
        amount,
        description,
        category
      });
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du paiement');
      return false;
    }
  }, [addTransaction, canAfford]);

  return {
    balance: getBalance(),
    economyStats,
    transactions,
    loading,
    error,
    addTransaction,
    receivePayment,
    makePayment,
    canAfford
  };
};
