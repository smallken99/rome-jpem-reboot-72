
import React from 'react';
import { ActionsGroup } from '@/components/ui-custom/ActionsGroup';
import { ActionButton } from '@/components/ui-custom/ActionButton';
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
        <ActionButton
          variant="outline"
          className="text-green-600"
          disabled
          icon={<Check className="h-4 w-4" />}
          label="Éducation complétée"
        />
      </motion.div>
    );
  }
  
  const progressActions = [];
  
  if (isEducating) {
    progressActions.push({
      icon: <Clock className="h-4 w-4 animate-pulse" />,
      label: "Progression en cours...",
      variant: "outline" as const,
      className: "text-amber-600",
      disabled: true,
      title: "L'éducation progresse automatiquement"
    });
  } else {
    progressActions.push({
      icon: <FastForward className="h-4 w-4" />,
      label: "Avancer d'une année",
      onClick: onAdvanceYear,
      variant: "outline" as const,
      className: "text-blue-600 transition-all",
      disabled: isInvalidEducation,
      title: "Avancer d'une année académique"
    });
  }
  
  if (canComplete && !isEducating) {
    progressActions.push({
      icon: <Check className="h-4 w-4" />,
      label: "Terminer l'éducation",
      onClick: onCompleteEducation,
      variant: "default" as const,
      className: "transition-all",
      disabled: isInvalidEducation,
      title: "Finaliser l'éducation avec les connaissances actuelles"
    });
  }
  
  if (isInvalidEducation) {
    progressActions.push({
      icon: <AlertTriangle className="h-4 w-4" />,
      label: "Éducation incompatible",
      variant: "outline" as const,
      className: "text-red-600 border-red-200 bg-red-50",
      disabled: true,
      title: "Cette éducation n'est pas adaptée au genre de l'enfant"
    });
  }
  
  if (onCancel && !isEducating && educationProgress < 100) {
    progressActions.push({
      icon: <Ban className="h-4 w-4" />,
      label: "Annuler l'éducation",
      onClick: onCancel,
      variant: "outline" as const,
      className: "text-red-600 hover:text-red-700 hover:bg-red-50 transition-all",
      title: "Arrêter cette éducation. L'enfant devra recommencer."
    });
  }
  
  return (
    <motion.div 
      className={cn("flex flex-wrap justify-end gap-2 mt-4", className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ActionsGroup 
        actions={progressActions}
        spacing="sm"
        justify="end"
      />
    </motion.div>
  );
};
