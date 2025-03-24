
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

export interface Transaction {
  id: string;
  amount: number;
  source: string;
  category: string;
  description: string;
  date: Date;
  type: 'income' | 'expense';
}

export const useEconomy = (initialBalance = 100000) => {
  const [balance, setBalance] = useState(initialBalance);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  /**
   * Vérifie si l'utilisateur a assez de fonds pour une dépense
   */
  const canAfford = useCallback((amount: number): boolean => {
    return balance >= amount;
  }, [balance]);
  
  /**
   * Effectue un paiement (dépense)
   */
  const makePayment = useCallback((amount: number, recipient: string, category: string, description?: string): boolean => {
    if (!canAfford(amount)) {
      toast.error(`Fonds insuffisants pour effectuer ce paiement de ${amount.toLocaleString()} As`);
      return false;
    }
    
    // Générer un ID unique
    const id = `trans-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // Créer la transaction
    const transaction: Transaction = {
      id,
      amount: -amount, // Montant négatif pour une dépense
      source: recipient, // Le destinataire devient la source de la transaction
      category,
      description: description || `Paiement à ${recipient}`,
      date: new Date(),
      type: 'expense'
    };
    
    // Ajouter la transaction
    setTransactions(prev => [transaction, ...prev]);
    
    // Mettre à jour le solde
    setBalance(prev => prev - amount);
    
    return true;
  }, [canAfford]);
  
  /**
   * Reçoit un paiement (revenu)
   */
  const receivePayment = useCallback((amount: number, source: string, category: string, description?: string): boolean => {
    // Générer un ID unique
    const id = `trans-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // Créer la transaction
    const transaction: Transaction = {
      id,
      amount,
      source,
      category,
      description: description || `Paiement reçu de ${source}`,
      date: new Date(),
      type: 'income'
    };
    
    // Ajouter la transaction
    setTransactions(prev => [transaction, ...prev]);
    
    // Mettre à jour le solde
    setBalance(prev => prev + amount);
    
    return true;
  }, []);
  
  /**
   * Calculer les statistiques financières
   */
  const getFinancialStats = useCallback(() => {
    const now = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(now.getMonth() - 1);
    
    // Filtrer les transactions du dernier mois
    const recentTransactions = transactions.filter(t => t.date >= oneMonthAgo);
    
    // Calculer les revenus et dépenses
    const monthlyIncome = recentTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const monthlyExpenses = recentTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
    // Calculer par catégorie
    const incomeByCategory = transactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {} as Record<string, number>);
    
    const expensesByCategory = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
        return acc;
      }, {} as Record<string, number>);
    
    return {
      balance,
      monthlyIncome,
      monthlyExpenses,
      netIncome: monthlyIncome - monthlyExpenses,
      incomeByCategory,
      expensesByCategory
    };
  }, [balance, transactions]);
  
  return {
    balance,
    transactions,
    canAfford,
    makePayment,
    receivePayment,
    getFinancialStats
  };
};
