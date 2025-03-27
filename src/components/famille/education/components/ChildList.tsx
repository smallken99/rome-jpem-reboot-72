
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Character } from '@/types/character';
import ChildEducationCard from '../../ChildEducationCard';
import { Child } from '../types/educationTypes';

interface ChildListProps {
  children: Character[];
}

export const ChildList: React.FC<ChildListProps> = ({ children }) => {
  const navigate = useNavigate();
  
  // Convertir les personnages en format Child pour les cartes d'éducation
  const childrenForEducation: Child[] = children.map(c => ({
    id: c.id,
    name: c.name,
    age: c.age,
    gender: c.gender,
    educationType: c.educationType || c.education?.type || 'none',
    progress: 0, // À améliorer avec un vrai suivi de progression
    specialties: c.specialties || c.education?.specialties || [],
    specialty: c.specialty,
    traits: c.traits || []
  }));
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {childrenForEducation.map(child => (
        <ChildEducationCard key={child.id} child={child} />
      ))}
    </div>
  );
};
