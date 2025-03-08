
import { Client, ClientCreationData } from '../types/clients';
import { v4 as uuidv4 } from 'uuid';

export const createClientOperations = (
  setClients: React.Dispatch<React.SetStateAction<Client[]>>
) => {
  // Ajouter un nouveau client
  const addClient = (client: ClientCreationData): string => {
    const id = uuidv4();
    const newClient: Client = {
      ...client,
      id
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
  const deleteClient = (id: string) => {
    setClients(prev => prev.filter(client => client.id !== id));
  };
  
  // Assigner un client à un sénateur
  const assignClientToSenateur = (clientId: string, senateurId: string | null) => {
    setClients(prev => 
      prev.map(client => 
        client.id === clientId ? { ...client, assignedToSenateurId: senateurId } : client
      )
    );
  };
  
  return {
    addClient,
    updateClient,
    deleteClient,
    assignClientToSenateur
  };
};
