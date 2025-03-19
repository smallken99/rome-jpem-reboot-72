
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { InfoCircle } from '@/components/ui/InfoIcon';
import { Child } from '../types/educationTypes';

interface EducationStatusProps {
  child: Child;
  hasEducation: boolean;
  hasInvalidEducation?: boolean;
}

export const EducationStatus: React.FC<EducationStatusProps> = ({
  child,
  hasEducation,
  hasInvalidEducation = false
}) => {
  // Fonction pour obtenir la description du type d'éducation
  const getEducationTypeDescription = (type: string) => {
    switch (type) {
      case 'military':
        return 'Formation militaire';
      case 'rhetoric':
        return 'Formation à la rhétorique';
      case 'religious':
        return 'Formation religieuse';
      case 'academic':
        return 'Formation académique';
      default:
        return 'Aucune éducation en cours';
    }
  };

  // Function to format progress text
  const formatProgressText = (progress: number) => {
    if (progress < 25) return 'Débutant';
    if (progress < 50) return 'Apprenti';
    if (progress < 75) return 'Intermédiaire';
    if (progress < 100) return 'Avancé';
    return 'Maître';
  };

  return (
    <div className="space-y-3 mt-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-medium">Éducation:</span>
          {hasEducation ? (
            <Badge 
              className={`
                ${child.educationType === 'military' ? 'bg-red-100 text-red-800 hover:bg-red-200' : 
                 child.educationType === 'rhetoric' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' :
                 child.educationType === 'religious' ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' :
                 child.educationType === 'academic' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                 'bg-gray-100 text-gray-800 hover:bg-gray-200'}
              `}
            >
              {getEducationTypeDescription(child.educationType)}
            </Badge>
          ) : (
            <Badge variant="outline" className="text-muted-foreground">
              Non éduqué
            </Badge>
          )}
          
          {hasInvalidEducation && (
            <div className="flex items-center text-red-500 text-xs">
              <InfoCircle className="h-3.5 w-3.5 mr-1" />
              <span>Incompatible avec le genre</span>
            </div>
          )}
        </div>
        
        {hasEducation && (
          <span className="text-sm text-muted-foreground">
            {formatProgressText(child.progress)}
          </span>
        )}
      </div>
      
      {hasEducation && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Progression</span>
            <span>{child.progress}%</span>
          </div>
          <Progress value={child.progress} className="h-2" />
        </div>
      )}
    </div>
  );
};
