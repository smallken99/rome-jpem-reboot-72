
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Users, Link, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
    familles,
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
    selectedAlliance,
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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des Familles</h1>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => setShowFamilleModal(true)}
          >
            <Plus className="h-4 w-4" />
            Nouvelle Famille
          </Button>
          
          {selectedFamilleId && activeTab === 'membres' && (
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => setShowMembreModal(true)}
            >
              <Users className="h-4 w-4" />
              Ajouter Membre
            </Button>
          )}
          
          {selectedFamilleId && activeTab === 'alliances' && (
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => setShowAllianceModal(true)}
            >
              <Link className="h-4 w-4" />
              Nouvelle Alliance
            </Button>
          )}
        </div>
      </div>
      
      {/* Si une famille est sélectionnée, afficher les onglets de détail */}
      {selectedFamilleId ? (
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="detail">Détails</TabsTrigger>
            <TabsTrigger value="membres">Membres</TabsTrigger>
            <TabsTrigger value="alliances">Alliances</TabsTrigger>
          </TabsList>
          
          <TabsContent value="detail">
            <FamilleDetailTabContent
              famille={selectedFamille}
              onEditFamille={handleEditFamille}
              onDeleteFamille={handleDeleteFamille}
              onBack={() => setSelectedFamilleId(null)}
            />
          </TabsContent>
          
          <TabsContent value="membres">
            <FamilleMembresTabContent
              membres={familleMembres}
              familleId={selectedFamilleId}
              onAddMembre={() => setShowMembreModal(true)}
              onEditMembre={handleEditMembre}
              onDeleteMembre={handleDeleteMembre}
            />
          </TabsContent>
          
          <TabsContent value="alliances">
            <FamilleAlliancesTabContent
              alliances={familleAlliances}
              familleId={selectedFamilleId}
              onAddAlliance={() => setShowAllianceModal(true)}
              onEditAlliance={handleEditAlliance}
            />
          </TabsContent>
        </Tabs>
      ) : (
        // Sinon, afficher la liste des familles
        <FamillesTabContent
          familles={familles}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          familleFilter={familleFilter}
          setFamilleFilter={setFamilleFilter}
          onSelectFamille={setSelectedFamilleId}
          onEditFamille={handleEditFamille}
          onDeleteFamille={handleDeleteFamille}
          onAddMembre={(familleId) => {
            setSelectedFamilleId(familleId);
            setActiveTab('membres');
            setShowMembreModal(true);
          }}
          onAddAlliance={(familleId) => {
            setSelectedFamilleId(familleId);
            setActiveTab('alliances');
            setShowAllianceModal(true);
          }}
        />
      )}
      
      {/* Modales */}
      <FamilleModal
        open={showFamilleModal}
        onClose={() => setShowFamilleModal(false)}
        famille={selectedFamille}
        onSave={selectedFamille ? handleUpdateFamille : handleCreateFamille}
      />
      
      <MembreFamilleModal
        open={showMembreModal}
        onClose={() => {
          setShowMembreModal(false);
          setSelectedMembre(null);
        }}
        membre={selectedMembre}
        familleId={selectedFamilleId}
        onSave={selectedMembre ? handleUpdateMembre : handleCreateMembre}
      />
      
      <AllianceModal
        open={showAllianceModal}
        onClose={() => {
          setShowAllianceModal(false);
          setSelectedAlliance(null);
        }}
        alliance={selectedAlliance}
        familleId={selectedFamilleId}
        onSave={selectedAlliance ? handleUpdateAlliance : handleCreateAlliance}
      />
    </div>
  );
};

export default GestionFamilles;
