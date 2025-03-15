
import { useState, useCallback, useRef } from 'react';
import { Child, Preceptor, ChildEducation } from '../types/educationTypes';
import { Character } from '@/types/character';
import { getEducationPath } from '../data';

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
    educationType: string,
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
        if (educationPath && educationPath.outcomes) {
          // Handle array of strings or outcomes object
          if (Array.isArray(educationPath.outcomes)) {
            const skillIndex = yearsCompleted - 1;
            if (skillIndex < educationPath.outcomes.length) {
              newSkills.push(educationPath.outcomes[skillIndex]);
            }
          } else if (educationPath.outcomes.skills && yearsCompleted === totalYears) {
            // Add all skills at completion
            newSkills.push(...educationPath.outcomes.skills);
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
            if (typeof educationPath.outcomes === 'object' && educationPath.outcomes.bonuses) {
              // Use mentor quality if available
              const mentor = education.mentorId ? hiredPreceptors.find(p => p.id === education.mentorId) : null;
              const mentorBonus = mentor ? Math.floor(mentor.skill / 10) : 0;
              
              // Get base bonus for relevant stat
              const statKey = educationPath.relatedStat || '';
              statBonus = (educationPath.outcomes.bonuses[statKey] || 0) + mentorBonus;
            }
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
    
    // Update related character if needed
    if (updatedChild && onCharacterUpdate) {
      const character = characters.find(c => c.id === childId);
      if (character) {
        const education = character.currentEducation;
        if (education) {
          // Free the mentor if assigned
          if (education.mentorId) {
            setHiredPreceptors(prev => prev.map(p => 
              p.id === education.mentorId ? { ...p, status: 'hired', childId: null } : p
            ));
          }
          
          // Update the character with completed education
          onCharacterUpdate(childId, {
            age: updatedChild.age,
            education: {
              ...character.education,
              completed: true,
              completedAt: new Date().toISOString()
            }
          });
        }
      }
    }
    
    // Remove from educating list using ref
    educatingChildrenRef.current = educatingChildrenRef.current.filter(id => id !== childId);
    setEducatingChildren(educatingChildrenRef.current);
  }, [setChildren, hiredPreceptors, characters, onCharacterUpdate]);

  return {
    educatingChildren,
    startChildEducation,
    advanceEducationYear,
    completeEducation,
    setHiredPreceptors
  };
};
