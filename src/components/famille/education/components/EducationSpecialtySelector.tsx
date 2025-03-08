
import React from 'react';
import { Scroll } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { specialties } from '../data';

interface EducationSpecialtySelectorProps {
  educationType: string;
  selectedSpecialties?: string[];
  onSpecialtyChange?: (specialty: string, isSelected: boolean) => void;
}

export const EducationSpecialtySelector: React.FC<EducationSpecialtySelectorProps> = ({ 
  educationType,
  selectedSpecialties = [],
  onSpecialtyChange
}) => {
  if (educationType === 'none') {
    return null;
  }
  
  const availableSpecialties = specialties[educationType as keyof typeof specialties] || [];
  
  const handleCheckboxChange = (specialty: string, checked: boolean) => {
    if (onSpecialtyChange) {
      onSpecialtyChange(specialty, checked);
    }
  };
  
  return (
    <div>
      <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
        <Scroll className="h-5 w-5 text-rome-navy" />
        <span>Spécialité</span>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {availableSpecialties.map((specialty, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Checkbox 
              id={`specialty-${index}`} 
              checked={selectedSpecialties.includes(specialty)}
              onCheckedChange={(checked) => handleCheckboxChange(specialty, checked === true)}
            />
            <Label htmlFor={`specialty-${index}`} className="cursor-pointer">
              {specialty}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};
