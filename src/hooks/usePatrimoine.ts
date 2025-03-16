
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
      category: 'Immobilier',
      type: 'expense',
      date: new Date().toISOString(),
      source: 'Patrimoine personnel',
      approved: true
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
      category: 'Immobilier',
      type: 'income',
      date: new Date().toISOString(),
      source: 'Patrimoine personnel',
      approved: true
    });
    
    // Mettre à jour le solde
    setBalance(prev => prev + property.value);
    
    // Supprimer la propriété
    setProperties(prev => prev.filter(p => p.id !== id));
  }, [properties, addEconomieRecord]);
  
  const buildingPurchased = useCallback((name: string, cost: number) => {
    setBalance(prev => prev - cost);
  }, []);
  
  const buildingSold = useCallback((name: string, amount: number) => {
    setBalance(prev => prev + amount);
  }, []);
  
  return {
    properties,
    balance,
    addProperty,
    updateProperty,
    removeProperty,
    buildingPurchased,
    buildingSold
  };
};
