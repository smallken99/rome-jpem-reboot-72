import { useState, useEffect } from 'react';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  description: string;
  category: string;
  source: string;
  target?: string;
  type: 'income' | 'expense';
  recipient: string;
}

export interface EconomyStats {
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
  incomeByCategory: Record<string, number>;
  expensesByCategory: Record<string, number>;
}

export interface Recipient {
  id: string;
  name: string;
  relationship: string;
  lastTransaction?: string;
  type: string;
}

export interface FinancialStats {
  balance: number;
  weeklyIncome: number;
  weeklyExpenses: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  yearly: number;
  monthly: number;
  categories: Array<{ 
    name: string; 
    amount: number; 
    percentage: number;
  }>;
}

export const useMonetaryManagement = () => {
  const [balance, setBalance] = useState(10000);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [recipients, setRecipients] = useState<Recipient[]>([
    { id: 'r1', name: 'Temple de Jupiter', relationship: 'Religieux' },
    { id: 'r2', name: 'Marchand Tiberius', relationship: 'Commerce' },
    { id: 'r3', name: 'Sénat', relationship: 'Politique' }
  ]);
  
  const [economyStats, setEconomyStats] = useState<EconomyStats>({
    totalIncome: 0,
    totalExpenses: 0,
    netBalance: 0,
    incomeByCategory: {},
    expensesByCategory: {}
  });
  
  const [incomeStats, setIncomeStats] = useState<FinancialStats>({
    balance: 10000,
    weeklyIncome: 500,
    weeklyExpenses: 300,
    monthlyIncome: 2000,
    monthlyExpenses: 1200,
    yearly: 24000,
    monthly: 2000,
    categories: [
      { name: 'Propriétés', amount: 5000, percentage: 50 },
      { name: 'Investissements', amount: 2000, percentage: 20 },
      { name: 'Cadeaux', amount: 1000, percentage: 10 },
      { name: 'Autre', amount: 500, percentage: 5 }
    ]
  });
  
  const [expenseStats, setExpenseStats] = useState<FinancialStats>({
    balance: 10000,
    weeklyIncome: 500,
    weeklyExpenses: 300,
    monthlyIncome: 2000,
    monthlyExpenses: 1200,
    yearly: 24000,
    monthly: 2000,
    categories: [
      { name: 'Entretien', amount: 1500, percentage: 30 },
      { name: 'Personnel', amount: 2000, percentage: 40 },
      { name: 'Nourriture', amount: 1000, percentage: 20 },
      { name: 'Cadeaux', amount: 800, percentage: 16 },
      { name: 'Impôts', amount: 1200, percentage: 24 }
    ]
  });

  useEffect(() => {
    let income = 0;
    let expenses = 0;
    const incomeByCategory: Record<string, number> = {};
    const expensesByCategory: Record<string, number> = {};
    
    transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        income += transaction.amount;
        incomeByCategory[transaction.category] = (incomeByCategory[transaction.category] || 0) + transaction.amount;
      } else {
        expenses += transaction.amount;
        expensesByCategory[transaction.category] = (expensesByCategory[transaction.category] || 0) + transaction.amount;
      }
    });
    
    setEconomyStats({
      totalIncome: income,
      totalExpenses: expenses,
      netBalance: income - expenses,
      incomeByCategory,
      expensesByCategory
    });
  }, [transactions]);

  const canAfford = (amount: number): boolean => {
    return balance >= amount;
  };

  const makePayment = (amount: number, recipient: string, category: string): boolean => {
    if (!canAfford(amount)) return false;
    
    const transaction: Transaction = {
      id: `tx-${Date.now()}`,
      date: new Date().toISOString(),
      amount,
      description: `Paiement à ${recipient}`,
      category,
      source: 'Compte personnel',
      target: recipient,
      type: 'expense',
      recipient
    };
    
    setTransactions(prev => [...prev, transaction]);
    setBalance(prev => prev - amount);
    
    return true;
  };

  const receivePayment = (amount: number, source: string, category: string): boolean => {
    const transaction: Transaction = {
      id: `tx-${Date.now()}`,
      date: new Date().toISOString(),
      amount,
      description: `Paiement reçu de ${source}`,
      category,
      source,
      type: 'income',
      recipient: source
    };
    
    setTransactions(prev => [...prev, transaction]);
    setBalance(prev => prev + amount);
    
    return true;
  };

  const recordIncome = (income: number, source: string, category: string): void => {
    receivePayment(income, source, category);
  };

  return {
    balance,
    transactions,
    economyStats,
    canAfford,
    makePayment,
    receivePayment,
    recipients,
    incomeStats,
    expenseStats,
    recordIncome
  };
};
