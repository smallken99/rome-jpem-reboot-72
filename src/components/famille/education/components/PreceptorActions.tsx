
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate('/famille/education/preceptors');
    }
  };
  
  return (
    <div className="flex justify-between items-center border-t pt-4 mt-4">
      <div className="text-muted-foreground">
        {cost && (
          <span className="flex items-center gap-1 text-sm">
            Coût: <span className="font-medium text-foreground">{cost} as/an</span>
          </span>
        )}
      </div>
      
      <div className="flex space-x-2">
        <Button
          variant="outline"
          onClick={handleCancel}
          size="sm"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        
        {isHired && onFire ? (
          <Button
            variant="destructive"
            onClick={onFire}
            size="sm"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <X className="mr-2 h-4 w-4" />
            )}
            Licencier
          </Button>
        ) : (
          <Button
            onClick={onHire}
            disabled={!isAvailable || isLoading}
            size="sm"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Check className="mr-2 h-4 w-4" />
            )}
            {isHired ? "Assigner" : "Embaucher"}
          </Button>
        )}
      </div>
    </div>
  );
};
