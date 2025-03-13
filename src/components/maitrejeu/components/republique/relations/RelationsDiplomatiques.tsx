
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { DiplomaticHeader } from './DiplomaticHeader';
import { NationsTab } from './tabs/NationsTab';
import { TraitesTab } from './tabs/TraitesTab';
import { AlliancesTab } from './tabs/AlliancesTab';
import { AddNationModal } from './modals/AddNationModal';
import { AddTraiteModal } from './modals/AddTraiteModal';
import { AddAllianceModal } from './modals/AddAllianceModal';

export const RelationsDiplomatiques: React.FC = () => {
  const [activeTab, setActiveTab] = useState('nations');
  const [searchTerm, setSearchTerm] = useState('');
  
  // États pour les filtres avancés
  const [filters, setFilters] = useState({
    status: '',
    region: '',
    dateFrom: '',
    dateTo: ''
  });
  
  // États pour les modales d'ajout
  const [isAddNationOpen, setIsAddNationOpen] = useState(false);
  const [isAddTraiteOpen, setIsAddTraiteOpen] = useState(false);
  const [isAddAllianceOpen, setIsAddAllianceOpen] = useState(false);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Fonctions pour la gestion des filtres
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    toast.success("Filtres appliqués");
  };
  
  const resetFilters = () => {
    setFilters({
      status: '',
      region: '',
      dateFrom: '',
      dateTo: ''
    });
    toast.info("Filtres réinitialisés");
  };
  
  // Fonctions pour ouvrir les modales d'ajout
  const openAddNationModal = () => setIsAddNationOpen(true);
  const openAddTraiteModal = () => setIsAddTraiteOpen(true);
  const openAddAllianceModal = () => setIsAddAllianceOpen(true);
  
  // Fonction générique pour simuler l'ajout (à connecter à une API réelle plus tard)
  const handleAdd = (type: 'nation' | 'traite' | 'alliance') => {
    toast.success(`${type === 'nation' ? 'Nation' : type === 'traite' ? 'Traité' : 'Alliance'} ajouté avec succès`);
    
    // Fermeture des modales appropriées
    if (type === 'nation') setIsAddNationOpen(false);
    else if (type === 'traite') setIsAddTraiteOpen(false);
    else setIsAddAllianceOpen(false);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <DiplomaticHeader 
          activeTab={activeTab}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={resetFilters}
          openAddNationModal={openAddNationModal}
          openAddTraiteModal={openAddTraiteModal}
          openAddAllianceModal={openAddAllianceModal}
        />
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="nations">Nations</TabsTrigger>
            <TabsTrigger value="traites">Traités</TabsTrigger>
            <TabsTrigger value="alliances">Alliances</TabsTrigger>
          </TabsList>
          
          <TabsContent value="nations" className="mt-4">
            <NationsTab 
              searchTerm={searchTerm} 
              filters={filters}
              openAddNationModal={openAddNationModal}
            />
          </TabsContent>
          
          <TabsContent value="traites" className="mt-4">
            <TraitesTab 
              searchTerm={searchTerm} 
              filters={filters}
              openAddTraiteModal={openAddTraiteModal}
            />
          </TabsContent>
          
          <TabsContent value="alliances" className="mt-4">
            <AlliancesTab 
              searchTerm={searchTerm} 
              filters={filters}
              openAddAllianceModal={openAddAllianceModal}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
      
      {/* Modales */}
      <AddNationModal 
        isOpen={isAddNationOpen} 
        onClose={() => setIsAddNationOpen(false)} 
        onAdd={handleAdd} 
      />
      
      <AddTraiteModal 
        isOpen={isAddTraiteOpen} 
        onClose={() => setIsAddTraiteOpen(false)} 
        onAdd={handleAdd} 
      />
      
      <AddAllianceModal 
        isOpen={isAddAllianceOpen} 
        onClose={() => setIsAddAllianceOpen(false)} 
        onAdd={handleAdd} 
      />
    </Card>
  );
};
