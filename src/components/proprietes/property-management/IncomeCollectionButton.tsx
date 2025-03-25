
import React from 'react';
import { Button } from '@/components/ui/button';
import { Coins, InfoIcon } from 'lucide-react';
import { useBuildingInventory } from '../hooks/building/useBuildingInventory';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { formatCurrency } from '@/utils/currencyUtils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface IncomeCollectionButtonProps {
  className?: string;
}

export const IncomeCollectionButton: React.FC<IncomeCollectionButtonProps> = ({ className }) => {
  const { collectAllBuildingIncomes, buildings } = useBuildingInventory();
  
  // Calculer le revenu estimé
  const calculateEstimatedIncome = () => {
    return buildings.reduce((total, building) => {
      if (building.income) {
        const conditionFactor = building.condition / 100;
        return total + Math.round(building.income * conditionFactor);
      }
      return total;
    }, 0);
  };
  
  const estimatedIncome = calculateEstimatedIncome();
  
  return (
    <div className="flex items-center gap-2">
      <Button 
        onClick={collectAllBuildingIncomes}
        className={className}
        variant="default"
        disabled={estimatedIncome <= 0}
      >
        <Coins className="mr-2 h-4 w-4" />
        Collecter les revenus
      </Button>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <InfoIcon className="h-4 w-4 text-muted-foreground cursor-help" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Revenu estimé: {formatCurrency(estimatedIncome)}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Le revenu réel dépend de l'état des bâtiments
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
