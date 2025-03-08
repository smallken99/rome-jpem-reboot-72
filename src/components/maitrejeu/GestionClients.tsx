import React from 'react';
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
  
  return (
    <div className="space-y-6">
      <ClientFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
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
            senateurs={senateurs}
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
        onSave={handleSaveClient}
        client={selectedClient}
      />
      
      {/* Modal avancé de création/édition de client */}
      <AdvancedClientModal
        isOpen={isAdvancedModalOpen}
        onClose={() => setIsAdvancedModalOpen(false)}
        onSave={handleSaveClient}
        client={selectedClient}
      />
      
      {/* Gestionnaire de compétences */}
      <Dialog open={isCompetenceManagerOpen} onOpenChange={setIsCompetenceManagerOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedClient && (
            <ClientCompetenceManager
              client={selectedClient}
              onClose={() => setIsCompetenceManagerOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
