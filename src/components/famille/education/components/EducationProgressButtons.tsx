
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, BookOpen, X } from 'lucide-react';
import { EducationProgressButtonsProps } from '../types/educationTypes';

export const EducationProgressButtons: React.FC<EducationProgressButtonsProps> = ({
  isEducating,
  hasEducation,
  educationProgress = 0,
  onAdvanceYear,
  onCompleteEducation
}) => {
  if (!hasEducation) return null;
  
  const isComplete = educationProgress >= 100;
  
  return (
    <div className="flex justify-end gap-2 mt-4">
      {isComplete ? (
        <Button 
          onClick={onCompleteEducation}
          className="bg-green-600 hover:bg-green-700"
        >
          Terminer l'éducation
        </Button>
      ) : (
        <>
          <Button 
            variant="outline" 
            onClick={onCompleteEducation}
            className="text-red-600 hover:bg-red-50"
          >
            <X className="h-4 w-4 mr-2" />
            Abandonner
          </Button>
          
          <Button 
            onClick={onAdvanceYear}
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
