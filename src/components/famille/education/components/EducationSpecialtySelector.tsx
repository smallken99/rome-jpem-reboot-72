
import React from 'react';
import { EducationSpecialtySelectorProps } from '../context/types';
import { educationPaths } from '../data';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const EducationSpecialtySelector: React.FC<EducationSpecialtySelectorProps> = ({
  educationType,
  selectedSpecialties,
  onChange
}) => {
  // Trouver le chemin d'éducation correspondant
  const educationPath = educationPaths.find(path => path.id === educationType);
  
  if (!educationPath) return null;
  
  // Obtenir les spécialités disponibles pour ce type d'éducation
  const availableSpecialties = educationPath.specialties || [];
  
  // Gérer la sélection d'une spécialité
  const handleSpecialtyToggle = (specialty: string) => {
    if (selectedSpecialties.includes(specialty)) {
      onChange(selectedSpecialties.filter(spec => spec !== specialty));
    } else {
      // Limiter à 2 spécialités maximum
      if (selectedSpecialties.length < 2) {
        onChange([...selectedSpecialties, specialty]);
      }
    }
  };
  
  // Vérifier si une spécialité est sélectionnée
  const isSelected = (specialty: string) => selectedSpecialties.includes(specialty);
  
  if (availableSpecialties.length === 0) {
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Spécialités</h3>
          <p className="text-sm text-muted-foreground">
            Aucune spécialité disponible pour ce type d'éducation.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Spécialités</h3>
        <p className="text-sm text-muted-foreground">
          Choisissez jusqu'à 2 spécialités sur lesquelles votre enfant se concentrera.
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {availableSpecialties.map(specialty => (
          <Button
            key={specialty}
            variant={isSelected(specialty) ? "default" : "outline"}
            className={isSelected(specialty) ? "bg-blue-600" : ""}
            onClick={() => handleSpecialtyToggle(specialty)}
          >
            {isSelected(specialty) && <Check className="mr-2 h-4 w-4" />}
            {specialty}
          </Button>
        ))}
      </div>
      
      {selectedSpecialties.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Spécialités sélectionnées:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedSpecialties.map(spec => (
              <Badge key={spec} className="pl-2 pr-1 py-1 flex items-center gap-1">
                {spec}
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-5 w-5 ml-1"
                  onClick={() => handleSpecialtyToggle(spec)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
