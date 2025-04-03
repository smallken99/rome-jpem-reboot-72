
import { useState, useEffect } from 'react';
import { Character } from '@/types/character';
import { Child, EducationType } from '../types/educationTypes';

export const useChildrenManagement = (characters: Character[]) => {
  const [educationChildren, setEducationChildren] = useState<Child[]>([]);
  
  // Mettre à jour les enfants lorsque les personnages changent
  useEffect(() => {
    // Filtrer pour ne garder que les enfants
    const childrenData = characters
      .filter(char => char.age < 18)
      .map(char => ({
        id: char.id,
        name: char.name,
        age: char.age,
        gender: char.gender,
        educationType: (char.currentEducation?.type || 'none') as EducationType,
        progress: char.currentEducation?.progress || 0,
        specialties: char.education?.specialties || [],
        traits: char.traits || [],
        currentEducation: char.currentEducation ? {
          type: char.currentEducation.type as EducationType,
          mentor: char.currentEducation.mentor,
          mentorId: char.currentEducation.mentorId,
          progress: char.currentEducation.progress,
          skills: char.currentEducation.skills || [],
          yearsCompleted: char.currentEducation.yearsCompleted,
          totalYears: char.currentEducation.totalYears
        } : undefined,
        preceptorId: char.currentEducation?.mentorId
      }));
    
    setEducationChildren(childrenData);
  }, [characters]);
  
  // Ajouter un enfant
  const addChild = (childData: Omit<Child, 'id' | 'progress'>) => {
    const newChild: Child = {
      id: `temp-${Date.now()}`, // ID temporaire
      ...childData,
      progress: 0
    };
    
    setEducationChildren(prev => [...prev, newChild]);
    
    return newChild.id;
  };
  
  // Supprimer un enfant
  const removeChild = (id: string) => {
    setEducationChildren(prev => prev.filter(child => child.id !== id));
  };
  
  return {
    educationChildren,
    setEducationChildren,
    addChild,
    removeChild
  };
};
