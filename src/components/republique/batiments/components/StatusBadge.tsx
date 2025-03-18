
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AlertTriangle, CheckCircle, Clock, HardHat, Construction, CircleSlashed } from 'lucide-react';

export type StatusType = 'completed' | 'in_progress' | 'planned' | 'damaged' | 'abandoned' | 'ruined' | 'renovating';

interface StatusBadgeProps {
  status: StatusType | string;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
}

const getStatusConfig = (status: StatusType | string) => {
  switch (status) {
    case 'completed':
      return {
        label: 'Terminé',
        color: 'bg-green-50 border-green-200 text-green-700',
        icon: <CheckCircle className="h-3 w-3 mr-1" />,
        tooltip: 'Ce bâtiment est terminé et fonctionnel'
      };
    case 'in_progress':
      return {
        label: 'En construction',
        color: 'bg-blue-50 border-blue-200 text-blue-700',
        icon: <Construction className="h-3 w-3 mr-1" />,
        tooltip: 'Ce bâtiment est en cours de construction'
      };
    case 'planned':
      return {
        label: 'Planifié',
        color: 'bg-purple-50 border-purple-200 text-purple-700',
        icon: <HardHat className="h-3 w-3 mr-1" />,
        tooltip: 'Ce bâtiment est planifié mais pas encore en construction'
      };
    case 'damaged':
      return {
        label: 'Endommagé',
        color: 'bg-amber-50 border-amber-200 text-amber-700',
        icon: <AlertTriangle className="h-3 w-3 mr-1" />,
        tooltip: 'Ce bâtiment est endommagé et nécessite des réparations'
      };
    case 'abandoned':
      return {
        label: 'Abandonné',
        color: 'bg-red-50 border-red-200 text-red-700',
        icon: <AlertTriangle className="h-3 w-3 mr-1" />,
        tooltip: 'Ce bâtiment a été abandonné'
      };
    case 'ruined':
      return {
        label: 'En ruine',
        color: 'bg-red-100 border-red-300 text-red-800',
        icon: <CircleSlashed className="h-3 w-3 mr-1" />,
        tooltip: 'Ce bâtiment est en ruine et nécessite une reconstruction complète'
      };
    case 'renovating':
      return {
        label: 'En rénovation',
        color: 'bg-teal-50 border-teal-200 text-teal-700',
        icon: <Construction className="h-3 w-3 mr-1" />,
        tooltip: 'Ce bâtiment est en cours de rénovation'
      };
    default:
      return {
        label: 'Inconnu',
        color: 'bg-gray-50 border-gray-200 text-gray-700',
        icon: <Clock className="h-3 w-3 mr-1" />,
        tooltip: 'Statut inconnu'
      };
  }
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  showIcon = true,
  size = 'sm',
  showTooltip = true
}) => {
  const config = getStatusConfig(status);
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'px-3 py-1'
  };
  
  const badge = (
    <Badge 
      variant="outline" 
      className={`${config.color} ${sizeClasses[size]} flex items-center`}
    >
      {showIcon && config.icon}
      {config.label}
    </Badge>
  );
  
  if (showTooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {badge}
          </TooltipTrigger>
          <TooltipContent>
            <p>{config.tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  
  return badge;
};
