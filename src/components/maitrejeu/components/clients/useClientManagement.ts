
import { useClientSearch } from './hooks/useClientSearch';
import { useClientModals } from './hooks/useClientModals';
import { useClientActions } from './hooks/useClientActions';
import { useFilteredClients } from './hooks/useFilteredClients';

export const useClientManagement = () => {
  // Use smaller, focused hooks
  const {
    searchTerm,
    setSearchTerm,
    currentClientFilter,
    setCurrentClientFilter,
    currentSort,
    setCurrentSort
  } = useClientSearch();
  
  const {
    selectedClient,
    setSelectedClient,
    isClientModalOpen,
    setIsClientModalOpen,
    isAdvancedModalOpen,
    setIsAdvancedModalOpen,
    isCompetenceManagerOpen,
    setIsCompetenceManagerOpen,
    handleEditClient,
    handleAdvancedEdit,
    handleCompetenceManager
  } = useClientModals();
  
  const {
    handleDeleteClient,
    handleStatusChange,
    handleAssignment,
    handleSaveClient,
    senateurs
  } = useClientActions();
  
  // Get filtered clients using the current filter and sort settings
  const { filteredClients } = useFilteredClients({
    ...currentClientFilter,
    searchTerm
  }, currentSort);

  return {
    // Search and filter state
    searchTerm,
    setSearchTerm,
    currentClientFilter,
    setCurrentClientFilter,
    currentSort,
    setCurrentSort,
    
    // Modal state
    selectedClient,
    setSelectedClient,
    isClientModalOpen,
    setIsClientModalOpen,
    isAdvancedModalOpen,
    setIsAdvancedModalOpen,
    isCompetenceManagerOpen,
    setIsCompetenceManagerOpen,
    
    // Data
    filteredClients,
    senateurs,
    
    // Actions
    handleEditClient,
    handleAdvancedEdit,
    handleCompetenceManager,
    handleDeleteClient,
    handleStatusChange,
    handleAssignment,
    handleSaveClient
  };
};
