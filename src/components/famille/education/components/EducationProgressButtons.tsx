
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, BookOpen, X } from 'lucide-react';
import { EducationProgressButtonsProps } from '../types/educationTypes';

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
  const handleAdvance = onAdvance || onAdvanceYear;
  const handleCancel = onCancel || onCompleteEducation;
  const handleComplete = onComplete || onCompleteEducation;
  
  return (
    <div className="flex justify-end gap-2 mt-4">
      {isComplete || canComplete ? (
        <Button 
          onClick={handleComplete}
          className="bg-green-600 hover:bg-green-700"
        >
          Terminer l'éducation
        </Button>
      ) : (
        <>
          <Button 
            variant="outline" 
            onClick={handleCancel}
            className="text-red-600 hover:bg-red-50"
          >
            <X className="h-4 w-4 mr-2" />
            Abandonner
          </Button>
          
          <Button 
            onClick={handleAdvance}
            disabled={isEducating}
          >
            {isEducating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                En cours...
              </>
            ) : (
              <>
                <BookOpen className="h-4 w-4 mr-2" />
                Avancer d'un an
              </>
            )}
          </Button>
        </>
      )}
    </div>
  );
};
