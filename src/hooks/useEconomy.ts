
import { useState, useEffect } from 'react';
import { useMaitreJeu } from '@/components/maitrejeu/context';
import { formatMoney } from '@/utils/formatUtils';

export interface EconomyStats {
  balance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  annualTaxes: number;
  inflation: number;
  investmentReturns: number;
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: Date;
  source?: string;
}

export const useEconomy = () => {
  const mjContext = useMaitreJeu();
  const [balance, setBalance] = useState(1500000);
  const [economyStats, setEconomyStats] = useState<EconomyStats>({
    balance: 1500000,
    monthlyIncome: 120000,
    monthlyExpenses: 85000,
    annualTaxes: 250000,
    inflation: 1.8,
    investmentReturns: 3.5
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  // Synchroniser avec les données du MJ si disponibles
  useEffect(() => {
    if (mjContext?.treasury) {
      setBalance(mjContext.treasury.balance);
      
      // Mettre à jour les statistiques économiques avec les données du MJ
      if (mjContext.economicFactors) {
        const { taxCollection, provinceRevenue, tradeRevenue, warSpoilsRevenue, 
                militaryExpense, publicWorksExpense, religiousCeremonyExpense, adminExpense } = mjContext.economicFactors;
                
        const totalRevenue = taxCollection + provinceRevenue + tradeRevenue + warSpoilsRevenue;
        const totalExpenses = militaryExpense + publicWorksExpense + religiousCeremonyExpense + adminExpense;
        
        setEconomyStats({
          balance: mjContext.treasury.balance,
          monthlyIncome: Math.round(totalRevenue / 12),
          monthlyExpenses: Math.round(totalExpenses / 12),
          annualTaxes: taxCollection,
          inflation: mjContext.treasury.inflation || 1.8,
          investmentReturns: mjContext.treasury.investmentReturns || 3.5
        });
      }
      
      // Si le MJ a des enregistrements d'économie, les utiliser comme transactions
      if (mjContext.economieRecords && mjContext.economieRecords.length > 0) {
        const mappedTransactions = mjContext.economieRecords.map(record => ({
          id: record.id,
          type: record.amount > 0 ? 'income' : 'expense',
          amount: Math.abs(record.amount),
          category: record.category,
          description: record.description,
          date: new Date(),
          source: record.source
        }));
        
        setTransactions(mappedTransactions);
      }
    }
  }, [mjContext?.treasury, mjContext?.economicFactors, mjContext?.economieRecords]);

  // Fonctions pour interagir avec l'économie
  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      id: `trans_${Date.now()}`,
      date: new Date(),
      ...transaction
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    
    // Mettre à jour le solde
    const amountChange = transaction.type === 'income' ? transaction.amount : -transaction.amount;
    setBalance(prev => prev + amountChange);
    
    // Si le MJ est disponible, propager la transaction
    if (mjContext?.addEconomieRecord) {
      mjContext.addEconomieRecord({
        amount: amountChange,
        category: transaction.category,
        description: transaction.description,
        source: transaction.source || 'player_action',
        isRecurring: false,
        tags: [],
        type: transaction.type
      });
    }
    
    return newTransaction;
  };

  // Vérifier si le solde permet une dépense
  const canAfford = (amount: number): boolean => {
    return balance >= amount;
  };

  // Effectuer un paiement (dépense)
  const makePayment = (amount: number, recipient: string, category: string, description: string): boolean => {
    if (!canAfford(amount)) return false;
    
    addTransaction({
      type: 'expense',
      amount,
      category,
      description: `${recipient}: ${description}`,
      source: recipient
    });
    
    return true;
  };

  // Recevoir un paiement (revenu)
  const receivePayment = (amount: number, source: string, category: string, description: string): boolean => {
    addTransaction({
      type: 'income',
      amount,
      category,
      description: `${source}: ${description}`,
      source
    });
    
    return true;
  };

  const getRecentTransactions = (count: number = 10) => {
    return transactions.slice(0, count);
  };

  const getTransactionsByCategory = (category: string) => {
    return transactions.filter(t => t.category === category);
  };

  const calculateFinancialReport = () => {
    const incomeByCategory: Record<string, number> = {};
    const expensesByCategory: Record<string, number> = {};
    
    transactions.forEach(t => {
      if (t.type === 'income') {
        incomeByCategory[t.category] = (incomeByCategory[t.category] || 0) + t.amount;
      } else {
        expensesByCategory[t.category] = (expensesByCategory[t.category] || 0) + t.amount;
      }
    });
    
    return {
      totalIncome: Object.values(incomeByCategory).reduce((sum, val) => sum + val, 0),
      totalExpenses: Object.values(expensesByCategory).reduce((sum, val) => sum + val, 0),
      netProfit: Object.values(incomeByCategory).reduce((sum, val) => sum + val, 0) - 
                Object.values(expensesByCategory).reduce((sum, val) => sum + val, 0),
      incomeByCategory,
      expensesByCategory
    };
  };

  const simulateInvestment = (amount: number, years: number, ratePercent: number = economyStats.investmentReturns) => {
    const rate = ratePercent / 100;
    const futureValue = amount * Math.pow(1 + rate, years);
    const profit = futureValue - amount;
    
    return {
      initialAmount: amount,
      years,
      ratePercent,
      futureValue,
      profit,
      formattedFutureValue: formatMoney(Math.round(futureValue)),
      formattedProfit: formatMoney(Math.round(profit))
    };
  };

  return {
    balance,
    economyStats,
    transactions,
    loading,
    addTransaction,
    canAfford,
    makePayment,
    receivePayment,
    getRecentTransactions,
    getTransactionsByCategory,
    calculateFinancialReport,
    simulateInvestment,
    formatMoney
  };
};
