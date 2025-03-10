
import { useState } from 'react';
import { Client } from '../../../types/clients';

export const useClientModals = () => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isAdvancedModalOpen, setIsAdvancedModalOpen] = useState(false);
  const [isCompetenceManagerOpen, setIsCompetenceManagerOpen] = useState(false);
  
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
  };
};
