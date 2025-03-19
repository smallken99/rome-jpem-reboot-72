
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { EducationType } from '../types/educationTypes';
import { cn } from '@/lib/utils';

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
  // Specialties for each education path
  const specialtiesByPath: Record<EducationType, Array<{id: string; name: string; description: string}>> = {
    'none': [],
    'military': [
      { id: 'infantry', name: 'Infanterie', description: 'Formation tactique et combat de ligne' },
      { id: 'cavalry', name: 'Cavalerie', description: 'Équitation militaire et tactiques de charge' },
      { id: 'leadership', name: 'Commandement', description: 'Art du leadership et organisation militaire' },
      { id: 'naval', name: 'Marine', description: 'Tactiques navales et navigation' }
    ],
    'rhetoric': [
      { id: 'politics', name: 'Politique', description: 'Art du discours public et débats' },
      { id: 'law', name: 'Droit', description: 'Étude des lois romaines et plaidoiries' },
      { id: 'literature', name: 'Littérature', description: 'Poésie, prose et composition' },
      { id: 'philosophy', name: 'Philosophie', description: 'Logique, éthique et métaphysique' }
    ],
    'academic': [
      { id: 'mathematics', name: 'Mathématiques', description: 'Géométrie, arithmétique et astronomie' },
      { id: 'medicine', name: 'Médecine', description: 'Anatomie, herboristerie et traitements' },
      { id: 'architecture', name: 'Architecture', description: 'Conception et planification de structures' },
      { id: 'history', name: 'Histoire', description: 'Chroniques et analyse des évènements passés' }
    ],
    'religious': [
      { id: 'priesthood', name: 'Sacerdoce', description: 'Rites et cérémonies religieuses' },
      { id: 'divination', name: 'Divination', description: 'Interprétation des présages et augures' },
      { id: 'ritual', name: 'Rituels', description: 'Cérémonies sacrées et processions' },
      { id: 'theology', name: 'Théologie', description: 'Étude des dieux et mythes romains' }
    ],
    'political': []
  };

  const specialties = specialtiesByPath[pathId] || [];

  if (specialties.length === 0) {
    return (
      <div className="text-amber-600">
        Aucune spécialité disponible pour ce parcours d'éducation.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Choisir une spécialité</h3>
      
      <RadioGroup value={selectedSpecialty || undefined} onValueChange={onSelectSpecialty}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specialties.map((specialty) => (
            <Card 
              key={specialty.id}
              className={cn(
                "cursor-pointer hover:border-blue-400 transition-colors",
                selectedSpecialty === specialty.id ? "border-blue-500" : ""
              )}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <RadioGroupItem value={specialty.id} id={specialty.id} />
                <div>
                  <Label htmlFor={specialty.id} className="font-medium cursor-pointer">
                    {specialty.name}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {specialty.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};
