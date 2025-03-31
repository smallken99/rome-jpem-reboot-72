
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, X, Plus, UserPlus } from 'lucide-react';
import { ClientFilter, ClientSort, CLIENT_TYPES, CLIENT_STATUSES } from '../../types/clients';

interface ClientFiltersProps {
  currentClientFilter: ClientFilter;
  setCurrentClientFilter: React.Dispatch<React.SetStateAction<ClientFilter>>;
  currentSort: ClientSort;
  setCurrentSort: React.Dispatch<React.SetStateAction<ClientSort>>;
  onAddClient: () => void;
  onAddAdvancedClient: () => void;
}

export const ClientFilters: React.FC<ClientFiltersProps> = ({
  currentClientFilter,
  setCurrentClientFilter,
  currentSort,
  setCurrentSort,
  onAddClient,
  onAddAdvancedClient
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentClientFilter((prev) => ({
      ...prev,
      searchTerm: e.target.value,
    }));
  };

  const handleFilterChange = (field: string, value: string) => {
    setCurrentClientFilter((prev) => ({
      ...prev,
      [field]: value === 'all' ? undefined : value,
    }));
  };

  const handleStatusChange = (value: string) => {
    setCurrentClientFilter((prev) => ({
      ...prev,
      status: value === 'all' ? undefined : value,
    }));
  };

  const handleSortChange = (field: keyof ClientSort, value: string) => {
    setCurrentSort((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un client..."
            value={currentClientFilter.searchTerm || ''}
            onChange={handleSearchChange}
            className="pl-8"
          />
          {currentClientFilter.searchTerm && (
            <button
              onClick={() => handleFilterChange('searchTerm', '')}
              className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <Select
          value={currentClientFilter.type || 'all'}
          onValueChange={(value) => handleFilterChange('type', value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Type de client" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            {CLIENT_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={currentClientFilter.status || 'all'}
          onValueChange={handleStatusChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            {CLIENT_STATUSES.map((status) => (
              <SelectItem key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-2">
          <Select
            value={currentClientFilter.assignedTo || 'all'}
            onValueChange={(value) => handleFilterChange('assignedTo', value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Assignation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les clients</SelectItem>
              <SelectItem value="assigned">Clients assignés</SelectItem>
              <SelectItem value="unassigned">Clients non assignés</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={currentSort.field}
            onValueChange={(value) => handleSortChange('field', value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Nom</SelectItem>
              <SelectItem value="type">Type</SelectItem>
              <SelectItem value="loyalty">Loyauté</SelectItem>
              <SelectItem value="influence">Influence</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={currentSort.direction}
            onValueChange={(value) => handleSortChange('direction', value as 'asc' | 'desc')}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Ordre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascendant</SelectItem>
              <SelectItem value="desc">Descendant</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 sm:mt-0 mt-4">
          <Button onClick={onAddClient} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Ajouter un client
          </Button>
          <Button
            onClick={onAddAdvancedClient}
            variant="outline"
            className="flex items-center gap-2"
          >
            <UserPlus className="h-4 w-4" />
            Client avancé
          </Button>
        </div>
      </div>
    </div>
  );
};
