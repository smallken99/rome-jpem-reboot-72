
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Filter, RefreshCcw } from 'lucide-react';
import { 
  CLIENT_TYPES, 
  CLIENT_LOCATIONS, 
  CLIENT_LOYALTIES, 
  CLIENT_STATUSES,
  ClientFilter,
  ClientSort,
  Client
} from '../../types/clients';

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
  const resetFilters = () => {
    setCurrentClientFilter({
      searchTerm: '',
      type: 'all',
      status: 'all',
      assignedTo: 'all'
    });
    setSearchTerm('');
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un client..."
              className="pl-8 w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select 
            value={currentClientFilter.type || "all"} 
            onValueChange={(value) => setCurrentClientFilter({...currentClientFilter, type: value as 'all' | 'standard' | 'premium' | 'exclusive'})}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type de client" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              {CLIENT_TYPES.map(type => (
                <SelectItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select 
            value={currentClientFilter.location || ""} 
            onValueChange={(value) => setCurrentClientFilter({...currentClientFilter, location: value})}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Emplacement" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tous les emplacements</SelectItem>
              {CLIENT_LOCATIONS.map(location => (
                <SelectItem key={location} value={location}>{location}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            <RefreshCcw className="h-4 w-4 mr-1" />
            Réinitialiser
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onAddClient}>
            <Plus className="h-4 w-4 mr-1" />
            Ajouter client
          </Button>
          <Button onClick={onAddAdvancedClient}>
            <Plus className="h-4 w-4 mr-1" />
            Client avancé
          </Button>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="text-sm text-muted-foreground">Filtres avancés:</div>
        
        <Select 
          value={currentClientFilter.loyalty || ""} 
          onValueChange={(value) => setCurrentClientFilter({...currentClientFilter, loyalty: value})}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Loyauté" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Toutes loyautés</SelectItem>
            {CLIENT_LOYALTIES.map(loyalty => (
              <SelectItem key={loyalty} value={loyalty}>
                {loyalty.charAt(0).toUpperCase() + loyalty.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select 
          value={currentClientFilter.status || "all"} 
          onValueChange={(value) => setCurrentClientFilter({...currentClientFilter, status: value as "all" | "active" | "inactive" | "probation"})}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous statuts</SelectItem>
            {CLIENT_STATUSES.map(status => (
              <SelectItem key={status} value={status}>
                {status === 'active' ? 'Actif' : status === 'inactive' ? 'Inactif' : 'Probation'}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select 
          value={currentSort.field as string} 
          onValueChange={(value) => setCurrentSort({...currentSort, field: value as keyof Client})}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Trier par" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Nom</SelectItem>
            <SelectItem value="type">Type</SelectItem>
            <SelectItem value="location">Emplacement</SelectItem>
            <SelectItem value="loyalty">Loyauté</SelectItem>
            <SelectItem value="relationshipLevel">Niveau de relation</SelectItem>
            <SelectItem value="competencePoints">Points de compétence</SelectItem>
          </SelectContent>
        </Select>
        
        <Select 
          value={currentSort.direction} 
          onValueChange={(value) => setCurrentSort({...currentSort, direction: value as 'asc' | 'desc'})}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Ordre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascendant</SelectItem>
            <SelectItem value="desc">Descendant</SelectItem>
          </SelectContent>
        </Select>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setCurrentClientFilter({
            ...currentClientFilter, 
            assignedOnly: !currentClientFilter.assignedOnly
          })}
          className={currentClientFilter.assignedOnly ? "bg-primary/20" : ""}
        >
          <Filter className="h-4 w-4 mr-1" />
          Assignés uniquement
        </Button>
      </div>
    </div>
  );
};
