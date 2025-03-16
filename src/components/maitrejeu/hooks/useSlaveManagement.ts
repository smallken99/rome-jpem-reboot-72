
import { useState, useCallback } from 'react';
import { useMaitreJeu } from '../context';
import { useEconomy } from '@/hooks/useEconomy';

interface SlaveTransaction {
  id: string;
  date: Date;
  quantity: number;
  price: number;
  type: 'purchase' | 'sale';
  location: string;
  assignedTo?: string;
}

interface SlaveMarketPrices {
  base: number;
  skilled: number;
  educated: number;
  gladiator: number;
}

export const useSlaveManagement = () => {
  const [slaveCount, setSlaveCount] = useState({
    total: 1000,
    available: 350,
    assigned: 650,
    byType: {
      household: 200,
      agricultural: 450,
      craftsmen: 150,
      mining: 100,
      other: 100
    }
  });
  
  const [slaveTransactions, setSlaveTransactions] = useState<SlaveTransaction[]>([]);
  
  const [marketPrices, setMarketPrices] = useState<SlaveMarketPrices>({
    base: 800,
    skilled: 1500,
    educated: 3000,
    gladiator: 5000
  });
  
  const { addEconomieRecord } = useMaitreJeu();
  const { makePayment, receivePayment } = useEconomy();
  
  // Purchase slaves
  const purchaseSlaves = useCallback((quantity: number, type: keyof typeof marketPrices = 'base', location: string = 'Rome') => {
    if (quantity <= 0) return false;
    
    const price = marketPrices[type];
    const totalCost = quantity * price;
    
    // Process the payment
    const success = makePayment(
      totalCost,
      `Marchand d'esclaves (${location})`,
      'Personnel'
    );
    
    if (success) {
      // Record the transaction
      const newTransaction: SlaveTransaction = {
        id: `slave-purchase-${Date.now()}`,
        date: new Date(),
        quantity,
        price,
        type: 'purchase',
        location
      };
      
      setSlaveTransactions(prev => [newTransaction, ...prev]);
      
      // Update slave count
      setSlaveCount(prev => ({
        ...prev,
        total: prev.total + quantity,
        available: prev.available + quantity
      }));
      
      // Record in economy
      addEconomieRecord({
        amount: -totalCost,
        description: `Achat de ${quantity} esclave${quantity > 1 ? 's' : ''} (${type})`,
        category: 'Esclaves',
        type: 'expense',
        date: {
          year: new Date().getFullYear(),
          season: 'Spring'
        },
        source: `Marché aux esclaves de ${location}`
      });
      
      return true;
    }
    
    return false;
  }, [marketPrices, makePayment, addEconomieRecord]);
  
  // Sell slaves
  const sellSlaves = useCallback((quantity: number, type: keyof typeof marketPrices = 'base', location: string = 'Rome') => {
    if (quantity <= 0 || quantity > slaveCount.available) return false;
    
    // Calculate sale price (70% of purchase price)
    const price = Math.round(marketPrices[type] * 0.7);
    const totalAmount = quantity * price;
    
    // Process the payment
    const success = receivePayment(
      totalAmount,
      `Marché aux esclaves (${location})`,
      'Personnel'
    );
    
    if (success) {
      // Record the transaction
      const newTransaction: SlaveTransaction = {
        id: `slave-sale-${Date.now()}`,
        date: new Date(),
        quantity,
        price,
        type: 'sale',
        location
      };
      
      setSlaveTransactions(prev => [newTransaction, ...prev]);
      
      // Update slave count
      setSlaveCount(prev => ({
        ...prev,
        total: prev.total - quantity,
        available: prev.available - quantity
      }));
      
      // Record in economy
      addEconomieRecord({
        amount: totalAmount,
        description: `Vente de ${quantity} esclave${quantity > 1 ? 's' : ''} (${type})`,
        category: 'Esclaves',
        type: 'income',
        date: {
          year: new Date().getFullYear(),
          season: 'Spring'
        },
        source: `Marché aux esclaves de ${location}`
      });
      
      return true;
    }
    
    return false;
  }, [slaveCount.available, marketPrices, receivePayment, addEconomieRecord]);
  
  // Assign slaves to a property or purpose
  const assignSlaves = useCallback((quantity: number, destination: string, slaveType?: string) => {
    if (quantity <= 0 || quantity > slaveCount.available) return false;
    
    // Update slave count
    setSlaveCount(prev => {
      // Determine which type is being assigned
      const type = slaveType || 'other';
      const byType = { ...prev.byType };
      
      if (type in byType) {
        byType[type as keyof typeof byType] += quantity;
      } else {
        byType.other += quantity;
      }
      
      return {
        ...prev,
        available: prev.available - quantity,
        assigned: prev.assigned + quantity,
        byType
      };
    });
    
    // Update the last transaction if it was an assignment
    setSlaveTransactions(prev => {
      const newTransaction: SlaveTransaction = {
        id: `slave-assignment-${Date.now()}`,
        date: new Date(),
        quantity,
        price: 0, // No cost for assignment
        type: 'purchase', // Just for tracking
        location: 'Internal',
        assignedTo: destination
      };
      
      return [newTransaction, ...prev];
    });
    
    return true;
  }, [slaveCount]);
  
  // Unassign slaves
  const unassignSlaves = useCallback((quantity: number, source: string, slaveType?: string) => {
    if (quantity <= 0 || quantity > slaveCount.assigned) return false;
    
    // Update slave count
    setSlaveCount(prev => {
      // Determine which type is being unassigned
      const type = slaveType || 'other';
      const byType = { ...prev.byType };
      
      if (type in byType && byType[type as keyof typeof byType] >= quantity) {
        byType[type as keyof typeof byType] -= quantity;
      } else {
        // Take from multiple categories if needed
        let remaining = quantity;
        for (const t in byType) {
          if (remaining <= 0) break;
          
          const available = byType[t as keyof typeof byType];
          const toRemove = Math.min(available, remaining);
          
          byType[t as keyof typeof byType] -= toRemove;
          remaining -= toRemove;
        }
      }
      
      return {
        ...prev,
        available: prev.available + quantity,
        assigned: prev.assigned - quantity,
        byType
      };
    });
    
    return true;
  }, [slaveCount]);
  
  // Update market prices
  const updateMarketPrices = useCallback((newPrices: Partial<SlaveMarketPrices>) => {
    setMarketPrices(prev => ({
      ...prev,
      ...newPrices
    }));
  }, []);
  
  return {
    slaveCount,
    marketPrices,
    slaveTransactions,
    purchaseSlaves,
    sellSlaves,
    assignSlaves,
    unassignSlaves,
    updateMarketPrices
  };
};
