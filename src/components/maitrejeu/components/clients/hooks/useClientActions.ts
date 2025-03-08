
import { useMaitreJeu } from '../../../context/MaitreJeuContext';
import { Client } from '../../../types/clients';
import { useToast } from '@/components/ui/use-toast';

export const useClientActions = () => {
  const { 
    deleteClient, 
    assignClientToSenateur,
    changeClientStatus,
    senateurs,
    updateClient,
    addClient
  } = useMaitreJeu();
  
  const { toast } = useToast();
  
  // Function to delete a client
  const handleDeleteClient = (id: string) => {
    deleteClient(id);
    toast({
      title: "Client supprimé",
      description: "Le client a été supprimé avec succès",
      variant: "default"
    });
  };
  
  // Function to change the status of a client
  const handleStatusChange = (id: string, status: 'active' | 'inactive' | 'probation') => {
    changeClientStatus(id, status);
    toast({
      title: "Statut modifié",
      description: `Le statut du client a été changé en "${status}"`,
      variant: "default"
    });
  };
  
  // Function to assign a client to a senator
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
  
  // Function to save a client (add or update)
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
    return true; // Indicate the save was successful
  };

  return {
    handleDeleteClient,
    handleStatusChange,
    handleAssignment,
    handleSaveClient,
    senateurs
  };
};
