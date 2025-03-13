
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { EducationStatusProps } from '../types/educationTypes';
import { Scroll, User, AlertTriangle } from 'lucide-react';
import { getEducationPath } from '../data';

export const EducationStatus: React.FC<EducationStatusProps> = ({ 
  child,
  hasEducation,
  hasInvalidEducation
}) => {
  // Format the education type for display
  const getEducationTypeDisplay = (type: string) => {
    switch (type) {
      case 'rhetoric': return 'Rhétorique';
      case 'politics': return 'Politique';
      case 'military': return 'Militaire';
      case 'religious': return 'Religieuse';
      default: return type;
    }
  };
  
  // Get the education path for more details
  const educationPath = child.currentEducation?.type ? 
    getEducationPath(child.currentEducation.type) : undefined;
  
  // Get skills based on outcomes type
  const getSkills = (path: typeof educationPath) => {
    if (!path?.outcomes) return [];
    if (Array.isArray(path.outcomes)) return path.outcomes;
    return path.outcomes.skills || [];
  };
  
  if (!hasEducation) {
    return (
      <div className="p-4 bg-muted/30 rounded-md mb-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Scroll className="h-4 w-4" />
          <span>Aucune éducation en cours</span>
        </div>
      </div>
    );
  }
  
  if (hasInvalidEducation) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md mb-4">
        <div className="flex items-center gap-2 text-red-700">
          <AlertTriangle className="h-4 w-4" />
          <span>Éducation militaire non accessible aux filles romaines</span>
        </div>
      </div>
    );
  }
  
  if (!child.currentEducation) return null;
  
  return (
    <div className="space-y-4 mb-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Éducation en cours: <span className="text-primary">{getEducationTypeDisplay(child.currentEducation.type)}</span></h3>
        <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
          {child.currentEducation.yearsCompleted} / {child.currentEducation.totalYears} années
        </div>
      </div>
      
      {child.currentEducation.mentor && (
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4 text-muted-foreground" />
          <span>Précepteur: <span className="font-medium">{child.currentEducation.mentor}</span></span>
        </div>
      )}
      
      <div className="space-y-1">
        <div className="flex items-center justify-between text-sm">
          <span>Progression:</span>
          <span className="font-medium">{child.currentEducation.progress}%</span>
        </div>
        <Progress value={child.currentEducation.progress} />
      </div>
      
      {educationPath && (
        <div className="pt-2 border-t text-sm space-y-2">
          <p className="text-muted-foreground">{educationPath.description}</p>
          
          {child.currentEducation.progress >= 100 && (
            <div className="space-y-1">
              <p className="font-medium">Compétences acquises:</p>
              <ul className="list-disc list-inside text-xs space-y-1">
                {getSkills(educationPath).map((skill, idx) => (
                  <li key={idx} className="capitalize">{skill}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
