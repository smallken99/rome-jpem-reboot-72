
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { EducationType, Gender } from '../types/educationTypes';
import { ShieldAlert } from 'lucide-react';

export interface EducationTypeSelectorProps {
  selectedType: EducationType;
  onChange: (type: EducationType) => void;
  gender: Gender;
  childGender?: Gender;
  age?: number;
}

export const EducationTypeSelector: React.FC<EducationTypeSelectorProps> = ({ 
  selectedType, 
  onChange,
  gender,
  childGender,
  age 
}) => {
  const educationTypes: { value: EducationType; label: string; description: string; maleLimited?: boolean }[] = [
    { 
      value: 'military', 
      label: 'Militaire', 
      description: 'Tactique, commandement, combat et stratégie militaire',
      maleLimited: true
    },
    { 
      value: 'rhetoric', 
      label: 'Rhétorique', 
      description: 'Art oratoire, éloquence et persuasion' 
    },
    { 
      value: 'religious', 
      label: 'Religieuse', 
      description: 'Rituel, traditions et cérémonies religieuses' 
    },
    { 
      value: 'political', 
      label: 'Politique', 
      description: 'Lois, gouvernance et administration de la République' 
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Type d'Éducation</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedType} onValueChange={(value) => onChange(value as EducationType)} className="space-y-3">
          {educationTypes.map(type => {
            const isDisabled = type.maleLimited && childGender === 'female';
            
            return (
              <div key={type.value} className={`flex items-start space-x-2 ${isDisabled ? 'opacity-60' : ''}`}>
                <RadioGroupItem 
                  value={type.value} 
                  id={`edu-type-${type.value}`} 
                  disabled={isDisabled}
                  className="mt-1"
                />
                <div className="grid gap-1.5 leading-none w-full">
                  <Label 
                    htmlFor={`edu-type-${type.value}`}
                    className={`font-medium ${isDisabled ? 'text-muted-foreground' : ''}`}
                  >
                    {type.label}
                    {isDisabled && childGender === 'female' && (
                      <span className="ml-2 text-xs text-red-500">(Réservé aux garçons)</span>
                    )}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {type.description}
                  </p>
                </div>
              </div>
            );
          })}
        </RadioGroup>
        
        {childGender === 'female' && (
          <Alert variant="destructive" className="mt-4">
            <ShieldAlert className="h-4 w-4" />
            <AlertDescription>
              L'éducation militaire n'est pas disponible pour les filles dans la société romaine.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};
