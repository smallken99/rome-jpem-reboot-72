
import React from 'react';
import { Scroll } from 'lucide-react';
import { EducationInfo } from '@/types/character';

interface EducationSpecialtiesProps {
  education?: EducationInfo;
}

export const EducationSpecialties: React.FC<EducationSpecialtiesProps> = ({ education }) => {
  if (!education || !education.specialties || education.specialties.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 p-3 bg-muted/30 rounded-md">
      <div className="flex items-center gap-2 mb-2">
        <Scroll className="h-4 w-4 text-rome-navy/70" />
        <h4 className="text-sm font-medium">Spécialités Acquises</h4>
      </div>
      
      {education.type && (
        <div className="mb-2">
          <span className="text-xs text-muted-foreground">Formation: </span>
          <span className="text-xs font-medium">
            {education.type === 'military' ? 'Militaire' : 
             education.type === 'political' ? 'Politique' : 
             education.type === 'religious' ? 'Religieuse' : 'Inconnue'}
          </span>
        </div>
      )}
      
      {education.mentor && (
        <div className="mb-2">
          <span className="text-xs text-muted-foreground">Précepteur: </span>
          <span className="text-xs font-medium">{education.mentor}</span>
        </div>
      )}
      
      <ul className="list-disc pl-5 text-xs space-y-1">
        {education.specialties.map((specialty, index) => (
          <li key={index}>{specialty}</li>
        ))}
      </ul>
    </div>
  );
};
