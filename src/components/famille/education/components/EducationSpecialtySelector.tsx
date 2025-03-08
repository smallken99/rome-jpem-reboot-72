
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { specialties } from '../data';

export interface EducationSpecialtySelectorProps {
  educationType: string;
  selectedSpecialties: string[];
  onChange: (specialties: string[]) => void;
}

export const EducationSpecialtySelector: React.FC<EducationSpecialtySelectorProps> = ({
  educationType,
  selectedSpecialties,
  onChange
}) => {
  // Obtenir les spécialités disponibles pour ce type d'éducation
  const availableSpecialties = specialties[educationType as keyof typeof specialties] || [];
  
  // Gérer le changement de sélection
  const handleSpecialtyChange = (specialty: string, isChecked: boolean) => {
    if (isChecked) {
      // Si on sélectionne, ajouter à la liste (max 3)
      if (selectedSpecialties.length < 3) {
        onChange([...selectedSpecialties, specialty]);
      }
    } else {
      // Si on désélectionne, retirer de la liste
      onChange(selectedSpecialties.filter(s => s !== specialty));
    }
  };
  
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Spécialités</h3>
        <p className="text-sm text-muted-foreground">
          Choisissez jusqu'à 3 spécialités sur lesquelles l'enfant se concentrera. 
          Ces domaines progresseront plus rapidement.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {availableSpecialties.map((specialty) => (
          <div key={specialty} className="flex items-center space-x-2">
            <Checkbox 
              id={`specialty-${specialty}`}
              checked={selectedSpecialties.includes(specialty)}
              onCheckedChange={(checked) => handleSpecialtyChange(specialty, checked === true)}
              disabled={!selectedSpecialties.includes(specialty) && selectedSpecialties.length >= 3}
            />
            <Label 
              htmlFor={`specialty-${specialty}`}
              className="cursor-pointer"
            >
              {specialty}
            </Label>
          </div>
        ))}
      </div>
      
      {selectedSpecialties.length > 0 && (
        <div className="mt-4 p-3 bg-muted rounded-md">
          <p className="text-sm font-medium">Spécialités sélectionnées:</p>
          <ul className="list-disc list-inside text-sm">
            {selectedSpecialties.map(s => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
