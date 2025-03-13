
import React from 'react';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { Globe, FileText, Shield } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { DiplomaticFilters } from './DiplomaticFilters';

interface DiplomaticHeaderProps {
  activeTab: string;
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filters: any;
  onFilterChange: (filters: any) => void;
  onResetFilters: () => void;
  openAddNationModal: () => void;
  openAddTraiteModal: () => void;
  openAddAllianceModal: () => void;
}

export const DiplomaticHeader: React.FC<DiplomaticHeaderProps> = ({
  activeTab,
  searchTerm,
  onSearchChange,
  filters,
  onFilterChange,
  onResetFilters,
  openAddNationModal,
  openAddTraiteModal,
  openAddAllianceModal
}) => {
  const renderActionButton = () => {
    switch (activeTab) {
      case 'nations':
        return (
          <ActionButton 
            icon={<Globe size={16} className="mr-1" />}
            label="Nouvelle nation"
            onClick={openAddNationModal}
            variant="default"
            title="Ajouter une nouvelle nation"
          />
        );
      case 'traites':
        return (
          <ActionButton 
            icon={<FileText size={16} className="mr-1" />}
            label="Nouveau traité"
            onClick={openAddTraiteModal}
            variant="default"
            title="Ajouter un nouveau traité"
          />
        );
      case 'alliances':
        return (
          <ActionButton 
            icon={<Shield size={16} className="mr-1" />}
            label="Nouvelle alliance"
            onClick={openAddAllianceModal}
            variant="default"
            title="Ajouter une nouvelle alliance"
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Relations Diplomatiques</h2>
          <p className="text-muted-foreground">
            Gérez les relations de Rome avec les nations étrangères, les alliances et les traités.
          </p>
        </div>
        
        {renderActionButton()}
      </div>
      
      <div className="flex items-center gap-2 mt-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher par nom, région, type..."
            className="pl-8"
            value={searchTerm}
            onChange={onSearchChange}
          />
        </div>
        <DiplomaticFilters 
          activeTab={activeTab}
          onFilterChange={onFilterChange}
          onReset={onResetFilters}
        />
      </div>

      {Object.values(filters).some(value => value !== '') && (
        <div className="mt-2 text-sm">
          <span className="font-medium">Filtres actifs: </span>
          {filters.status && <span className="mr-2">Statut: {filters.status}</span>}
          {filters.region && <span className="mr-2">Région: {filters.region}</span>}
          {filters.dateFrom && <span className="mr-2">De: {filters.dateFrom}</span>}
          {filters.dateTo && <span>À: {filters.dateTo}</span>}
        </div>
      )}
    </>
  );
};
