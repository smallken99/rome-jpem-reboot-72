
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plus, FileDown, RefreshCw, BarChart2, Building, Users } from 'lucide-react';

interface EconomieActionsProps {
  onAddTransaction: () => void;
  onGenerateReport?: () => void;
  onRefreshData?: () => void;
}

export const EconomieActions: React.FC<EconomieActionsProps> = ({
  onAddTransaction,
  onGenerateReport,
  onRefreshData,
}) => {
  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={onRefreshData}>
        <RefreshCw className="h-4 w-4" />
        <span className="hidden sm:inline">Actualiser</span>
      </Button>

      <Button size="sm" className="flex items-center gap-2" onClick={onAddTransaction}>
        <Plus className="h-4 w-4" />
        <span className="hidden sm:inline">Nouvelle Transaction</span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <FileDown className="h-4 w-4" />
            <span className="hidden sm:inline">Plus</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onGenerateReport} className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            Générer un rapport
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Gestion des bâtiments
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Gestion des esclaves
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
