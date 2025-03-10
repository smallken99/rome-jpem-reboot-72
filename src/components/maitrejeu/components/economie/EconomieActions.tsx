
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  PlusCircle, 
  BarChart3, 
  FileSpreadsheet, 
  RefreshCw, 
  Calculator 
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface EconomieActionsProps {
  onAddTransaction: () => void;
  onGenerateReport: () => void;
  onCalculateProjections: () => void;
  onRefreshData: () => void;
}

export const EconomieActions: React.FC<EconomieActionsProps> = ({
  onAddTransaction,
  onGenerateReport,
  onCalculateProjections,
  onRefreshData
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              onClick={onAddTransaction}
              className="flex items-center gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              Nouvelle transaction
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Ajouter une nouvelle transaction à l'économie</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              onClick={onGenerateReport}
              className="flex items-center gap-2"
            >
              <FileSpreadsheet className="h-4 w-4" />
              Générer un rapport
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Créer un rapport économique détaillé</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              onClick={onCalculateProjections}
              className="flex items-center gap-2"
            >
              <Calculator className="h-4 w-4" />
              Projections
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Calculer les projections économiques pour l'année à venir</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              onClick={onRefreshData}
              className="flex items-center gap-2 ml-auto"
            >
              <RefreshCw className="h-4 w-4" />
              Actualiser
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Actualiser les données économiques</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
