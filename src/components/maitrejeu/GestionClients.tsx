
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ClientModal } from './components/client-modal';
import { AdvancedClientModal } from './components/advanced-client-modal';
import { ClientCompetenceManager } from './components/ClientCompetenceManager';
import { 
  ClientFilters, 
  ClientsTable, 
  useClientManagement 
} from './components/clients';
import { SenateurJouable } from './types/senateurs';
import { Client, ClientCreationData } from './types/clients';

export const GestionClients = () => {
  const {
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
  } = useClientManagement();
  
  // Use the correct types for handlers
  const handleSaveClientModal = (client: Client | ClientCreationData) => {
    handleSaveClient(client as any);
  };
  
  const handleSaveAdvancedClient = (client: Client | ClientCreationData) => {
    handleSaveClient(client as any);
  };

  // Competence management
  const [availableCompetences] = useState<string[]>([
    "Éloquence", "Politique", "Intrigue", "Commerce", "Diplomatie", 
    "Art militaire", "Stratégie", "Navigation", "Agriculture", "Artisanat"
  ]);
  
  const handleUpdateCompetences = (clientId: string, competences: string[]) => {
    // Implementation of competence updating
    console.log(`Updated competences for ${clientId}:`, competences);
  };
  
  return (
    <div className="space-y-6">
      <ClientFilters
        currentClientFilter={currentClientFilter}
        setCurrentClientFilter={setCurrentClientFilter}
        currentSort={currentSort}
        setCurrentSort={setCurrentSort}
        onAddClient={() => {
          setSelectedClient(null);
          setIsClientModalOpen(true);
        }}
        onAddAdvancedClient={() => {
          setSelectedClient(null);
          setIsAdvancedModalOpen(true);
        }}
      />
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Liste des clients</CardTitle>
          <CardDescription>
            Gérez tous les clients et leurs relations avec les sénateurs.
            {currentClientFilter.type && (
              <Badge variant="outline" className="ml-2">
                Filtre: {currentClientFilter.type}
              </Badge>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ClientsTable
            clients={filteredClients}
            senateurs={senateurs as SenateurJouable[]}
            onEdit={handleEditClient}
            onAdvancedEdit={handleAdvancedEdit}
            onManageCompetences={handleCompetenceManager}
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteClient}
            onAssign={handleAssignment}
          />
        </CardContent>
      </Card>
      
      {/* Modal de création/édition de client standard */}
      <ClientModal
        isOpen={isClientModalOpen}
        onClose={() => setIsClientModalOpen(false)}
        onSave={handleSaveClientModal}
        client={selectedClient}
      />
      
      {/* Modal avancé de création/édition de client */}
      <AdvancedClientModal
        isOpen={isAdvancedModalOpen}
        onClose={() => setIsAdvancedModalOpen(false)}
        onSave={handleSaveAdvancedClient}
        client={selectedClient}
      />
      
      {/* Gestionnaire de compétences */}
      {selectedClient && (
        <ClientCompetenceManager
          client={selectedClient}
          onUpdateCompetences={handleUpdateCompetences}
          availableCompetences={availableCompetences}
          open={isCompetenceManagerOpen}
          onOpenChange={setIsCompetenceManagerOpen}
          onClose={() => setIsCompetenceManagerOpen(false)}
        />
      )}
    </div>
  );
};
