
import React, { useState } from 'react';
import { useMaitreJeu } from './context';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FamilleCard } from './components/famille/FamilleCard';
import { FamilleModal } from './components/famille/FamilleModal';
import { FamillesList } from './components/famille/FamillesList';
import { FamilleMembres } from './components/famille/FamilleMembres';
import { FamilleAlliances } from './components/famille/FamilleAlliances';
import { PlusCircle, Users, Handshake, UserPlus, Eye } from 'lucide-react';
import { FamilleInfo, FamilleCreationData, FamilleFilter, MembreFamille, FamilleAlliance } from './types';
import { MembreFamilleModal } from './components/famille/MembreFamilleModal';
import { AllianceModal } from './components/famille/AllianceModal';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

export const GestionFamilles = () => {
  const { 
    familles, 
    membres, 
    alliances, 
    addFamille, 
    updateFamille,
    deleteFamille,
    getFamilleOfMembre,
    getMembresByFamille,
    addMembreFamille,
    updateMembreFamille,
    deleteMembreFamille,
    createAlliance,
    updateAlliance
  } = useMaitreJeu();
  
  const [activeTab, setActiveTab] = useState('familles');
  const [selectedFamilleId, setSelectedFamilleId] = useState<string | null>(null);
  const [showFamilleModal, setShowFamilleModal] = useState(false);
  const [showMembreModal, setShowMembreModal] = useState(false);
  const [showAllianceModal, setShowAllianceModal] = useState(false);
  const [familleFilter, setFamilleFilter] = useState<FamilleFilter>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMembre, setSelectedMembre] = useState<MembreFamille | null>(null);
  const [selectedAlliance, setSelectedAlliance] = useState<FamilleAlliance | null>(null);
  
  const selectedFamille = selectedFamilleId ? familles.find(f => f.id === selectedFamilleId) : null;
  const familleMembres = selectedFamilleId ? getMembresByFamille(selectedFamilleId) : [];
  const familleAlliances = selectedFamilleId ? alliances.filter(a => 
    a.famille1Id === selectedFamilleId || a.famille2Id === selectedFamilleId
  ) : [];
  
  const handleCreateFamille = (familleData: FamilleCreationData) => {
    const familleId = addFamille(familleData);
    setSelectedFamilleId(familleId);
    setShowFamilleModal(false);
    setActiveTab('detail');
    toast.success(`Famille ${familleData.nom} créée avec succès`);
  };
  
  const handleUpdateFamille = (familleData: FamilleCreationData) => {
    if (selectedFamille) {
      updateFamille(selectedFamille.id, familleData);
      setShowFamilleModal(false);
      toast.success(`Famille ${familleData.nom} mise à jour`);
    }
  };
  
  const handleDeleteFamille = (familleId: string) => {
    const famille = familles.find(f => f.id === familleId);
    if (famille) {
      deleteFamille(familleId);
      setSelectedFamilleId(null);
      setActiveTab('familles');
      toast.success(`Famille ${famille.nom} supprimée`);
    }
  };
  
  const handleCreateMembre = (membreData: any) => {
    addMembreFamille({
      ...membreData,
      familleId: selectedFamilleId || membreData.familleId
    });
    setShowMembreModal(false);
    toast.success(`Membre ${membreData.prenom} ${membreData.nom} ajouté`);
  };
  
  const handleUpdateMembre = (membreData: any) => {
    if (selectedMembre) {
      updateMembreFamille(selectedMembre.id, membreData);
      setSelectedMembre(null);
      setShowMembreModal(false);
      toast.success(`Membre ${membreData.prenom} ${membreData.nom} mis à jour`);
    }
  };
  
  const handleDeleteMembre = (membreId: string) => {
    const membre = membres.find(m => m.id === membreId);
    if (membre) {
      deleteMembreFamille(membreId);
      toast.success(`Membre ${membre.prenom} ${membre.nom} supprimé`);
    }
  };
  
  const handleCreateAlliance = (allianceData: any) => {
    createAlliance(
      allianceData.famille1Id || selectedFamilleId,
      allianceData.famille2Id,
      allianceData.type,
      allianceData.termes,
      allianceData.benefices
    );
    setShowAllianceModal(false);
    toast.success(`Alliance créée avec succès`);
  };
  
  const handleUpdateAlliance = (allianceData: any) => {
    if (selectedAlliance) {
      updateAlliance(selectedAlliance.id, allianceData);
      setSelectedAlliance(null);
      setShowAllianceModal(false);
      toast.success(`Alliance mise à jour`);
    }
  };
  
  const handleEditFamille = (famille: FamilleInfo) => {
    setSelectedFamilleId(famille.id);
    setShowFamilleModal(true);
  };
  
  const handleEditMembre = (membre: MembreFamille) => {
    setSelectedMembre(membre);
    setShowMembreModal(true);
  };
  
  const handleEditAlliance = (alliance: FamilleAlliance) => {
    setSelectedAlliance(alliance);
    setShowAllianceModal(true);
  };
  
  const filteredFamilles = familles.filter(famille => {
    // Appliquer le filtre de recherche
    if (searchTerm && !famille.nom.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Appliquer les autres filtres
    if (familleFilter.nom && !famille.nom.toLowerCase().includes(familleFilter.nom.toLowerCase())) {
      return false;
    }
    if (familleFilter.statut && famille.statut !== familleFilter.statut) {
      return false;
    }
    if (familleFilter.prestigeMin !== undefined && famille.prestige < familleFilter.prestigeMin) {
      return false;
    }
    if (familleFilter.prestigeMax !== undefined && famille.prestige > familleFilter.prestigeMax) {
      return false;
    }
    
    return true;
  });
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Familles</h1>
        <div className="flex space-x-2">
          <Button onClick={() => setShowFamilleModal(true)} variant="outline">
            <PlusCircle className="h-4 w-4 mr-2" />
            Nouvelle Famille
          </Button>
          <Button onClick={() => {
            setSelectedMembre(null);
            setShowMembreModal(true);
          }} variant="outline">
            <UserPlus className="h-4 w-4 mr-2" />
            Nouveau Membre
          </Button>
          <Button onClick={() => {
            setSelectedAlliance(null);
            setShowAllianceModal(true);
          }} variant="outline">
            <Handshake className="h-4 w-4 mr-2" />
            Nouvelle Alliance
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="familles">Toutes les Familles</TabsTrigger>
          <TabsTrigger value="detail" disabled={!selectedFamilleId}>Détail Famille</TabsTrigger>
          <TabsTrigger value="membres" disabled={!selectedFamilleId}>Membres</TabsTrigger>
          <TabsTrigger value="alliances" disabled={!selectedFamilleId}>Alliances</TabsTrigger>
        </TabsList>
        
        <TabsContent value="familles" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Liste des Familles</CardTitle>
                <CardDescription>
                  Gérez les familles romaines et leurs membres
                </CardDescription>
              </div>
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  type="search"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-xs"
                />
              </div>
            </CardHeader>
            <CardContent>
              <FamillesList 
                familles={filteredFamilles}
                onSelectFamille={(id) => {
                  setSelectedFamilleId(id);
                  setActiveTab('detail');
                }}
                onEditFamille={(famille) => handleEditFamille(famille)}
                onDeleteFamille={(id) => handleDeleteFamille(id)}
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
                filter={familleFilter}
                onFilterChange={setFamilleFilter}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="detail" className="mt-6">
          {selectedFamille && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Détail de la Famille {selectedFamille.nom}</CardTitle>
                  <CardDescription>
                    Informations sur la famille et ses statistiques
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setActiveTab('familles')}>
                    Retour
                  </Button>
                  <Button variant="outline" onClick={() => setShowFamilleModal(true)}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Modifier
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <FamilleCard 
                  famille={selectedFamille} 
                  membres={familleMembres}
                  detailMode={true}
                  onEdit={() => setShowFamilleModal(true)}
                />
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="membres" className="mt-6">
          {selectedFamille && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Membres de la Famille {selectedFamille.nom}</CardTitle>
                  <CardDescription>
                    {familleMembres.length} membres dans cette famille
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setActiveTab('detail')}>
                    Retour
                  </Button>
                  <Button onClick={() => {
                    setSelectedMembre(null);
                    setShowMembreModal(true);
                  }} variant="outline" size="sm">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Ajouter un Membre
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <FamilleMembres 
                  membres={familleMembres}
                  familleId={selectedFamilleId as string}
                  onEditMembre={handleEditMembre}
                  onDeleteMembre={handleDeleteMembre}
                />
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="alliances" className="mt-6">
          {selectedFamille && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Alliances de la Famille {selectedFamille.nom}</CardTitle>
                  <CardDescription>
                    Gestion des alliances et des relations diplomatiques
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setActiveTab('detail')}>
                    Retour
                  </Button>
                  <Button onClick={() => {
                    setSelectedAlliance(null);
                    setShowAllianceModal(true);
                  }} variant="outline" size="sm">
                    <Handshake className="h-4 w-4 mr-2" />
                    Nouvelle Alliance
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <FamilleAlliances 
                  alliances={familleAlliances}
                  familleId={selectedFamilleId as string}
                  familles={familles}
                  membres={membres}
                  onEditAlliance={handleEditAlliance}
                  onDeleteAlliance={(id) => {
                    // Vous devez implémenter cette fonction dans familleOperations.ts
                    // Pour l'instant, affichons juste un toast
                    toast.error("Fonctionnalité de suppression d'alliance non implémentée");
                  }}
                />
              </CardContent>
            </Card>
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
