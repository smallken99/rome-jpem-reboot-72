
import { useState, useEffect } from 'react';
import { Child } from '../types/educationTypes';
import { Character } from '@/types/character';

export const useChildrenManagement = (characters: Character[] = []) => {
  const [educationChildren, setEducationChildren] = useState<Child[]>([]);
  
  // Convert Characters to Children for the education system
  useEffect(() => {
    if (!characters || !characters.length) return;
    
    const childrenArray: Child[] = characters
      .filter(char => char.age < 18)
      .map(char => ({
        id: char.id,
        name: char.name || `${char.firstName || ''} ${char.lastName || ''}`.trim(),
        age: char.age,
        gender: char.gender,
        status: 'child',
        educationType: char.education?.type || 'none',
        progress: char.education?.progress || 0,
        currentEducation: char.currentEducation ? {
          type: char.currentEducation.type || char.education?.type || 'none',
          mentor: char.currentEducation.mentor || char.education?.mentor || null,
          progress: char.currentEducation.progress || 0,
          skills: char.currentEducation.skills || char.education?.specialties || [],
          yearsCompleted: char.currentEducation.yearsCompleted || 0,
          totalYears: char.currentEducation.totalYears || 3,
          statBonus: char.currentEducation.statBonus || 0,
          mentorId: char.currentEducation.mentorId || null
        } : {
          type: 'none',
          mentor: null,
          progress: 0,
          skills: [],
          yearsCompleted: 0,
          totalYears: 3,
          statBonus: 0
        }
      }));
    
    setEducationChildren(childrenArray);
  }, [characters]);

  // Update child name
  const updateChildName = (childId: string, newName: string) => {
    setEducationChildren(prev => {
      const childIndex = prev.findIndex(c => c.id === childId);
      if (childIndex === -1) return prev;
      
      const updatedChildren = [...prev];
      updatedChildren[childIndex] = {
        ...updatedChildren[childIndex],
        name: newName
      };
      
      return updatedChildren;
    });
  };

  return {
    educationChildren,
    setEducationChildren,
    updateChildName
  };
};
