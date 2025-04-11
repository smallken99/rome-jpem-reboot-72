
import React, { createContext, useContext, useState } from 'react';
import { FamilyRelation, RelationType, RelationHistory, PropertyRelation, RelationsContextType } from '../types/relationTypes';
import { generateUniqueId } from '@/utils/idGenerator';

// Create the context with a default value
const RelationsContext = createContext<RelationsContextType>({
  relations: [],
  addRelation: () => '',
  removeRelation: () => {},
  updateRelation: () => {},
  getRelationsByType: () => ({ all: [], positive: [], negative: [], neutral: [] }),
  getRelationHistory: () => [],
  addPropertyToRelation: () => {},
  updatePropertyRelation: () => {},
  removePropertyFromRelation: () => {},
  getRelationsForProperty: () => []
});

// Hook to use the relations context
export const useRelations = () => useContext(RelationsContext);

// Provider component
export const RelationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [relations, setRelations] = useState<FamilyRelation[]>([]);
  const [relationHistories, setRelationHistories] = useState<Record<string, RelationHistory[]>>({});

  // Add a new relation
  const addRelation = (relationData: Omit<FamilyRelation, 'id'>): string => {
    const id = generateUniqueId();
    const newRelation: FamilyRelation = { 
      id, 
      ...relationData 
    };
    
    setRelations(prev => [...prev, newRelation]);
    return id;
  };

  // Remove a relation by ID
  const removeRelation = (id: string): void => {
    setRelations(prev => prev.filter(relation => relation.id !== id));
    
    // Also clean up any history for this relation
    const newHistories = { ...relationHistories };
    delete newHistories[id];
    setRelationHistories(newHistories);
  };

  // Update an existing relation
  const updateRelation = (id: string, updates: Partial<FamilyRelation>): void => {
    setRelations(prev => 
      prev.map(relation => 
        relation.id === id 
          ? { ...relation, ...updates } 
          : relation
      )
    );
    
    // Add a history entry if strength changes
    if (updates.strength !== undefined) {
      const historyEntry: RelationHistory = {
        id: generateUniqueId(),
        relationId: id,
        date: new Date(),
        event: `Force de relation mise à jour à ${updates.strength}`,
        impact: updates.strength || 0
      };
      
      setRelationHistories(prev => ({
        ...prev,
        [id]: [...(prev[id] || []), historyEntry]
      }));
    }
  };

  // Get relations grouped by type
  const getRelationsByType = () => {
    const result = {
      all: relations,
      positive: relations.filter(r => r.type === 'positive'),
      negative: relations.filter(r => r.type === 'negative'),
      neutral: relations.filter(r => r.type === 'neutral')
    };
    return result;
  };

  // Get history for a specific relation
  const getRelationHistory = (relationId: string): RelationHistory[] => {
    return relationHistories[relationId] || [];
  };
  
  // Add a property to a relation
  const addPropertyToRelation = (relationId: string, property: Omit<PropertyRelation, 'id'>): void => {
    setRelations(prev => prev.map(relation => {
      if (relation.id === relationId) {
        const properties = relation.properties || [];
        return {
          ...relation,
          properties: [
            ...properties,
            { ...property, propertyId: property.propertyId }
          ]
        };
      }
      return relation;
    }));
  };
  
  // Update a property in a relation
  const updatePropertyRelation = (relationId: string, propertyId: string, updates: Partial<PropertyRelation>): void => {
    setRelations(prev => prev.map(relation => {
      if (relation.id === relationId && relation.properties) {
        return {
          ...relation,
          properties: relation.properties.map(prop => 
            prop.propertyId === propertyId ? { ...prop, ...updates } : prop
          )
        };
      }
      return relation;
    }));
  };
  
  // Remove a property from a relation
  const removePropertyFromRelation = (relationId: string, propertyId: string): void => {
    setRelations(prev => prev.map(relation => {
      if (relation.id === relationId && relation.properties) {
        return {
          ...relation,
          properties: relation.properties.filter(prop => prop.propertyId !== propertyId)
        };
      }
      return relation;
    }));
  };
  
  // Get all relations for a specific property
  const getRelationsForProperty = (propertyId: string): FamilyRelation[] => {
    return relations.filter(relation => 
      relation.properties?.some(prop => prop.propertyId === propertyId)
    );
  };

  return (
    <RelationsContext.Provider value={{ 
      relations, 
      addRelation, 
      removeRelation, 
      updateRelation, 
      getRelationsByType, 
      getRelationHistory,
      addPropertyToRelation,
      updatePropertyRelation,
      removePropertyFromRelation,
      getRelationsForProperty
    }}>
      {children}
    </RelationsContext.Provider>
  );
};
