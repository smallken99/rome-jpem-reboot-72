
import React from 'react';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useEducation } from '../context/EducationContext';

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
  const { completeEducation } = useEducation();
  
  const handleChangePreceptor = () => {
    navigate(`/famille/education/preceptors?childId=${childId}&type=${educationType}`);
  };
  
  const handleRemoveEducation = () => {
    // Use our context to complete the education
    completeEducation(childId);
    
    // Show feedback
    toast.success(`Éducation supprimée`);
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
          />
          <ActionButton 
            variant="destructive"
            label="Supprimer"
            className="text-xs"
            onClick={handleRemoveEducation}
          />
        </>
      )}
      <ActionButton 
        variant="outline"
        label={hasEducation ? 'Modifier' : 'Assigner'}
        className="text-xs"
        to={`/famille/education/child/${childId}`}
      />
    </div>
  );
};
