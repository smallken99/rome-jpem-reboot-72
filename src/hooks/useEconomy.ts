
import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Transaction, EconomyStats } from '@/types/EconomyTypes';
import { useToast } from '@/components/ui/use-toast';

interface EconomyState {
  balance: number;
  transactions: Transaction[];
  stats: EconomyStats;
}

export const useEconomy = () => {
  const [state, setState] = useState<EconomyState>({
    balance: 150000,
    transactions: [],
    stats: {
      balance: 150000,
      monthlyIncome: 42000,
      monthlyExpenses: 30000,
      annualTaxes: 25000,
      inflation: 2.5
    }
  });
  
  const { toast } = useToast();
  
  useEffect(() => {
    // Charger les transactions simulées
    const mockTransactions: Transaction[] = [
      {
        id: uuidv4(),
        date: new Date(2023, 6, 15),
        amount: 25000,
        description: "Fermage: Domaine viticole",
        category: "Revenus agricoles",
        type: "income"
      },
      {
        id: uuidv4(),
        date: new Date(2023, 6, 12),
        amount: 15000,
        description: "Loyers: Insula Via Sacra",
        category: "Loyers urbains",
        type: "income"
      },
      {
        id: uuidv4(),
        date: new Date(2023, 6, 10),
        amount: 8000,
        description: "Entretien: Villa Urbana",
        category: "Entretien",
        type: "expense"
      },
      {
        id: uuidv4(),
        date: new Date(2023, 6, 5),
        amount: 12000,
        description: "Salaires: Personnel domestique",
        category: "Personnel",
        type: "expense"
      },
      {
        id: uuidv4(),
        date: new Date(2023, 6, 1),
        amount: 5000,
        description: "Tribut: Quaestor Urbanus",
        category: "Impôts",
        type: "expense"
      }
    ];
    
    setState(prev => ({
      ...prev,
      transactions: mockTransactions,
    }));
  }, []);
  
  // Vérifier si les fonds sont suffisants
  const canAfford = useCallback((amount: number): boolean => {
    return state.balance >= amount;
  }, [state.balance]);
  
  // Effectuer un paiement
  const makePayment = useCallback((amount: number, recipient: string, category: string): boolean => {
    if (!canAfford(amount)) {
      toast({
        title: "Fonds insuffisants",
        description: "Vous ne disposez pas des fonds nécessaires pour cette transaction.",
        variant: "destructive"
      });
      return false;
    }
    
    const transaction: Transaction = {
      id: uuidv4(),
      date: new Date(),
      amount,
      description: `Paiement à: ${recipient}`,
      category,
      type: "expense"
    };
    
    setState(prev => ({
      ...prev,
      balance: prev.balance - amount,
      transactions: [transaction, ...prev.transactions],
      stats: {
        ...prev.stats,
        balance: prev.stats.balance - amount
      }
    }));
    
    toast({
      title: "Paiement effectué",
      description: `${amount.toLocaleString()} As ont été versés à ${recipient}.`
    });
    
    return true;
  }, [canAfford, toast]);
  
  // Recevoir un paiement
  const receivePayment = useCallback((amount: number, source: string, category: string): boolean => {
    const transaction: Transaction = {
      id: uuidv4(),
      date: new Date(),
      amount,
      description: `Reçu de: ${source}`,
      category,
      type: "income"
    };
    
    setState(prev => ({
      ...prev,
      balance: prev.balance + amount,
      transactions: [transaction, ...prev.transactions],
      stats: {
        ...prev.stats,
        balance: prev.stats.balance + amount
      }
    }));
    
    toast({
      title: "Paiement reçu",
      description: `${amount.toLocaleString()} As ont été reçus de ${source}.`
    });
    
    return true;
  }, [toast]);
  
  return {
    balance: state.balance,
    transactions: state.transactions,
    economyStats: state.stats,
    canAfford,
    makePayment,
    receivePayment
  };
};
