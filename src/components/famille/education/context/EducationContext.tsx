
import React, { createContext, useContext } from 'react';
import { useChildrenManagement } from '../hooks/useChildrenManagement';
import { useEducationManagement } from '../hooks/useEducationManagement';
import { usePreceptorsManagement } from '../hooks/usePreceptorsManagement';
import { EducationContextType, EducationProviderProps } from './types';

const EducationContext = createContext<EducationContextType | undefined>(undefined);

export const EducationProvider: React.FC<EducationProviderProps> = ({ 
  characters = [], 
  onCharacterUpdate, 
  children 
}) => {
  // Hooks for managing different parts of the education system
  const { 
    educationChildren, 
    setEducationChildren, 
    updateChildName 
  } = useChildrenManagement(characters);
  
  const {
    preceptors,
    hiredPreceptors,
    isHiringPreceptor,
    refreshPreceptors,
    loadPreceptorsByType,
    hirePreceptor,
    firePreceptor,
    assignPreceptorToChild
  } = usePreceptorsManagement();
  
  const {
    educatingChildren,
    startChildEducation,
    advanceEducationYear,
    completeEducation,
    setHiredPreceptors
  } = useEducationManagement(
    educationChildren, 
    setEducationChildren, 
    characters, 
    onCharacterUpdate
  );
  
  // Sync hired preceptors with the education management hook
  setHiredPreceptors(hiredPreceptors);
  
  return (
    <EducationContext.Provider value={{
      children: educationChildren,
      preceptors,
      hiredPreceptors,
      educatingChildren,
      isHiringPreceptor,
      loadPreceptorsByType,
      refreshPreceptors,
      hirePreceptor,
      firePreceptor,
      assignPreceptorToChild,
      startChildEducation,
      advanceEducationYear,
      completeEducation,
      updateChildName
    }}>
      {children}
    </EducationContext.Provider>
  );
};

export const useEducation = () => {
  const context = useContext(EducationContext);
  if (context === undefined) {
    throw new Error('useEducation must be used within an EducationProvider');
  }
  return context;
};
