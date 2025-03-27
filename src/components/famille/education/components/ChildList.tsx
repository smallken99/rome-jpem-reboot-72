
import React from 'react';
import ChildEducationCard from '../../ChildEducationCard';
import { Child } from '../types/educationTypes';
import { Character } from '@/types/character';

interface ChildListProps {
  children: Character[];
}

export const ChildList: React.FC<ChildListProps> = ({ children }) => {
  // Convert Character objects to Child objects
  const childrenData: Child[] = children.map(character => {
    const educationType = character.education?.type || 'none';
    
    return {
      id: character.id,
      name: character.name,
      age: character.age,
      gender: character.gender,
      educationType: educationType as any, // Type cast to satisfy EducationType
      progress: character.currentEducation?.progress || 0,
      specialties: character.education?.specialties || [],
      specialty: character.specialty,
      traits: character.traits || []
    };
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {childrenData.map(child => (
        <ChildEducationCard key={child.id} child={child} />
      ))}
    </div>
  );
};
