
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, RefreshCw, Filter, X } from 'lucide-react';

interface DiplomaticFiltersProps {
  activeTab: string;
  filters: any;
  onFiltersChange: (filters: any) => void;
  onReset: () => void;
}

const DiplomaticFilters: React.FC<DiplomaticFiltersProps> = ({ 
  activeTab, 
  filters, 
  onFiltersChange, 
  onReset 
}) => {
  const handleFilterChange = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };
  
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <div className="w-full sm:w-auto flex-1 min-w-[200px]">
        <Input
          placeholder="Rechercher..."
          value={filters.searchTerm || ''}
          onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
          className="h-9"
        />
      </div>
      
      {activeTab === 'nations' && (
        <>
          <Select 
            value={filters.region || ''} 
            onValueChange={(value) => handleFilterChange('region', value)}
          >
            <SelectTrigger className="h-9 w-[180px]">
              <SelectValue placeholder="Région" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Toutes les régions</SelectItem>
              <SelectItem value="europe">Europe</SelectItem>
              <SelectItem value="africa">Afrique</SelectItem>
              <SelectItem value="asia">Asie</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={filters.status || ''} 
            onValueChange={(value) => handleFilterChange('status', value)}
          >
            <SelectTrigger className="h-9 w-[180px]">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tous les statuts</SelectItem>
              <SelectItem value="ally">Allié</SelectItem>
              <SelectItem value="neutral">Neutre</SelectItem>
              <SelectItem value="enemy">Ennemi</SelectItem>
              <SelectItem value="tributary">Tributaire</SelectItem>
            </SelectContent>
          </Select>
        </>
      )}
      
      {activeTab === 'diplomats' && (
        <Select 
          value={filters.location || ''} 
          onValueChange={(value) => handleFilterChange('location', value)}
        >
          <SelectTrigger className="h-9 w-[180px]">
            <SelectValue placeholder="Localisation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Toutes localisations</SelectItem>
            <SelectItem value="rome">Rome</SelectItem>
            <SelectItem value="abroad">À l'étranger</SelectItem>
          </SelectContent>
        </Select>
      )}
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onReset} 
        className="h-9 w-9"
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Réinitialiser</span>
      </Button>
    </div>
  );
};

export const DiplomaticHeader: React.FC<{ activeTab: string }> = ({ activeTab }) => {
  const [filters, setFilters] = useState({
    searchTerm: '',
    region: '',
    status: '',
    location: ''
  });
  
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };
  
  const resetFilters = () => {
    setFilters({
      searchTerm: '',
      region: '',
      status: '',
      location: ''
    });
  };
  
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Relations Diplomatiques</h2>
          <p className="text-muted-foreground">
            Gérez les relations de Rome avec les nations étrangères
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualiser
          </Button>
          <Button size="sm" className="h-9">
            <Plus className="h-4 w-4 mr-2" />
            {activeTab === 'nations' ? 'Nouvelle relation' : 'Nouveau diplomate'}
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <DiplomaticFilters 
          activeTab={activeTab} 
          filters={filters}
          onFiltersChange={handleFilterChange}
          onReset={resetFilters}
        />
      </div>
    </div>
  );
};
