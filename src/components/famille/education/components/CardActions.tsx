
import React from 'react';

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
        <button className="roman-btn-outline text-xs bg-rome-navy/5 hover:bg-rome-navy/10">
          Changer de précepteur
        </button>
      )}
      <button className="roman-btn-outline text-xs">
        {hasEducation ? 'Modifier' : 'Assigner'}
      </button>
    </div>
  );
};
