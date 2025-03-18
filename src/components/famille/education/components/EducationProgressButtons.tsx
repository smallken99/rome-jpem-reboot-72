
import React from 'react';
import { Button } from '@/components/ui/button';
import { FastForward, BadgeCheck, Loader2 } from 'lucide-react';

interface EducationProgressButtonsProps {
  isEducating: boolean;
  hasEducation: boolean;
  educationProgress: number;
  onAdvanceYear: () => void;
  onCompleteEducation: () => void;
  canComplete: boolean;
}

export const EducationProgressButtons: React.FC<EducationProgressButtonsProps> = ({ 
  isEducating,
  hasEducation,
  educationProgress,
  onAdvanceYear,
  onCompleteEducation,
  canComplete
}) => {
  if (!hasEducation) {
    return null;
  }
  
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Button 
        variant="outline" 
        size="sm"
        onClick={onAdvanceYear}
        className="flex items-center gap-1"
        disabled={isEducating}
      >
        {isEducating ? (
          <>
            <Loader2 className="h-3 w-3 animate-spin" />
            <span>En cours...</span>
          </>
        ) : (
          <>
            <FastForward className="h-3 w-3" />
            <span>Avancer d'un an</span>
          </>
        )}
      </Button>
      
      <Button 
        variant="default" 
        size="sm"
        onClick={onCompleteEducation}
        className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700"
        disabled={!canComplete || isEducating}
      >
        <BadgeCheck className="h-3 w-3" />
        <span>Compléter l'éducation</span>
      </Button>
    </div>
  );
};
