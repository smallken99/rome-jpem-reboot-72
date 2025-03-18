
import React from 'react';
import { Button } from '@/components/ui/button';
import { Wrench, Users, TrendingDown } from 'lucide-react';

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
    <div className="flex flex-wrap justify-end gap-2 mt-3">
      <Button
        variant="outline"
        size="sm"
        onClick={onOpenMaintenanceDialog}
        className="h-8 px-2 text-xs roman-btn-outline"
      >
        <Wrench className="mr-1 h-3 w-3" />
        Maintenance
      </Button>
      
      {showSlaveManagement && (
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenSlaveDialog}
          className="h-8 px-2 text-xs roman-btn-outline"
        >
          <Users className="mr-1 h-3 w-3" />
          Esclaves
        </Button>
      )}
      
      <Button
        variant="outline"
        size="sm"
        onClick={onOpenSaleDialog}
        className="h-8 px-2 text-xs roman-btn-outline text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
      >
        <TrendingDown className="mr-1 h-3 w-3" />
        Vendre
      </Button>
    </div>
  );
};
