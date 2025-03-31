
import { useState, useMemo } from 'react';
import { Client, ClientFilter, ClientSort } from '@/components/maitrejeu/types/clients';

export const useFilteredClients = (clients: Client[], initialFilter: ClientFilter, initialSort: ClientSort) => {
  const [filter, setFilter] = useState<ClientFilter>(initialFilter);
  const [sort, setSort] = useState<ClientSort>(initialSort);

  const filteredClients = useMemo(() => {
    // Filter clients based on filter criteria
    return clients.filter(client => {
      // Filter by search term
      if (filter.searchTerm && !client.name.toLowerCase().includes(filter.searchTerm.toLowerCase())) {
        return false;
      }

      // Filter by type
      if (filter.type !== 'all' && client.type !== filter.type) {
        return false;
      }

      // Filter by status
      if (filter.status !== 'all' && client.status !== filter.status) {
        return false;
      }

      // Filter by assigned to
      if (filter.assignedTo === 'assigned' && !client.assignedTo) {
        return false;
      }
      if (filter.assignedTo === 'unassigned' && client.assignedTo) {
        return false;
      }
      if (filter.assignedTo !== 'all' && filter.assignedTo !== 'assigned' && filter.assignedTo !== 'unassigned') {
        if (client.assignedTo !== filter.assignedTo) {
          return false;
        }
      }

      // Filter by minimum influence
      if (filter.minInfluence && client.influence < filter.minInfluence) {
        return false;
      }

      // Filter by minimum loyalty
      if (filter.minLoyalty && client.loyalty < filter.minLoyalty) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      // Sort by the selected field
      const fieldA = a[sort.field];
      const fieldB = b[sort.field];

      if (fieldA < fieldB) {
        return sort.direction === 'asc' ? -1 : 1;
      }
      if (fieldA > fieldB) {
        return sort.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [clients, filter, sort]);

  return {
    filter,
    setFilter,
    sort,
    setSort,
    filteredClients
  };
};
