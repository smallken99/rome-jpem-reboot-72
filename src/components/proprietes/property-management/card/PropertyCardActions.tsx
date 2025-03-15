
import React from 'react';
import { Button } from '@/components/ui/button';
import { Wrench, Users, Coins } from 'lucide-react';

interface PropertyCardActionsProps {
  onOpenMaintenanceDialog: () => void;
  onOpenSlaveDialog: () => void;
  onOpenSaleDialog: () => void;
  showSlaveManagement: boolean;
}

export const PropertyCardActions: React.FC<PropertyCardActionsProps> = ({
  onOpenMaintenanceDialog,
  onOpenSlaveDialog,
  onOpenSaleDialog,
  showSlaveManagement
}) => {
  return (
    <div className="flex gap-2 mt-4">
      <Button 
        variant="outline" 
        size="sm" 
        className="roman-btn-outline flex-1"
        onClick={onOpenMaintenanceDialog}
      >
        <Wrench className="mr-1 h-4 w-4" />
        Entretien
      </Button>
      
      {showSlaveManagement && (
        <Button 
          variant="outline" 
          size="sm" 
          className="roman-btn-outline flex-1"
          onClick={onOpenSlaveDialog}
        >
          <Users className="mr-1 h-4 w-4" />
          Esclaves
        </Button>
      )}
      
      <Button 
        variant="outline" 
        size="sm" 
        className="roman-btn-outline flex-1"
        onClick={onOpenSaleDialog}
      >
        <Coins className="mr-1 h-4 w-4" />
        Vendre
      </Button>
    </div>
  );
};
