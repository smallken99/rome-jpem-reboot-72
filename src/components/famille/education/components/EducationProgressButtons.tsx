
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, BookOpen, X, GraduationCap, BookmarkPlus, BookCheck } from 'lucide-react';
import { EducationProgressButtonsProps } from '../types/educationTypes';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';

export const EducationProgressButtons: React.FC<EducationProgressButtonsProps> = ({
  isEducating,
  hasEducation = false,
  educationProgress = 0,
  onAdvanceYear,
  onCompleteEducation,
  onAdvance,
  onCancel,
  onComplete,
  canComplete = false
}) => {
  if (!hasEducation) return null;
  
  const isComplete = educationProgress >= 100;
  
  // Use the new prop names if provided, otherwise fallback to old ones
  const handleAdvance = () => {
    if (onAdvance) {
      onAdvance();
    } else if (onAdvanceYear) {
      onAdvanceYear();
    }
    toast.success("Éducation avancée d'une année");
  };
  
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else if (onCompleteEducation) {
      onCompleteEducation();
    }
    toast.info("Éducation abandonnée");
  };
  
  const handleComplete = () => {
    if (onComplete) {
      onComplete();
    } else if (onCompleteEducation) {
      onCompleteEducation();
    }
    toast.success("Éducation terminée avec succès!");
  };
  
  return (
    <div className="space-y-4 mt-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progression: {educationProgress}%</span>
          {canComplete && !isComplete && <span className="text-amber-600">Peut terminer</span>}
          {isComplete && <span className="text-green-600">Complète</span>}
        </div>
        <Progress value={educationProgress} className="h-2" />
      </div>
      
      <div className="flex justify-end gap-2">
        {isComplete || canComplete ? (
          <Button 
            onClick={handleComplete}
            className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
          >
            <GraduationCap className="h-4 w-4" />
            Terminer l'éducation
          </Button>
        ) : (
          <>
            <Button 
              variant="outline" 
              onClick={handleCancel}
              className="text-red-600 hover:bg-red-50 flex items-center gap-2"
              disabled={isEducating}
            >
              <X className="h-4 w-4" />
              Abandonner
            </Button>
            
            <Button 
              onClick={handleAdvance}
              disabled={isEducating}
              className="flex items-center gap-2"
            >
              {isEducating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  En cours...
                </>
              ) : (
                <>
                  <BookOpen className="h-4 w-4" />
                  Avancer d'une année
                </>
              )}
            </Button>
          </>
        )}
      </div>
      
      {educationProgress > 0 && educationProgress < 100 && !canComplete && (
        <div className="text-xs text-muted-foreground text-center mt-2">
          Continuez l'éducation jusqu'à atteindre au moins 75% pour pouvoir la terminer.
        </div>
      )}
    </div>
  );
};
