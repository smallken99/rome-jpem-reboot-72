
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Child, EducationStatusProps } from '../types/educationTypes';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, BookOpen, GraduationCap } from 'lucide-react';

export const EducationStatus: React.FC<EducationStatusProps> = ({ 
  child, 
  hasEducation,
  hasInvalidEducation = false 
}) => {
  // Warning for invalid education (e.g., female with military education)
  if (hasInvalidEducation) {
    return (
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-amber-500">
          <AlertTriangle className="h-5 w-5" />
          <span className="font-medium">Éducation inappropriée</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Ce type d'éducation n'est généralement pas adapté pour une jeune fille romaine. 
          Envisagez de choisir une éducation plus appropriée.
        </p>
      </div>
    );
  }
  
  // No education yet
  if (!hasEducation) {
    return (
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <BookOpen className="h-5 w-5" />
          <span className="font-medium">Pas encore d'éducation</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Cet enfant n'a pas encore commencé son éducation. Assignez un précepteur 
          et choisissez un parcours éducatif.
        </p>
      </div>
    );
  }
  
  // In progress education
  const displayProgress = child.progress;
  
  return (
    <div className="space-y-4 mb-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-primary" />
          <span className="font-medium">
            <span className="capitalize">{child.educationType}</span>
          </span>
        </div>
        
        <Badge variant="outline" className="text-xs bg-primary/10">
          {displayProgress}% Complété
        </Badge>
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Progression</span>
          <span>{displayProgress}%</span>
        </div>
        <Progress value={displayProgress} className="h-2" />
      </div>
      
      {child.specialties && child.specialties.length > 0 && (
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground">Spécialités:</span>
          <div className="flex flex-wrap gap-1">
            {child.specialties.map((specialty, index) => (
              <Badge key={index} variant="outline" className="text-xs capitalize">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      {child.mentor && (
        <div className="text-xs text-muted-foreground">
          Précepteur: <span className="font-medium">{child.mentor}</span>
        </div>
      )}
    </div>
  );
};
