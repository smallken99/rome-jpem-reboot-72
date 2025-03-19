
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EducationType, Gender } from '../types/educationTypes';
import { Book, Shield, ScrollText, Church } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EducationPathSelectorProps {
  childAge: number;
  childGender: Gender;
  selectedPath: EducationType | null;
  onSelectPath: (pathId: EducationType) => void;
}

export const EducationPathSelector: React.FC<EducationPathSelectorProps> = ({
  childAge,
  childGender,
  selectedPath,
  onSelectPath
}) => {
  // Education paths available in Roman society
  const paths = [
    {
      id: 'military' as EducationType,
      name: 'Militaire',
      description: 'Formation aux arts de la guerre, tactiques et leadership militaire',
      icon: Shield,
      minAge: 10,
      genderRestriction: 'male' as Gender,
      color: 'bg-red-100 text-red-700'
    },
    {
      id: 'rhetoric' as EducationType,
      name: 'Rhétorique',
      description: 'Apprentissage de l\'éloquence, du droit et de la politique',
      icon: ScrollText,
      minAge: 8,
      genderRestriction: null,
      color: 'bg-blue-100 text-blue-700'
    },
    {
      id: 'academic' as EducationType,
      name: 'Académique',
      description: 'Étude des sciences, de la philosophie et des mathématiques',
      icon: Book,
      minAge: 8,
      genderRestriction: null,
      color: 'bg-purple-100 text-purple-700'
    },
    {
      id: 'religious' as EducationType,
      name: 'Religieuse',
      description: 'Formation aux rites religieux, traditions et divination',
      icon: Church,
      minAge: 9,
      genderRestriction: null,
      color: 'bg-amber-100 text-amber-700'
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Choisir un parcours d'éducation</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paths.map((path) => {
          const isDisabled = 
            (path.minAge > childAge) || 
            (path.genderRestriction && path.genderRestriction !== childGender);
          
          return (
            <Card 
              key={path.id}
              className={cn(
                "cursor-pointer hover:border-blue-400 transition-colors",
                selectedPath === path.id ? "border-blue-500" : "",
                isDisabled ? "opacity-50 cursor-not-allowed" : ""
              )}
              onClick={() => !isDisabled && onSelectPath(path.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={cn("p-2 rounded-full", path.color)}>
                    <path.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">{path.name}</h4>
                    <p className="text-sm text-muted-foreground">{path.description}</p>
                    
                    {isDisabled && (
                      <div className="mt-2 text-xs text-red-600">
                        {path.minAge > childAge && 
                          `L'enfant doit avoir au moins ${path.minAge} ans`}
                        {path.genderRestriction && path.genderRestriction !== childGender && 
                          `Réservé aux ${path.genderRestriction === 'male' ? 'garçons' : 'filles'}`}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
