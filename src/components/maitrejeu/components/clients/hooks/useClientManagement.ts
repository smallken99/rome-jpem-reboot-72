
import { useState, useEffect } from 'react';
import { useClientActions } from './useClientActions';
import { Client, ClientCreationData } from '../../../types/clients';
import { useMaitreJeu } from '../../../context';

// Main hook for client management
export function useClientManagement() {
  const { clients, selectedClient, selectClient, createClient, editClient, deleteClient, updateCompetences, clientTypes } = useClientActions();
  const { senateurs } = useMaitreJeu();
  
  // Client filter & sort state
  const [searchTerm, setSearchTerm] = useState('');
  const [currentClientFilter, setCurrentClientFilter] = useState({ type: '', status: '', senateurId: '' });
  const [currentSort, setCurrentSort] = useState({ field: 'name', direction: 'asc' });
  
  // Client modal states
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isAdvancedModalOpen, setIsAdvancedModalOpen] = useState(false);
  const [isCompetenceManagerOpen, setIsCompetenceManagerOpen] = useState(false);
  
  // Filtered clients based on current filters
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  
  // Update filtered clients when clients or filters change
  useEffect(() => {
    let filtered = [...clients];
    
    // Apply text search
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(client => 
        client.name.toLowerCase().includes(searchLower) ||
        client.description?.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply type filter
    if (currentClientFilter.type) {
      filtered = filtered.filter(client => client.type === currentClientFilter.type);
    }
    
    // Apply status filter
    if (currentClientFilter.status) {
      filtered = filtered.filter(client => client.status === currentClientFilter.status);
    }
    
    // Apply senateur filter
    if (currentClientFilter.senateurId) {
      filtered = filtered.filter(client => client.assignedTo === currentClientFilter.senateurId);
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      const field = currentSort.field;
      const direction = currentSort.direction === 'asc' ? 1 : -1;
      
      if (field === 'name') {
        return a.name.localeCompare(b.name) * direction;
      } else if (field === 'loyalty') {
        return ((a.loyalty || 0) - (b.loyalty || 0)) * direction;
      } else if (field === 'influence') {
        return ((a.influence || 0) - (b.influence || 0)) * direction;
      }
      
      return 0;
    });
    
    setFilteredClients(filtered);
  }, [clients, searchTerm, currentClientFilter, currentSort]);
  
  // Client management handlers
  const handleEditClient = (clientId: string) => {
    selectClient(clientId);
    setIsClientModalOpen(true);
  };
  
  const handleAdvancedEdit = (clientId: string) => {
    selectClient(clientId);
    setIsAdvancedModalOpen(true);
  };
  
  const handleCompetenceManager = (clientId: string) => {
    selectClient(clientId);
    setIsCompetenceManagerOpen(true);
  };
  
  const handleDeleteClient = (clientId: string) => {
    deleteClient(clientId);
  };
  
  const handleStatusChange = (clientId: string, status: string) => {
    editClient(clientId, { status: status as any });
  };
  
  const handleAssignment = (clientId: string, senateurId: string) => {
    editClient(clientId, { assignedTo: senateurId });
  };
  
  const handleSaveClient = (clientData: Client | ClientCreationData) => {
    if ('id' in clientData) {
      // Update existing client
      editClient(clientData.id, clientData);
    } else {
      // Create new client
      createClient(clientData);
    }
    
    // Close modals
    setIsClientModalOpen(false);
    setIsAdvancedModalOpen(false);
  };
  
  return {
    // State
    clients,
    filteredClients,
    selectedClient,
    searchTerm,
    setSearchTerm,
    currentClientFilter,
    setCurrentClientFilter,
    currentSort,
    setCurrentSort,
    isClientModalOpen,
    setIsClientModalOpen,
    isAdvancedModalOpen,
    setIsAdvancedModalOpen,
    isCompetenceManagerOpen,
    setIsCompetenceManagerOpen,
    senateurs,
    
    // Actions
    selectClient,
    handleEditClient,
    handleAdvancedEdit,
    handleCompetenceManager,
    handleDeleteClient,
    handleStatusChange,
    handleAssignment,
    handleSaveClient
  };
}
