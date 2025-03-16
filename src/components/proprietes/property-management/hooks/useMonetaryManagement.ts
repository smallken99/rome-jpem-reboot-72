
import { useState, useEffect } from 'react';
import { useEconomy } from '@/hooks/useEconomy';
import { usePatrimoine } from '@/hooks/usePatrimoine';
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
  
  // Simuler des données de destinataires pour les paiements
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
  
  // Statistiques des revenus
  const incomeStats: FinancialStats = {
    total: transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0),
    monthly: 42000, // Estimation mensuelle
    categories: [
      { name: 'Production agricole', amount: 25000, percentage: 60 },
      { name: 'Propriétés locatives', amount: 15000, percentage: 35 },
      { name: 'Autres revenus', amount: 2000, percentage: 5 },
    ]
  };
  
  // Statistiques des dépenses
  const expenseStats: FinancialStats = {
    total: transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Math.abs(t.amount), 0),
    monthly: 30000, // Estimation mensuelle
    categories: [
      { name: 'Entretien des propriétés', amount: 12000, percentage: 40 },
      { name: 'Personnel', amount: 8000, percentage: 27 },
      { name: 'Relations clientèle', amount: 5000, percentage: 17 },
      { name: 'Impôts et taxes', amount: 3000, percentage: 10 },
      { name: 'Divers', amount: 2000, percentage: 6 },
    ]
  };
  
  // Effectuer un paiement
  const makePayment = (
    recipientId: string, 
    amount: number, 
    description: string, 
    category: string
  ): boolean => {
    if (amount <= 0 || amount > balance) {
      throw new Error(amount <= 0 
        ? 'Le montant doit être positif' 
        : 'Fonds insuffisants pour ce paiement');
    }
    
    const recipient = recipients.find(r => r.id === recipientId);
    if (!recipient) {
      throw new Error('Destinataire non trouvé');
    }
    
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
    
    return true;
  };
  
  return {
    balance,
    transactions,
    recipients,
    makePayment,
    incomeStats,
    expenseStats
  };
};
