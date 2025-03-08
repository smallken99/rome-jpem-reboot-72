
import { useMaitreJeu } from '../../../context/MaitreJeuContext';
import { ClientFilter, ClientSort } from '../../../types/clients';

export const useFilteredClients = (filter: ClientFilter, sort: ClientSort) => {
  const { clients, filterClients, sortClients } = useMaitreJeu();
  
  // Get filtered and sorted clients
  const filteredClients = sortClients(
    filterClients(clients, filter), 
    sort
  );
  
  return { filteredClients };
};
