
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
import { ClientFilter } from '../../types/clients';

interface ClientFiltersProps {
  filter: ClientFilter;
  onFilterChange: (newFilter: Partial<ClientFilter>) => void;
  onResetFilters: () => void;
}

export const ClientFilters: React.FC<ClientFiltersProps> = ({
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
          value={filter.types || 'all'}
          onValueChange={(value) => onFilterChange({ types: value })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            <SelectItem value="plebeien">Plébéien</SelectItem>
            <SelectItem value="patricien">Patricien</SelectItem>
            <SelectItem value="marchand">Marchand</SelectItem>
            <SelectItem value="religieux">Religieux</SelectItem>
            <SelectItem value="militaire">Militaire</SelectItem>
            <SelectItem value="artisan">Artisan</SelectItem>
            <SelectItem value="esclave">Esclave</SelectItem>
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
                <h4 className="font-medium">Statut</h4>
                <Select
                  value={(filter.status && filter.status !== 'all') ? filter.status : 'all'}
                  onValueChange={(value) => {
                    if (value === 'all') {
                      onFilterChange({ status: undefined });
                    } else {
                      onFilterChange({ status: value });
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les statuts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="actif">Actif</SelectItem>
                    <SelectItem value="inactif">Inactif</SelectItem>
                    <SelectItem value="disponible">Disponible</SelectItem>
                    <SelectItem value="indisponible">Indisponible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Influence minimale</h4>
                <Select
                  value={filter.minInfluence?.toString() || 'none'}
                  onValueChange={(value) => {
                    if (value === 'none') {
                      onFilterChange({ minInfluence: undefined });
                    } else {
                      onFilterChange({ minInfluence: parseInt(value) });
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Influence minimale" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Aucun minimum</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="5">5+</SelectItem>
                    <SelectItem value="7">7+</SelectItem>
                    <SelectItem value="10">10 (Maximum)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Loyauté</h4>
                <Select
                  value={filter.loyalty || 'all'}
                  onValueChange={(value) => {
                    if (value === 'all') {
                      onFilterChange({ loyalty: undefined });
                    } else {
                      onFilterChange({ loyalty: value });
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Loyauté" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes</SelectItem>
                    <SelectItem value="faible">Faible</SelectItem>
                    <SelectItem value="moyenne">Moyenne</SelectItem>
                    <SelectItem value="forte">Forte</SelectItem>
                    <SelectItem value="absolue">Absolue</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filter.assignedOnly}
                  onChange={(e) => {
                    onFilterChange({ assignedOnly: e.target.checked });
                  }}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm">Clients assignés uniquement</span>
              </label>

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
