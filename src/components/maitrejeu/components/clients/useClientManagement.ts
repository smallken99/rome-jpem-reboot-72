
import { useState, useEffect } from 'react';
import { useMaitreJeu } from '../../context/MaitreJeuContext';
import { useClientActions } from './hooks/useClientActions';
import { Client, ClientCreationData, ClientFilter, ClientSort } from '../../types/clients';
import { SenateurJouable } from '../../types/senateurs';

export const useClientManagement = () => {
  const { clients, senateurs } = useMaitreJeu();
  const { 
    createClient,
    editClient,
    deleteClient,
    handleStatusChange: changeStatus,
    handleAssignment: assignClient,
    updateCompetences
  } = useClientActions();
  
  // State for searching, filtering, and sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [currentClientFilter, setCurrentClientFilter] = useState<ClientFilter>({});
  const [currentSort, setCurrentSort] = useState<ClientSort>({ field: 'name', direction: 'asc' });
  
  // State for modal management
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isAdvancedModalOpen, setIsAdvancedModalOpen] = useState(false);
  const [isCompetenceManagerOpen, setIsCompetenceManagerOpen] = useState(false);
  
  // Filtered clients based on search and filters
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  
  // Apply filters and search when criteria change
  useEffect(() => {
    let result = [...clients];
    
    // Apply type filter
    if (currentClientFilter.type && currentClientFilter.type !== 'all') {
      result = result.filter(client => client.type === currentClientFilter.type);
    }
    
    // Apply status filter
    if (currentClientFilter.status && currentClientFilter.status !== 'all') {
      result = result.filter(client => 
        client.activeStatus === currentClientFilter.status || 
        client.status === currentClientFilter.status
      );
    }
    
    // Apply search term
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(client => 
        client.name.toLowerCase().includes(lowerSearch) ||
        (client.description && client.description.toLowerCase().includes(lowerSearch)) ||
        (client.occupation && client.occupation.toLowerCase().includes(lowerSearch)) ||
        (client.location && client.location.toLowerCase().includes(lowerSearch))
      );
    }
    
    // Apply assignment filter
    if (currentClientFilter.assignedTo) {
      if (currentClientFilter.assignedTo === 'assigned') {
        result = result.filter(client => client.assignedToSenateurId);
      } else if (currentClientFilter.assignedTo === 'unassigned') {
        result = result.filter(client => !client.assignedToSenateurId);
      } else if (currentClientFilter.assignedTo !== 'all') {
        result = result.filter(client => client.assignedToSenateurId === currentClientFilter.assignedTo);
      }
    }
    
    // Sort the results - make sure we handle string/number comparison correctly
    result.sort((a, b) => {
      const field = currentSort.field;
      const direction = currentSort.direction === 'asc' ? 1 : -1;
      
      // Handle different field types appropriately
      if (field === 'name') {
        return a.name.localeString().localeCompare(b.name.toString()) * direction;
      } 
      
      if (field === 'loyalty' || field === 'influence') {
        const aValue = a[field as keyof Client] as number || 0;
        const bValue = b[field as keyof Client] as number || 0;
        return (aValue - bValue) * direction;
      }
      
      return 0;
    });
    
    setFilteredClients(result);
  }, [clients, searchTerm, currentClientFilter, currentSort]);
  
  // Actions for handling clients
  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setIsClientModalOpen(true);
  };
  
  const handleAdvancedEdit = (client: Client) => {
    setSelectedClient(client);
    setIsAdvancedModalOpen(true);
  };
  
  const handleCompetenceManager = (client: Client) => {
    setSelectedClient(client);
    setIsCompetenceManagerOpen(true);
  };
  
  const handleDeleteClient = (clientId: string) => {
    deleteClient(clientId);
  };
  
  const handleStatusChange = (clientId: string, status: string) => {
    changeStatus(clientId, status);
  };
  
  const handleAssignment = (clientId: string, senateurId: string) => {
    assignClient(clientId, senateurId);
  };
  
  const handleSaveClient = (clientData: Client | ClientCreationData) => {
    if ('id' in clientData) {
      // Update existing client
      editClient(clientData.id, clientData);
    } else {
      // Create new client with competences
      const clientWithCompetences: ClientCreationData = {
        ...clientData,
        competences: clientData.competences || []
      };
      createClient(clientWithCompetences);
    }
    
    // Close modals
    setIsClientModalOpen(false);
    setIsAdvancedModalOpen(false);
  };

  return {
    searchTerm,
    setSearchTerm,
    selectedClient,
    setSelectedClient,
    isClientModalOpen,
    setIsClientModalOpen,
    isAdvancedModalOpen,
    setIsAdvancedModalOpen,
    isCompetenceManagerOpen,
    setIsCompetenceManagerOpen,
    currentClientFilter,
    setCurrentClientFilter,
    currentSort,
    setCurrentSort,
    filteredClients,
    senateurs,
    handleEditClient,
    handleAdvancedEdit,
    handleCompetenceManager,
    handleDeleteClient,
    handleStatusChange,
    handleAssignment,
    handleSaveClient
  };
};
