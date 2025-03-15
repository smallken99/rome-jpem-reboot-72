
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Filter, 
  Search, 
  X 
} from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { EconomieFilter } from '../../types/economie';

interface EconomieFiltersProps {
  filter: EconomieFilter;
  onFilterChange: (filter: EconomieFilter) => void;
  onResetFilters: () => void;
}

export const EconomieFilters: React.FC<EconomieFiltersProps> = ({
  filter,
  onFilterChange,
  onResetFilters
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filter,
      searchTerm: e.target.value
    });
  };
  
  const handleTypeChange = (value: string) => {
    onFilterChange({
      ...filter,
      type: value
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium flex items-center gap-1.5">
          <Filter className="h-4 w-4" />
          Filtres
        </h3>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onResetFilters}
          disabled={!filter.searchTerm && filter.type === 'all'}
        >
          <X className="h-4 w-4 mr-1" />
          Réinitialiser
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher..."
            className="pl-8"
            value={filter.searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        
        <Select value={filter.type} onValueChange={handleTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Type de transaction" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            <SelectItem value="income">Revenus</SelectItem>
            <SelectItem value="expense">Dépenses</SelectItem>
            <SelectItem value="tax">Taxes</SelectItem>
            <SelectItem value="transfer">Transferts</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
