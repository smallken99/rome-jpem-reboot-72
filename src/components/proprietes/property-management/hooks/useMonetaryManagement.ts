
import { useState, useEffect } from 'react';
import { useEconomy } from '@/hooks/useEconomy';

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
  const economy = useEconomy();
  
  // État pour les transactions
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  // Utiliser la balance du système économique central
  const balance = economy.balance;
  
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
  
  // Synchroniser les transactions avec le système économique
  useEffect(() => {
    const economicTransactions = economy.transactions;
    
    // Convertir les transactions économiques au format attendu par ce hook
    const formattedTransactions: Transaction[] = economicTransactions.map(et => ({
      id: et.id,
      date: et.date,
      amount: et.amount,
      recipient: et.description.split(':')[0] || 'Inconnu',
      description: et.description.split(':')[1]?.trim() || et.description,
      type: et.type,
      category: et.category
    }));
    
    setTransactions(formattedTransactions);
  }, [economy.transactions]);
  
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
    total: transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0),
    monthly: 30000, // Estimation mensuelle
    categories: [
      { name: 'Entretien des propriétés', amount: 12000, percentage: 40 },
      { name: 'Personnel', amount: 8000, percentage: 27 },
      { name: 'Relations clientèle', amount: 5000, percentage: 17 },
      { name: 'Impôts et taxes', amount: 3000, percentage: 10 },
      { name: 'Divers', amount: 2000, percentage: 6 },
    ]
  };
  
  // Ajouter une transaction via le système économique centralisé
  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    if (transaction.type === 'income') {
      return economy.receivePayment(
        transaction.amount,
        transaction.recipient,
        transaction.category,
        transaction.description
      );
    } else {
      return economy.makePayment(
        transaction.amount,
        transaction.recipient,
        transaction.category,
        transaction.description
      );
    }
  };
  
  // Effectuer un paiement
  const makePayment = (
    recipientId: string, 
    amount: number, 
    description: string, 
    category: string
  ) => {
    if (amount <= 0 || !economy.canAfford(amount)) {
      throw new Error(amount <= 0 
        ? 'Le montant doit être positif' 
        : 'Fonds insuffisants pour ce paiement');
    }
    
    const recipient = recipients.find(r => r.id === recipientId);
    if (!recipient) {
      throw new Error('Destinataire non trouvé');
    }
    
    return economy.makePayment(
      amount,
      recipient.name,
      category,
      description
    );
  };
  
  return {
    balance,
    transactions,
    recipients,
    addTransaction,
    makePayment,
    incomeStats,
    expenseStats
  };
};
