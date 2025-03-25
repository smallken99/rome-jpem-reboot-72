
import React from 'react';
import { OwnedBuilding } from '../../hooks/building/types';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ActionsGroup } from '@/components/ui-custom/ActionsGroup';
import { Eye, Wrench, Settings, Users, Coins, BookOpen } from 'lucide-react';

interface PropertyCardActionsProps {
  building: OwnedBuilding;
  onViewDetails: () => void;
  onPerformMaintenance: () => void;
  onAssignSlaves: () => void;
  onToggleMaintenance: (enabled: boolean) => void;
  onSell: () => void;
  maintenanceEnabled: boolean;
  canPerformMaintenance: boolean;
}

export const PropertyCardActions: React.FC<PropertyCardActionsProps> = ({
  building,
  onViewDetails,
  onPerformMaintenance,
  onAssignSlaves,
  onToggleMaintenance,
  onSell,
  maintenanceEnabled,
  canPerformMaintenance
}) => {
  const actions = [
    {
      icon: <Eye className="h-4 w-4" />,
      label: "Détails",
      onClick: onViewDetails,
      variant: "outline" as const,
      size: "sm" as const,
      className: ""
    },
    {
      icon: <Wrench className="h-4 w-4" />,
      label: "Réparer",
      onClick: onPerformMaintenance,
      variant: "outline" as const,
      size: "sm" as const,
      className: "",
      disabled: !canPerformMaintenance,
      title: !canPerformMaintenance ? "Fonds insuffisants pour les réparations" : ""
    },
    {
      icon: <Users className="h-4 w-4" />,
      label: "Personnel",
      onClick: onAssignSlaves,
      variant: "outline" as const,
      size: "sm" as const,
      className: ""
    },
    {
      icon: <Coins className="h-4 w-4" />,
      label: "Vendre",
      onClick: onSell,
      variant: "outline" as const,
      size: "sm" as const,
      className: ""
    }
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Switch 
            id={`maintenance-${building.id}`}
            checked={maintenanceEnabled}
            onCheckedChange={onToggleMaintenance}
          />
          <label 
            htmlFor={`maintenance-${building.id}`}
            className="text-sm cursor-pointer"
          >
            Maintenance automatique
          </label>
        </div>
      </div>
      
      <ActionsGroup
        actions={actions}
        direction="row"
        justify="between"
        wrap={true}
        spacing="sm"
      />
    </div>
  );
};
