
import React from 'react';
import { Button } from '@/components/ui/button';
import { FastForward, Check, Clock, Ban } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface EducationProgressButtonsProps {
  isEducating: boolean;
  hasEducation: boolean;
  educationProgress: number;
  onAdvanceYear: () => void;
  onCompleteEducation: () => void;
  canComplete: boolean;
  onCancel?: () => void;
}

export const EducationProgressButtons: React.FC<EducationProgressButtonsProps> = ({ 
  isEducating, 
  hasEducation, 
  educationProgress, 
  onAdvanceYear, 
  onCompleteEducation, 
  canComplete,
  onCancel
}) => {
  if (!hasEducation) return null;
  
  // Si l'éducation est terminée, afficher uniquement le bouton "Terminé"
  if (educationProgress >= 100) {
    return (
      <div className="flex justify-end mt-4">
        <Button variant="outline" className="text-green-600" disabled>
          <Check className="mr-2 h-4 w-4" />
          Éducation complétée
        </Button>
      </div>
    );
  }
  
  return (
    <div className="flex flex-wrap justify-end gap-2 mt-4">
      <TooltipProvider>
        {isEducating ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="text-amber-600" disabled>
                <Clock className="mr-2 h-4 w-4 animate-pulse" />
                Progression en cours...
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>L'éducation progresse automatiquement</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <Button 
            variant="outline" 
            onClick={onAdvanceYear}
            className="text-blue-600"
          >
            <FastForward className="mr-2 h-4 w-4" />
            Avancer d'une année
          </Button>
        )}
        
        {canComplete && !isEducating && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={onCompleteEducation} variant="default">
                <Check className="mr-2 h-4 w-4" />
                Terminer l'éducation
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Finaliser l'éducation avec les connaissances actuelles</p>
            </TooltipContent>
          </Tooltip>
        )}
        
        {onCancel && !isEducating && educationProgress < 100 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                onClick={onCancel} 
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Ban className="mr-2 h-4 w-4" />
                Annuler l'éducation
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Arrêter cette éducation. L'enfant devra recommencer.</p>
            </TooltipContent>
          </Tooltip>
        )}
      </TooltipProvider>
    </div>
  );
};
