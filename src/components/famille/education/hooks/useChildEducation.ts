
import { useState, useEffect } from 'react';
import { Child } from '../types/educationTypes';
// Import preceptors but access children differently - this might need to be adjusted based on actual data structure
import { preceptors } from '../data';

// Mock children data - replace with actual implementation if there's a real source
const mockChildren: Child[] = [
  {
    id: "1",
    name: "Marcus",
    age: 10,
    gender: "male",
    currentEducation: {
      type: "military",
      mentor: null,
      skills: [],
      progress: 0
    }
  },
  {
    id: "2",
    name: "Livia",
    age: 8,
    gender: "female",
    currentEducation: {
      type: "religious",
      mentor: null,
      skills: [],
      progress: 0
    }
  }
];

export const useChildEducation = () => {
  const [children, setChildren] = useState<Child[]>(mockChildren);
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  
  const selectedChild = selectedChildId ? 
    children.find(child => child.id === selectedChildId) || null : null;
  
  const updateChildEducation = (
    childId: string, 
    educationType: string, 
    mentor: string | null = null,
    specialties: string[] = []
  ) => {
    setChildren(prevChildren => 
      prevChildren.map(child => 
        child.id === childId 
          ? {
              ...child,
              currentEducation: {
                ...child.currentEducation,
                type: educationType,
                mentor,
                skills: specialties
              }
            }
          : child
      )
    );
  };
  
  return {
    children,
    selectedChild,
    selectedChildId,
    setSelectedChildId,
    updateChildEducation
  };
};
