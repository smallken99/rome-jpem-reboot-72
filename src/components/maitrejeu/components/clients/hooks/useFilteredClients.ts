
import { useMaitreJeu } from '../../../context/MaitreJeuContext';
import { ClientFilter, ClientSort } from '../../../types/clients';
import { useEffect, useState } from 'react';

export const useFilteredClients = (filter: ClientFilter, sort: ClientSort) => {
  const { clients, filterClients, sortClients } = useMaitreJeu();
  const [filteredClients, setFilteredClients] = useState(clients);

  useEffect(() => {
    // Appliquer le filtre
    let result = filterClients(clients, filter);
    
    // Appliquer le tri si un champ est spécifié
    if (sort.field) {
      result = sortClients(result, sort);
    }
    
    setFilteredClients(result);
  }, [clients, filter, sort, filterClients, sortClients]);

  return { filteredClients };
};
