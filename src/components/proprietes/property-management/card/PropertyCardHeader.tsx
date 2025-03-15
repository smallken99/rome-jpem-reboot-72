
import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger, 
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { Wrench, Users, Trash2 } from 'lucide-react';

interface PropertyCardHeaderProps {
  name: string;
  onOpenMaintenanceDialog: () => void;
  onOpenSlaveDialog: () => void;
  onOpenSaleDialog: () => void;
  showSlaveManagement: boolean;
}

export const PropertyCardHeader: React.FC<PropertyCardHeaderProps> = ({
  name,
  onOpenMaintenanceDialog,
  onOpenSlaveDialog,
  onOpenSaleDialog,
  showSlaveManagement
}) => {
  return (
    <CardHeader className="pb-2 flex flex-row items-center justify-between">
      <CardTitle className="font-cinzel text-base">{name}</CardTitle>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onOpenMaintenanceDialog}>
            <Wrench className="mr-2 h-4 w-4" />
            <span>Gérer l'entretien</span>
          </DropdownMenuItem>
          {showSlaveManagement && (
            <DropdownMenuItem onClick={onOpenSlaveDialog}>
              <Users className="mr-2 h-4 w-4" />
              <span>Gérer les esclaves</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onOpenSaleDialog} className="text-red-600">
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Vendre la propriété</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </CardHeader>
  );
};
