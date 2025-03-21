
import React from 'react';
import { Button } from '@/components/ui/button';
import { FastForward, Check, Clock, Ban, AlertTriangle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface EducationProgressButtonsProps {
  isEducating: boolean;
  hasEducation: boolean;
  educationProgress: number;
  onAdvanceYear: () => void;
  onCompleteEducation: () => void;
  canComplete: boolean;
  onCancel?: () => void;
  isInvalidEducation?: boolean;
  className?: string;
}

export const EducationProgressButtons: React.FC<EducationProgressButtonsProps> = ({ 
  isEducating, 
  hasEducation, 
  educationProgress, 
  onAdvanceYear, 
  onCompleteEducation, 
  canComplete,
  onCancel,
  isInvalidEducation = false,
  className
}) => {
  if (!hasEducation) return null;
  
  // Si l'éducation est terminée, afficher uniquement le bouton "Terminé"
  if (educationProgress >= 100) {
    return (
      <motion.div 
        className={cn("flex justify-end mt-4", className)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button variant="outline" className="text-green-600" disabled>
          <Check className="mr-2 h-4 w-4" />
          Éducation complétée
        </Button>
      </motion.div>
    );
  }
  
  return (
    <motion.div 
      className={cn("flex flex-wrap justify-end gap-2 mt-4", className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <TooltipProvider>
        {isEducating ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Button variant="outline" className="text-amber-600" disabled>
                  <Clock className="mr-2 h-4 w-4 animate-pulse" />
                  Progression en cours...
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <p>L'éducation progresse automatiquement</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="outline" 
              onClick={onAdvanceYear}
              className="text-blue-600 transition-all"
              disabled={isInvalidEducation}
            >
              <FastForward className="mr-2 h-4 w-4" />
              Avancer d'une année
            </Button>
          </motion.div>
        )}
        
        {canComplete && !isEducating && (
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={onCompleteEducation} 
                  variant="default"
                  className="transition-all"
                  disabled={isInvalidEducation}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Terminer l'éducation
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Finaliser l'éducation avec les connaissances actuelles</p>
            </TooltipContent>
          </Tooltip>
        )}
        
        {isInvalidEducation && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                className="text-red-600 border-red-200 bg-red-50"
                disabled
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                Éducation incompatible
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Cette éducation n'est pas adaptée au genre de l'enfant</p>
            </TooltipContent>
          </Tooltip>
        )}
        
        {onCancel && !isEducating && educationProgress < 100 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline" 
                  onClick={onCancel} 
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-all"
                >
                  <Ban className="mr-2 h-4 w-4" />
                  Annuler l'éducation
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Arrêter cette éducation. L'enfant devra recommencer.</p>
            </TooltipContent>
          </Tooltip>
        )}
      </TooltipProvider>
    </motion.div>
  );
};
