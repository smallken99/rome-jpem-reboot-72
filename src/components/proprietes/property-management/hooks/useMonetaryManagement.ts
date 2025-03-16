
import { useState, useEffect } from 'react';
import { useEconomy } from '@/hooks/useEconomy';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

export type Transaction = {
  id: string;
  date: Date;
  amount: number;
  recipient: string;
  description: string;
  type: 'income' | 'expense';
  category: string;
};

export type Recipient = {
  id: string;
  name: string;
  type: 'client' | 'fournisseur' | 'famille' | 'magistrat' | 'autre';
};

export type FinancialStats = {
  total: number;
  monthly: number;
  categories: {
    name: string;
    amount: number;
    percentage: number;
  }[];
};

export const useMonetaryManagement = () => {
  const patrimoine = usePatrimoine();
  const economy = useEconomy();
  
  // Transactions issues du patrimoine
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  // Utiliser la balance du patrimoine
  const balance = patrimoine.balance;
  
  // Liste des destinataires pour les paiements
  const [recipients] = useState<Recipient[]>([
    { id: '1', name: 'Famille Claudius', type: 'famille' },
    { id: '2', name: 'Marchand Titus Accius', type: 'fournisseur' },
    { id: '3', name: 'Tribun Marcus Valerius', type: 'magistrat' },
    { id: '4', name: 'Client Quintus Fabius', type: 'client' },
    { id: '5', name: 'Architecte Vitruvius', type: 'fournisseur' },
    { id: '6', name: 'Domaine de Tusculum', type: 'autre' },
    { id: '7', name: 'Temple de Jupiter', type: 'autre' },
  ]);
  
  // Synchroniser les transactions avec le patrimoine
  useEffect(() => {
    if (patrimoine.transactions) {
      // Convertir les transactions du patrimoine au format attendu
      const formattedTransactions: Transaction[] = patrimoine.transactions.map(pt => ({
        id: pt.id,
        date: new Date(pt.date),
        amount: pt.amount,
        recipient: pt.description.split(':')[0] || 'Inconnu',
        description: pt.description.split(':')[1]?.trim() || pt.description,
        type: pt.type,
        category: pt.category
      }));
      
      setTransactions(formattedTransactions);
    }
  }, [patrimoine.transactions]);
  
  // Calculer les statistiques des revenus à partir des vraies données
  const calculateIncomeStats = (): FinancialStats => {
    const incomeTransactions = transactions.filter(t => t.type === 'income');
    const total = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);
    
    // Grouper par catégorie
    const categoriesMap = new Map<string, number>();
    incomeTransactions.forEach(t => {
      const currentAmount = categoriesMap.get(t.category) || 0;
      categoriesMap.set(t.category, currentAmount + t.amount);
    });
    
    // Convertir en tableau de catégories avec pourcentages
    const categories = Array.from(categoriesMap.entries()).map(([name, amount]) => ({
      name,
      amount,
      percentage: total > 0 ? Math.round((amount / total) * 100) : 0
    }));
    
    // Trier par montant décroissant
    categories.sort((a, b) => b.amount - a.amount);
    
    return {
      total,
      monthly: Math.round(total / 12), // Estimation mensuelle basée sur le total
      categories
    };
  };
  
  // Calculer les statistiques des dépenses à partir des vraies données
  const calculateExpenseStats = (): FinancialStats => {
    const expenseTransactions = transactions.filter(t => t.type === 'expense');
    const total = expenseTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
    // Grouper par catégorie
    const categoriesMap = new Map<string, number>();
    expenseTransactions.forEach(t => {
      const currentAmount = categoriesMap.get(t.category) || 0;
      categoriesMap.set(t.category, currentAmount + Math.abs(t.amount));
    });
    
    // Convertir en tableau de catégories avec pourcentages
    const categories = Array.from(categoriesMap.entries()).map(([name, amount]) => ({
      name,
      amount,
      percentage: total > 0 ? Math.round((amount / total) * 100) : 0
    }));
    
    // Trier par montant décroissant
    categories.sort((a, b) => b.amount - a.amount);
    
    return {
      total,
      monthly: Math.round(total / 12), // Estimation mensuelle basée sur le total
      categories
    };
  };
  
  // Effectuer un paiement
  const makePayment = (
    recipientId: string, 
    amount: number, 
    description: string, 
    category: string
  ): boolean => {
    if (amount <= 0) {
      toast.error('Le montant doit être positif');
      return false;
    }
    
    if (amount > balance) {
      toast.error('Fonds insuffisants pour ce paiement');
      return false;
    }
    
    const recipient = recipients.find(r => r.id === recipientId);
    if (!recipient) {
      toast.error('Destinataire non trouvé');
      return false;
    }
    
    try {
      // Enregistrer la transaction dans le patrimoine
      patrimoine.addTransaction({
        amount: -amount, // Montant négatif pour une dépense
        description: `${recipient.name}: ${description}`,
        category: category,
        type: 'expense'
      });
      
      // Enregistrer également dans le système d'économie global
      economy.makePayment(
        amount,
        recipient.name,
        category
      );
      
      toast.success(`Paiement de ${amount.toLocaleString()} As effectué à ${recipient.name}`);
      return true;
    } catch (error) {
      console.error("Erreur lors du paiement:", error);
      toast.error("Une erreur est survenue lors du paiement");
      return false;
    }
  };
  
  // Enregistrer un revenu
  const recordIncome = (
    source: string,
    amount: number,
    description: string,
    category: string
  ): boolean => {
    if (amount <= 0) {
      toast.error('Le montant doit être positif');
      return false;
    }
    
    try {
      // Enregistrer la transaction dans le patrimoine
      patrimoine.addTransaction({
        amount: amount,
        description: `${source}: ${description}`,
        category: category,
        type: 'income'
      });
      
      // Enregistrer également dans le système d'économie global
      economy.recordIncome(
        amount,
        source,
        category
      );
      
      toast.success(`Revenu de ${amount.toLocaleString()} As enregistré`);
      return true;
    } catch (error) {
      console.error("Erreur lors de l'enregistrement du revenu:", error);
      toast.error("Une erreur est survenue lors de l'enregistrement du revenu");
      return false;
    }
  };
  
  // Filtrer les transactions
  const filterTransactions = (
    filters: {
      startDate?: Date,
      endDate?: Date,
      type?: 'income' | 'expense' | 'all',
      category?: string,
      minAmount?: number,
      maxAmount?: number,
      search?: string
    }
  ): Transaction[] => {
    return transactions.filter(transaction => {
      // Filtrer par date
      if (filters.startDate && transaction.date < filters.startDate) return false;
      if (filters.endDate && transaction.date > filters.endDate) return false;
      
      // Filtrer par type
      if (filters.type && filters.type !== 'all' && transaction.type !== filters.type) return false;
      
      // Filtrer par catégorie
      if (filters.category && transaction.category !== filters.category) return false;
      
      // Filtrer par montant
      if (filters.minAmount !== undefined && Math.abs(transaction.amount) < filters.minAmount) return false;
      if (filters.maxAmount !== undefined && Math.abs(transaction.amount) > filters.maxAmount) return false;
      
      // Filtrer par recherche textuelle
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        if (!transaction.description.toLowerCase().includes(searchTerm) &&
            !transaction.recipient.toLowerCase().includes(searchTerm) &&
            !transaction.category.toLowerCase().includes(searchTerm)) {
          return false;
        }
      }
      
      return true;
    });
  };
  
  return {
    balance,
    transactions,
    recipients,
    makePayment,
    recordIncome,
    filterTransactions,
    incomeStats: calculateIncomeStats(),
    expenseStats: calculateExpenseStats()
  };
};
