
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { 
  Plus, 
  FileDown, 
  RefreshCw, 
  BarChart2, 
  Building, 
  Users, 
  Coins,
  Settings,
  Calculator
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EconomieActionsProps {
  onAddTransaction: () => void;
  onGenerateReport?: () => void;
  onRefreshData?: () => void;
  onManageBuildings?: () => void;
  onManageSlaves?: () => void;
  onManageTaxes?: () => void;
  onCalculateProjections?: () => void;
}

export const EconomieActions: React.FC<EconomieActionsProps> = ({
  onAddTransaction,
  onGenerateReport,
  onRefreshData,
  onManageBuildings,
  onManageSlaves,
  onManageTaxes,
  onCalculateProjections
}) => {
  const navigate = useNavigate();

  const handleNavigateToBatiments = () => {
    navigate('/maitre-jeu/batiments');
  };

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
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Gestion</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Analyse financière</DropdownMenuLabel>
          <DropdownMenuItem onClick={onGenerateReport} className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            Générer un rapport
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onCalculateProjections} className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Projections financières
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Infrastructure</DropdownMenuLabel>
          
          <DropdownMenuItem 
            onClick={onManageBuildings || handleNavigateToBatiments} 
            className="flex items-center gap-2"
          >
            <Building className="h-4 w-4" />
            Gestion des bâtiments
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Administration</DropdownMenuLabel>
          
          <DropdownMenuItem onClick={onManageSlaves} className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Gestion des esclaves
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={onManageTaxes} className="flex items-center gap-2">
            <Coins className="h-4 w-4" />
            Gestion des impôts
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={() => console.log('Exporter les données')} className="flex items-center gap-2">
            <FileDown className="h-4 w-4" />
            Exporter les données
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
