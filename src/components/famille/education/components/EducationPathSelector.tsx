
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { EducationPathCard } from '../EducationPathCard';
import { useEducation } from '../context/EducationContext';
import { EducationType, Gender } from '../types/educationTypes';

interface EducationPathSelectorProps {
  childAge: number;
  childGender: Gender;
  selectedPath: EducationType | null;
  onSelectPath: (path: EducationType) => void;
}

export const EducationPathSelector: React.FC<EducationPathSelectorProps> = ({
  childAge,
  childGender,
  selectedPath,
  onSelectPath
}) => {
  const { getAllEducationPaths, findEducationPathById } = useEducation();
  const paths = getAllEducationPaths();
  
  // Filter paths based on age and gender
  const eligiblePaths = paths.filter(path => {
    const pathData = findEducationPathById(path.id);
    if (!pathData) return false;
    
    // Check age range
    const ageOk = childAge >= pathData.minAge && childAge <= pathData.maxAge;
    
    // Check gender suitability
    const genderOk = pathData.suitableFor.gender === 'both' || 
                     pathData.suitableFor.gender === childGender;
    
    return ageOk && genderOk;
  });
  
  if (eligiblePaths.length === 0) {
    return (
      <div className="p-6 bg-amber-50 border border-amber-200 rounded-md">
        <h3 className="font-semibold text-amber-700">Aucun chemin d'éducation disponible</h3>
        <p className="text-amber-600 mt-2">
          Il n'y a pas de chemin d'éducation disponible pour cet enfant en raison de son âge ({childAge} ans) 
          ou de son genre ({childGender === 'male' ? 'masculin' : 'féminin'}).
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Sélectionnez un type d'éducation</h3>
      
      <RadioGroup 
        value={selectedPath || ''} 
        onValueChange={(value) => onSelectPath(value as EducationType)}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {eligiblePaths.map((path) => {
          const pathData = findEducationPathById(path.id);
          if (!pathData) return null;
          
          return (
            <div key={path.id} className="relative">
              <RadioGroupItem 
                value={path.id} 
                id={`path-${path.id}`} 
                className="sr-only peer"
              />
              <Label 
                htmlFor={`path-${path.id}`} 
                className="cursor-pointer block h-full peer-checked:ring-2 peer-checked:ring-blue-500 rounded-lg overflow-hidden"
              >
                <EducationPathCard path={pathData} />
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};
