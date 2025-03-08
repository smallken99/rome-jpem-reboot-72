
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, SlidersHorizontal, FileSpreadsheet, ArrowUpDown } from 'lucide-react';
import { ClientFilter, ClientSort } from '../../types/clients';
import { ClientType } from '@/components/clientele/ClientCard';

interface ClientFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  currentClientFilter: ClientFilter;
  setCurrentClientFilter: (filter: ClientFilter) => void;
  currentSort: ClientSort;
  setCurrentSort: (sort: ClientSort) => void;
  onAddClient: () => void;
  onAddAdvancedClient: () => void;
}

export const ClientFilters: React.FC<ClientFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  currentClientFilter,
  setCurrentClientFilter,
  currentSort,
  setCurrentSort,
  onAddClient,
  onAddAdvancedClient
}) => {
  // Available client types (using the correct ClientType from the import)
  const clientTypes: ClientType[] = ['artisan_commercant', 'politicien', 'religieux', 'proprietaire', 'pegre'];
  
  // Function to handle type filter change
  const handleTypeFilterChange = (value: string) => {
    if (value === 'all') {
      const { type, ...rest } = currentClientFilter;
      setCurrentClientFilter(rest);
    } else {
      setCurrentClientFilter({
        ...currentClientFilter,
        type: value as ClientType
      });
    }
  };
  
  // Function to handle assigned filter change
  const handleAssignedFilterChange = (value: string) => {
    setCurrentClientFilter({
      ...currentClientFilter,
      assignedOnly: value === 'assigned'
    });
  };
  
  // Function to handle sort change
  const handleSortChange = (value: string) => {
    const [field, direction] = value.split('-');
    setCurrentSort({
      field: field as keyof import('../../types/clients').Client,
      direction: direction as 'asc' | 'desc'
    });
  };
  
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher un client..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button onClick={onAddClient} className="whitespace-nowrap">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter
          </Button>
          
          <Button onClick={onAddAdvancedClient} variant="outline" className="whitespace-nowrap">
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Avancé
          </Button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 bg-muted/50 p-2 rounded-md">
        <div className="flex items-center gap-1.5">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filtres:</span>
        </div>
        
        <Select
          value={currentClientFilter.type || 'all'}
          onValueChange={handleTypeFilterChange}
        >
          <SelectTrigger className="h-8 w-[120px] bg-white">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            {clientTypes.map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select
          value={currentClientFilter.assignedOnly ? 'assigned' : 'all'}
          onValueChange={handleAssignedFilterChange}
        >
          <SelectTrigger className="h-8 w-[120px] bg-white">
            <SelectValue placeholder="Assignation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="assigned">Assignés</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="ml-auto flex items-center gap-1.5">
          <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Trier par:</span>
        </div>
        
        <Select
          value={`${currentSort.field}-${currentSort.direction}`}
          onValueChange={handleSortChange}
        >
          <SelectTrigger className="h-8 w-[140px] bg-white">
            <SelectValue placeholder="Trier par" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name-asc">Nom (A-Z)</SelectItem>
            <SelectItem value="name-desc">Nom (Z-A)</SelectItem>
            <SelectItem value="type-asc">Type (A-Z)</SelectItem>
            <SelectItem value="type-desc">Type (Z-A)</SelectItem>
            <SelectItem value="location-asc">Lieu (A-Z)</SelectItem>
            <SelectItem value="location-desc">Lieu (Z-A)</SelectItem>
            <SelectItem value="loyalty-asc">Loyauté (A-Z)</SelectItem>
            <SelectItem value="loyalty-desc">Loyauté (Z-A)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
