
import { useState, useCallback } from 'react';
import { useMaitreJeu } from '@/components/maitrejeu/context';
import { Property, PropertyStats } from '@/types/patrimoine';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

export const useProperties = () => {
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

  const { addEconomieRecord } = useMaitreJeu();

  const addProperty = useCallback((property: Omit<Property, 'id'>) => {
    const newProperty = {
      ...property,
      id: uuidv4()
    };
    
    setProperties(prev => [...prev, newProperty]);
    
    toast.success(`Propriété ${property.name} ajoutée au patrimoine`);
    
    return newProperty.id;
  }, []);
  
  const updateProperty = useCallback((id: string, updates: Partial<Property>) => {
    setProperties(prev => prev.map(prop => 
      prop.id === id ? { ...prop, ...updates } : prop
    ));
    
    toast.success("Propriété mise à jour");
  }, []);
  
  const removeProperty = useCallback((id: string) => {
    const property = properties.find(p => p.id === id);
    if (!property) return;
    
    setProperties(prev => prev.filter(p => p.id !== id));
    
    toast.success(`Propriété ${property.name} retirée du patrimoine`);
  }, [properties]);

  const getPropertyStats = useCallback((): PropertyStats => {
    const totalValue = properties.reduce((sum, prop) => sum + prop.value, 0);
    const totalIncome = properties.reduce((sum, prop) => sum + prop.income, 0);
    const totalMaintenance = properties.reduce((sum, prop) => sum + prop.maintenance, 0);
    const propertyCount = properties.length;
    
    const totalCondition = properties.reduce((sum, prop) => sum + prop.condition, 0);
    const averageCondition = propertyCount > 0 ? totalCondition / propertyCount : 0;
    
    return {
      totalValue,
      totalIncome,
      totalMaintenance,
      propertyCount,
      averageCondition
    };
  }, [properties]);

  return {
    properties,
    addProperty,
    updateProperty,
    removeProperty,
    getPropertyStats
  };
};
