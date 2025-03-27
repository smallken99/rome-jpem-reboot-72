
import { useState, useCallback, useRef } from 'react';
import { Child, Preceptor, ChildEducation, EducationType } from '../types/educationTypes';
import { Character } from '@/types/character';
import { getEducationPath } from '../data';
import { getOutcomeBonuses, getOutcomeSkills } from '../utils/educationUtils';

export const useEducationManagement = (
  children: Child[],
  setChildren: React.Dispatch<React.SetStateAction<Child[]>>,
  characters: Character[] = [],
  onCharacterUpdate?: (characterId: string, updatedCharacter: Partial<Character>) => void
) => {
  // Use useRef to prevent state updates from triggering too many renders
  const educatingChildrenRef = useRef<string[]>([]);
  const [educatingChildren, setEducatingChildren] = useState<string[]>([]);
  const [hiredPreceptors, setHiredPreceptors] = useState<Preceptor[]>([]);

  // Start education for a child
  const startChildEducation = useCallback((
    childId: string, 
    educationType: string | EducationType,
    mentorId: string | null
  ) => {
    // Find the mentor if provided
    const mentor = mentorId ? hiredPreceptors.find(p => p.id === mentorId) : null;
    
    // Get education path data
    const educationPath = getEducationPath(educationType);
    const educationDuration = educationPath?.duration || 3;
    
    setChildren(prev => prev.map(child => {
      if (child.id === childId) {
        // Create new education object
        const newEducation: ChildEducation = {
          type: educationType,
          mentor: mentor ? mentor.name : null,
          progress: 0,
          skills: [],
          yearsCompleted: 0,
          totalYears: educationDuration,
          statBonus: 0,
          mentorId: mentorId
        };
        
        return {
          ...child,
          currentEducation: newEducation
        };
      }
      return child;
    }));
    
    // Add child to educating list using ref
    educatingChildrenRef.current = [...educatingChildrenRef.current, childId];
    setEducatingChildren(educatingChildrenRef.current);
    
    // If mentor assigned, update preceptor status
    if (mentorId) {
      setHiredPreceptors(prev => prev.map(p => 
        p.id === mentorId ? { ...p, status: 'assigned', childId } : p
      ));
    }
  }, [hiredPreceptors, setChildren]);

  // Advance education by one year
  const advanceEducationYear = useCallback((childId: string) => {
    setChildren(prev => prev.map(child => {
      if (child.id === childId && child.currentEducation) {
        const education = child.currentEducation;
        const totalYears = education.totalYears || 3;
        const yearsCompleted = (education.yearsCompleted || 0) + 1;
        const progress = Math.min(100, Math.round((yearsCompleted / totalYears) * 100));
        
        // Get education path for skills
        const educationPath = getEducationPath(education.type);
        
        // Calculate new skills gained
        const newSkills = [...education.skills];
        if (educationPath) {
          // Get skills using the utility function
          const pathSkills = getOutcomeSkills(educationPath);
          const skillIndex = yearsCompleted - 1;
          
          if (skillIndex < pathSkills.length) {
            newSkills.push(pathSkills[skillIndex]);
          }
        }
        
        return {
          ...child,
          age: child.age + 1,
          currentEducation: {
            ...education,
            progress,
            yearsCompleted,
            skills: newSkills
          }
        };
      }
      return child;
    }));
  }, [setChildren]);

  // Complete education
  const completeEducation = useCallback((childId: string) => {
    let updatedChild: Child | null = null;
    
    setChildren(prev => {
      const updated = prev.map(child => {
        if (child.id === childId && child.currentEducation) {
          const education = child.currentEducation;
          // Get education path
          const educationPath = getEducationPath(education.type);
          
          // Calculate final stat bonus
          let statBonus = 0;
          if (educationPath) {
            // Use mentor quality if available
            const mentor = education.mentorId ? hiredPreceptors.find(p => p.id === education.mentorId) : null;
            const mentorBonus = mentor ? Math.floor((mentor.quality || 0) / 10) : 0;
            
            // Get base bonus for relevant stat using the utility function
            const statKey = educationPath.relatedStat || '';
            const pathBonus = getOutcomeBonuses(educationPath, statKey);
            statBonus = pathBonus + mentorBonus;
          }
          
          // Create updated child with completed education
          const result = {
            ...child,
            currentEducation: undefined
          };
          
          updatedChild = result;
          return result;
        }
        return child;
      });
      
      return updated;
    });
    
    // Remove from educating children list
    educatingChildrenRef.current = educatingChildrenRef.current.filter(id => id !== childId);
    setEducatingChildren(educatingChildrenRef.current);
    
    // If we have a Character update callback, use it
    if (onCharacterUpdate && updatedChild) {
      // Find the matching character
      const character = characters.find(c => c.id === childId);
      if (character) {
        onCharacterUpdate(childId, {
          currentEducation: undefined
        });
      }
    }
    
    return updatedChild;
  }, [characters, hiredPreceptors, onCharacterUpdate, setChildren]);

  return {
    educatingChildren,
    startChildEducation,
    advanceEducationYear,
    completeEducation,
    hiredPreceptors
  };
};
