
import React from 'react';
import { useEducation } from '../context/EducationContext';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Lightbulb } from 'lucide-react';

interface SpecialtySelectorProps {
  pathId: string;
  selectedSpecialty: string | null;
  onSelectSpecialty: (specialtyId: string) => void;
}

export const SpecialtySelector: React.FC<SpecialtySelectorProps> = ({
  pathId,
  selectedSpecialty,
  onSelectSpecialty
}) => {
  const { findEducationPathById } = useEducation();
  const educationPath = findEducationPathById(pathId);
  
  if (!educationPath || !educationPath.specialtyDetails || educationPath.specialtyDetails.length === 0) {
    return (
      <div className="p-4 bg-gray-50 border rounded-md">
        <p className="text-gray-500">Pas de spécialités disponibles pour ce type d'éducation.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Choisissez une spécialité</h3>
        <div className="flex items-center space-x-2 text-amber-600 bg-amber-50 px-3 py-1 rounded-full text-sm">
          <Lightbulb className="h-4 w-4" />
          <span>La spécialité influencera les compétences acquises</span>
        </div>
      </div>
      
      <RadioGroup 
        value={selectedSpecialty || ''} 
        onValueChange={onSelectSpecialty}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {educationPath.specialtyDetails.map((specialty) => (
          <div key={specialty.id} className="relative">
            <RadioGroupItem 
              value={specialty.id} 
              id={`specialty-${specialty.id}`} 
              className="sr-only peer"
            />
            <Label 
              htmlFor={`specialty-${specialty.id}`} 
              className="cursor-pointer block h-full peer-checked:ring-2 peer-checked:ring-blue-500 rounded-lg overflow-hidden"
            >
              <Card className="h-full border-2 hover:border-blue-200 transition-colors">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{specialty.name}</CardTitle>
                  <CardDescription>{specialty.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Compétences:</p>
                    <ul className="space-y-1">
                      {specialty.skills.map((skill, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-sm">
                          <Check className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <p className="text-sm font-medium mt-3">Carrières possibles:</p>
                    <div className="flex flex-wrap gap-1">
                      {specialty.careers.map((career, idx) => (
                        <span 
                          key={idx} 
                          className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded"
                        >
                          {career}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};
