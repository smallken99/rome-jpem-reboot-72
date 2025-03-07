
import React from 'react';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  
  const handleChangePreceptor = () => {
    navigate(`/famille/education/preceptors?childId=${childId}&type=${educationType}`);
  };
  
  const handleRemoveEducation = () => {
    // Simulate removing education
    toast({
      title: "Éducation supprimée",
      description: "L'éducation de l'enfant a été réinitialisée.",
      variant: "default",
    });
    
    // Redirect to refresh the page
    setTimeout(() => {
      navigate(`/famille/education`);
    }, 500);
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
