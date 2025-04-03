
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
  FamilyRelation, 
  RelationType, 
  RelationHistory, 
  RelationsContextType 
} from '../types/relationTypes';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useToast } from '@/components/ui/use-toast';

const RelationsContext = createContext<RelationsContextType | undefined>(undefined);

export const RelationsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [relations, setRelations] = useLocalStorage<FamilyRelation[]>('family-relations', []);
  const [relationHistory, setRelationHistory] = useLocalStorage<RelationHistory[]>('relation-history', []);
  const { toast } = useToast();
  
  // Ajouter une relation
  const addRelation = useCallback((relationData: Omit<FamilyRelation, 'id'>) => {
    const newRelation: FamilyRelation = {
      ...relationData,
      id: uuidv4(),
      strength: relationData.strength || 50,
      lastInteraction: relationData.lastInteraction || new Date(),
    };
    
    setRelations(prev => [...prev, newRelation]);
    
    // Ajouter à l'historique
    const newHistoryEntry: RelationHistory = {
      id: uuidv4(),
      relationId: newRelation.id,
      date: new Date(),
      event: `Relation établie avec ${newRelation.targetName}`,
      impact: 0
    };
    
    setRelationHistory(prev => [...prev, newHistoryEntry]);
    
    toast({
      title: "Relation créée",
      description: `Vous avez établi une relation avec ${newRelation.targetName}.`,
    });
    
    return newRelation.id;
  }, [setRelations, setRelationHistory, toast]);
  
  // Supprimer une relation
  const removeRelation = useCallback((id: string) => {
    const relationToRemove = relations.find(r => r.id === id);
    
    if (relationToRemove) {
      setRelations(prev => prev.filter(relation => relation.id !== id));
      
      toast({
        title: "Relation supprimée",
        description: `Votre relation avec ${relationToRemove.targetName} a été supprimée.`,
      });
    }
  }, [relations, setRelations, toast]);
  
  // Mettre à jour une relation
  const updateRelation = useCallback((id: string, updates: Partial<FamilyRelation>) => {
    setRelations(prev => 
      prev.map(relation => 
        relation.id === id ? { ...relation, ...updates } : relation
      )
    );
    
    // Si le type de relation change, ajouter à l'historique
    if (updates.type) {
      const relation = relations.find(r => r.id === id);
      if (relation) {
        const newHistoryEntry: RelationHistory = {
          id: uuidv4(),
          relationId: id,
          date: new Date(),
          event: `Type de relation changé à "${updates.type}" avec ${relation.targetName}`,
          impact: updates.type === 'positive' ? 10 : updates.type === 'negative' ? -10 : 0
        };
        
        setRelationHistory(prev => [...prev, newHistoryEntry]);
      }
    }
  }, [relations, setRelations, setRelationHistory]);
  
  // Obtenir l'historique d'une relation
  const getRelationHistory = useCallback((relationId: string) => {
    return relationHistory.filter(history => history.relationId === relationId);
  }, [relationHistory]);
  
  // Grouper les relations par type
  const getRelationsByType = useCallback(() => {
    return {
      positive: relations.filter(relation => relation.type === 'positive'),
      negative: relations.filter(relation => relation.type === 'negative'),
      neutral: relations.filter(relation => relation.type === 'neutral'),
      all: relations
    };
  }, [relations]);
  
  const value = {
    relations,
    addRelation,
    removeRelation,
    updateRelation,
    getRelationHistory,
    getRelationsByType
  };
  
  return (
    <RelationsContext.Provider value={value}>
      {children}
    </RelationsContext.Provider>
  );
};

export const useRelations = () => {
  const context = useContext(RelationsContext);
  if (context === undefined) {
    throw new Error('useRelations must be used within a RelationsProvider');
  }
  return context;
};
