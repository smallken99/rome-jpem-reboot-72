
import React from 'react';
import { ActionButton } from '@/components/ui-custom/ActionButton';

interface PreceptorActionsProps {
  cost: number;
  available: boolean;
  onHire: () => void;
}

export const PreceptorActions: React.FC<PreceptorActionsProps> = ({ 
  cost, 
  available, 
  onHire 
}) => {
  return (
    <div className="flex justify-end gap-2 pt-4">
      <ActionButton 
        variant="outline"
        label="Retour"
        to="/famille/education/preceptors"
      />
      <ActionButton 
        label={`Embaucher (${cost.toLocaleString()} As/an)`}
        onClick={onHire}
        disabled={!available}
      />
    </div>
  );
};
