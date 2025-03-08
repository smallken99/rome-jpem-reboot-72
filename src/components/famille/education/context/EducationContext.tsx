
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Child, Preceptor, EducationHistory, PreceptorsByType } from '../types/educationTypes';
import { useEducationProgress } from '../hooks/useEducationProgress';
import { usePreceptorManagement } from '../hooks/usePreceptorManagement';
import { Character } from '@/types/character';
import { toast } from 'sonner';

interface EducationContextType {
  children: Child[];
  preceptors: PreceptorsByType;
  hiredPreceptors: Preceptor[];
  educatingChildren: Record<string, boolean>;
  
  // Actions
  refreshPreceptors: () => void;
  hirePreceptor: (preceptor: Preceptor, childId?: string) => boolean;
  firePreceptor: (preceptorId: string) => boolean;
  assignPreceptorToChild: (preceptorId: string, childId: string) => boolean;
  startChildEducation: (
    childId: string, 
    educationType: string, 
    mentorId: string | null, 
    specialties: string[]
  ) => boolean;
  advanceEducationYear: (childId: string) => void;
  completeEducation: (childId: string) => void;
  updateChildName: (childId: string, newName: string) => void;
}

const EducationContext = createContext<EducationContextType | undefined>(undefined);

export const EducationProvider: React.FC<{
  characters?: Character[];
  onCharacterUpdate?: (characterId: string, updatedCharacter: Partial<Character>) => void;
  children: React.ReactNode;
}> = ({ characters = [], onCharacterUpdate, children }) => {
  // Convert characters to children
  const [educationChildren, setEducationChildren] = useState<Child[]>([]);
  
  // Initialize education hooks
  const { 
    educatingChildren, 
    startEducation, 
    advanceEducation,
    applyEducationToCharacter
  } = useEducationProgress();
  
  const {
    hiredPreceptors,
    hirePreceptor,
    firePreceptor,
    assignPreceptorToChild,
    getPreceptorsByType
  } = usePreceptorManagement();
  
  // Initialize preceptors
  const [preceptors, setPreceptors] = useState<PreceptorsByType>({});
  
  // Convert Characters to Children for the education system
  useEffect(() => {
    if (!characters.length) return;
    
    const childrenArray = characters
      .filter(char => char.age < 18)
      .map(char => ({
        id: char.id,
        name: char.name,
        age: char.age,
        gender: char.gender,
        currentEducation: {
          type: char.education?.type || 'none',
          mentor: char.education?.mentor || null,
          progress: 0,
          skills: char.education?.specialties || [],
          // Add additional education fields
          yearsCompleted: 0,
          totalYears: char.education?.type ? 2 : 0,
          statBonus: 20
        }
      }));
    
    setEducationChildren(childrenArray);
  }, [characters]);
  
  // Refresh available preceptors
  const refreshPreceptors = () => {
    // This would usually fetch from an API
    // For now we'll just use what the original code had
    import('../data').then(({ generatePreceptors }) => {
      const newPreceptors = generatePreceptors();
      setPreceptors(getPreceptorsByType(Object.values(newPreceptors).flat()));
    }).catch(err => {
      console.error("Error loading preceptors:", err);
      toast.error("Impossible de charger les précepteurs");
    });
  };
  
  // Initialize preceptors on first load
  useEffect(() => {
    refreshPreceptors();
  }, []);
  
  // Start education for a child
  const startChildEducation = (
    childId: string, 
    educationType: string, 
    mentorId: string | null, 
    specialties: string[]
  ) => {
    // Find the child
    const childIndex = educationChildren.findIndex(c => c.id === childId);
    if (childIndex === -1) return false;
    
    // Find the mentor if provided
    let mentorName = null;
    if (mentorId) {
      const mentor = hiredPreceptors.find(p => p.id === mentorId);
      mentorName = mentor ? mentor.name : null;
    }
    
    // Update child's education
    const updatedChildren = [...educationChildren];
    updatedChildren[childIndex] = {
      ...updatedChildren[childIndex],
      currentEducation: {
        type: educationType,
        mentor: mentorName,
        progress: 0,
        skills: specialties,
        yearsCompleted: 0,
        totalYears: 2,
        statBonus: mentorId ? 25 : 15 // Better bonus with a mentor
      }
    };
    
    setEducationChildren(updatedChildren);
    
    // If there's a character update callback, update the character
    if (onCharacterUpdate) {
      onCharacterUpdate(childId, {
        education: {
          type: educationType,
          specialties: specialties,
          mentor: mentorName
        }
      });
    }
    
    // Start the education process
    return startEducation(childId, educationType, mentorName, specialties);
  };
  
  // Advance education by a year
  const advanceEducationYear = (childId: string) => {
    const childIndex = educationChildren.findIndex(c => c.id === childId);
    if (childIndex === -1) return;
    
    const child = educationChildren[childIndex];
    const { progress, isComplete } = advanceEducation(child, completeEducation);
    
    // Update child's education progress
    const updatedChildren = [...educationChildren];
    updatedChildren[childIndex] = {
      ...updatedChildren[childIndex],
      currentEducation: {
        ...updatedChildren[childIndex].currentEducation,
        progress,
        yearsCompleted: (updatedChildren[childIndex].currentEducation.yearsCompleted || 0) + 1
      }
    };
    
    setEducationChildren(updatedChildren);
    
    if (!isComplete) {
      toast.success(`${child.name} a progressé dans son éducation ! (${progress}%)`);
    }
  };
  
  // Complete education for a child
  const completeEducation = (childId: string, completedEducation?: EducationHistory) => {
    const childIndex = educationChildren.findIndex(c => c.id === childId);
    if (childIndex === -1) return;
    
    const child = educationChildren[childIndex];
    
    // Create a history entry if not provided
    const educationEntry = completedEducation || {
      type: child.currentEducation.type,
      mentor: child.currentEducation.mentor || "Autodidacte",
      speciality: child.currentEducation.speciality,
      completedAt: child.age,
      statBonus: child.currentEducation.statBonus || 20,
      skills: child.currentEducation.skills,
      duration: child.currentEducation.yearsCompleted || 1
    };
    
    // Update child with completed education
    const updatedChildren = [...educationChildren];
    updatedChildren[childIndex] = {
      ...updatedChildren[childIndex],
      currentEducation: {
        type: 'none',
        mentor: null,
        progress: 0,
        skills: [],
        yearsCompleted: 0,
        totalYears: 0,
        educationHistory: [
          ...(child.currentEducation.educationHistory || []),
          educationEntry
        ]
      }
    };
    
    setEducationChildren(updatedChildren);
    
    // If there's a character update callback and the child corresponds to a character
    const character = characters.find(c => c.id === childId);
    if (character && onCharacterUpdate) {
      // Apply the education benefits to the character
      const updatedCharacter = applyEducationToCharacter(character, educationEntry);
      
      // Update the character's education to none
      onCharacterUpdate(childId, {
        education: {
          type: 'none',
          specialties: [],
          mentor: null
        },
        stats: updatedCharacter.stats
      });
    }
    
    toast.success(`${child.name} a terminé son éducation en ${educationEntry.type} !`);
  };
  
  // Update child name
  const updateChildName = (childId: string, newName: string) => {
    const childIndex = educationChildren.findIndex(c => c.id === childId);
    if (childIndex === -1) return;
    
    const updatedChildren = [...educationChildren];
    updatedChildren[childIndex] = {
      ...updatedChildren[childIndex],
      name: newName
    };
    
    setEducationChildren(updatedChildren);
    
    // Update character name if callback provided
    if (onCharacterUpdate) {
      onCharacterUpdate(childId, { name: newName });
    }
  };
  
  return (
    <EducationContext.Provider value={{
      children: educationChildren,
      preceptors,
      hiredPreceptors,
      educatingChildren,
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
