
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Search, Filter, RefreshCw, Plus, Star } from 'lucide-react';
import { ClientFilter, ClientSort } from '../../types/clients';

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
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1 flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un client..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setCurrentClientFilter({})}>
              Réinitialiser les filtres
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setCurrentClientFilter(prev => ({ ...prev, type: 'artisan_commercant' }))}>
              Artisans & Commerçants
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCurrentClientFilter(prev => ({ ...prev, type: 'politicien' }))}>
              Politiciens
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCurrentClientFilter(prev => ({ ...prev, type: 'religieux' }))}>
              Religieux
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCurrentClientFilter(prev => ({ ...prev, type: 'proprietaire' }))}>
              Propriétaires Terriens
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCurrentClientFilter(prev => ({ ...prev, type: 'pegre' }))}>
              Pègre
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setCurrentClientFilter(prev => ({ ...prev, assignedOnly: true }))}>
              Seulement les assignés
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCurrentClientFilter(prev => ({ ...prev, loyalty: 'forte' }))}>
              Loyauté forte
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => {
            setCurrentSort(prev => ({
              field: prev.field,
              direction: prev.direction === 'asc' ? 'desc' : 'asc'
            }));
          }}
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex gap-2">
        <Button onClick={onAddClient}>
          <Plus className="h-4 w-4 mr-1" />
          Ajouter un client
        </Button>
        <Button variant="outline" onClick={onAddAdvancedClient}>
          <Star className="h-4 w-4 mr-1" />
          Mode avancé
        </Button>
      </div>
    </div>
  );
};
