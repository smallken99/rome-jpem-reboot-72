
import React from 'react';
import { ActionsGroup } from '@/components/ui-custom/ActionsGroup';
import { Check, ArrowLeft, X, Loader2 } from 'lucide-react';

export interface PreceptorActionsProps {
  onHire: () => void;
  isAvailable: boolean;
  isLoading?: boolean;
  onCancel?: () => void;
  onFire?: () => void;
  isHired?: boolean;
  cost?: number;
}

export const PreceptorActions: React.FC<PreceptorActionsProps> = ({ 
  onHire, 
  isAvailable, 
  isLoading = false,
  onCancel,
  onFire,
  isHired = false,
  cost
}) => {
  const actions = [
    {
      icon: <ArrowLeft className="h-4 w-4" />,
      label: "Retour",
      onClick: onCancel,
      variant: "outline" as const,
      size: "sm" as const
    }
  ];
  
  if (isHired && onFire) {
    actions.push({
      icon: isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />,
      label: "Licencier",
      onClick: onFire,
      variant: "outline" as const, // Correction de "destructive" à "outline"
      size: "sm" as const,
      disabled: isLoading
    });
  } else {
    actions.push({
      icon: isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />,
      label: isHired ? "Assigner" : "Embaucher",
      onClick: onHire,
      variant: "outline" as const, // Correction de "default" à "outline"
      size: "sm" as const,
      disabled: !isAvailable || isLoading
    });
  }
  
  return (
    <div className="flex justify-between items-center border-t pt-4 mt-4">
      <div className="text-muted-foreground">
        {cost && (
          <span className="flex items-center gap-1 text-sm">
            Coût: <span className="font-medium text-foreground">{cost} as/an</span>
          </span>
        )}
      </div>
      
      <ActionsGroup 
        actions={actions}
        spacing="sm"
        justify="end"
      />
    </div>
  );
};
