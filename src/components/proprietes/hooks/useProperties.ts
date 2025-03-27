
import { useState, useCallback } from 'react';
import { Property, PropertyUpgrade } from '@/types/proprietes';
import { v4 as uuidv4 } from 'uuid';

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);

  const installUpgrade = useCallback((propertyId: string, upgradeId: string) => {
    setProperties(prev => 
      prev.map(property => {
        if (property.id === propertyId) {
          const upgrades = property.upgrades || [];
          return {
            ...property,
            upgrades: upgrades.map(upgrade => 
              upgrade.id === upgradeId 
                ? { ...upgrade, installed: true } 
                : upgrade
            )
          };
        }
        return property;
      })
    );
  }, []);

  const addProperty = useCallback((newProperty: Omit<Property, 'id'>) => {
    const property = {
      ...newProperty,
      id: uuidv4()
    };
    setProperties(prev => [...prev, property]);
    return property.id;
  }, []);

  const updateProperty = useCallback((propertyId: string, updates: Partial<Property>) => {
    setProperties(prev => 
      prev.map(property => 
        property.id === propertyId 
          ? { ...property, ...updates } 
          : property
      )
    );
  }, []);

  const sellProperty = useCallback((propertyId: string) => {
    let value = 0;
    
    setProperties(prev => {
      const propertyToSell = prev.find(p => p.id === propertyId);
      if (propertyToSell) {
        value = propertyToSell.value;
      }
      return prev.filter(p => p.id !== propertyId);
    });
    
    return value;
  }, []);
  
  return {
    properties,
    installUpgrade,
    addProperty,
    updateProperty,
    sellProperty
  };
};
