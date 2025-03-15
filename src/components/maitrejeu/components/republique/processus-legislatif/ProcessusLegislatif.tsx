
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { projetsData, votesData, historiqueData } from './data';
import { ProjetsLoiTab } from './tabs/ProjetsLoiTab';
import { VotesEnCoursTab } from './tabs/VotesEnCoursTab';
import { HistoriqueLoiTab } from './tabs/HistoriqueLoiTab';
import { LoiModal } from './modals/LoiModal';
import { ProjetLoi, VoteLoi, HistoriqueLoi } from './types';

export interface ProcessusLegislatifProps {
  isEditable?: boolean;
}

export const ProcessusLegislatif: React.FC<ProcessusLegislatifProps> = ({
  isEditable = true
}) => {
  const [activeTab, setActiveTab] = useState('projets');
  const [projets, setProjets] = useState<ProjetLoi[]>(projetsData);
  const [votes, setVotes] = useState<VoteLoi[]>(votesData);
  const [historique, setHistorique] = useState<HistoriqueLoi[]>(historiqueData);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLoi, setSelectedLoi] = useState<ProjetLoi | null>(null);
  
  const handleAddLoi = () => {
    setSelectedLoi(null);
    setIsModalOpen(true);
  };
  
  const handleEditLoi = (loi: ProjetLoi) => {
    setSelectedLoi(loi);
    setIsModalOpen(true);
  };
  
  const handleSaveLoi = (loiData: any) => {
    if (selectedLoi) {
      // Update existing loi
      setProjets(projets.map(p => p.id === selectedLoi.id ? { ...p, ...loiData } : p));
    } else {
      // Add new loi
      const newLoi: ProjetLoi = {
        id: `proj-${Date.now()}`,
        ...loiData
      };
      setProjets([...projets, newLoi]);
    }
    setIsModalOpen(false);
  };
  
  const handleDeleteLoi = (loiId: string) => {
    setProjets(projets.filter(p => p.id !== loiId));
  };
  
  const handleStartVote = (loi: ProjetLoi) => {
    // Move from projets to votes
    setProjets(projets.filter(p => p.id !== loi.id));
    
    const newVote: VoteLoi = {
      id: loi.id,
      titre: loi.titre,
      auteur: loi.auteur,
      dateDebut: new Date().toLocaleDateString('fr-FR'),
      dateFin: "À déterminer",
      description: loi.description,
      contenu: loi.contenu,
      pour: 0,
      contre: 0,
      abstention: 0
    };
    
    setVotes([...votes, newVote]);
  };
  
  const formatSeason = (season: string): string => {
    return season; // This would be replaced by a proper formatting function
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Processus Législatif</CardTitle>
          {isEditable && (
            <Button onClick={handleAddLoi} size="sm" className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Nouvelle proposition
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="projets">Projets de loi</TabsTrigger>
              <TabsTrigger value="votes">Votes en cours</TabsTrigger>
              <TabsTrigger value="historique">Historique</TabsTrigger>
            </TabsList>
            
            <TabsContent value="projets" className="mt-4">
              <ProjetsLoiTab 
                projets={projets}
                isEditable={isEditable}
                onEdit={handleEditLoi}
                onDelete={handleDeleteLoi}
                onStartVote={handleStartVote}
              />
            </TabsContent>
            
            <TabsContent value="votes" className="mt-4">
              <VotesEnCoursTab 
                votes={votes}
                isEditable={isEditable}
              />
            </TabsContent>
            
            <TabsContent value="historique" className="mt-4">
              <HistoriqueLoiTab 
                historique={historique}
                formatSeason={formatSeason}
                isEditable={isEditable}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <LoiModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveLoi}
        loi={selectedLoi}
      />
    </div>
  );
};
