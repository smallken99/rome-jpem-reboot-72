
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

interface DiplomaticFiltersProps {
  onSearch: (term: string) => void;
  onFilter: (filters: any) => void;
  activeTab: string;
}

export const DiplomaticFilters: React.FC<DiplomaticFiltersProps> = ({
  onSearch,
  onFilter,
  activeTab
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };
  
  const handleFilterChange = (value: string, type: string) => {
    onFilter({ [type]: value || null });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center border rounded-md px-3 py-2">
        <Search className="h-4 w-4 text-muted-foreground mr-2" />
        <Input
          placeholder="Rechercher..."
          onChange={handleSearchChange}
          className="border-0 p-0 focus-visible:ring-0 h-8"
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeTab === 'nations' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="status-filter" className="text-xs flex items-center gap-1">
                <Filter className="h-3 w-3" /> Statut
              </Label>
              <Select onValueChange={(value) => handleFilterChange(value, 'status')}>
                <SelectTrigger id="status-filter">
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tous les statuts</SelectItem>
                  <SelectItem value="ally">Allié</SelectItem>
                  <SelectItem value="enemy">Ennemi</SelectItem>
                  <SelectItem value="neutral">Neutre</SelectItem>
                  <SelectItem value="tributary">Tributaire</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="region-filter" className="text-xs flex items-center gap-1">
                <Filter className="h-3 w-3" /> Région
              </Label>
              <Select onValueChange={(value) => handleFilterChange(value, 'region')}>
                <SelectTrigger id="region-filter">
                  <SelectValue placeholder="Toutes les régions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Toutes les régions</SelectItem>
                  <SelectItem value="Afrique du Nord">Afrique du Nord</SelectItem>
                  <SelectItem value="Grèce">Grèce</SelectItem>
                  <SelectItem value="Asie">Asie</SelectItem>
                  <SelectItem value="Gaule">Gaule</SelectItem>
                  <SelectItem value="Afrique / Asie">Afrique / Asie</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
        
        {activeTab === 'traites' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="type-filter" className="text-xs flex items-center gap-1">
                <Filter className="h-3 w-3" /> Type
              </Label>
              <Select onValueChange={(value) => handleFilterChange(value, 'type')}>
                <SelectTrigger id="type-filter">
                  <SelectValue placeholder="Tous les types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tous les types</SelectItem>
                  <SelectItem value="peace">Paix</SelectItem>
                  <SelectItem value="trade">Commerce</SelectItem>
                  <SelectItem value="military">Militaire</SelectItem>
                  <SelectItem value="tribute">Tribut</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="treaty-status-filter" className="text-xs flex items-center gap-1">
                <Filter className="h-3 w-3" /> Statut
              </Label>
              <Select onValueChange={(value) => handleFilterChange(value, 'status')}>
                <SelectTrigger id="treaty-status-filter">
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tous les statuts</SelectItem>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="expired">Expiré</SelectItem>
                  <SelectItem value="violated">Violé</SelectItem>
                  <SelectItem value="canceled">Annulé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
        
        {activeTab === 'alliances' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="alliance-type-filter" className="text-xs flex items-center gap-1">
                <Filter className="h-3 w-3" /> Type
              </Label>
              <Select onValueChange={(value) => handleFilterChange(value, 'type')}>
                <SelectTrigger id="alliance-type-filter">
                  <SelectValue placeholder="Tous les types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tous les types</SelectItem>
                  <SelectItem value="defensive">Défensive</SelectItem>
                  <SelectItem value="offensive">Offensive</SelectItem>
                  <SelectItem value="full">Complète</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="alliance-status-filter" className="text-xs flex items-center gap-1">
                <Filter className="h-3 w-3" /> Statut
              </Label>
              <Select onValueChange={(value) => handleFilterChange(value, 'status')}>
                <SelectTrigger id="alliance-status-filter">
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tous les statuts</SelectItem>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="expired">Expiré</SelectItem>
                  <SelectItem value="dissolved">Dissout</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
