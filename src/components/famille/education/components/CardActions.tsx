
import React from 'react';

interface CardActionsProps {
  hasEducation: boolean;
}

export const CardActions: React.FC<CardActionsProps> = ({ hasEducation }) => {
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
