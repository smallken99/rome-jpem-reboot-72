
import React from 'react';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { ActionsPanel } from '@/components/ui-custom/ActionsPanel';
import { OwnedBuilding } from '@/components/proprietes/types/property';
import { Wrench, Coins, Users, BarChart3, Shield, Building, Trash2, ArrowUpRight } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';

interface PropertyActionsProps {
  building: OwnedBuilding;
  onRenovate: () => void;
  onCollectIncome?: () => void;
  onManageWorkers?: () => void;
  onToggleSecurity?: (level: number) => void;
  onToggleMaintenance?: (enabled: boolean) => void;
  onViewDetails?: () => void;
  onSell?: () => void;
  maintenanceEnabled?: boolean;
}

export const PropertyActions: React.FC<PropertyActionsProps> = ({
  building,
  onRenovate,
  onCollectIncome,
  onManageWorkers,
  onToggleSecurity,
  onToggleMaintenance,
  onViewDetails,
  onSell,
  maintenanceEnabled = true
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const actions = [
    {
      icon: <Wrench />,
      label: "Rénover",
      description: "Améliore l'état du bâtiment",
      onClick: onRenovate,
      variant: "outline" as const,
      badgeText: building.condition < 50 ? "Recommandé" : undefined,
      showBadge: building.condition < 50,
      badgeVariant: "destructive" as const
    },
    {
      icon: <Coins />,
      label: "Collecter les revenus",
      description: "Percevoir les revenus générés",
      onClick: onCollectIncome ? onCollectIncome : () => toast({
        title: "Fonction non disponible",
        description: "La collecte des revenus n'est pas disponible pour ce bâtiment"
      }),
      variant: "outline" as const,
      disabled: !building.income || building.income <= 0
    },
    {
      icon: <Users />,
      label: "Gérer le personnel",
      description: "Assigner des esclaves et des travailleurs",
      onClick: onManageWorkers ? onManageWorkers : () => navigate(`/patrimoine/proprietes/${building.id}/workers`),
      variant: "outline" as const
    },
    {
      icon: <BarChart3 />,
      label: "Analyse de rentabilité",
      description: "Voir les statistiques et projections",
      onClick: () => navigate(`/patrimoine/proprietes/${building.id}/profitability`),
      variant: "outline" as const,
      rightIcon: <ArrowUpRight />
    },
    {
      icon: <Building />,
      label: "Détails complets",
      description: "Voir toutes les informations",
      onClick: onViewDetails ? onViewDetails : () => navigate(`/patrimoine/proprietes/${building.id}`),
      variant: "outline" as const
    },
    {
      icon: <Trash2 />,
      label: "Vendre la propriété",
      description: "Mettre en vente sur le marché",
      onClick: onSell ? onSell : () => toast({
        title: "Fonction non disponible",
        description: "La vente n'est pas disponible pour ce bâtiment"
      }),
      variant: "destructive" as const
    }
  ];
  
  const filteredActions = actions.filter(action => !action.disabled);

  return (
    <ActionsPanel
      title="Actions disponibles"
      description="Gérer votre propriété et améliorer sa rentabilité"
      actions={filteredActions}
      className="mt-4"
    />
  );
};
