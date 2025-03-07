
import { useState, useEffect } from 'react';

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
  // État pour le solde et les transactions
  const [balance, setBalance] = useState(250000);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
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
  
  // Simuler des transactions initiales
  useEffect(() => {
    const initialTransactions: Transaction[] = [
      {
        id: '1',
        date: new Date(2023, 2, 15),
        amount: 25000,
        recipient: 'Domaine viticole de Campanie',
        description: 'Revenus trimestriels',
        type: 'income',
        category: 'Production agricole'
      },
      {
        id: '2',
        date: new Date(2023, 2, 10),
        amount: 12000,
        recipient: 'Architecte Vitruvius',
        description: 'Rénovation de la Villa Urbana',
        type: 'expense',
        category: 'Entretien des propriétés'
      },
      {
        id: '3',
        date: new Date(2023, 2, 5),
        amount: 8000,
        recipient: 'Marchand d\'esclaves',
        description: 'Achat de 10 esclaves pour le domaine',
        type: 'expense',
        category: 'Personnel'
      },
      {
        id: '4',
        date: new Date(2023, 2, 1),
        amount: 15000,
        recipient: 'Insula de la Via Sacra',
        description: 'Loyers mensuels',
        type: 'income',
        category: 'Propriétés locatives'
      },
      {
        id: '5',
        date: new Date(2023, 1, 20),
        amount: 5000,
        recipient: 'Client Quintus Fabius',
        description: 'Prêt accordé',
        type: 'expense',
        category: 'Relations clientèle'
      }
    ];
    
    setTransactions(initialTransactions);
  }, []);
  
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
  
  // Ajouter une transaction
  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: Math.random().toString(36).substring(2, 11),
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    
    // Mettre à jour le solde
    if (transaction.type === 'income') {
      setBalance(prev => prev + transaction.amount);
    } else {
      setBalance(prev => prev - transaction.amount);
    }
  };
  
  // Effectuer un paiement
  const makePayment = (
    recipientId: string, 
    amount: number, 
    description: string, 
    category: string
  ) => {
    if (amount <= 0 || amount > balance) {
      throw new Error(amount <= 0 
        ? 'Le montant doit être positif' 
        : 'Fonds insuffisants pour ce paiement');
    }
    
    const recipient = recipients.find(r => r.id === recipientId);
    if (!recipient) {
      throw new Error('Destinataire non trouvé');
    }
    
    addTransaction({
      date: new Date(),
      amount,
      recipient: recipient.name,
      description,
      type: 'expense',
      category
    });
    
    return true;
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
