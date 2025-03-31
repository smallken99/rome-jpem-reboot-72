
import { useState, useEffect } from 'react';
import { useMaitreJeu } from '../../../context/MaitreJeuContext';
import { useClientActions } from './useClientActions';
import { Client, ClientCreationData, ClientFilter, ClientSort } from '../../../types/clients';
import { SenateurJouable } from '../../../types/senateurs';

export const useClientManagement = () => {
  const { clients, senateurs } = useMaitreJeu();
  const { 
    handleDeleteClient, 
    handleStatusChange, 
    handleAssignment, 
    handleSaveClient, 
    senateurs: actionsSenateursList 
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
    
    // Sort the results
    result.sort((a, b) => {
      const aValue = a[currentSort.field];
      const bValue = b[currentSort.field];
      
      if (aValue === undefined && bValue === undefined) return 0;
      if (aValue === undefined) return currentSort.direction === 'asc' ? -1 : 1;
      if (bValue === undefined) return currentSort.direction === 'asc' ? 1 : -1;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return currentSort.direction === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      if (aValue < bValue) return currentSort.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return currentSort.direction === 'asc' ? 1 : -1;
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
