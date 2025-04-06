
import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock, GraduationCap, Ban } from 'lucide-react';

interface EducationProgressButtonsProps {
  isEducating: boolean;
  hasEducation: boolean;
  educationProgress: number;
  onAdvanceYear: () => void;
  onCompleteEducation: () => void;
  canComplete: boolean;
  isInvalidEducation?: boolean;
  onCancel?: () => void;
}

export const EducationProgressButtons: React.FC<EducationProgressButtonsProps> = ({
  isEducating,
  hasEducation,
  educationProgress,
  onAdvanceYear,
  onCompleteEducation,
  canComplete,
  isInvalidEducation = false,
  onCancel
}) => {
  if (!hasEducation) {
    return null;
  }
  
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {isInvalidEducation && onCancel && (
        <Button
          variant="destructive"
          size="sm"
          onClick={onCancel}
          className="flex-1"
        >
          <Ban className="mr-1 h-4 w-4" />
          Annuler cette éducation
        </Button>
      )}
      
      {!isInvalidEducation && (
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={onAdvanceYear}
            disabled={isEducating || educationProgress >= 100}
            className="flex-1"
          >
            <Clock className="mr-1 h-4 w-4" />
            Avancer d'un an
          </Button>
          
          <Button
            variant="default"
            size="sm"
            onClick={onCompleteEducation}
            disabled={!canComplete || isEducating}
            className="flex-1"
          >
            <GraduationCap className="mr-1 h-4 w-4" />
            Compléter l'éducation
          </Button>
        </>
      )}
    </div>
  );
};
