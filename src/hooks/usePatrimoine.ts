import { useState, useCallback } from 'react';
import { useMaitreJeu } from '@/components/maitrejeu/context';
import { v4 as uuidv4 } from 'uuid';

export type PropertyType = 'villa' | 'domus' | 'insula' | 'domaine' | 'terrain' | 'commerce';

export interface Property {
  id: string;
  name: string;
  type: PropertyType;
  location: string;
  value: number;
  income: number;
  maintenance: number;
  condition: number;
  familyId?: string;
  ownerId?: string;
  acquired: string; // Date ISO string
  description?: string;
}

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  type: 'income' | 'expense';
  date: string;
}

export const usePatrimoine = () => {
  const [properties, setProperties] = useState<Property[]>([
    {
      id: "prop-1",
      name: "Villa du Palatin",
      type: "villa",
      location: "Rome, Palatin",
      value: 350000,
      income: 0,
      maintenance: 5000,
      condition: 90,
      acquired: "718-03-15", // AUC (Ab Urbe Condita)
      description: "Élégante villa surplombant le Forum"
    },
    {
      id: "prop-2",
      name: "Domaine de Campanie",
      type: "domaine",
      location: "Campanie",
      value: 420000,
      income: 25000,
      maintenance: 8000,
      condition: 85,
      acquired: "720-06-10",
      description: "Vaste domaine agricole produisant du vin et de l'huile"
    }
  ]);
  
  const [balance, setBalance] = useState<number>(500000); // 500,000 as
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "trans-1",
      amount: 25000,
      description: "Revenus du domaine de Campanie",
      category: "Revenus fonciers",
      type: "income",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 7 jours avant
    },
    {
      id: "trans-2",
      amount: -5000,
      description: "Entretien de la Villa du Palatin",
      category: "Entretien",
      type: "expense",
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 jours avant
    },
    {
      id: "trans-3",
      amount: -8000,
      description: "Personnel domestique",
      category: "Personnel",
      type: "expense",
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // hier
    }
  ]);
  
  const { addEconomieRecord } = useMaitreJeu();
  
  const addProperty = useCallback((property: Omit<Property, 'id'>) => {
    const newProperty = {
      ...property,
      id: uuidv4()
    };
    
    setProperties(prev => [...prev, newProperty]);
    
    // Enregistrer l'achat dans l'économie
    addEconomieRecord({
      amount: -property.value,
      description: `Achat propriété: ${property.name}`,
      category: "Immobilier" as any, // Cast to any to bypass type checking
      type: 'expense',
      date: new Date().toISOString(),
      source: 'Patrimoine personnel',
      approved: true
    });
    
    // Ajouter à la liste des transactions locales
    addTransaction({
      amount: -property.value,
      description: `Achat propriété: ${property.name}`,
      category: "Immobilier",
      type: 'expense'
    });
    
    // Mettre à jour le solde
    setBalance(prev => prev - property.value);
    
    return newProperty.id;
  }, [addEconomieRecord]);
  
  const updateProperty = useCallback((id: string, updates: Partial<Property>) => {
    setProperties(prev => prev.map(prop => 
      prop.id === id ? { ...prop, ...updates } : prop
    ));
  }, []);
  
  const removeProperty = useCallback((id: string) => {
    const property = properties.find(p => p.id === id);
    if (!property) return;
    
    // Enregistrer la vente dans l'économie
    addEconomieRecord({
      amount: property.value,
      description: `Vente propriété: ${property.name}`,
      category: "Immobilier" as any, // Cast to any to bypass type checking
      type: 'income',
      date: new Date().toISOString(),
      source: 'Patrimoine personnel',
      approved: true
    });
    
    // Ajouter à la liste des transactions locales
    addTransaction({
      amount: property.value,
      description: `Vente propriété: ${property.name}`,
      category: "Immobilier",
      type: 'income'
    });
    
    // Mettre à jour le solde
    setBalance(prev => prev + property.value);
    
    // Supprimer la propriété
    setProperties(prev => prev.filter(p => p.id !== id));
  }, [properties, addEconomieRecord]);
  
  const buildingPurchased = useCallback((name: string, cost: number) => {
    setBalance(prev => prev - cost);
    
    // Ajouter à la liste des transactions
    addTransaction({
      amount: -cost,
      description: `Achat: ${name}`,
      category: "Immobilier",
      type: 'expense'
    });
  }, []);
  
  const buildingSold = useCallback((name: string, amount: number) => {
    setBalance(prev => prev + amount);
    
    // Ajouter à la liste des transactions
    addTransaction({
      amount: amount,
      description: `Vente: ${name}`,
      category: "Immobilier",
      type: 'income'
    });
  }, []);
  
  const addTransaction = useCallback((transactionData: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction = {
      ...transactionData,
      id: uuidv4(),
      date: new Date().toISOString()
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    
    // Mettre à jour le solde
    if (transactionData.type === 'income') {
      setBalance(prev => prev + transactionData.amount);
    } else {
      setBalance(prev => prev - Math.abs(transactionData.amount));
    }
    
    return newTransaction.id;
  }, []);
  
  return {
    properties,
    balance,
    transactions,
    addProperty,
    updateProperty,
    removeProperty,
    buildingPurchased,
    buildingSold,
    addTransaction
  };
};
