
import React from 'react';
import { BookOpen, GraduationCap, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
  // Get display name for education type
  const getEducationTypeName = (type: string): string => {
    const types: Record<string, string> = {
      'none': 'Aucune',
      'military': 'Militaire',
      'rhetoric': 'Rhétorique',
      'religious': 'Religieuse',
      'academic': 'Académique'
    };
    return types[type] || type;
  };

  // Warning for children with no education
  if (!hasEducation) {
    return (
      <div className="mb-4 rounded-md border border-amber-200 bg-amber-50 p-3">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-amber-800 mb-1">Aucune éducation en cours</h4>
            <p className="text-sm text-amber-700">
              Cet enfant n'a pas d'éducation. Définissez un type d'éducation pour commencer son instruction.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Warning for female children with military education
  if (hasInvalidEducation) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          L'éducation militaire n'est pas adaptée aux filles dans la société romaine. Veuillez choisir un autre type d'éducation.
        </AlertDescription>
      </Alert>
    );
  }

  // Education progress display
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-primary" />
          <span className="font-medium">{getEducationTypeName(child.educationType)} ({child.progress}%)</span>
        </div>
        <Badge variant="outline">
          {child.progress < 25 ? 'Débutant' : 
           child.progress < 50 ? 'Apprenti' : 
           child.progress < 75 ? 'Confirmé' : 
           'Maître'}
        </Badge>
      </div>
      
      <div className="bg-muted h-2 rounded-full mb-2 overflow-hidden">
        <div 
          className="bg-primary h-full rounded-full"
          style={{ width: `${child.progress}%` }}
        ></div>
      </div>
      
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Débutant</span>
        <span>Apprenti</span>
        <span>Confirmé</span>
        <span>Maître</span>
      </div>
    </div>
  );
};
