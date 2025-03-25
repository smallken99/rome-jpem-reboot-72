
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Eye, Users, Wrench, Coins, Trash2 } from 'lucide-react';

interface PropertyActionsMenuProps {
  buildingId: string | number;
  buildingName: string;
  onViewDetails: () => void;
  onAssignSlaves: () => void;
  onPerformMaintenance: () => void;
  onSell: () => void;
  canPerformMaintenance: boolean;
}

export const PropertyActionsMenu: React.FC<PropertyActionsMenuProps> = ({
  buildingId,
  buildingName,
  onViewDetails,
  onAssignSlaves,
  onPerformMaintenance,
  onSell,
  canPerformMaintenance
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Ouvrir menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={onViewDetails}>
          <Eye className="mr-2 h-4 w-4" />
          <span>Voir les détails</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={onAssignSlaves}>
          <Users className="mr-2 h-4 w-4" />
          <span>Gérer le personnel</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={onPerformMaintenance}
          disabled={!canPerformMaintenance}
        >
          <Wrench className="mr-2 h-4 w-4" />
          <span>Effectuer des réparations</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={onSell}
          className="text-destructive focus:text-destructive"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Vendre la propriété</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
