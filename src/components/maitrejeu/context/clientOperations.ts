
import { Client, ClientCreationData, ClientFilter, ClientSort } from '../types/clients';
import { v4 as uuidv4 } from 'uuid';

export const createClientOperations = (
  setClients: React.Dispatch<React.SetStateAction<Client[]>>
) => {
  // Ajouter un nouveau client
  const addClient = (client: ClientCreationData): string => {
    const id = uuidv4();
    const newClient: Client = {
      ...client,
      id,
      competences: client.competences || {},
      relationshipLevel: client.relationshipLevel || 1,
      activeStatus: client.activeStatus || 'active',
      lastInteraction: client.lastInteraction || new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    
    setClients(prev => [...prev, newClient]);
    return id;
  };
  
  // Mettre à jour un client existant
  const updateClient = (id: string, updates: Partial<Client>) => {
    setClients(prev => 
      prev.map(client => 
        client.id === id ? { ...client, ...updates } : client
      )
    );
  };
  
  // Supprimer un client
  const deleteClient = (id: string): boolean => {
    let deleted = false;
    setClients(prev => {
      const newClients = prev.filter(client => client.id !== id);
      deleted = newClients.length < prev.length;
      return newClients;
    });
    return deleted;
  };
  
  // Assigner un client à un sénateur
  const assignClientToSenateur = (clientId: string, senateurId: string | null) => {
    setClients(prev => 
      prev.map(client => 
        client.id === clientId ? { ...client, assignedToSenateurId: senateurId } : client
      )
    );
  };
  
  // Attribuer des points de compétence à un client
  const adjustCompetencePoints = (clientId: string, competence: string, value: number) => {
    setClients(prev => 
      prev.map(client => 
        client.id === clientId ? 
          { 
            ...client, 
            competences: { 
              ...(client.competences || {}), 
              [competence]: value
            } 
          } : 
          client
      )
    );
  };
  
  // Ajouter ou supprimer une capacité spéciale
  const updateSpecialAbilities = (clientId: string, abilities: string[]) => {
    setClients(prev => 
      prev.map(client => 
        client.id === clientId ? { ...client, specialAbilities: abilities } : client
      )
    );
  };
  
  // Filtrer les clients selon divers critères
  const filterClients = (clients: Client[], filter: ClientFilter): Client[] => {
    return clients.filter(client => {
      // Filtrer par type
      if (filter.type && filter.type !== 'all' && client.type !== filter.type) return false;
      
      // Filtrer par emplacement
      if (filter.location && client.location !== filter.location) return false;
      
      // Filtrer par loyauté
      if (filter.loyalty && client.loyalty !== filter.loyalty) return false;
      
      // Filtrer par assignation
      if (filter.assignedOnly && !client.assignedToSenateurId) return false;
      
      // Filtrer par terme de recherche
      if (filter.searchTerm) {
        const searchLower = filter.searchTerm.toLowerCase();
        return (
          client.name.toLowerCase().includes(searchLower) ||
          (client.subType && client.subType.toLowerCase().includes(searchLower)) ||
          (client.location && client.location.toLowerCase().includes(searchLower))
        );
      }
      
      return true;
    });
  };
  
  // Trier les clients
  const sortClients = (clients: Client[], sort: ClientSort): Client[] => {
    return [...clients].sort((a, b) => {
      const aValue = a[sort.field];
      const bValue = b[sort.field];
      
      // Gestion des valeurs undefined
      if (aValue === undefined && bValue === undefined) return 0;
      if (aValue === undefined) return sort.direction === 'asc' ? -1 : 1;
      if (bValue === undefined) return sort.direction === 'asc' ? 1 : -1;
      
      // Comparaison standard
      if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1;
      return 0;
    });
  };
  
  // Changer le statut d'activité d'un client
  const changeClientStatus = (clientId: string, status: 'active' | 'inactive' | 'probation') => {
    setClients(prev => 
      prev.map(client => 
        client.id === clientId ? { ...client, activeStatus: status } : client
      )
    );
  };
  
  return {
    addClient,
    updateClient,
    deleteClient,
    assignClientToSenateur,
    adjustCompetencePoints,
    updateSpecialAbilities,
    filterClients,
    sortClients,
    changeClientStatus
  };
};
