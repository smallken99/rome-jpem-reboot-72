
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type ConditionType = 'excellent' | 'bon' | 'moyen' | 'mauvais' | 'critique';

interface ConditionBadgeProps {
  condition: ConditionType;
  showTooltip?: boolean;
}

export const ConditionBadge: React.FC<ConditionBadgeProps> = ({ condition, showTooltip = true }) => {
  const getBadgeVariant = (): "default" | "destructive" | "outline" | "secondary" | "success" => {
    switch (condition) {
      case 'excellent':
        return 'success';
      case 'bon':
        return 'secondary';
      case 'moyen':
        return 'default';
      case 'mauvais':
        return 'outline';
      case 'critique':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const getTooltipContent = (): string => {
    switch (condition) {
      case 'excellent':
        return 'Le bâtiment est en parfait état, ne nécessite aucune maintenance.';
      case 'bon':
        return 'Le bâtiment est en bon état, nécessite une maintenance minimale.';
      case 'moyen':
        return 'Le bâtiment est en état fonctionnel, mais nécessite une maintenance régulière.';
      case 'mauvais':
        return 'Le bâtiment est en mauvais état, nécessite des réparations importantes.';
      case 'critique':
        return 'Le bâtiment est en état critique, risque d\'effondrement ou d\'accident.';
      default:
        return '';
    }
  };

  const badge = (
    <Badge variant={getBadgeVariant()} className="capitalize">
      {condition}
    </Badge>
  );

  if (!showTooltip) {
    return badge;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {badge}
        </TooltipTrigger>
        <TooltipContent>
          <p>{getTooltipContent()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
