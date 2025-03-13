
import { useState, useEffect } from 'react';
import { Child } from '../types/educationTypes';
import { Character } from '@/types/character';
import { toast } from 'sonner';
import { Preceptor } from '../types/educationTypes';

export const useEducationManagement = (
  educationChildren: Child[],
  setEducationChildren: React.Dispatch<React.SetStateAction<Child[]>>,
  characters: Character[] = [],
  onCharacterUpdate?: (characterId: string, updates: Partial<Character>) => void
) => {
  const [educatingChildren, setEducatingChildren] = useState<Record<string, boolean>>({});
  const [hiredPreceptors, setHiredPreceptors] = useState<Preceptor[]>([]);

  // Start education for a child
  const startChildEducation = (childId: string, educationType: string, mentorId?: string) => {
    // Find the child
    const childIndex = educationChildren.findIndex(c => c.id === childId);
    if (childIndex === -1) return;
    
    // Find the mentor if specified
    const mentor = mentorId ? hiredPreceptors.find(p => p.id === mentorId) : null;
    
    // Update the child's education
    const updatedChildren = [...educationChildren];
    updatedChildren[childIndex] = {
      ...updatedChildren[childIndex],
      currentEducation: {
        type: educationType,
        mentor: mentor ? mentor.name : null,
        mentorId: mentorId || null,
        progress: 0,
        skills: [],
        yearsCompleted: 0,
        totalYears: 2,
        statBonus: mentor ? Math.round(mentor.skill / 2) : 20
      }
    };
    
    setEducationChildren(updatedChildren);
    
    // Update the character if callback provided
    if (onCharacterUpdate) {
      const child = updatedChildren[childIndex];
      onCharacterUpdate(childId, {
        education: {
          type: educationType,
          mentor: mentor ? mentor.name : null,
          specialties: []
        }
      });
    }
    
    toast.success(`Éducation en ${educationType} commencée pour ${educationChildren[childIndex].name}`);
  };

  // Advance education by a year
  const advanceEducationYear = (childId: string) => {
    // Set the child as currently educating
    setEducatingChildren(prev => ({ ...prev, [childId]: true }));
    
    // Simulate the passage of time (2 seconds for demo)
    setTimeout(() => {
      setEducationChildren(prev => {
        const childIndex = prev.findIndex(c => c.id === childId);
        if (childIndex === -1) return prev;
        
        const child = prev[childIndex];
        if (!child.currentEducation || child.currentEducation.type === 'none') return prev;
        
        // Increase progress and years completed
        const updatedChild = {
          ...child,
          currentEducation: {
            ...child.currentEducation,
            progress: Math.min((child.currentEducation.progress || 0) + 50, 100),
            yearsCompleted: (child.currentEducation.yearsCompleted || 0) + 1
          }
        };
        
        // Check if education is complete
        if (updatedChild.currentEducation.yearsCompleted >= updatedChild.currentEducation.totalYears) {
          // Education completed
          if (onCharacterUpdate) {
            // Add skills based on education type
            const specialties = ['diplomatie', 'éloquence', 'stratégie'];
            onCharacterUpdate(childId, {
              education: {
                ...updatedChild.currentEducation,
                type: updatedChild.currentEducation.type,
                mentor: updatedChild.currentEducation.mentor,
                specialties: specialties
              }
            });
          }
          
          toast.success(`${child.name} a terminé son éducation en ${updatedChild.currentEducation.type}!`);
        }
        
        // Update the array
        const newChildren = [...prev];
        newChildren[childIndex] = updatedChild;
        return newChildren;
      });
      
      // Clear the educating status
      setEducatingChildren(prev => ({ ...prev, [childId]: false }));
    }, 2000);
  };

  // Complete/remove education for a child
  const completeEducation = (childId: string) => {
    // Find the child
    const childIndex = educationChildren.findIndex(c => c.id === childId);
    if (childIndex === -1) return;
    
    const child = educationChildren[childIndex];
    
    // Update the child's education
    const updatedChildren = [...educationChildren];
    updatedChildren[childIndex] = {
      ...updatedChildren[childIndex],
      currentEducation: {
        type: 'none',
        mentor: null,
        mentorId: null,
        progress: 0,
        skills: [],
        yearsCompleted: 0,
        totalYears: 0,
        statBonus: 0
      }
    };
    
    setEducationChildren(updatedChildren);
    
    // Update the character if callback provided
    if (onCharacterUpdate) {
      onCharacterUpdate(childId, {
        education: {
          type: 'none',
          mentor: null,
          specialties: []
        }
      });
    }
    
    toast.success(`L'éducation de ${child.name} a été interrompue`);
  };

  return {
    educatingChildren,
    startChildEducation,
    advanceEducationYear,
    completeEducation,
    setHiredPreceptors
  };
};
