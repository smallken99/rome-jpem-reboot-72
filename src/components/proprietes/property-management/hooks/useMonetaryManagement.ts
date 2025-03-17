
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
}

export interface FinancialStats {
  balance: number;
  weeklyIncome: number;
  weeklyExpenses: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  yearlyIncome: number;
  yearlyExpenses: number;
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
  
  const [incomeStats, setIncomeStats] = useState<Record<string, number>>({
    'Propriétés': 5000,
    'Investissements': 2000,
    'Cadeaux': 1000,
    'Autre': 500
  });
  
  const [expenseStats, setExpenseStats] = useState<Record<string, number>>({
    'Entretien': 1500,
    'Personnel': 2000,
    'Nourriture': 1000,
    'Cadeaux': 800,
    'Impôts': 1200
  });

  // Calculate financial statistics
  useEffect(() => {
    // Calculate economy stats
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

  // Check if user can afford a transaction
  const canAfford = (amount: number): boolean => {
    return balance >= amount;
  };

  // Make a payment
  const makePayment = (amount: number, recipient: string, category: string): boolean => {
    if (!canAfford(amount)) return false;
    
    // Record the transaction
    const transaction: Transaction = {
      id: `tx-${Date.now()}`,
      date: new Date().toISOString(),
      amount,
      description: `Paiement à ${recipient}`,
      category,
      source: 'Compte personnel',
      target: recipient,
      type: 'expense'
    };
    
    setTransactions(prev => [...prev, transaction]);
    setBalance(prev => prev - amount);
    
    return true;
  };

  // Receive a payment
  const receivePayment = (amount: number, source: string, category: string): boolean => {
    // Record the transaction
    const transaction: Transaction = {
      id: `tx-${Date.now()}`,
      date: new Date().toISOString(),
      amount,
      description: `Paiement reçu de ${source}`,
      category,
      source,
      type: 'income'
    };
    
    setTransactions(prev => [...prev, transaction]);
    setBalance(prev => prev + amount);
    
    return true;
  };

  // Record income (alias for receivePayment to match expected interface)
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
