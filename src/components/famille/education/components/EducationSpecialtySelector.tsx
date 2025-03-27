
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EducationType } from '../types/educationTypes';
import CheckboxGroup from './CheckboxGroup';

interface EducationSpecialtySelectorProps {
  educationType: EducationType | string;
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
  const specialtiesByType: Record<string, string[]> = {
    military: [
      'Stratégie militaire',
      'Combat à l\'épée',
      'Combat à cheval',
      'Commandement de légion',
      'Tactiques de siège'
    ],
    political: [
      'Rhétorique politique',
      'Droit romain',
      'Administration provinciale',
      'Diplomatie',
      'Finances publiques'
    ],
    religious: [
      'Rites et cérémonies',
      'Augures et divination',
      'Droit sacré',
      'Mythologie',
      'Administration des temples'
    ],
    artistic: [
      'Poésie',
      'Musique',
      'Sculpture',
      'Peinture',
      'Architecture'
    ],
    philosophical: [
      'Philosophie stoïcienne',
      'Philosophie épicurienne',
      'Logique',
      'Éthique',
      'Métaphysique'
    ],
    rhetoric: [
      'Art oratoire',
      'Éloquence judiciaire',
      'Débat politique',
      'Composition littéraire',
      'Persuasion'
    ],
    academic: [
      'Mathématiques',
      'Astronomie',
      'Médecine',
      'Histoire',
      'Langues étrangères'
    ]
  };

  // Get specialties for the selected education type
  const specialties = availableSpecialties || 
    specialtiesByType[educationType] || 
    specialtiesByType.academic;

  // Handle specialty selection
  const handleSpecialtyChange = (newSelectedSpecialties: string[]) => {
    onChange(newSelectedSpecialties);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Spécialités</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Choisissez les spécialités sur lesquelles l'éducation se concentrera.
          Ces choix influenceront les compétences acquises.
        </p>
        
        <CheckboxGroup
          options={specialties}
          selectedOptions={selectedSpecialties}
          onChange={handleSpecialtyChange}
          className="mt-2"
        />
      </CardContent>
    </Card>
  );
};

export default EducationSpecialtySelector;
