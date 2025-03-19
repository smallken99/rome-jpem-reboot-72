
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { InfoCircle } from '@/components/ui/InfoIcon';
import { Child } from '../types/educationTypes';
import { Badge } from '@/components/ui/badge';
import { BookOpen, AlertTriangle } from 'lucide-react';

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
  const formatEducationType = (type: string) => {
    switch (type) {
      case 'military': return 'Militaire';
      case 'rhetoric': return 'Rhétorique';
      case 'academic': return 'Académique';
      case 'religious': return 'Religieuse';
      default: return 'Non définie';
    }
  };

  if (!hasEducation) {
    return (
      <div className="flex items-start gap-2 mb-4">
        <InfoCircle className="h-5 w-5 text-amber-500 mt-0.5" />
        <div>
          <p className="text-sm text-muted-foreground">
            Aucune éducation n'est assignée à cet enfant.
          </p>
        </div>
      </div>
    );
  }

  if (hasInvalidEducation) {
    return (
      <div className="flex items-start gap-2 mb-4">
        <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-red-600">
            L'éducation militaire n'est pas adaptée pour une fille romaine
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Choisissez un autre type d'éducation plus approprié
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium">
            Éducation {formatEducationType(child.educationType)}
          </span>
        </div>
        
        <Badge variant="outline" className="text-xs">
          {child.preceptorId ? "Avec précepteur" : "Auto-formation"}
        </Badge>
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between items-center text-xs">
          <span>Progression</span>
          <span>{child.progress}%</span>
        </div>
        <Progress value={child.progress} className="h-2" />
      </div>
    </div>
  );
};
