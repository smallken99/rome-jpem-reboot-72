
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, BookOpen, X, GraduationCap } from 'lucide-react';
import { EducationProgressButtonsProps } from '../types/educationTypes';
import { toast } from 'sonner';

export const EducationProgressButtons: React.FC<EducationProgressButtonsProps> = ({
  isEducating,
  hasEducation,
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
    <div className="flex justify-end gap-2 mt-4">
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
                Avancer d'un an
              </>
            )}
          </Button>
        </>
      )}
    </div>
  );
};
