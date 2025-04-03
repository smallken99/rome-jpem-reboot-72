
import { useState, useCallback } from 'react';
import { FamilyRelation, RelationType, RelationHistory } from '../types/relationTypes';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useGameTime } from '@/hooks/useGameTime';
import { useToast } from '@/components/ui/use-toast';

export const useRelationManagement = () => {
  const [relations, setRelations] = useLocalStorage<FamilyRelation[]>('family-relations', []);
  const [relationHistory, setRelationHistory] = useLocalStorage<RelationHistory[]>('relation-history', []);
  const { formatDate } = useGameTime();
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
    addToHistory(newRelation.id, `Relation établie avec ${newRelation.targetName}`, 0);
    
    return newRelation.id;
  }, []);
  
  // Supprimer une relation
  const removeRelation = useCallback((id: string) => {
    setRelations(prev => prev.filter(relation => relation.id !== id));
  }, []);
  
  // Mettre à jour une relation
  const updateRelation = useCallback((id: string, updates: Partial<FamilyRelation>) => {
    setRelations(prev => 
      prev.map(relation => 
        relation.id === id ? { ...relation, ...updates } : relation
      )
    );
  }, []);
  
  // Changer le type de relation
  const changeRelationType = useCallback((id: string, newType: RelationType, reason: string) => {
    const relation = relations.find(r => r.id === id);
    if (!relation) return false;
    
    updateRelation(id, { 
      type: newType,
      lastInteraction: new Date()
    });
    
    // Ajouter à l'historique
    const impact = newType === 'positive' ? 10 : newType === 'negative' ? -10 : 0;
    addToHistory(id, `Relation modifiée à "${newType}" - Raison: ${reason}`, impact);
    
    toast({
      title: "Relation mise à jour",
      description: `Votre relation avec ${relation.targetName} est maintenant: ${newType}.`,
    });
    
    return true;
  }, [relations, updateRelation]);
  
  // Améliorer une relation
  const improveRelation = useCallback((id: string, amount: number, action: string) => {
    const relation = relations.find(r => r.id === id);
    if (!relation) return false;
    
    const newStrength = Math.min(100, (relation.strength || 50) + amount);
    
    updateRelation(id, { 
      strength: newStrength,
      lastInteraction: new Date(),
      type: newStrength > 75 ? 'positive' : newStrength < 25 ? 'negative' : 'neutral'
    });
    
    // Ajouter à l'historique
    addToHistory(id, `Relation améliorée - Action: ${action}`, amount);
    
    toast({
      title: "Relation améliorée",
      description: `Votre relation avec ${relation.targetName} s'est améliorée (${newStrength}%).`,
    });
    
    return true;
  }, [relations, updateRelation]);
  
  // Détériorer une relation
  const deteriorateRelation = useCallback((id: string, amount: number, action: string) => {
    const relation = relations.find(r => r.id === id);
    if (!relation) return false;
    
    const newStrength = Math.max(0, (relation.strength || 50) - amount);
    
    updateRelation(id, { 
      strength: newStrength,
      lastInteraction: new Date(),
      type: newStrength > 75 ? 'positive' : newStrength < 25 ? 'negative' : 'neutral'
    });
    
    // Ajouter à l'historique
    addToHistory(id, `Relation détériorée - Action: ${action}`, -amount);
    
    toast({
      title: "Relation détériorée",
      description: `Votre relation avec ${relation.targetName} s'est détériorée (${newStrength}%).`,
    });
    
    return true;
  }, [relations, updateRelation]);
  
  // Ajouter un événement à l'historique
  const addToHistory = useCallback((relationId: string, event: string, impact: number) => {
    const newHistoryEntry: RelationHistory = {
      id: uuidv4(),
      relationId,
      date: new Date(),
      event,
      impact
    };
    
    setRelationHistory(prev => [...prev, newHistoryEntry]);
  }, []);
  
  // Obtenir l'historique d'une relation
  const getRelationHistory = useCallback((relationId: string) => {
    return relationHistory.filter(history => history.relationId === relationId);
  }, [relationHistory]);
  
  // Grouper les relations par type
  const getRelationsByType = useCallback(() => {
    return {
      positive: relations.filter(relation => relation.type === 'positive'),
      neutral: relations.filter(relation => relation.type === 'neutral'),
      negative: relations.filter(relation => relation.type === 'negative')
    };
  }, [relations]);
  
  return {
    relations,
    addRelation,
    removeRelation,
    updateRelation,
    changeRelationType,
    improveRelation,
    deteriorateRelation,
    getRelationHistory,
    getRelationsByType
  };
};
