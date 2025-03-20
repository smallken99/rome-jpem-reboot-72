
import { useState, useCallback } from 'react';
import { Property, PropertyStats, Transaction } from '@/types/patrimoine';
import { v4 as uuidv4 } from 'uuid';
import { useTransactions } from './useTransactions';

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  
  // Ajouter une nouvelle propriété
  const addProperty = useCallback((property: Omit<Property, 'id'>) => {
    const newProperty: Property = {
      ...property,
      id: uuidv4(),
      acquired: new Date().toISOString(),
    };
    
    setProperties(prev => [...prev, newProperty]);
    return newProperty.id;
  }, []);
  
  // Supprimer une propriété
  const removeProperty = useCallback((id: string) => {
    setProperties(prev => prev.filter(property => property.id !== id));
  }, []);
  
  // Mettre à jour une propriété
  const updateProperty = useCallback((id: string, updates: Partial<Property>) => {
    setProperties(prev => 
      prev.map(property => 
        property.id === id ? { ...property, ...updates } : property
      )
    );
  }, []);
  
  // Calculer les statistiques des propriétés
  const calculateStats = useCallback((): PropertyStats => {
    const stats: PropertyStats = {
      totalValue: 0,
      totalIncome: 0,
      totalMaintenance: 0,
      propertyCount: properties.length,
      averageCondition: 0
    };
    
    if (properties.length === 0) return stats;
    
    properties.forEach(property => {
      stats.totalValue += property.value;
      stats.totalIncome += property.income;
      stats.totalMaintenance += property.maintenance;
      stats.averageCondition += property.condition;
    });
    
    stats.averageCondition /= properties.length;
    
    return stats;
  }, [properties]);
  
  return {
    properties,
    addProperty,
    removeProperty,
    updateProperty,
    calculateStats
  };
};

export const usePatrimoine = () => {
  const {
    properties,
    addProperty,
    removeProperty,
    updateProperty,
    calculateStats
  } = useProperties();

  // Intégrer les transactions et le solde
  const {
    balance,
    transactions,
    addTransaction,
    getRecentTransactions,
    getTransactionsByCategory,
    getTransactionsByType,
    setBalance
  } = useTransactions();

  // Fonction pour obtenir les statistiques des propriétés
  const getPropertyStats = (): PropertyStats => {
    return calculateStats();
  };

  // Fonction pour enregistrer l'achat d'un bâtiment
  const buildingPurchased = (buildingName: string, cost: number): void => {
    addTransaction({
      amount: -cost,
      description: `Achat de: ${buildingName}`,
      category: "Acquisition immobilière",
      type: "expense"
    });
  };

  // Fonction pour enregistrer la vente d'un bâtiment
  const buildingSold = (buildingName: string, value: number): void => {
    addTransaction({
      amount: value,
      description: `Vente de: ${buildingName}`,
      category: "Vente immobilière",
      type: "income"
    });
  };

  // Fonction pour enregistrer une vente de propriété standard
  const sellProperty = (propertyId: string) => {
    const property = properties.find(p => p.id === propertyId);
    if (!property) return false;
    
    // Ajouter la transaction
    addTransaction({
      amount: property.value,
      description: `Vente de: ${property.name}`,
      category: "Vente immobilière",
      type: "income"
    });
    
    // Supprimer la propriété
    removeProperty(propertyId);
    return true;
  };

  return {
    properties,
    addProperty,
    removeProperty,
    updateProperty,
    calculateStats,
    getPropertyStats,
    // Nouvelles propriétés et méthodes
    balance,
    transactions,
    addTransaction,
    getRecentTransactions,
    getTransactionsByCategory,
    getTransactionsByType,
    setBalance,
    buildingPurchased,
    buildingSold,
    sellProperty
  };
};
