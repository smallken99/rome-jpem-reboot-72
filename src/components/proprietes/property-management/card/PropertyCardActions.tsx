
import React from 'react';
import { ActionsGroup } from '@/components/ui-custom/ActionsGroup';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { Wrench, Users, TrendingDown, Eye } from 'lucide-react';

interface PropertyCardActionsProps {
  onOpenMaintenanceDialog: () => void;
  onOpenSlaveDialog: () => void;
  onOpenSaleDialog: () => void;
  onViewDetails?: () => void;
  showSlaveManagement: boolean;
  buildingId?: string;
}

export const PropertyCardActions: React.FC<PropertyCardActionsProps> = ({
  onOpenMaintenanceDialog,
  onOpenSlaveDialog,
  onOpenSaleDialog,
  onViewDetails,
  showSlaveManagement,
  buildingId
}) => {
  const actions = [
    {
      icon: <Wrench className="h-3.5 w-3.5" />,
      label: "Maintenance",
      onClick: onOpenMaintenanceDialog,
      variant: "outline" as const,
      size: "sm" as const,
      className: "h-8 px-2 text-xs roman-btn-outline",
      title: "Gérer la maintenance du bâtiment"
    },
    ...(showSlaveManagement ? [{
      icon: <Users className="h-3.5 w-3.5" />,
      label: "Esclaves",
      onClick: onOpenSlaveDialog,
      variant: "outline" as const,
      size: "sm" as const,
      className: "h-8 px-2 text-xs roman-btn-outline",
      title: "Gérer les esclaves assignés"
    }] : []),
    {
      icon: <TrendingDown className="h-3.5 w-3.5" />,
      label: "Vendre",
      onClick: onOpenSaleDialog,
      variant: "outline" as const,
      size: "sm" as const,
      className: "h-8 px-2 text-xs roman-btn-outline text-red-600 hover:text-red-700 border-red-200 hover:border-red-300",
      title: "Mettre en vente cette propriété"
    }
  ];
  
  if (onViewDetails && buildingId) {
    actions.unshift({
      icon: <Eye className="h-3.5 w-3.5" />,
      label: "Détails",
      to: `/patrimoine/propriete/${buildingId}`,
      variant: "outline" as const,
      size: "sm" as const,
      className: "h-8 px-2 text-xs roman-btn-outline",
      title: "Voir les détails de la propriété"
    });
  }
  
  return (
    <div className="mt-3">
      <ActionsGroup 
        actions={actions}
        justify="end"
        spacing="xs"
      />
    </div>
  );
};
