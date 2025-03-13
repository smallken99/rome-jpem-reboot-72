
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { LoiDetail } from './components/lois/LoiDetail';
import { LoiModal } from './components/lois/LoiModal';
import { LoiTimeline } from './components/lois/LoiTimeline';
import { LoisActivesTab } from './components/lois/tabs/LoisActivesTab';
import { LoisProposeesTab } from './components/lois/tabs/LoisProposeesTab';
import { LoisRejeteesTab } from './components/lois/tabs/LoisRejeteesTab';
import { HistoriqueLoiTab } from './components/lois/tabs/HistoriqueLoiTab';
import { useMaitreJeu } from './context';
import { Loi } from './types/lois';

export const GestionLois = () => {
  const { lois, addLoi } = useMaitreJeu();
  
  const [activeTab, setActiveTab] = useState('actives');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLoi, setSelectedLoi] = useState<Loi | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filtrer les lois selon leur état
  const loisActives = lois.filter(loi => loi.état === 'Promulguée' || loi.état === 'adoptée');
  const loisProposees = lois.filter(loi => loi.état === 'proposée' || loi.état === 'En délibération');
  const loisRejetees = lois.filter(loi => loi.état === 'rejetée');
  
  // Filtrer selon le terme de recherche
  const filteredLois = lois.filter(loi => 
    loi.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loi.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loi.proposeur.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleOpenModal = (loi: Loi | null = null) => {
    setSelectedLoi(loi);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLoi(null);
  };
  
  const handleSaveLoi = (loiData: Loi) => {
    addLoi(loiData);
    handleCloseModal();
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-3xl font-bold">Gestion des Lois</h2>
        <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nouvelle loi
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Répertoire des Lois Romaines</CardTitle>
          <CardDescription>
            Gérez toutes les lois de la République, des propositions aux lois promulguées
          </CardDescription>
          
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une loi..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filtres
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="actives">Lois Actives</TabsTrigger>
              <TabsTrigger value="proposees">Propositions</TabsTrigger>
              <TabsTrigger value="rejetees">Rejetées</TabsTrigger>
              <TabsTrigger value="historique">Historique</TabsTrigger>
            </TabsList>
            
            <TabsContent value="actives" className="mt-6">
              <LoisActivesTab 
                lois={searchTerm ? filteredLois.filter(l => loisActives.includes(l)) : loisActives} 
                onViewLoi={handleOpenModal}
              />
            </TabsContent>
            
            <TabsContent value="proposees" className="mt-6">
              <LoisProposeesTab 
                lois={searchTerm ? filteredLois.filter(l => loisProposees.includes(l)) : loisProposees} 
                onViewLoi={handleOpenModal}
              />
            </TabsContent>
            
            <TabsContent value="rejetees" className="mt-6">
              <LoisRejeteesTab 
                lois={searchTerm ? filteredLois.filter(l => loisRejetees.includes(l)) : loisRejetees} 
                onViewLoi={handleOpenModal}
              />
            </TabsContent>
            
            <TabsContent value="historique" className="mt-6">
              <HistoriqueLoiTab />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Chronologie Législative</CardTitle>
          <CardDescription>
            Visualisez l'évolution des lois romaines à travers le temps
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <LoiTimeline lois={lois} />
        </CardContent>
      </Card>
      
      {/* Modal pour ajouter/éditer une loi */}
      <LoiModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSave={handleSaveLoi}
        loi={selectedLoi}
      />
    </div>
  );
};
