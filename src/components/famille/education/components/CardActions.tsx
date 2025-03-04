
import React from 'react';
import { ActionButton } from '@/components/ui-custom/ActionButton';

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
  
  return (
    <div className="mt-4 flex justify-end gap-2">
      {hasEducation && (
        <ActionButton 
          variant="outline"
          label="Changer de précepteur"
          className="text-xs bg-rome-navy/5 hover:bg-rome-navy/10"
        />
      )}
      <ActionButton 
        variant="outline"
        label={hasEducation ? 'Modifier' : 'Assigner'}
        className="text-xs"
      />
    </div>
  );
};
