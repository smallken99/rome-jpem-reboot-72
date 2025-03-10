
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
import { PlusCircle, Users, Handshake, UserPlus } from 'lucide-react';
import { FamilleInfo, FamilleCreationData, FamilleFilter } from './types';
import { MembreFamilleModal } from './components/famille/MembreFamilleModal';
import { AllianceModal } from './components/famille/AllianceModal';

export const GestionFamilles = () => {
  const { 
    familles, 
    membres, 
    alliances, 
    addFamille, 
    getFamilleOfMembre,
    getMembresByFamille 
  } = useMaitreJeu();
  
  const [activeTab, setActiveTab] = useState('familles');
  const [selectedFamilleId, setSelectedFamilleId] = useState<string | null>(null);
  const [showFamilleModal, setShowFamilleModal] = useState(false);
  const [showMembreModal, setShowMembreModal] = useState(false);
  const [showAllianceModal, setShowAllianceModal] = useState(false);
  const [familleFilter, setFamilleFilter] = useState<FamilleFilter>({});
  
  const selectedFamille = selectedFamilleId ? familles.find(f => f.id === selectedFamilleId) : null;
  const familleMembres = selectedFamilleId ? getMembresByFamille(selectedFamilleId) : [];
  
  const handleCreateFamille = (familleData: FamilleCreationData) => {
    const familleId = addFamille(familleData);
    setSelectedFamilleId(familleId);
    setShowFamilleModal(false);
    setActiveTab('detail');
  };
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Familles</h1>
        <div className="flex space-x-2">
          <Button onClick={() => setShowFamilleModal(true)} variant="outline">
            <PlusCircle className="h-4 w-4 mr-2" />
            Nouvelle Famille
          </Button>
          <Button onClick={() => setShowMembreModal(true)} variant="outline">
            <UserPlus className="h-4 w-4 mr-2" />
            Nouveau Membre
          </Button>
          <Button onClick={() => setShowAllianceModal(true)} variant="outline">
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
            <CardHeader>
              <CardTitle>Liste des Familles</CardTitle>
              <CardDescription>
                Gérez les familles romaines et leurs membres
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FamillesList 
                familles={familles}
                onSelectFamille={(id) => {
                  setSelectedFamilleId(id);
                  setActiveTab('detail');
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
              <CardHeader>
                <CardTitle>Détail de la Famille {selectedFamille.nom}</CardTitle>
                <CardDescription>
                  Informations sur la famille et ses statistiques
                </CardDescription>
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
                <Button onClick={() => setShowMembreModal(true)} variant="outline" size="sm">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Ajouter un Membre
                </Button>
              </CardHeader>
              <CardContent>
                <FamilleMembres 
                  membres={familleMembres}
                  familleId={selectedFamilleId as string}
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
                <Button onClick={() => setShowAllianceModal(true)} variant="outline" size="sm">
                  <Handshake className="h-4 w-4 mr-2" />
                  Nouvelle Alliance
                </Button>
              </CardHeader>
              <CardContent>
                <FamilleAlliances 
                  alliances={alliances.filter(a => 
                    a.famille1Id === selectedFamilleId || a.famille2Id === selectedFamilleId
                  )}
                  familleId={selectedFamilleId as string}
                  familles={familles}
                  membres={membres}
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
        onSave={handleCreateFamille}
        editFamille={selectedFamilleId && activeTab === 'detail' ? selectedFamille : undefined}
      />
      
      <MembreFamilleModal
        isOpen={showMembreModal}
        onClose={() => setShowMembreModal(false)}
        familleId={selectedFamilleId}
        familles={familles}
      />
      
      <AllianceModal
        isOpen={showAllianceModal}
        onClose={() => setShowAllianceModal(false)}
        familles={familles}
        membres={membres}
        initialFamilleId={selectedFamilleId}
      />
    </div>
  );
};
