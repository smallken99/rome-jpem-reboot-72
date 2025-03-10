
import { useState } from 'react';
import { ClientFilter, ClientSort } from '../../../types/clients';

export const useClientSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentClientFilter, setCurrentClientFilter] = useState<ClientFilter>({});
  const [currentSort, setCurrentSort] = useState<ClientSort>({ 
    field: 'name',
    direction: 'asc'
  });

  return {
    searchTerm,
    setSearchTerm,
    currentClientFilter,
    setCurrentClientFilter,
    currentSort,
    setCurrentSort
  };
};
