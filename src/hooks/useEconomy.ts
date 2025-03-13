
import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Transaction, EconomyStats, TransactionFilter } from '@/types/EconomyTypes';

// Type pour les nouveaux paramètres de transaction
export type TransactionCreationParams = Omit<Transaction, 'id' | 'date'>;

export const useEconomy = () => {
  const [balance, setBalance] = useState<number>(10000); // Solde initial
  const [transactions, setTransactions] = useState<Transaction[]>([]); // Liste des transactions
  const [loading, setLoading] = useState<boolean>(true); // État de chargement
  
  // Charger les données économiques
  useEffect(() => {
    // Simulation du chargement de données depuis une API
    const loadEconomyData = async () => {
      setLoading(true);
      try {
        // Ici, on pourrait appeler une vraie API
        setTimeout(() => {
          // Données de test
          const mockTransactions: Transaction[] = [
            {
              id: uuidv4(),
              type: 'income',
              amount: 500,
              category: 'Agriculture',
              description: 'Vente de blé',
              date: new Date(Date.now() - 86400000 * 10), // 10 jours avant
              source: 'Domaine de Tusculum'
            },
            {
              id: uuidv4(),
              type: 'expense',
              amount: 200,
              category: 'Domestique',
              description: 'Achat d\'esclaves',
              date: new Date(Date.now() - 86400000 * 5), // 5 jours avant
              source: 'Marché aux esclaves'
            },
            {
              id: uuidv4(),
              type: 'income',
              amount: 300,
              category: 'Commerce',
              description: 'Investissement maritime',
              date: new Date(Date.now() - 86400000 * 2), // 2 jours avant
              source: 'Port d\'Ostie'
            }
          ];
          
          setTransactions(mockTransactions);
          
          // Calculer le solde en fonction des transactions
          const calculatedBalance = mockTransactions.reduce((total, transaction) => {
            return transaction.type === 'income' 
              ? total + transaction.amount 
              : total - transaction.amount;
          }, 10000); // Solde initial
          
          setBalance(calculatedBalance);
          setLoading(false);
        }, 1000); // Simuler un délai réseau
      } catch (error) {
        console.error("Erreur lors du chargement des données économiques:", error);
        setLoading(false);
      }
    };
    
    loadEconomyData();
  }, []);
  
  // Ajouter une nouvelle transaction
  const addTransaction = useCallback((transactionParams: TransactionCreationParams): Transaction => {
    const newTransaction: Transaction = {
      id: uuidv4(),
      date: new Date(),
      ...transactionParams
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    
    // Mettre à jour le solde
    setBalance(prev => 
      transactionParams.type === 'income' 
        ? prev + transactionParams.amount 
        : prev - transactionParams.amount
    );
    
    return newTransaction;
  }, []);
  
  // Recevoir un paiement
  const receivePayment = useCallback((amount: number, description: string, category: string = 'Divers'): boolean => {
    if (amount <= 0) return false;
    
    addTransaction({
      type: 'income',
      amount,
      description,
      category
    });
    
    return true;
  }, [addTransaction]);
  
  // Effectuer un paiement
  const makePayment = useCallback((amount: number, description: string, category: string = 'Divers'): boolean => {
    if (amount <= 0 || balance < amount) return false;
    
    addTransaction({
      type: 'expense',
      amount,
      description,
      category
    });
    
    return true;
  }, [addTransaction, balance]);
  
  // Filtrer les transactions
  const filterTransactions = useCallback((filter: TransactionFilter): Transaction[] => {
    return transactions.filter(transaction => {
      // Filtrer par type
      if (filter.type && transaction.type !== filter.type) return false;
      
      // Filtrer par catégorie
      if (filter.category && transaction.category !== filter.category) return false;
      
      // Filtrer par montant
      if (filter.minAmount !== undefined && transaction.amount < filter.minAmount) return false;
      if (filter.maxAmount !== undefined && transaction.amount > filter.maxAmount) return false;
      
      // Filtrer par date
      const transactionDate = new Date(transaction.date);
      if (filter.startDate && transactionDate < filter.startDate) return false;
      if (filter.endDate && transactionDate > filter.endDate) return false;
      
      // Filtrer par recherche
      if (filter.search) {
        const searchLower = filter.search.toLowerCase();
        return (
          transaction.description.toLowerCase().includes(searchLower) ||
          transaction.category.toLowerCase().includes(searchLower) ||
          (transaction.source && transaction.source.toLowerCase().includes(searchLower))
        );
      }
      
      return true;
    });
  }, [transactions]);
  
  // Calculer les statistiques économiques
  const calculateEconomyStats = useCallback((): EconomyStats => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
      
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
      
    // Calculer la ventilation par catégorie
    const categoryBreakdown: Record<string, number> = {};
    transactions.forEach(t => {
      if (!categoryBreakdown[t.category]) {
        categoryBreakdown[t.category] = 0;
      }
      
      categoryBreakdown[t.category] += t.type === 'income' ? t.amount : -t.amount;
    });
    
    // Calculer les revenus mensuels/annuels (simulation)
    const monthlyIncome = Math.round(totalIncome / 3); // Comme si les transactions représentaient 3 mois
    const monthlyExpenses = Math.round(totalExpenses / 3);
    const annualIncome = monthlyIncome * 12;
    const annualExpenses = monthlyExpenses * 12;
    
    return {
      totalIncome,
      totalExpenses,
      balance,
      transactionCount: transactions.length,
      categoryBreakdown,
      // Statistiques supplémentaires simulées
      annualIncome,
      annualExpenses,
      monthlyIncome,
      monthlyExpenses,
      annualTaxes: Math.round(annualIncome * 0.1), // 10% de revenus annuels
      annualTithes: Math.round(annualIncome * 0.05), // 5% de revenus annuels
      inflation: 2.5 // Taux d'inflation simulé
    };
  }, [transactions, balance]);
  
  // Retourner les données et fonctions
  return {
    balance,
    economyStats: calculateEconomyStats(),
    transactions,
    loading,
    addTransaction,
    receivePayment,
    makePayment,
    filterTransactions
  };
};
