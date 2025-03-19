
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, CheckCircle, XCircle } from 'lucide-react';
import { EducationProgressButtonsProps } from '../types/educationTypes';

export const EducationProgressButtons: React.FC<EducationProgressButtonsProps> = ({
  isEducating,
  hasEducation,
  educationProgress,
  onAdvanceYear,
  onCompleteEducation,
  canComplete = false,
  onAdvance,
  onCancel,
  onComplete
}) => {
  if (!hasEducation) return null;
  
  // Use appropriate callback based on what's available
  const handleAdvance = onAdvance || onAdvanceYear;
  const handleCancel = onCancel;
  const handleComplete = onComplete || onCompleteEducation;
  
  return (
    <div className="flex justify-end gap-2 mt-4">
      {handleCancel && (
        <Button 
          variant="outline" 
          onClick={handleCancel}
          className="text-red-600 hover:bg-red-50 hover:text-red-700"
          disabled={isEducating}
        >
          <XCircle className="h-4 w-4 mr-1" />
          Abandonner
        </Button>
      )}

      {canComplete && handleComplete && (
        <Button 
          onClick={handleComplete}
          disabled={isEducating}
          className="bg-green-600 hover:bg-green-700"
        >
          <CheckCircle className="h-4 w-4 mr-1" />
          Terminer l'éducation
        </Button>
      )}

      {handleAdvance && (
        <Button 
          onClick={handleAdvance}
          disabled={isEducating}
        >
          {isEducating ? (
            <span className="flex items-center">
              <svg className="animate-spin h-4 w-4 mr-1" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              En cours...
            </span>
          ) : (
            <span className="flex items-center">
              <ChevronRight className="h-4 w-4 mr-1" />
              Avancer d'une année
            </span>
          )}
        </Button>
      )}
    </div>
  );
};
