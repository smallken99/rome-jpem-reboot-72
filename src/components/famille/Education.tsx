
import React from 'react';
import { GraduationCap, ShieldQuestion } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ChildEducationCard } from './education/ChildEducationCard';
import { EducationPathCard } from './education/EducationPathCard';
import { EducationIntro } from './education/EducationIntro';
import { children, educationPaths } from './education/EducationData';

export const Education: React.FC = () => {
  return (
    <div className="education">
      <EducationIntro />
      
      <div className="children-education mb-6">
        <h3 className="font-cinzel text-lg mb-3 flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-rome-terracotta" />
          Éducation en Cours
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {children.map(child => (
            <ChildEducationCard key={child.id} child={child} />
          ))}
        </div>
      </div>
      
      <Separator className="my-6" />
      
      <div className="education-paths">
        <h3 className="font-cinzel text-lg mb-3 flex items-center gap-2">
          <ShieldQuestion className="h-5 w-5 text-rome-terracotta" />
          Parcours Éducatifs Disponibles
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {educationPaths.map((path, idx) => (
            <EducationPathCard key={idx} path={path} />
          ))}
        </div>
      </div>
    </div>
  );
};
