
import React from 'react';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useEducation } from '../context/EducationContext';
import { Loader2 } from 'lucide-react';

interface CardActionsProps {
  educationType: string;
  childId: string;
  childGender: string;
  childAge: number;
}

export const CardActions: React.FC<CardActionsProps> = ({ 
  educationType,
  childId,
  childGender,
  childAge
}) => {
  const hasEducation = educationType !== 'none';
  const navigate = useNavigate();
  const { completeEducation, isEducating } = useEducation();
  
  // Vérifiez si l'enfant spécifique est en cours d'éducation
  const isChildEducating = typeof isEducating === 'object' 
    ? isEducating[childId] 
    : false;
  
  const handleChangePreceptor = () => {
    navigate(`/famille/education/preceptors?childId=${childId}&type=${educationType}`);
    toast.info("Sélection d'un nouveau précepteur");
  };
  
  const handleRemoveEducation = () => {
    // Use our context to complete the education
    completeEducation(childId);
    
    // Show feedback
    toast.success(`Éducation supprimée pour l'enfant`);
  };

  const handleAssign = () => {
    navigate(`/famille/education/child/${childId}`);
    if (!hasEducation) {
      toast.info("Assignation d'une nouvelle éducation");
    } else {
      toast.info("Modification de l'éducation actuelle");
    }
  };
  
  return (
    <div className="mt-4 flex justify-end gap-2">
      {hasEducation && (
        <>
          <ActionButton 
            variant="outline"
            label="Changer de précepteur"
            className="text-xs bg-rome-navy/5 hover:bg-rome-navy/10"
            onClick={handleChangePreceptor}
            disabled={isChildEducating}
          />
          <ActionButton 
            variant="destructive"
            label="Supprimer"
            className="text-xs"
            onClick={handleRemoveEducation}
            disabled={isChildEducating}
          />
        </>
      )}
      <ActionButton 
        variant="outline"
        label={hasEducation ? 'Modifier' : 'Assigner'}
        className="text-xs"
        onClick={handleAssign}
        disabled={isChildEducating}
        icon={isChildEducating ? <Loader2 className="h-3 w-3 animate-spin" /> : undefined}
      />
    </div>
  );
};
