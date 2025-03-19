
import { useCallback } from 'react';
import { useProperties } from './useProperties';
import { useTransactions } from './useTransactions';
import { useMaitreJeu } from '@/components/maitrejeu/context';
import { Property } from '@/types/patrimoine';

export const usePatrimoine = () => {
  const propertiesHook = useProperties();
  const transactionsHook = useTransactions();
  const { addEconomieRecord } = useMaitreJeu();

  const { 
    properties, 
    addProperty, 
    updateProperty, 
    removeProperty,
    getPropertyStats
  } = propertiesHook;

  const {
    balance,
    transactions,
    addTransaction,
    setBalance
  } = transactionsHook;

  // Fonction pour acheter une propriété
  const purchaseProperty = useCallback((property: Omit<Property, 'id'>) => {
    if (property.value > balance) {
      return { success: false, message: "Fonds insuffisants pour cette acquisition" };
    }

    // Enregistrer l'achat dans l'économie
    addEconomieRecord({
      amount: -property.value,
      description: `Achat propriété: ${property.name}`,
      category: "Immobilier" as any,
      type: 'expense',
      date: new Date().toISOString(),
      source: 'Patrimoine personnel',
      approved: true
    });
    
    // Ajouter à la liste des transactions
    addTransaction({
      amount: -property.value,
      description: `Achat propriété: ${property.name}`,
      category: "Immobilier",
      type: 'expense'
    });
    
    // Ajouter la propriété
    const newPropertyId = addProperty(property);
    
    return { 
      success: true, 
      propertyId: newPropertyId,
      message: `${property.name} acquis avec succès!`
    };
  }, [addProperty, addTransaction, addEconomieRecord, balance]);

  // Fonction pour vendre une propriété
  const sellProperty = useCallback((id: string) => {
    const property = properties.find(p => p.id === id);
    if (!property) return { success: false, message: "Propriété introuvable" };
    
    // Enregistrer la vente dans l'économie
    addEconomieRecord({
      amount: property.value,
      description: `Vente propriété: ${property.name}`,
      category: "Immobilier" as any,
      type: 'income',
      date: new Date().toISOString(),
      source: 'Patrimoine personnel',
      approved: true
    });
    
    // Ajouter à la liste des transactions
    addTransaction({
      amount: property.value,
      description: `Vente propriété: ${property.name}`,
      category: "Immobilier",
      type: 'income'
    });
    
    // Supprimer la propriété
    removeProperty(id);
    
    return { 
      success: true, 
      message: `${property.name} vendu avec succès!`
    };
  }, [properties, removeProperty, addTransaction, addEconomieRecord]);

  // Fonctions pour les bâtiments
  const buildingPurchased = useCallback((name: string, cost: number) => {
    addTransaction({
      amount: -cost,
      description: `Achat: ${name}`,
      category: "Immobilier",
      type: 'expense'
    });
  }, [addTransaction]);
  
  const buildingSold = useCallback((name: string, amount: number) => {
    addTransaction({
      amount: amount,
      description: `Vente: ${name}`,
      category: "Immobilier",
      type: 'income'
    });
  }, [addTransaction]);

  return {
    // Propriétés
    properties,
    addProperty,
    updateProperty,
    removeProperty,
    getPropertyStats,
    purchaseProperty,
    sellProperty,
    
    // Transactions
    balance,
    transactions,
    addTransaction,
    
    // Bâtiments
    buildingPurchased,
    buildingSold
  };
};
