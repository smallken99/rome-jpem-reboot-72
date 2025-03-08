
import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock, GraduationCap } from 'lucide-react';

interface EducationProgressButtonsProps {
  isEducating: boolean;
  hasEducation: boolean;
  educationProgress?: number;
  onAdvanceYear: () => void;
  onCompleteEducation: () => void;
}

export const EducationProgressButtons: React.FC<EducationProgressButtonsProps> = ({
  isEducating,
  hasEducation,
  educationProgress = 0,
  onAdvanceYear,
  onCompleteEducation
}) => {
  if (!hasEducation) return null;
  
  return (
    <div className="mt-4 pt-4 border-t flex justify-end gap-2">
      <Button
        variant="outline"
        size="sm"
        disabled={isEducating}
        onClick={onAdvanceYear}
        className="flex items-center gap-1"
      >
        <Clock className="h-4 w-4" />
        {isEducating ? 'En cours...' : 'Avancer d\'une année'}
      </Button>
      
      {educationProgress >= 90 && (
        <Button
          variant="default"
          size="sm"
          onClick={onCompleteEducation}
          className="bg-green-600 hover:bg-green-700"
        >
          <GraduationCap className="h-4 w-4 mr-1" />
          Compléter l'éducation
        </Button>
      )}
    </div>
  );
};
