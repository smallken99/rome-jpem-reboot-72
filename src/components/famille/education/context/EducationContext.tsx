import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Character } from '@/types/character';
import { Child, Preceptor } from '../types/educationTypes';
import { getAllPreceptors, getPreceptorById, getPreceptorsForType } from '../data/preceptors';
import { toast } from '@/components/ui-custom/toast';

interface EducationContextType {
  characters: Character[];
  educatingChildren: string[];
  isEducating: Record<string, boolean>;
  preceptors: Preceptor[];
  hirePreceptor: (preceptorId: string, childId?: string) => boolean;
  firePreceptor: (preceptorId: string) => void;
  assignPreceptorToChild: (childId: string, preceptorId: string) => void;
  getPreceptorById: (id: string) => Preceptor | undefined;
  loadPreceptorsByType: (type: string) => Preceptor[];
  updateChildName: (childId: string, newName: string) => void;
  advanceEducationYear: (childId: string) => void;
  completeEducation: (childId: string) => void;
  cancelEducation: (childId: string) => void;
  onCharacterUpdate?: (characterId: string, updates: Partial<Character>) => void;
}

const EducationContext = createContext<EducationContextType>({} as EducationContextType);

export const useEducation = () => useContext(EducationContext);

interface EducationProviderProps {
  children: ReactNode;
  characters: Character[];
  onCharacterUpdate?: (characterId: string, updates: Partial<Character>) => void;
}

export const EducationProvider: React.FC<EducationProviderProps> = ({ 
  children, 
  characters,
  onCharacterUpdate 
}) => {
  const [educatingChildren, setEducatingChildren] = useState<string[]>([]);
  const [isEducating, setIsEducating] = useState<Record<string, boolean>>({});
  
  // Gérer l'avancement de l'éducation d'un enfant
  const advanceEducationYear = (childId: string) => {
    setIsEducating(prev => ({ ...prev, [childId]: true }));
    
    // Simuler la progression de l'éducation
    setTimeout(() => {
      if (onCharacterUpdate) {
        const child = characters.find(c => c.id === childId);
        if (child) {
          onCharacterUpdate(childId, {
            // Mettre à jour la progression ici
          });
        }
      }
      
      setIsEducating(prev => ({ ...prev, [childId]: false }));
      toast.success("Année d'éducation complétée avec succès");
    }, 1500);
  };
  
  // Compléter l'éducation d'un enfant
  const completeEducation = (childId: string) => {
    setIsEducating(prev => ({ ...prev, [childId]: true }));
    
    // Simuler la complétion de l'éducation
    setTimeout(() => {
      if (onCharacterUpdate) {
        const child = characters.find(c => c.id === childId);
        if (child) {
          onCharacterUpdate(childId, {
            // Mettre à jour le statut d'éducation
          });
        }
      }
      
      setIsEducating(prev => ({ ...prev, [childId]: false }));
      setEducatingChildren(prev => prev.filter(id => id !== childId));
      toast.success("Éducation terminée avec succès");
    }, 1500);
  };
  
  // Annuler l'éducation d'un enfant
  const cancelEducation = (childId: string) => {
    setEducatingChildren(prev => prev.filter(id => id !== childId));
    
    if (onCharacterUpdate) {
      onCharacterUpdate(childId, {
        educationType: 'none',
        specialties: []
      });
    }
    
    toast.info("Éducation annulée");
  };
  
  // Mettre à jour le nom d'un enfant
  const updateChildName = (childId: string, newName: string) => {
    if (onCharacterUpdate) {
      onCharacterUpdate(childId, { name: newName });
    }
  };
  
  // Fonctions pour gérer les précepteurs
  const hirePreceptor = (preceptorId: string, childId?: string): boolean => {
    // Ici, vous pouvez ajouter la logique d'embauche réelle
    toast.success(`Précepteur embauché avec succès${childId ? ' pour un enfant' : ''}`);
    return true;
  };
  
  const firePreceptor = (preceptorId: string) => {
    // Logique pour renvoyer un précepteur
    toast.info("Précepteur renvoyé");
  };
  
  const assignPreceptorToChild = (childId: string, preceptorId: string) => {
    // Logique pour assigner un précepteur à un enfant
    toast.success("Précepteur assigné à l'enfant");
  };
  
  return (
    <EducationContext.Provider value={{
      characters,
      educatingChildren,
      isEducating,
      preceptors: getAllPreceptors(),
      hirePreceptor,
      firePreceptor,
      assignPreceptorToChild,
      getPreceptorById,
      loadPreceptorsByType: getPreceptorsForType,
      updateChildName,
      advanceEducationYear,
      completeEducation,
      cancelEducation,
      onCharacterUpdate
    }}>
      {children}
    </EducationContext.Provider>
  );
};
