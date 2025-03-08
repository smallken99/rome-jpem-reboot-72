
import { useState } from 'react';
import { useMaitreJeu } from '../../context/MaitreJeuContext';
import { Client, ClientFilter, ClientSort } from '../../types/clients';
import { useToast } from '@/components/ui/use-toast';

export const useClientManagement = () => {
  const { 
    clients, 
    senateurs,
    addClient, 
    updateClient, 
    deleteClient, 
    assignClientToSenateur,
    filterClients,
    sortClients,
    changeClientStatus
  } = useMaitreJeu();
  
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isAdvancedModalOpen, setIsAdvancedModalOpen] = useState(false);
  const [isCompetenceManagerOpen, setIsCompetenceManagerOpen] = useState(false);
  const [currentClientFilter, setCurrentClientFilter] = useState<ClientFilter>({});
  const [currentSort, setCurrentSort] = useState<ClientSort>({ field: 'name', direction: 'asc' });
  
  // Filtrage et tri des clients
  const filteredClients = sortClients(
    filterClients(clients, { ...currentClientFilter, searchTerm }), 
    currentSort
  );
  
  // Fonction pour ouvrir le modal d'édition
  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setIsClientModalOpen(true);
  };
  
  // Fonction pour ouvrir le modal avancé
  const handleAdvancedEdit = (client: Client) => {
    setSelectedClient(client);
    setIsAdvancedModalOpen(true);
  };
  
  // Fonction pour ouvrir le gestionnaire de compétences
  const handleCompetenceManager = (client: Client) => {
    setSelectedClient(client);
    setIsCompetenceManagerOpen(true);
  };
  
  // Fonction pour supprimer un client
  const handleDeleteClient = (id: string) => {
    deleteClient(id);
    toast({
      title: "Client supprimé",
      description: "Le client a été supprimé avec succès",
      variant: "default"
    });
  };
  
  // Fonction pour changer le statut d'un client
  const handleStatusChange = (id: string, status: 'active' | 'inactive' | 'probation') => {
    changeClientStatus(id, status);
    toast({
      title: "Statut modifié",
      description: `Le statut du client a été changé en "${status}"`,
      variant: "default"
    });
  };
  
  // Fonction pour assigner un client à un sénateur
  const handleAssignment = (clientId: string, senateurId: string | null) => {
    assignClientToSenateur(clientId, senateurId);
    toast({
      title: senateurId ? "Client assigné" : "Client non assigné",
      description: senateurId 
        ? `Le client a été assigné au sénateur ${senateurs.find(s => s.id === senateurId)?.nom || senateurId}` 
        : "Le client n'est plus assigné à un sénateur",
      variant: "default"
    });
  };
  
  // Fonction pour sauvegarder un client (ajout ou mise à jour)
  const handleSaveClient = (clientData: Client | Omit<Client, 'id'>) => {
    if ('id' in clientData) {
      updateClient(clientData.id, clientData);
      toast({
        title: "Client mis à jour",
        description: `Les informations de ${clientData.name} ont été mises à jour`,
        variant: "default"
      });
    } else {
      const id = addClient(clientData);
      toast({
        title: "Client ajouté",
        description: `${clientData.name} a été ajouté à la liste des clients`,
        variant: "default"
      });
    }
    setIsClientModalOpen(false);
    setIsAdvancedModalOpen(false);
  };

  return {
    // État
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
