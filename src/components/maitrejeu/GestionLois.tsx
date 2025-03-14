
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
import { 
  convertMJArrayToRepublique, 
  convertRepubliqueToMJLoi, 
  convertMJToRepubliqueLoi 
} from './types/loisAdapter';

export const GestionLois = () => {
  const { lois, addLoi } = useMaitreJeu();
  
  const [activeTab, setActiveTab] = useState('actives');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLoi, setSelectedLoi] = useState<Loi | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Helper to normalize loi status
  const normalizeStatus = (loi: Loi): 'active' | 'proposed' | 'rejected' | 'expired' => {
    if (loi.status === 'active') return 'active';
    if (loi.status === 'proposed') return 'proposed';
    if (loi.status === 'rejected') return 'rejected';
    if (loi.status === 'expired') return 'expired';
    
    // Handle legacy status field
    if (loi.état === 'Promulguée' || loi.état === 'adoptée' || loi.état === 'promulguée') return 'active';
    if (loi.état === 'proposée' || loi.état === 'En délibération') return 'proposed';
    if (loi.état === 'rejetée') return 'rejected';
    
    // Handle République format
    if (loi.statut === 'promulguée') return 'active';
    if (loi.statut === 'proposée' || loi.statut === 'en_débat') return 'proposed';
    if (loi.statut === 'rejetée') return 'rejected';
    
    return 'proposed'; // Default
  };
  
  // Filtrer les lois selon leur état
  const loisActives = lois.filter(loi => normalizeStatus(loi) === 'active');
  const loisProposees = lois.filter(loi => normalizeStatus(loi) === 'proposed');
  const loisRejetees = lois.filter(loi => normalizeStatus(loi) === 'rejected');
  
  // Helper for formatting seasons
  const formatSeason = (season: string): string => {
    switch(season) {
      case 'SPRING': return 'Printemps';
      case 'SUMMER': return 'Été';
      case 'AUTUMN': return 'Automne';
      case 'WINTER': return 'Hiver';
      case 'Ver': return 'Printemps';
      case 'Aestas': return 'Été';
      case 'Autumnus': return 'Automne';
      case 'Hiems': return 'Hiver';
      default: return season;
    }
  };
  
  // Filtrer selon le terme de recherche
  const filteredLois = lois.filter(loi => 
    (loi.title || loi.titre || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    loi.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (loi.proposedBy || loi.proposeur || loi.auteur || '').toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleOpenModal = (loi: Loi | null = null) => {
    setSelectedLoi(loi);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLoi(null);
  };
  
  const handleSaveLoi = (loiData: any) => {
    const mjLoi = convertRepubliqueToMJLoi(loiData);
    addLoi(mjLoi);
    handleCloseModal();
  };
  
  // Convert lois for component usage
  const convertedLoisActives = convertMJArrayToRepublique(
    searchTerm ? filteredLois.filter(l => normalizeStatus(l) === 'active') : loisActives
  );
  
  const convertedLoisProposees = convertMJArrayToRepublique(
    searchTerm ? filteredLois.filter(l => normalizeStatus(l) === 'proposed') : loisProposees
  );
  
  const convertedLoisRejetees = convertMJArrayToRepublique(
    searchTerm ? filteredLois.filter(l => normalizeStatus(l) === 'rejected') : loisRejetees
  );
  
  const convertedHandleOpenModal = (loi: any) => {
    if (loi) {
      const mjLoi = lois.find(l => l.id === loi.id) || null;
      handleOpenModal(mjLoi);
    } else {
      handleOpenModal(null);
    }
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
                lois={convertedLoisActives} 
                onViewLoi={convertedHandleOpenModal}
              />
            </TabsContent>
            
            <TabsContent value="proposees" className="mt-6">
              <LoisProposeesTab 
                lois={convertedLoisProposees} 
                onViewLoi={convertedHandleOpenModal}
              />
            </TabsContent>
            
            <TabsContent value="rejetees" className="mt-6">
              <LoisRejeteesTab 
                lois={convertedLoisRejetees} 
                onViewLoi={convertedHandleOpenModal}
              />
            </TabsContent>
            
            <TabsContent value="historique" className="mt-6">
              <HistoriqueLoiTab 
                lois={convertMJArrayToRepublique(lois)}
                onViewLoi={convertedHandleOpenModal}
                formatSeason={formatSeason}
              />
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
        loi={selectedLoi ? convertMJToRepubliqueLoi(selectedLoi) : undefined}
      />
    </div>
  );
};
