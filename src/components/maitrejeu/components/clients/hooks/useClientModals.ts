
import { useState } from 'react';
import { Client } from '../../../types/clients';

export const useClientModals = () => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isAdvancedModalOpen, setIsAdvancedModalOpen] = useState(false);
  const [isCompetenceManagerOpen, setIsCompetenceManagerOpen] = useState(false);

  // Function to open the edit modal
  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setIsClientModalOpen(true);
  };
  
  // Function to open the advanced modal
  const handleAdvancedEdit = (client: Client) => {
    setSelectedClient(client);
    setIsAdvancedModalOpen(true);
  };
  
  // Function to open the competence manager
  const handleCompetenceManager = (client: Client) => {
    setSelectedClient(client);
    setIsCompetenceManagerOpen(true);
  };

  return {
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
    handleCompetenceManager,
  };
};
