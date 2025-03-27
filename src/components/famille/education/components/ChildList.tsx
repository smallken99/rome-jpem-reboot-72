
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Character } from '@/types/character';
import ChildEducationCard from '../../ChildEducationCard';
import { Child, EducationType } from '../types/educationTypes';

interface ChildListProps {
  children: Character[];
}

export const ChildList: React.FC<ChildListProps> = ({ children }) => {
  const navigate = useNavigate();
  
  // Safely convert education type to EducationType
  const getEducationType = (type: string | undefined): EducationType => {
    if (!type) return 'none';
    
    // Check if the type matches any valid EducationType
    const validTypes: EducationType[] = ['military', 'political', 'religious', 'artistic', 'philosophical', 'none'];
    return validTypes.includes(type as EducationType) ? (type as EducationType) : 'none';
  };
  
  // Convertir les personnages en format Child pour les cartes d'éducation
  const childrenForEducation: Child[] = children.map(c => ({
    id: c.id,
    name: c.name,
    age: c.age,
    gender: c.gender,
    educationType: getEducationType(c.education?.type),
    progress: 0, // À améliorer avec un vrai suivi de progression
    specialties: c.education?.specialties || [],
    specialty: c.specialty || '',
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
