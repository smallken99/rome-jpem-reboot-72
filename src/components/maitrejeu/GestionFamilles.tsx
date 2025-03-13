
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FamilleModal } from './components/famille/FamilleModal';
import { MembreFamilleModal } from './components/famille/MembreFamilleModal';
import { AllianceModal } from './components/famille/AllianceModal';
import { useFamilleGestion } from './components/famille/gestion/useFamilleGestion';
import { FamilleActions } from './components/famille/gestion/FamilleActions';
import { FamillesTabContent } from './components/famille/gestion/FamillesTabContent';
import { FamilleDetailTabContent } from './components/famille/gestion/FamilleDetailTabContent';
import { FamilleMembresTabContent } from './components/famille/gestion/FamilleMembresTabContent';
import { FamilleAlliancesTabContent } from './components/famille/gestion/FamilleAlliancesTabContent';
import { toast } from 'sonner';

export const GestionFamilles = () => {
  const {
    // State
    activeTab,
    setActiveTab,
    selectedFamilleId,
    setSelectedFamilleId,
    showFamilleModal,
    setShowFamilleModal,
    showMembreModal,
    setShowMembreModal,
    showAllianceModal,
    setShowAllianceModal,
    familleFilter,
    setFamilleFilter,
    searchTerm,
    setSearchTerm,
    selectedMembre,
    setSelectedMembre,
    selectedAlliance,
    setSelectedAlliance,
    
    // Data
    familles,
    membres,
    alliances,
    selectedFamille,
    familleMembres,
    familleAlliances,
    
    // Handlers
    handleCreateFamille,
    handleUpdateFamille,
    handleDeleteFamille,
    handleCreateMembre,
    handleUpdateMembre,
    handleDeleteMembre,
    handleCreateAlliance,
    handleUpdateAlliance,
    handleEditFamille,
    handleEditMembre,
    handleEditAlliance
  } = useFamilleGestion();
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Familles</h1>
        <FamilleActions 
          onNewFamille={() => setShowFamilleModal(true)}
          onNewMembre={() => {
            setSelectedMembre(null);
            setShowMembreModal(true);
          }}
          onNewAlliance={() => {
            setSelectedAlliance(null);
            setShowAllianceModal(true);
          }}
        />
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="familles">Toutes les Familles</TabsTrigger>
          <TabsTrigger value="detail" disabled={!selectedFamilleId}>Détail Famille</TabsTrigger>
          <TabsTrigger value="membres" disabled={!selectedFamilleId}>Membres</TabsTrigger>
          <TabsTrigger value="alliances" disabled={!selectedFamilleId}>Alliances</TabsTrigger>
        </TabsList>
        
        <TabsContent value="familles" className="mt-6">
          <FamillesTabContent
            familles={familles}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            familleFilter={familleFilter}
            setFamilleFilter={setFamilleFilter}
            onSelectFamille={(id) => {
              setSelectedFamilleId(id);
              setActiveTab('detail');
            }}
            onEditFamille={handleEditFamille}
            onDeleteFamille={handleDeleteFamille}
            onAddMembre={(familleId) => {
              setSelectedFamilleId(familleId);
              setSelectedMembre(null);
              setShowMembreModal(true);
            }}
            onAddAlliance={(familleId) => {
              setSelectedFamilleId(familleId);
              setSelectedAlliance(null);
              setShowAllianceModal(true);
            }}
          />
        </TabsContent>
        
        <TabsContent value="detail" className="mt-6">
          {selectedFamille && (
            <FamilleDetailTabContent
              famille={selectedFamille}
              membres={familleMembres}
              onBack={() => setActiveTab('familles')}
              onEdit={() => setShowFamilleModal(true)}
            />
          )}
        </TabsContent>
        
        <TabsContent value="membres" className="mt-6">
          {selectedFamille && (
            <FamilleMembresTabContent
              famille={selectedFamille}
              membres={familleMembres}
              onBack={() => setActiveTab('detail')}
              onAddMembre={() => {
                setSelectedMembre(null);
                setShowMembreModal(true);
              }}
              onEditMembre={handleEditMembre}
              onDeleteMembre={handleDeleteMembre}
            />
          )}
        </TabsContent>
        
        <TabsContent value="alliances" className="mt-6">
          {selectedFamille && (
            <FamilleAlliancesTabContent
              famille={selectedFamille}
              alliances={familleAlliances}
              familles={familles}
              membres={membres}
              onBack={() => setActiveTab('detail')}
              onAddAlliance={() => {
                setSelectedAlliance(null);
                setShowAllianceModal(true);
              }}
              onEditAlliance={handleEditAlliance}
              onDeleteAlliance={(id) => {
                // Fonctionnalité non implémentée
                toast.error("Fonctionnalité de suppression d'alliance non implémentée");
              }}
            />
          )}
        </TabsContent>
      </Tabs>
      
      {/* Modals */}
      <FamilleModal 
        isOpen={showFamilleModal} 
        onClose={() => setShowFamilleModal(false)}
        onSave={selectedFamille ? handleUpdateFamille : handleCreateFamille}
        editFamille={selectedFamilleId && activeTab === 'detail' ? selectedFamille : undefined}
      />
      
      <MembreFamilleModal
        isOpen={showMembreModal}
        onClose={() => {
          setShowMembreModal(false);
          setSelectedMembre(null);
        }}
        membre={selectedMembre}
        familleId={selectedFamilleId}
        familles={familles}
        onSave={selectedMembre ? handleUpdateMembre : handleCreateMembre}
      />
      
      <AllianceModal
        isOpen={showAllianceModal}
        onClose={() => {
          setShowAllianceModal(false);
          setSelectedAlliance(null);
        }}
        alliance={selectedAlliance}
        familles={familles}
        membres={membres}
        initialFamilleId={selectedFamilleId}
        onSave={selectedAlliance ? handleUpdateAlliance : handleCreateAlliance}
      />
    </div>
  );
};
