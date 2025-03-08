
import { useState, useEffect } from 'react';
import { Child } from '../types/educationTypes';
import { Character } from '@/types/character';

export const useChildrenManagement = (characters: Character[] = []) => {
  const [educationChildren, setEducationChildren] = useState<Child[]>([]);
  
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
  };

  return {
    educationChildren,
    setEducationChildren,
    updateChildName
  };
};
