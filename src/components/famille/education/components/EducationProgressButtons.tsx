
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export interface EducationProgressButtonsProps {
  isEducating: boolean;
  hasEducation: boolean;
  educationProgress: number;
  onAdvanceYear: () => void;
  onCompleteEducation: () => void;
  canComplete?: boolean;
  onAdvance?: () => void;
  onCancel?: () => void;
  onComplete?: () => void;
}

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
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                onClick={handleCancel}
                className="text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                disabled={isEducating}
              >
                <XCircle className="h-4 w-4 mr-1" />
                Abandonner
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Arrête l'éducation en cours. Attention : progrès perdus !</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {canComplete && handleComplete && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                onClick={handleComplete}
                disabled={isEducating}
                className="bg-green-600 hover:bg-green-700 transition-colors"
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Terminer l'éducation
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Conclure l'éducation et appliquer les bonus de compétences</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      
      {!canComplete && educationProgress >= 50 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="px-2 py-1 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-md flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                Encore {Math.ceil((100-educationProgress)/25)} an(s) minimum
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>L'éducation n'est pas encore suffisamment avancée pour être complétée</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {handleAdvance && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                onClick={handleAdvance}
                disabled={isEducating}
                className="transition-all"
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
            </TooltipTrigger>
            <TooltipContent>
              <p>Fait progresser l'éducation d'une année académique</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};
