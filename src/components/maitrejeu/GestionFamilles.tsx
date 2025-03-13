
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useFamilleGestion } from './components/famille/gestion/useFamilleGestion';
import { FamillesTabContent } from './components/famille/gestion/FamillesTabContent';
import { FamilleDetailTabContent } from './components/famille/gestion/FamilleDetailTabContent';
import { FamilleMembresTabContent } from './components/famille/gestion/FamilleMembresTabContent';
import { FamilleAlliancesTabContent } from './components/famille/gestion/FamilleAlliancesTabContent';
import { FamilleModal } from './components/famille/FamilleModal';
import { MembreFamilleModal } from './components/famille/MembreFamilleModal';
import { AllianceModal } from './components/famille/AllianceModal';

export const GestionFamilles: React.FC = () => {
  const {
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
    
    familles,
    membres,
    alliances,
    selectedFamille,
    familleMembres,
    familleAlliances,
    
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
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestion des Familles</h1>
        
        {activeTab === 'familles' && (
          <Button 
            onClick={() => setShowFamilleModal(true)}
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            Nouvelle Famille
          </Button>
        )}
        
        {activeTab === 'detail' && selectedFamilleId && (
          <div className="flex gap-2">
            <Button 
              onClick={() => setShowMembreModal(true)}
              variant="outline"
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
              Nouveau Membre
            </Button>
            
            <Button 
              onClick={() => setShowAllianceModal(true)}
              variant="outline"
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
              Nouvelle Alliance
            </Button>
          </div>
        )}
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>
            {activeTab === 'familles' ? 'Familles Romaines' : 
             activeTab === 'detail' && selectedFamille ? `Famille ${selectedFamille.nom}` : 
             'Détails de la Famille'}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          {activeTab === 'familles' && (
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
                setShowMembreModal(true);
              }}
              onAddAlliance={(familleId) => {
                setSelectedFamilleId(familleId);
                setShowAllianceModal(true);
              }}
            />
          )}
          
          {activeTab === 'detail' && selectedFamille && (
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="info">Informations</TabsTrigger>
                <TabsTrigger value="membres">Membres</TabsTrigger>
                <TabsTrigger value="alliances">Alliances</TabsTrigger>
              </TabsList>
              
              <TabsContent value="info">
                <FamilleDetailTabContent 
                  famille={selectedFamille}
                  onEditFamille={() => handleEditFamille(selectedFamille)}
                  onDeleteFamille={() => {
                    handleDeleteFamille(selectedFamille.id);
                    setActiveTab('familles');
                  }}
                  onBack={() => {
                    setSelectedFamilleId(null);
                    setActiveTab('familles');
                  }}
                />
              </TabsContent>
              
              <TabsContent value="membres">
                <FamilleMembresTabContent 
                  membres={familleMembres}
                  famille={selectedFamille}
                  onAddMembre={() => setShowMembreModal(true)}
                  onEditMembre={handleEditMembre}
                  onDeleteMembre={handleDeleteMembre}
                />
              </TabsContent>
              
              <TabsContent value="alliances">
                <FamilleAlliancesTabContent 
                  alliances={familleAlliances}
                  famille={selectedFamille}
                  onAddAlliance={() => setShowAllianceModal(true)}
                  onEditAlliance={handleEditAlliance}
                />
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
      
      {/* Modals */}
      {showFamilleModal && (
        <FamilleModal 
          isOpen={showFamilleModal}
          onClose={() => setShowFamilleModal(false)}
          famille={selectedFamille}
          onSave={selectedFamille ? handleUpdateFamille : handleCreateFamille}
        />
      )}
      
      {showMembreModal && (
        <MembreFamilleModal 
          isOpen={showMembreModal}
          onClose={() => {
            setShowMembreModal(false);
            setSelectedMembre(null);
          }}
          membre={selectedMembre}
          famille={selectedFamille}
          onSave={selectedMembre ? handleUpdateMembre : handleCreateMembre}
        />
      )}
      
      {showAllianceModal && (
        <AllianceModal 
          isOpen={showAllianceModal}
          onClose={() => {
            setShowAllianceModal(false);
            setSelectedAlliance(null);
          }}
          alliance={selectedAlliance}
          famille={selectedFamille}
          otherFamilles={familles.filter(f => f.id !== selectedFamilleId)}
          onSave={selectedAlliance ? handleUpdateAlliance : handleCreateAlliance}
        />
      )}
    </div>
  );
};
