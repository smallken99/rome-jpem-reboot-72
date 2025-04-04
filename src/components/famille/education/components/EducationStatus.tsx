
import React from 'react';
import { AlertCircle, GraduationCap, X } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { EducationType, Child } from '../types/educationTypes';
import { Button } from '@/components/ui/button';
import { getPreceptorById } from '../data/preceptors';

interface EducationStatusProps {
  child: Child;
  hasEducation?: boolean;
  hasInvalidEducation?: boolean;
}

export const EducationStatus: React.FC<EducationStatusProps> = ({
  child,
  hasEducation = false,
  hasInvalidEducation = false
}) => {
  const getEducationTypeName = (type: EducationType | string) => {
    switch (type) {
      case 'military': return 'Militaire';
      case 'rhetoric': return 'Rhétorique';
      case 'religious': return 'Religieuse';
      case 'academic': return 'Académique';
      default: return 'Non définie';
    }
  };
  
  const getEducationDescription = (type: EducationType | string) => {
    switch (type) {
      case 'military':
        return 'Formation militaire incluant stratégie, tactique et combat.';
      case 'rhetoric':
        return 'Études d\'éloquence, philosophie et politique pour préparer aux carrières publiques.';
      case 'religious':
        return 'Éducation religieuse approfondie sur les rituels, traditions et augures romains.';
      case 'academic':
        return 'Instruction académique en mathématiques, littérature, histoire et sciences.';
      default:
        return 'Aucune éducation sélectionnée.';
    }
  };
  
  const getStatusIcon = (educationType: EducationType | string) => {
    if (hasInvalidEducation) {
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    }
    
    if (educationType === 'none' || !educationType) {
      return <X className="h-5 w-5 text-gray-400" />;
    }
    
    return <GraduationCap className="h-5 w-5 text-blue-500" />;
  };
  
  // Get mentor name if assigned
  const getMentorName = () => {
    if (!child.preceptorId) return null;
    
    const preceptor = getPreceptorById(child.preceptorId);
    return preceptor ? preceptor.name : 'Précepteur inconnu';
  };
  
  if (hasInvalidEducation) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Éducation inappropriée</AlertTitle>
        <AlertDescription>
          L'éducation militaire n'est pas appropriée pour une fille dans la société romaine.
          Veuillez sélectionner un autre type d'éducation.
        </AlertDescription>
      </Alert>
    );
  }
  
  if (!hasEducation) {
    return (
      <div className="flex items-start gap-3 mb-4">
        <X className="h-5 w-5 text-gray-400 mt-0.5" />
        <div>
          <h4 className="font-medium">Aucune éducation en cours</h4>
          <p className="text-sm text-muted-foreground">
            {child.age < 7 
              ? "Cet enfant est trop jeune pour commencer son éducation."
              : child.age > 17 
                ? "Cet enfant est trop âgé pour recevoir une éducation formelle."
                : "Sélectionnez un type d'éducation pour commencer la formation."}
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex items-start gap-3 mb-4">
      {getStatusIcon(child.educationType)}
      <div>
        <h4 className="font-medium">
          Éducation {getEducationTypeName(child.educationType)}
        </h4>
        <p className="text-sm text-muted-foreground">
          {getEducationDescription(child.educationType)}
        </p>
        
        {child.progress > 0 && (
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
              <div 
                className="bg-blue-600 h-1.5 rounded-full" 
                style={{ width: `${child.progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span>Progression: {child.progress}%</span>
              {child.progress >= 100 && (
                <Button size="sm" variant="ghost" className="h-6 text-xs text-green-600 px-2">
                  Compléter l'éducation
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
