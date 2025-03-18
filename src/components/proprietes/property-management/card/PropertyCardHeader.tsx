
import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Wrench, Users, TrendingDown } from 'lucide-react';

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
      <CardTitle className="text-base font-cinzel">{name}</CardTitle>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Ouvrir le menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onOpenMaintenanceDialog} className="cursor-pointer">
            <Wrench className="mr-2 h-4 w-4" />
            <span>Maintenance</span>
          </DropdownMenuItem>
          
          {showSlaveManagement && (
            <DropdownMenuItem onClick={onOpenSlaveDialog} className="cursor-pointer">
              <Users className="mr-2 h-4 w-4" />
              <span>Gérer les esclaves</span>
            </DropdownMenuItem>
          )}
          
          <DropdownMenuItem onClick={onOpenSaleDialog} className="cursor-pointer text-red-600">
            <TrendingDown className="mr-2 h-4 w-4" />
            <span>Vendre</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </CardHeader>
  );
};
