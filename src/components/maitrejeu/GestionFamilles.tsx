
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useFamilleGestion } from './components/famille/gestion/useFamilleGestion';
import { FamilleListe } from './components/famille/gestion/FamilleListe';
import { FamilleDetail } from './components/famille/gestion/FamilleDetail';
import { FamilleRelationsOverview } from './components/famille/gestion/FamilleRelationsOverview';
import { FamilleCreationDialog } from './components/famille/gestion/dialogs/FamilleCreationDialog';
import { MembreCreationDialog } from './components/famille/gestion/dialogs/MembreCreationDialog';
import { AllianceCreationDialog } from './components/famille/gestion/dialogs/AllianceCreationDialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FamilleActions } from './components/famille/FamilleActions';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export const GestionFamilles = () => {
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
    searchTerm,
    setSearchTerm,
    familles,
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
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Familles</h1>
          <p className="text-muted-foreground">
            Gérez les lignées familiales et leurs relations
          </p>
        </div>
        
        {selectedFamilleId && (
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => {
              setSelectedFamilleId(null);
              setActiveTab('familles');
            }}
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à la liste
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="familles">Familles</TabsTrigger>
          <TabsTrigger value="detail" disabled={!selectedFamilleId}>Détail</TabsTrigger>
          <TabsTrigger value="relations">Relations</TabsTrigger>
        </TabsList>

        <TabsContent value="familles">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="pb-3 flex flex-row items-center">
                  <div>
                    <CardTitle>Familles Romaines</CardTitle>
                    <CardDescription>
                      Liste des familles nobles et patriciennes de Rome
                    </CardDescription>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <div className="relative w-full">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Rechercher une famille..."
                        className="w-[200px] pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button onClick={() => setShowFamilleModal(true)}>
                      Ajouter
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <FamilleListe
                    familles={familles.filter(f => 
                      f.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      f.gens.toLowerCase().includes(searchTerm.toLowerCase())
                    )}
                    onSelectFamille={(id) => {
                      setSelectedFamilleId(id);
                      setActiveTab('detail');
                    }}
                    onEditFamille={handleEditFamille}
                    onDeleteFamille={handleDeleteFamille}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <FamilleActions 
                onCreateFamille={() => setShowFamilleModal(true)}
                onCreateMembre={() => setShowMembreModal(true)}
                onCreateAlliance={() => setShowAllianceModal(true)}
                onManageRelations={() => setActiveTab('relations')}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="detail">
          {selectedFamille ? (
            <FamilleDetail
              famille={selectedFamille}
              membres={familleMembres}
              alliances={familleAlliances}
              onUpdateFamille={handleUpdateFamille}
              onDeleteFamille={handleDeleteFamille}
              onAddMembre={() => setShowMembreModal(true)}
              onEditMembre={handleEditMembre}
              onDeleteMembre={handleDeleteMembre}
              onAddAlliance={() => setShowAllianceModal(true)}
              onEditAlliance={handleEditAlliance}
            />
          ) : (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                Sélectionnez une famille pour voir les détails
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="relations">
          <FamilleRelationsOverview 
            familles={familles}
            onSelectFamille={(id) => {
              setSelectedFamilleId(id);
              setActiveTab('detail');
            }}
          />
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <FamilleCreationDialog
        isOpen={showFamilleModal}
        onClose={() => setShowFamilleModal(false)}
        onCreateFamille={handleCreateFamille}
        onUpdateFamille={handleUpdateFamille}
        famille={selectedFamille}
      />

      <MembreCreationDialog
        isOpen={showMembreModal}
        onClose={() => setShowMembreModal(false)}
        onCreateMembre={handleCreateMembre}
        onUpdateMembre={handleUpdateMembre}
        membre={null}
        familleId={selectedFamilleId}
        familles={familles}
      />

      <AllianceCreationDialog
        isOpen={showAllianceModal}
        onClose={() => setShowAllianceModal(false)}
        onCreateAlliance={handleCreateAlliance}
        onUpdateAlliance={handleUpdateAlliance}
        alliance={null}
        familles={familles}
        currentFamilleId={selectedFamilleId}
      />
    </div>
  );
};
