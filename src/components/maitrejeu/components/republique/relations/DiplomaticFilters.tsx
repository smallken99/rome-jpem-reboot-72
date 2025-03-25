
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter, X } from 'lucide-react';
import { DiplomaticFiltersProps } from './types';

export const DiplomaticFilters: React.FC<DiplomaticFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
  activeTab
}) => {
  const regions = [
    { id: 'europe', name: 'Europe' },
    { id: 'africa', name: 'Afrique' },
    { id: 'asia', name: 'Asie' },
    { id: 'britannia', name: 'Britannia' },
    { id: 'gaul', name: 'Gaule' },
    { id: 'hispania', name: 'Hispanie' },
    { id: 'germania', name: 'Germanie' },
    { id: 'aegyptus', name: 'Égypte' },
    { id: 'syria', name: 'Syrie' },
    { id: 'graecia', name: 'Grèce' }
  ];
  
  const statusOptions = activeTab === 'nations' 
    ? [
        { id: 'ally', name: 'Allié' },
        { id: 'neutral', name: 'Neutre' },
        { id: 'hostile', name: 'Hostile' },
        { id: 'vassal', name: 'Vassal' },
        { id: 'tributary', name: 'Tributaire' },
        { id: 'enemy', name: 'Ennemi' }
      ]
    : activeTab === 'traites'
    ? [
        { id: 'active', name: 'Actif' },
        { id: 'draft', name: 'Brouillon' },
        { id: 'expired', name: 'Expiré' },
        { id: 'revoked', name: 'Révoqué' }
      ]
    : [
        { id: 'active', name: 'Active' },
        { id: 'pending', name: 'En attente' },
        { id: 'expired', name: 'Expirée' },
        { id: 'broken', name: 'Rompue' }
      ];
  
  const typeOptions = activeTab === 'nations'
    ? [] // No type for nations
    : activeTab === 'traites'
    ? [
        { id: 'commercial', name: 'Commercial' },
        { id: 'peace', name: 'Paix' },
        { id: 'military', name: 'Militaire' },
        { id: 'territorial', name: 'Territorial' }
      ]
    : [
        { id: 'military', name: 'Militaire' },
        { id: 'economic', name: 'Économique' },
        { id: 'cultural', name: 'Culturel' },
        { id: 'political', name: 'Politique' },
        { id: 'defensive', name: 'Défensif' },
        { id: 'trade', name: 'Commercial' }
      ];
  
  const handleStatusChange = (value: string) => {
    setFilters({ ...filters, status: value });
  };
  
  const handleRegionChange = (value: string) => {
    setFilters({ ...filters, region: value });
  };
  
  const handleTypeChange = (value: string) => {
    setFilters({ ...filters, type: value });
  };
  
  const handleDateFromChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, dateFrom: event.target.value });
  };
  
  const handleDateToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, dateTo: event.target.value });
  };
  
  const resetFilters = () => {
    setFilters({
      region: '',
      status: '',
      type: '',
      dateFrom: '',
      dateTo: ''
    });
    setSearchTerm('');
  };
  
  const hasActiveFilters = 
    searchTerm || 
    filters.region || 
    filters.status || 
    filters.type || 
    filters.dateFrom || 
    filters.dateTo;
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={`Rechercher ${activeTab === 'nations' ? 'une nation' : activeTab === 'traites' ? 'un traité' : 'une alliance'}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>
      
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-[180px]">
          <Select value={filters.region} onValueChange={handleRegionChange}>
            <SelectTrigger>
              <SelectValue placeholder="Région" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Toutes les régions</SelectItem>
              {regions.map((region) => (
                <SelectItem key={region.id} value={region.id}>{region.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex-1 min-w-[180px]">
          <Select value={filters.status} onValueChange={handleStatusChange}>
            <SelectTrigger>
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tous les statuts</SelectItem>
              {statusOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>{option.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {typeOptions.length > 0 && (
          <div className="flex-1 min-w-[180px]">
            <Select value={filters.type} onValueChange={handleTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les types</SelectItem>
                {typeOptions.map((option) => (
                  <SelectItem key={option.id} value={option.id}>{option.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      
      {activeTab !== 'nations' && (
        <div className="flex flex-wrap gap-3">
          <div className="flex-1 min-w-[180px]">
            <Input
              type="date"
              placeholder="Date de début"
              value={filters.dateFrom}
              onChange={handleDateFromChange}
            />
          </div>
          
          <div className="flex-1 min-w-[180px]">
            <Input
              type="date"
              placeholder="Date de fin"
              value={filters.dateTo}
              onChange={handleDateToChange}
            />
          </div>
        </div>
      )}
      
      {hasActiveFilters && (
        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={resetFilters}>
            <X className="h-4 w-4 mr-2" />
            Réinitialiser les filtres
          </Button>
        </div>
      )}
    </div>
  );
};
