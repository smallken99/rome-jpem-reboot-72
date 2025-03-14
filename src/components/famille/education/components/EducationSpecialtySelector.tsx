
import React from 'react';
import { getEducationPath } from '../data';
import { EducationSpecialtySelectorProps } from '../types/educationTypes';
import { Checkbox } from '@/components/ui/checkbox';
import { getSpecialtiesByPath } from '../data/educationPaths';

export const EducationSpecialtySelector: React.FC<EducationSpecialtySelectorProps> = ({
  educationType,
  selectedSpecialties,
  onChange,
  maxSelections = 3
}) => {
  const educationPath = getEducationPath(educationType);
  
  // Get specialties from either the educationPath or the utility function
  const getSpecialties = () => {
    if (educationPath?.specialties && educationPath.specialties.length > 0) {
      return educationPath.specialties;
    }
    
    // Use the utility function from educationPaths
    return getSpecialtiesByPath(educationType);
  };
  
  const specialties = getSpecialties();
  
  if (!specialties.length) {
    return (
      <div className="text-muted-foreground italic text-sm">
        Aucune spécialité disponible pour ce type d'éducation.
      </div>
    );
  }

  const handleSpecialtyChange = (specialty: string, isChecked: boolean) => {
    let updatedSpecialties = [...selectedSpecialties];
    
    if (isChecked) {
      // Add specialty if it's not already selected
      if (!updatedSpecialties.includes(specialty)) {
        updatedSpecialties.push(specialty);
      }
    } else {
      // Remove specialty
      updatedSpecialties = updatedSpecialties.filter(s => s !== specialty);
    }
    
    onChange(updatedSpecialties);
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Spécialités</h3>
        <p className="text-sm text-muted-foreground">
          Sélectionnez jusqu'à {maxSelections} spécialités que l'enfant apprendra
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {specialties.map((specialty, index) => {
          const isSelected = selectedSpecialties.includes(specialty);
          const isDisabled = selectedSpecialties.length >= maxSelections && !isSelected;
          
          return (
            <div key={index} className="flex items-start space-x-2">
              <Checkbox 
                id={`specialty-${index}`}
                checked={isSelected}
                onCheckedChange={(checked) => handleSpecialtyChange(specialty, checked === true)}
                disabled={isDisabled}
              />
              <label
                htmlFor={`specialty-${index}`}
                className={`text-sm leading-tight ${isDisabled ? 'text-muted-foreground' : ''}`}
              >
                {specialty}
              </label>
            </div>
          );
        })}
      </div>
      
      {selectedSpecialties.length >= maxSelections && (
        <p className="text-xs text-amber-600">
          Maximum de {maxSelections} spécialités atteint.
        </p>
      )}
    </div>
  );
};
