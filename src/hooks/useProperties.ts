
import { useState, useCallback } from 'react';
import { Property, PropertyStats } from '@/types/patrimoine';
import { v4 as uuidv4 } from 'uuid';

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
