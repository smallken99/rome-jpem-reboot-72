
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EducationType, Gender } from '../types/educationTypes';

interface EducationTypeSelectorProps {
  selectedType: string;
  onChange: (value: string) => void;
  gender?: Gender;
  childGender: Gender;
  age?: number;
}

export const EducationTypeSelector: React.FC<EducationTypeSelectorProps> = ({
  selectedType,
  onChange,
  gender = 'male',
  childGender,
  age = 10
}) => {
  // Determine which education types are available based on gender
  const isFemale = childGender === 'female';
  const isYoung = age < 8;

  // Éducation options with their descriptions
  const options = [
    {
      value: 'rhetoric' as EducationType,
      label: 'Éducation Rhétorique',
      description: 'Maîtrise de l\'éloquence et de la persuasion',
      disabled: isYoung
    },
    {
      value: 'military' as EducationType,
      label: 'Éducation Militaire',
      description: 'Formation aux tactiques et au commandement',
      disabled: isFemale || isYoung
    },
    {
      value: 'political' as EducationType,
      label: 'Éducation Politique',
      description: 'Apprentissage de la gouvernance et des alliances',
      disabled: isYoung
    },
    {
      value: 'religious' as EducationType,
      label: 'Éducation Religieuse',
      description: 'Étude des rites et traditions romaines',
      disabled: isYoung
    },
    {
      value: 'philosophical' as EducationType,
      label: 'Éducation Philosophique',
      description: 'Étude de la sagesse et de la vertu',
      disabled: isYoung
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-md">Type d'Éducation</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          value={selectedType} 
          onValueChange={onChange}
          className="grid grid-cols-1 gap-3"
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={`
                flex items-center p-3 border rounded-md 
                ${selectedType === option.value ? 'border-primary bg-secondary/20' : 'border-accent'} 
                ${option.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary cursor-pointer'}
              `}
            >
              <RadioGroupItem 
                value={option.value} 
                id={option.value} 
                disabled={option.disabled}
                className="mr-3"
              />
              <div className="flex flex-col">
                <Label htmlFor={option.value} className="font-medium cursor-pointer">
                  {option.label}
                </Label>
                <span className="text-xs text-muted-foreground">{option.description}</span>
              </div>
            </div>
          ))}
        </RadioGroup>

        {isFemale && selectedType === 'military' && (
          <div className="mt-4 p-3 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-md text-sm">
            Attention: L'éducation militaire n'est généralement pas adaptée pour les jeunes filles dans la société romaine.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
