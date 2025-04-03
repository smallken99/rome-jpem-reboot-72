
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface EducationSkillsProps {
  acquiredSkills: string[];
  inProgressSkills: string[];
  progress: number;
}

export const EducationSkills: React.FC<EducationSkillsProps> = ({
  acquiredSkills,
  inProgressSkills,
  progress
}) => {
  // Si aucune compétence, afficher un message
  if (acquiredSkills.length === 0 && inProgressSkills.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Aucune compétence acquise ou en cours d'acquisition</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {acquiredSkills.length > 0 && (
        <div>
          <h3 className="font-medium mb-3">Compétences acquises</h3>
          <div className="flex flex-wrap gap-2">
            {acquiredSkills.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      {inProgressSkills.length > 0 && (
        <div>
          <h3 className="font-medium mb-3">Compétences en cours d'acquisition</h3>
          <div className="space-y-2">
            {inProgressSkills.slice(0, 3).map((skill, index) => (
              <div key={index} className="flex items-center justify-between">
                <span>{skill}</span>
                <Badge variant="outline">
                  {index === 0 ? Math.min(100, progress) :
                   index === 1 ? Math.min(100, progress - 20) :
                   Math.min(100, progress - 40)}%
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-4 text-sm text-muted-foreground">
        <p>Les compétences acquises restent avec le personnage tout au long de sa vie et influencent ses capacités.</p>
      </div>
    </div>
  );
};
