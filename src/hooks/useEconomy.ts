
import { useEffect, useState } from 'react';
import { economyService, Transaction } from '@/services/economyService';

/**
 * Hook pour la gestion économique simplifié
 */
export function useEconomy() {
  const [balance, setBalance] = useState(economyService.getBalance());
  const [transactions, setTransactions] = useState<Transaction[]>(economyService.getTransactions());
  
  useEffect(() => {
    // S'abonner aux changements de solde
    const unsubscribeBalance = economyService.subscribeToBalance(newBalance => {
      setBalance(newBalance);
    });
    
    // S'abonner aux changements de transactions
    const unsubscribeTransactions = economyService.subscribeToTransactions(newTransactions => {
      setTransactions(newTransactions);
    });
    
    // Nettoyage
    return () => {
      unsubscribeBalance();
      unsubscribeTransactions();
    };
  }, []);
  
  return {
    balance,
    transactions,
    // Fonctions d'économie
    addTransaction: economyService.addTransaction.bind(economyService),
    removeTransaction: economyService.removeTransaction.bind(economyService),
    canAfford: economyService.canAfford.bind(economyService),
    makePayment: economyService.makePayment.bind(economyService),
    receivePayment: economyService.receivePayment.bind(economyService),
    // Fonctions analytiques
    getTransactionsByCategory: economyService.getTransactionsByCategory.bind(economyService),
    getTransactionsByType: economyService.getTransactionsByType.bind(economyService),
    getTotalIncome: economyService.getTotalIncome.bind(economyService),
    getTotalExpenses: economyService.getTotalExpenses.bind(economyService)
  };
}
