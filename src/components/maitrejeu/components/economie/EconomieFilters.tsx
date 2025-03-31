
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Search, X, Filter } from 'lucide-react';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { EconomieFilter, ECONOMIE_TYPES, ECONOMIE_CATEGORIES } from '../../types/economie';

interface EconomieFiltersProps {
  filter: EconomieFilter;
  onFilterChange: (newFilter: Partial<EconomieFilter>) => void;
  onResetFilters: () => void;
}

export const EconomieFilters: React.FC<EconomieFiltersProps> = ({
  filter,
  onFilterChange,
  onResetFilters
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between">
      <div className="flex flex-1 w-full sm:w-auto gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher..."
            value={filter.searchTerm || ''}
            onChange={(e) => onFilterChange({ searchTerm: e.target.value })}
            className="pl-8"
          />
          {filter.searchTerm && (
            <button
              onClick={() => onFilterChange({ searchTerm: '' })}
              className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <Select
          value={filter.types ? String(filter.types) : 'all'}
          onValueChange={(value) => onFilterChange({ types: value === 'all' ? undefined : value as ECONOMIE_TYPES })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            <SelectItem value={ECONOMIE_TYPES.INCOME}>Revenus</SelectItem>
            <SelectItem value={ECONOMIE_TYPES.EXPENSE}>Dépenses</SelectItem>
            <SelectItem value={ECONOMIE_TYPES.TAX}>Impôts</SelectItem>
            <SelectItem value={ECONOMIE_TYPES.TRADE}>Commerce</SelectItem>
            <SelectItem value={ECONOMIE_TYPES.MILITARY}>Militaire</SelectItem>
            <SelectItem value={ECONOMIE_TYPES.CONSTRUCTION}>Construction</SelectItem>
            <SelectItem value={ECONOMIE_TYPES.SLAVES}>Esclaves</SelectItem>
            <SelectItem value={ECONOMIE_TYPES.OTHER}>Autres</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filtres</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Catégories</h4>
                <Select
                  value={filter.category ? String(filter.category) : 'all'}
                  onValueChange={(value) => {
                    if (value === 'all') {
                      onFilterChange({ category: undefined });
                    } else {
                      onFilterChange({ category: value as ECONOMIE_CATEGORIES });
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes les catégories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les catégories</SelectItem>
                    <SelectItem value={ECONOMIE_CATEGORIES.MILITARY}>Militaire</SelectItem>
                    <SelectItem value={ECONOMIE_CATEGORIES.ADMINISTRATIVE}>Administration</SelectItem>
                    <SelectItem value={ECONOMIE_CATEGORIES.CONSTRUCTION}>Construction</SelectItem>
                    <SelectItem value={ECONOMIE_CATEGORIES.RELIGION}>Religion</SelectItem>
                    <SelectItem value={ECONOMIE_CATEGORIES.SLAVES}>Esclaves</SelectItem>
                    <SelectItem value={ECONOMIE_CATEGORIES.ENTERTAINMENT}>Divertissement</SelectItem>
                    <SelectItem value={ECONOMIE_CATEGORIES.TAX}>Impôts</SelectItem>
                    <SelectItem value={ECONOMIE_CATEGORIES.TRADE}>Commerce</SelectItem>
                    <SelectItem value={ECONOMIE_CATEGORIES.DIPLOMACY}>Diplomatie</SelectItem>
                    <SelectItem value={ECONOMIE_CATEGORIES.OTHER}>Autres</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Montant minimum</h4>
                <Input
                  type="number"
                  placeholder="Montant min"
                  value={filter.minAmount || ''}
                  onChange={(e) => onFilterChange({ minAmount: e.target.value ? Number(e.target.value) : undefined })}
                />
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Montant maximum</h4>
                <Input
                  type="number"
                  placeholder="Montant max"
                  value={filter.maxAmount || ''}
                  onChange={(e) => onFilterChange({ maxAmount: e.target.value ? Number(e.target.value) : undefined })}
                />
              </div>

              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-2"
                onClick={onResetFilters}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <Button 
        variant="outline" 
        size="sm" 
        onClick={onResetFilters}
        className="sm:hidden w-full"
      >
        Réinitialiser
      </Button>
    </div>
  );
};
