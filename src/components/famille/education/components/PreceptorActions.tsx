
import React from 'react';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { Loader2 } from 'lucide-react';

interface PreceptorActionsProps {
  cost: number;
  available: boolean;
  onHire: () => void;
  isHiring?: boolean;
}

export const PreceptorActions: React.FC<PreceptorActionsProps> = ({ 
  cost, 
  available, 
  onHire,
  isHiring = false
}) => {
  return (
    <div className="flex justify-end gap-2 pt-4">
      <ActionButton 
        variant="outline"
        label="Retour"
        to="/famille/education/preceptors"
        disabled={isHiring}
      />
      <ActionButton 
        label={isHiring ? 'Embauche en cours...' : `Embaucher (${cost.toLocaleString()} As/an)`}
        onClick={onHire}
        disabled={!available || isHiring}
        icon={isHiring ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : undefined}
      />
    </div>
  );
};
