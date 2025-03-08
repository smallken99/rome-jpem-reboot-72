
import { Child, EducationHistory } from '../types/educationTypes';
import { useEducationProgress } from './useEducationProgress';
import { Character } from '@/types/character';
import { toast } from 'sonner';

export const useEducationManagement = (
  educationChildren: Child[],
  setEducationChildren: React.Dispatch<React.SetStateAction<Child[]>>,
  characters: Character[] = [],
  onCharacterUpdate?: (characterId: string, updatedCharacter: Partial<Character>) => void
) => {
  const { 
    educatingChildren, 
    startEducation, 
    advanceEducation,
    applyEducationToCharacter
  } = useEducationProgress();

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
      skills: child.currentEducation.skills || [],
      duration: child.currentEducation.yearsCompleted || 1,
      startYear: 0, // Ajouter les champs requis manquants
      completed: true
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

  // Cette variable sera accessible par le completeEducation ci-dessus
  let hiredPreceptors: any[] = [];
  const setHiredPreceptors = (preceptors: any[]) => {
    hiredPreceptors = preceptors;
  };

  return {
    educatingChildren,
    startChildEducation,
    advanceEducationYear,
    completeEducation,
    setHiredPreceptors
  };
};
