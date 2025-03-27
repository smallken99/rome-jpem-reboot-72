
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckboxGroup } from './CheckboxGroup';
import { EducationType } from '../types/educationTypes';

export interface EducationSpecialtySelectorProps {
  educationType: EducationType;
  selectedSpecialties: string[];
  onChange: (specialties: string[]) => void;
  availableSpecialties?: string[];
}

export const EducationSpecialtySelector: React.FC<EducationSpecialtySelectorProps> = ({ 
  educationType, 
  selectedSpecialties, 
  onChange,
  availableSpecialties 
}) => {
  // Define specialties for each education type
  const getSpecialtiesForType = (type: EducationType): string[] => {
    if (availableSpecialties && availableSpecialties.length > 0) {
      return availableSpecialties;
    }
    
    switch (type) {
      case 'military':
        return [
          'Combat à l\'épée', 
          'Tactique de formation', 
          'Commandement', 
          'Cavalerie', 
          'Fortifications'
        ];
      case 'rhetoric':
        return [
          'Éloquence publique', 
          'Écriture', 
          'Débat', 
          'Philosophie', 
          'Droit romain'
        ];
      case 'religious':
        return [
          'Rituel', 
          'Oracle', 
          'Présages', 
          'Histoire sacrée', 
          'Culte familial'
        ];
      case 'political':
        return [
          'Droit romain',
          'Diplomatie',
          'Administration',
          'Finances publiques',
          'Politique provinciale'
        ];
      default:
        return [];
    }
  };

  const specialties = getSpecialtiesForType(educationType);

  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    if (checked) {
      // Add specialty if not already in the list
      if (!selectedSpecialties.includes(specialty)) {
        onChange([...selectedSpecialties, specialty]);
      }
    } else {
      // Remove specialty
      onChange(selectedSpecialties.filter(s => s !== specialty));
    }
  };

  if (specialties.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Spécialités</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3">
          Choisissez jusqu'à 2 spécialités dans lesquelles l'élève excellera
        </p>
        
        <CheckboxGroup
          items={specialties}
          selectedItems={selectedSpecialties}
          onChange={handleSpecialtyChange}
          maxSelections={2}
        />
      </CardContent>
    </Card>
  );
};
