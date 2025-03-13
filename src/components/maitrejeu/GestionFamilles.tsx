
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, UserPlus, UsersRound, UserRoundPlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMaitreJeu } from './context';
import { FamilleInfo, MembreFamille, FamilleAlliance, FamilleCreationData } from './types';
import { FamillesTabContent } from './components/famille/gestion/FamillesTabContent';
import { FamilleDetailTabContent } from './components/famille/gestion/FamilleDetailTabContent';
import { FamilleMembresTabContent } from './components/famille/gestion/FamilleMembresTabContent';
import { FamilleAlliancesTabContent } from './components/famille/gestion/FamilleAlliancesTabContent';
import { FamilleModal } from './components/famille/FamilleModal';
import { MembreFamilleModal } from './components/famille/MembreFamilleModal';
import { AllianceModal } from './components/famille/AllianceModal';

export const GestionFamilles: React.FC = () => {
  const { familles, membres, alliances, addFamille, updateFamille, deleteFamille } = useMaitreJeu();
  
  const [activeTab, setActiveTab] = useState('familles');
  const [selectedFamilleId, setSelectedFamilleId] = useState<string | null>(null);
  const [showFamilleModal, setShowFamilleModal] = useState(false);
  const [showMembreModal, setShowMembreModal] = useState(false);
  const [showAllianceModal, setShowAllianceModal] = useState(false);
  const [familleFilter, setFamilleFilter] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMembre, setSelectedMembre] = useState<MembreFamille | null>(null);
  const [selectedAlliance, setSelectedAlliance] = useState<FamilleAlliance | null>(null);
  
  const selectedFamille = selectedFamilleId ? familles.find(f => f.id === selectedFamilleId) : null;
  
  const handleCreateFamille = (familleData: FamilleCreationData) => {
    const familleId = addFamille(familleData);
    setSelectedFamilleId(familleId);
    setShowFamilleModal(false);
    setActiveTab('detail');
  };
  
  const handleUpdateFamille = (familleData: FamilleCreationData) => {
    if (selectedFamille) {
      updateFamille(selectedFamille.id, familleData);
      setShowFamilleModal(false);
    }
  };
  
  const handleDeleteFamille = (familleId: string) => {
    deleteFamille(familleId);
    setSelectedFamilleId(null);
    setActiveTab('familles');
  };
  
  const handleSelectFamille = (id: string) => {
    setSelectedFamilleId(id);
    setActiveTab('detail');
  };
  
  const handleCreateMembre = (membreData: any) => {
    console.log('Création membre:', membreData);
    setShowMembreModal(false);
  };
  
  const handleUpdateMembre = (membreData: any) => {
    console.log('Mise à jour membre:', membreData);
    setSelectedMembre(null);
    setShowMembreModal(false);
  };
  
  const handleDeleteMembre = (membreId: string) => {
    console.log('Suppression membre:', membreId);
  };
  
  const handleCreateAlliance = (allianceData: any) => {
    console.log('Création alliance:', allianceData);
    setShowAllianceModal(false);
  };
  
  const handleUpdateAlliance = (allianceData: any) => {
    console.log('Mise à jour alliance:', allianceData);
    setSelectedAlliance(null);
    setShowAllianceModal(false);
  };
  
  const handleBack = () => {
    setActiveTab('familles');
    setSelectedFamilleId(null);
  };
  
  const filteredFamilles = familles.filter(famille => {
    if (searchTerm && !famille.nom.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });
  
  const familleMembres = selectedFamilleId 
    ? membres.filter(m => m.familleId === selectedFamilleId)
    : [];
  
  const familleAlliances = selectedFamilleId 
    ? alliances.filter(a => a.famille1Id === selectedFamilleId || a.famille2Id === selectedFamilleId)
    : [];
    
  const otherFamilles = selectedFamilleId 
    ? familles.filter(f => f.id !== selectedFamilleId)
    : [];
  
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Gestion des Familles</h1>
      
      <div className="flex justify-between mb-4">
        <Button
          onClick={() => {
            if (activeTab !== 'familles') {
              handleBack();
            } else {
              setShowFamilleModal(true);
            }
          }}
          className="gap-2"
        >
          {activeTab !== 'familles' ? (
            <>Retour à la liste</>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              Nouvelle Famille
            </>
          )}
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="hidden">
          <TabsTrigger value="familles">Liste des Familles</TabsTrigger>
          <TabsTrigger value="detail">Détail de la Famille</TabsTrigger>
          <TabsTrigger value="membres">Membres</TabsTrigger>
          <TabsTrigger value="alliances">Alliances</TabsTrigger>
        </TabsList>
        
        <TabsContent value="familles">
          <FamillesTabContent
            familles={filteredFamilles}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            familleFilter={familleFilter}
            setFamilleFilter={setFamilleFilter}
            onSelectFamille={handleSelectFamille}
            onEditFamille={(famille) => {
              setSelectedFamilleId(famille.id);
              setShowFamilleModal(true);
            }}
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
        </TabsContent>
        
        <TabsContent value="detail">
          {selectedFamille && (
            <FamilleDetailTabContent 
              famille={selectedFamille}
              onEditFamille={() => setShowFamilleModal(true)}
              onDeleteFamille={() => handleDeleteFamille(selectedFamille.id)}
              onBack={handleBack}
            />
          )}
        </TabsContent>
        
        <TabsContent value="membres">
          {selectedFamille && (
            <FamilleMembresTabContent
              membres={familleMembres}
              famille={selectedFamille}
              onAddMembre={() => setShowMembreModal(true)}
              onEditMembre={(membre) => {
                setSelectedMembre(membre);
                setShowMembreModal(true);
              }}
              onDeleteMembre={handleDeleteMembre}
              onBack={handleBack}
            />
          )}
        </TabsContent>
        
        <TabsContent value="alliances">
          {selectedFamille && (
            <FamilleAlliancesTabContent
              alliances={familleAlliances}
              famille={selectedFamille}
              familles={familles}
              membres={membres}
              onAddAlliance={() => setShowAllianceModal(true)}
              onEditAlliance={(alliance) => {
                setSelectedAlliance(alliance);
                setShowAllianceModal(true);
              }}
              onDeleteAlliance={(id) => console.log('Suppression alliance:', id)}
              onBack={handleBack}
            />
          )}
        </TabsContent>
      </Tabs>
      
      {showFamilleModal && (
        <FamilleModal
          isOpen={true}
          onClose={() => setShowFamilleModal(false)}
          initialData={selectedFamille || undefined}
          onSave={(data) => selectedFamille ? handleUpdateFamille(data) : handleCreateFamille(data)}
        />
      )}
      
      {showMembreModal && (
        <MembreFamilleModal
          isOpen={true}
          onClose={() => {
            setShowMembreModal(false);
            setSelectedMembre(null);
          }}
          initialData={selectedMembre || undefined}
          familles={familles}
          selectedFamilleId={selectedFamilleId}
          onSave={(data) => selectedMembre ? handleUpdateMembre(data) : handleCreateMembre(data)}
        />
      )}
      
      {showAllianceModal && (
        <AllianceModal
          isOpen={true}
          onClose={() => {
            setShowAllianceModal(false);
            setSelectedAlliance(null);
          }}
          initialData={selectedAlliance || undefined}
          familles={familles}
          selectedFamilleId={selectedFamilleId}
          onSave={(data) => selectedAlliance ? handleUpdateAlliance(data) : handleCreateAlliance(data)}
        />
      )}
    </div>
  );
};
