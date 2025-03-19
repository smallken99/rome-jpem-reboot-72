
import React from 'react';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { academicPath } from '../data/paths/academicPath';
import { militaryPath } from '../data/paths/militaryPath';
import { rhetoricPath } from '../data/paths/rhetoricPath';
import { EducationType } from '../types/educationTypes';

interface SpecialtySelectorProps {
  pathId: EducationType;
  selectedSpecialty: string | null;
  onSelectSpecialty: (specialtyId: string) => void;
}

export const SpecialtySelector: React.FC<SpecialtySelectorProps> = ({
  pathId,
  selectedSpecialty,
  onSelectSpecialty
}) => {
  const getSpecialtiesForPath = (pathId: EducationType) => {
    switch(pathId) {
      case 'academic':
        return academicPath.specialtyDetails || [];
      case 'military':
        return militaryPath.specialtyDetails || [];
      case 'rhetoric':
        return rhetoricPath.specialtyDetails || [];
      default:
        return [];
    }
  };

  const specialties = getSpecialtiesForPath(pathId);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Choisir une spécialité</h3>
      
      <Card className="p-4">
        <RadioGroup value={selectedSpecialty || undefined} onValueChange={onSelectSpecialty}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {specialties.map((specialty) => (
              <div key={specialty.id} className="flex items-start space-x-2 p-2 rounded-md hover:bg-gray-50">
                <RadioGroupItem value={specialty.id} id={specialty.id} />
                <div className="grid gap-1.5">
                  <Label htmlFor={specialty.id} className="font-medium">
                    {specialty.name}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {specialty.description}
                  </p>
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground">Compétences :</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {specialty.skills.map((skill) => (
                        <span 
                          key={skill} 
                          className="text-xs bg-gray-100 px-2 py-0.5 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </RadioGroup>
      </Card>
    </div>
  );
};
