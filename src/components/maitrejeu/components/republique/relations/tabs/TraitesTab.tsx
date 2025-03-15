
import React from 'react';
import { TraitesList } from '../TraitesList';
import { ActionsPanel, ActionItem } from '@/components/ui-custom/ActionsPanel';
import { Plus } from 'lucide-react';
import { traitesMock } from '../data/traites';

interface TraitesTabProps {
  searchTerm: string;
  filters: any;
  openAddTraiteModal: () => void;
}

export const TraitesTab: React.FC<TraitesTabProps> = ({ 
  searchTerm, 
  filters,
  openAddTraiteModal
}) => {
  const actions: ActionItem[] = [
    { 
      label: "Ajouter un traité", 
      icon: <Plus size={16} />, 
      onClick: openAddTraiteModal, 
      variant: 'default'
    }
  ];

  return (
    <>
      <ActionsPanel
        title="Actions disponibles"
        description="Gérez les traités avec les nations étrangères"
        actions={actions}
        className="mb-4"
      />
      <TraitesList 
        traites={traitesMock} 
        searchTerm={searchTerm} 
        filters={filters} 
        isEditable={true} 
      />
    </>
  );
};
