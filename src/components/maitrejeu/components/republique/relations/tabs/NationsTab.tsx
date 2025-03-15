
import React from 'react';
import { NationsList } from '../NationsList';
import { ActionsPanel, ActionItem } from '@/components/ui-custom/ActionsPanel';
import { Plus } from 'lucide-react';
import { nationsMock } from '../data/nations';

interface NationsTabProps {
  searchTerm: string;
  filters: any;
  openAddNationModal: () => void;
}

export const NationsTab: React.FC<NationsTabProps> = ({ 
  searchTerm, 
  filters,
  openAddNationModal
}) => {
  const actions: ActionItem[] = [
    { 
      label: "Ajouter une nation", 
      icon: <Plus size={16} />, 
      onClick: openAddNationModal, 
      variant: 'default'
    }
  ];

  return (
    <>
      <ActionsPanel
        title="Actions disponibles"
        description="Gérez les relations avec les nations étrangères"
        actions={actions}
        className="mb-4"
      />
      <NationsList 
        nations={nationsMock} 
        searchTerm={searchTerm} 
        filters={filters} 
        isEditable={true} 
      />
    </>
  );
};
