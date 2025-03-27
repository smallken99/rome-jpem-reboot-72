
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Character } from '@/types/character';
import { Child, Preceptor, EducationType } from '../types/educationTypes';
import { getAllPreceptors, getPreceptorById, getPreceptorsForType } from '../data/preceptors';
import { toast } from '@/components/ui-custom/toast';
import { getAllEducationPaths, getEducationPathById } from '../data/educationPaths';

interface EducationContextType {
  characters: Character[];
  children: Child[]; 
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
  getAllEducationPaths: () => any[];
  findEducationPathById: (id: string) => any;
}

const EducationContext = createContext<EducationContextType>({} as EducationContextType);

export const useEducation = () => useContext(EducationContext);

interface EducationProviderProps {
  children: ReactNode;
  characters: Character[];
  onCharacterUpdate?: (characterId: string, updates: Partial<Character>) => void;
}

export const EducationProvider: React.FC<EducationProviderProps> = ({ 
  children: providerChildren, 
  characters,
  onCharacterUpdate 
}) => {
  const [educatingChildren, setEducatingChildren] = useState<string[]>([]);
  const [isEducating, setIsEducating] = useState<Record<string, boolean>>({});
  
  // Transform characters into Child objects for the education system
  const childrenData: Child[] = characters
    .filter(char => char.age < 18)
    .map(char => ({
      id: char.id,
      name: char.name,
      age: char.age,
      gender: char.gender,
      educationType: (char.education?.type as EducationType) || 'none',
      progress: 0,
      specialties: char.education?.specialties || [],
      traits: char.traits || []
    }));
  
  // Get all preceptors
  const preceptors = getAllPreceptors();
  
  // Implementation of required context methods
  const advanceEducationYear = (childId: string) => {
    // Implementation
    console.log("Advancing education year for child", childId);
  };
  
  const completeEducation = (childId: string) => {
    // Implementation
    console.log("Completing education for child", childId);
  };
  
  const cancelEducation = (childId: string) => {
    // Implementation
    console.log("Canceling education for child", childId);
  };
  
  const updateChildName = (childId: string, newName: string) => {
    // Implementation
    console.log("Updating child name", childId, newName);
  };
  
  const hirePreceptor = (preceptorId: string, childId?: string) => {
    // Implementation
    console.log("Hiring preceptor", preceptorId, childId);
    return true;
  };
  
  const firePreceptor = (preceptorId: string) => {
    // Implementation
    console.log("Firing preceptor", preceptorId);
  };
  
  const assignPreceptorToChild = (childId: string, preceptorId: string) => {
    // Implementation
    console.log("Assigning preceptor to child", childId, preceptorId);
  };
  
  const loadPreceptorsByType = (type: string) => {
    return getPreceptorsForType(type as EducationType);
  };
  
  const findEducationPathById = (id: string) => {
    return getEducationPathById(id);
  };

  return (
    <EducationContext.Provider
      value={{
        characters,
        children: childrenData,
        educatingChildren,
        isEducating,
        preceptors,
        hirePreceptor,
        firePreceptor,
        assignPreceptorToChild,
        getPreceptorById,
        loadPreceptorsByType,
        updateChildName,
        advanceEducationYear,
        completeEducation,
        cancelEducation,
        onCharacterUpdate,
        getAllEducationPaths,
        findEducationPathById
      }}
    >
      {providerChildren}
    </EducationContext.Provider>
  );
};
