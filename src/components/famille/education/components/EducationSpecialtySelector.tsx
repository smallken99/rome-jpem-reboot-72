
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { EducationSpecialtySelectorProps } from '../types/educationTypes';

export const EducationSpecialtySelector: React.FC<EducationSpecialtySelectorProps> = ({
  selectedSpecialties,
  availableSpecialties,
  onChange
}) => {
  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    if (checked) {
      // Add specialty
      onChange([...selectedSpecialties, specialty]);
    } else {
      // Remove specialty
      onChange(selectedSpecialties.filter(s => s !== specialty));
    }
  };
  
  return (
    <div className="space-y-3">
      <Label className="text-base mb-2 block">Spécialités (choisissez-en 2 maximum)</Label>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {availableSpecialties.map((specialty) => (
          <div key={specialty} className="flex items-center space-x-2">
            <Checkbox 
              id={`specialty-${specialty}`} 
              checked={selectedSpecialties.includes(specialty)}
              onCheckedChange={(checked) => 
                handleSpecialtyChange(specialty, checked as boolean)
              }
              disabled={!selectedSpecialties.includes(specialty) && selectedSpecialties.length >= 2}
            />
            <Label 
              htmlFor={`specialty-${specialty}`}
              className="text-sm cursor-pointer"
            >
              {specialty}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};
