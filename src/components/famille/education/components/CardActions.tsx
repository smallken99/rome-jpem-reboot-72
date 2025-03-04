
import React from 'react';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { useNavigate } from 'react-router-dom';

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
  
  return (
    <div className="mt-4 flex justify-end gap-2">
      {hasEducation && (
        <ActionButton 
          variant="outline"
          label="Changer de précepteur"
          className="text-xs bg-rome-navy/5 hover:bg-rome-navy/10"
          to={`/famille/education/preceptors?childId=${childId}`}
        />
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
