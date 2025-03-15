
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { FilterIcon, X } from 'lucide-react';

export interface DiplomaticFiltersProps {
  activeTab: string;
  onFilterChange: (filters: any) => void;
  onReset: () => void;
  onSearch?: (term: string) => void;
  onFilter?: (filters: any) => void;
}

export const DiplomaticFilters: React.FC<DiplomaticFiltersProps> = ({
  activeTab,
  onFilterChange,
  onReset,
  onSearch,
  onFilter
}) => {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});
  
  const applyFilter = (category: string, value: string) => {
    const newFilters = { ...selectedFilters, [category]: value };
    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const resetFilters = () => {
    setSelectedFilters({});
    onReset();
  };
  
  // Nation tab specific filters
  const renderNationFilters = () => (
    <>
      <DropdownMenuGroup>
        <DropdownMenuLabel>Statut</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => applyFilter('status', 'ally')}>
          Allié
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => applyFilter('status', 'enemy')}>
          Ennemi
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => applyFilter('status', 'neutral')}>
          Neutre
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => applyFilter('status', 'tributary')}>
          Tributaire
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuLabel>Région</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => applyFilter('region', 'europe')}>
          Europe
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => applyFilter('region', 'africa')}>
          Afrique
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => applyFilter('region', 'asia')}>
          Asie
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </>
  );
  
  // Traité tab specific filters
  const renderTraiteFilters = () => (
    <>
      <DropdownMenuGroup>
        <DropdownMenuLabel>Type</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => applyFilter('type', 'commercial')}>
          Commercial
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => applyFilter('type', 'peace')}>
          Paix
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => applyFilter('type', 'military')}>
          Militaire
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => applyFilter('type', 'tribute')}>
          Tribut
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuLabel>Statut</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => applyFilter('status', 'active')}>
          Actif
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => applyFilter('status', 'draft')}>
          Brouillon
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => applyFilter('status', 'expired')}>
          Expiré
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => applyFilter('status', 'revoked')}>
          Révoqué
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </>
  );
  
  // Alliance tab specific filters
  const renderAllianceFilters = () => (
    <>
      <DropdownMenuGroup>
        <DropdownMenuLabel>Type</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => applyFilter('type', 'defensive')}>
          Défensive
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => applyFilter('type', 'offensive')}>
          Offensive
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => applyFilter('type', 'commercial')}>
          Commerciale
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => applyFilter('type', 'cultural')}>
          Culturelle
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuLabel>Statut</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => applyFilter('status', 'active')}>
          Active
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => applyFilter('status', 'inactive')}>
          Inactive
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => applyFilter('status', 'pending')}>
          En attente
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => applyFilter('status', 'dissolved')}>
          Dissoute
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </>
  );
  
  const getFilterCount = () => Object.keys(selectedFilters).length;
  
  const renderActiveFilters = () => {
    const count = getFilterCount();
    if (count === 0) return null;
    
    return (
      <div className="ml-2 px-2 py-1 bg-primary text-primary-foreground rounded-full text-xs">
        {count}
      </div>
    );
  };
  
  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center">
            <FilterIcon className="mr-2 h-4 w-4" />
            Filtres
            {renderActiveFilters()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          {activeTab === 'nations' && renderNationFilters()}
          {activeTab === 'traites' && renderTraiteFilters()}
          {activeTab === 'alliances' && renderAllianceFilters()}
          
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={resetFilters} className="justify-center text-muted-foreground">
            <X className="mr-2 h-4 w-4" />
            Réinitialiser
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
