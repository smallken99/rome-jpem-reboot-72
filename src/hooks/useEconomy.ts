
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { usePatrimoine } from './usePatrimoine';
import { useMonetaryManagement } from '@/components/proprietes/property-management/hooks/useMonetaryManagement';

export type EconomicTransaction = {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  date: Date;
  source: 'property' | 'political' | 'family' | 'commerce' | 'other';
};

export function useEconomy() {
  // Récupération des hooks existants liés à l'économie
  const patrimoine = usePatrimoine();
  const monetaryManagement = useMonetaryManagement();
  
  // État pour les transactions économiques globales
  const [transactions, setTransactions] = useState<EconomicTransaction[]>([]);
  
  // Balance totale (la source de vérité)
  const [balance, setBalance] = useState<number>(patrimoine.balance);
  
  // Synchroniser la balance avec les autres systèmes
  const syncBalance = useCallback(() => {
    // Mettre à jour les balances des autres systèmes
    patrimoine.updateBalance(balance - patrimoine.balance);
    
    // Les autres systèmes sont maintenant synchronisés avec la balance centrale
  }, [balance, patrimoine]);
  
  // Ajouter une transaction et mettre à jour le solde
  const addTransaction = useCallback((
    amount: number, 
    type: 'income' | 'expense', 
    category: string, 
    description: string,
    source: 'property' | 'political' | 'family' | 'commerce' | 'other' = 'other'
  ) => {
    // Créer une nouvelle transaction
    const newTransaction: EconomicTransaction = {
      id: `transaction-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      amount,
      type,
      category,
      description,
      date: new Date(),
      source
    };
    
    // Mettre à jour le solde
    const newBalance = type === 'income' 
      ? balance + amount 
      : balance - amount;
    
    // Vérifier si le solde devient négatif
    if (newBalance < 0) {
      toast.error("Transaction impossible: fonds insuffisants");
      return false;
    }
    
    // Mettre à jour le solde et ajouter la transaction
    setBalance(newBalance);
    setTransactions(prev => [newTransaction, ...prev]);
    
    // Synchroniser avec les autres systèmes économiques
    syncBalance();
    
    // Transaction réussie
    const message = type === 'income' 
      ? `Revenus: +${amount.toLocaleString()} As (${category})`
      : `Dépense: -${amount.toLocaleString()} As (${category})`;
    
    toast.success(message);
    return true;
  }, [balance, syncBalance]);
  
  // Vérifier si une dépense est possible
  const canAfford = useCallback((amount: number) => {
    return balance >= amount;
  }, [balance]);
  
  // Effectuer un paiement (version simplifiée)
  const makePayment = useCallback((
    amount: number,
    recipient: string,
    category: string,
    description: string
  ) => {
    if (!canAfford(amount)) {
      toast.error(`Fonds insuffisants pour le paiement de ${amount.toLocaleString()} As`);
      return false;
    }
    
    // Effectuer la transaction
    return addTransaction(
      amount,
      'expense',
      category,
      `Paiement à ${recipient}: ${description}`
    );
  }, [addTransaction, canAfford]);
  
  // Recevoir un paiement
  const receivePayment = useCallback((
    amount: number,
    source: string,
    category: string,
    description: string
  ) => {
    return addTransaction(
      amount,
      'income',
      category,
      `Reçu de ${source}: ${description}`
    );
  }, [addTransaction]);
  
  return {
    // Propriétés
    balance,
    transactions,
    patrimoine,
    monetaryManagement,
    
    // Méthodes
    addTransaction,
    canAfford,
    makePayment,
    receivePayment,
    syncBalance
  };
}
