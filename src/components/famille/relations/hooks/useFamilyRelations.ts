
import { useState, useEffect } from 'react';
import { FamilyRelation } from '../types/relationTypes';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';

// Exemples de relations prédéfinies
const initialRelations: FamilyRelation[] = [
  {
    id: '1',
    targetName: 'Gens Julia',
    targetRole: 'Famille patricienne influente',
    type: 'positive',
    description: 'Alliance de longue date renforcée par des mariages stratégiques.',
    tags: ['politique', 'matrimonial', 'commercial']
  },
  {
    id: '2',
    targetName: 'Gens Claudia',
    targetRole: 'Famille patricienne rivale',
    type: 'negative',
    description: 'Relations tendues suite à des désaccords au Sénat.',
    tags: ['politique', 'sénat']
  },
  {
    id: '3',
    targetName: 'Tribune Marcus Livius',
    targetRole: 'Tribune de la plèbe',
    type: 'neutral',
    description: 'Contact récent qui pourrait être exploité pour gagner en influence auprès de la plèbe.',
    tags: ['politique', 'plèbe']
  }
];

export const useFamilyRelations = () => {
  const [relations, setRelations] = useLocalStorage<FamilyRelation[]>(
    'family-relations', 
    initialRelations
  );
  
  const addRelation = (relationData: Omit<FamilyRelation, 'id'>) => {
    const newRelation: FamilyRelation = {
      ...relationData,
      id: uuidv4()
    };
    
    setRelations(prev => [...prev, newRelation]);
    return newRelation;
  };
  
  const updateRelation = (id: string, updates: Partial<FamilyRelation>) => {
    setRelations(prev => 
      prev.map(relation => 
        relation.id === id 
          ? { ...relation, ...updates }
          : relation
      )
    );
  };
  
  const removeRelation = (id: string) => {
    setRelations(prev => prev.filter(relation => relation.id !== id));
  };
  
  return {
    relations,
    addRelation,
    updateRelation,
    removeRelation
  };
};
