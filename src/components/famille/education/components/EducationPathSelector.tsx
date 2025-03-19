
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Scroll, Shield, Book } from 'lucide-react';
import { academicPath } from '../data/paths/academicPath';
import { militaryPath } from '../data/paths/militaryPath';
import { rhetoricPath } from '../data/paths/rhetoricPath';
import { EducationType, Gender } from '../types/educationTypes';

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
  // Path definitions with appropriate icons
  const paths = [
    {
      ...militaryPath,
      icon: <Shield className="h-8 w-8 text-red-600" />,
      disabled: childGender === 'female' || childAge < militaryPath.minAge || childAge > militaryPath.maxAge
    },
    {
      ...rhetoricPath,
      icon: <Book className="h-8 w-8 text-blue-600" />,
      disabled: childAge < rhetoricPath.minAge || childAge > rhetoricPath.maxAge
    },
    {
      ...academicPath,
      icon: <Scroll className="h-8 w-8 text-purple-600" />,
      disabled: childAge < academicPath.minAge || childAge > academicPath.maxAge
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Choisir un parcours d'éducation</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {paths.map((path) => (
          <Card key={path.id} className={`p-4 border-2 ${
            selectedPath === path.type ? 'border-rome-gold' : 'border-gray-200'
          } ${path.disabled ? 'opacity-50' : 'hover:border-rome-gold/60'} transition-all cursor-pointer`}
               onClick={() => !path.disabled && onSelectPath(path.type as EducationType)}>
            <div className="flex flex-col items-center text-center">
              <div className="mb-3">{path.icon}</div>
              <h4 className="font-cinzel text-lg mb-2">{path.name}</h4>
              <p className="text-sm text-muted-foreground mb-4">{path.description}</p>
              
              <div className="mt-2 text-xs">
                <div>Âge : {path.minAge} - {path.maxAge} ans</div>
                <div>Durée : {path.duration} ans</div>
              </div>
              
              {path.disabled && (
                <div className="mt-2 text-xs text-red-500">
                  {childGender === 'female' && path.type === 'military' 
                    ? 'Non disponible pour les filles' 
                    : childAge < path.minAge 
                      ? 'Enfant trop jeune' 
                      : 'Enfant trop âgé'}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
