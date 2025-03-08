
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export interface PreceptorActionsProps {
  onHire: () => void;
  isAvailable: boolean;
  isLoading?: boolean;
}

export const PreceptorActions: React.FC<PreceptorActionsProps> = ({ 
  onHire, 
  isAvailable, 
  isLoading = false
}) => {
  const navigate = useNavigate();
  
  const handleCancel = () => {
    navigate('/famille/education/preceptors');
  };
  
  return (
    <div className="flex justify-end space-x-2">
      <Button
        variant="outline"
        onClick={handleCancel}
      >
        Retour
      </Button>
      
      <Button
        onClick={onHire}
        disabled={!isAvailable || isLoading}
      >
        {isLoading ? "Embauche en cours..." : "Embaucher"}
      </Button>
    </div>
  );
};
