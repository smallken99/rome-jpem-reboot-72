
import React from 'react';
import { AlliancesMilitaires } from '../AlliancesMilitaires';
import { ActionsPanel, ActionItem } from '@/components/ui-custom/ActionsPanel';
import { Plus } from 'lucide-react';

interface AlliancesTabProps {
  searchTerm: string;
  filters: any;
  openAddAllianceModal: () => void;
}

export const AlliancesTab: React.FC<AlliancesTabProps> = ({ 
  searchTerm, 
  filters,
  openAddAllianceModal
}) => {
  const actions: ActionItem[] = [
    { 
      label: "Ajouter une alliance", 
      icon: <Plus size={16} />, 
      onClick: openAddAllianceModal, 
      variant: 'default'
    }
  ];

  return (
    <>
      <ActionsPanel
        title="Actions disponibles"
        description="Gérez les alliances militaires"
        actions={actions}
        className="mb-4"
      />
      <AlliancesMilitaires searchTerm={searchTerm} filters={filters} />
    </>
  );
};
