
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger, 
  DropdownMenuRadioGroup, 
  DropdownMenuRadioItem, 
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { Search, UserPlus, Star, Filter, SortAsc, SortDesc } from 'lucide-react';
import { ClientFilter, ClientSort } from '../../types/clients';

interface ClientFiltersProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
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
    <div className="flex flex-col sm:flex-row justify-between gap-2 mb-4">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher un client..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="flex flex-wrap gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-10">
              <Filter className="h-4 w-4 mr-2" />
              Filtres
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuRadioGroup value={currentClientFilter.type || "all"} onValueChange={(value) => {
              setCurrentClientFilter({...currentClientFilter, type: value === "all" ? undefined : value});
            }}>
              <DropdownMenuRadioItem value="all">Tous les types</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="artisan_commercant">Artisans & Commerçants</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="politicien">Politiciens</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="religieux">Religieux</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="proprietaire">Propriétaires</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="pegre">Pègre</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuRadioGroup value={currentClientFilter.location || "all"} onValueChange={(value) => {
              setCurrentClientFilter({...currentClientFilter, location: value === "all" ? undefined : value});
            }}>
              <DropdownMenuRadioItem value="all">Tous les quartiers</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Forum">Forum</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Subure">Subure</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Palatin">Palatin</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Aventin">Aventin</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuRadioGroup value={currentClientFilter.loyalty || "all"} onValueChange={(value) => {
              setCurrentClientFilter({...currentClientFilter, loyalty: value === "all" ? undefined : value});
            }}>
              <DropdownMenuRadioItem value="all">Toutes loyautés</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="faible">Loyauté faible</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="moyenne">Loyauté moyenne</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="forte">Loyauté forte</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuRadioGroup value={currentClientFilter.assignedOnly ? "assigned" : "all"} onValueChange={(value) => {
              setCurrentClientFilter({...currentClientFilter, assignedOnly: value === "assigned"});
            }}>
              <DropdownMenuRadioItem value="all">Tous les clients</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="assigned">Clients assignés seulement</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-10">
              {currentSort.direction === 'asc' ? <SortAsc className="h-4 w-4 mr-2" /> : <SortDesc className="h-4 w-4 mr-2" />}
              Tri: {currentSort.field}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuRadioGroup value={currentSort.field} onValueChange={(value) => {
              setCurrentSort({...currentSort, field: value as keyof ClientSort['field']});
            }}>
              <DropdownMenuRadioItem value="name">Nom</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="type">Type</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="location">Quartier</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="loyalty">Loyauté</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuRadioGroup value={currentSort.direction} onValueChange={(value) => {
              setCurrentSort({...currentSort, direction: value as 'asc' | 'desc'});
            }}>
              <DropdownMenuRadioItem value="asc">Ascendant</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="desc">Descendant</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button size="sm" onClick={onAddClient} className="h-10">
          <UserPlus className="h-4 w-4 mr-2" />
          Ajouter
        </Button>
        
        <Button size="sm" variant="outline" onClick={onAddAdvancedClient} className="h-10">
          <Star className="h-4 w-4 mr-2" />
          Avancé
        </Button>
      </div>
    </div>
  );
};
