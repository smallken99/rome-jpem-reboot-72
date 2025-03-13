
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useMaitreJeu } from '@/components/maitrejeu/context';
import { formatMoney } from '@/utils/formatUtils';
import { EconomieRecord, EconomieCreationData } from '@/components/maitrejeu/types/economie';
import { Season, GameDate } from '@/utils/timeSystem';

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  description: string;
  date: Date;
  source: string;
}

export interface EconomyStats {
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  growthRate: number;
}

export const useEconomy = () => {
  const [balance, setBalance] = useState<number>(5000000);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { treasury, economieRecords, addEconomieRecord } = useMaitreJeu();

  const economyStats: EconomyStats = {
    totalIncome: 0,
    totalExpenses: 0,
    netProfit: 0,
    growthRate: 0,
  };

  // Calculer les statistiques basées sur les transactions
  useEffect(() => {
    if (transactions.length > 0) {
      const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const expenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
      
      economyStats.totalIncome = income;
      economyStats.totalExpenses = expenses;
      economyStats.netProfit = income - expenses;
      economyStats.growthRate = balance > 0 ? economyStats.netProfit / balance * 100 : 0;
    }
  }, [transactions, balance]);

  // Synchroniser avec les données du context MaitreJeu
  useEffect(() => {
    if (treasury && treasury.balance) {
      setBalance(treasury.balance);
    }

    // Convertir les enregistrements d'économie en transactions
    if (economieRecords && economieRecords.length > 0) {
      const convertedTransactions = economieRecords.map(record => ({
        id: record.id,
        type: record.type as TransactionType,
        amount: record.amount,
        category: record.category,
        description: record.description,
        date: new Date(), // Convertir GameDate en Date
        source: record.source
      }));
      setTransactions(convertedTransactions as any);
    }
  }, [treasury, economieRecords]);

  // Ajouter une transaction
  const addTransaction = (transaction: Omit<Transaction, 'date' | 'id'>): Transaction => {
    const newTransaction: Transaction = {
      ...transaction,
      id: uuidv4(),
      date: new Date(),
    };

    setTransactions(prev => [...prev, newTransaction]);

    // Synchroniser avec MaitreJeu
    const economieData: EconomieCreationData = {
      source: transaction.source,
      category: transaction.category,
      amount: transaction.amount,
      description: transaction.description,
      type: transaction.type,
      isRecurring: false,
      tags: [transaction.category]
    };

    addEconomieRecord(economieData);

    return newTransaction;
  };

  // Fonction pour recevoir un paiement
  const receivePayment = (amount: number, description: string, category: string = 'Divers') => {
    if (amount <= 0) return false;
    
    setBalance(prev => prev + amount);
    addTransaction({
      type: 'income',
      amount,
      category,
      description,
      source: 'Trésor personnel'
    });
    
    return true;
  };

  // Fonction pour effectuer un paiement
  const makePayment = (amount: number, description: string, category: string = 'Dépenses') => {
    if (amount <= 0 || !canAfford(amount)) return false;
    
    setBalance(prev => prev - amount);
    addTransaction({
      type: 'expense',
      amount,
      category,
      description,
      source: 'Trésor personnel'
    });
    
    return true;
  };

  // Vérifier si un paiement est possible
  const canAfford = (amount: number): boolean => {
    return balance >= amount;
  };

  return {
    balance,
    economyStats,
    transactions,
    loading,
    addTransaction,
    receivePayment,
    makePayment,
    canAfford,
    formatMoney
  };
};
