
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
import { toast } from 'sonner';

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
      toast.success(`Loi "${loiData.titre}" mise à jour`);
    } else {
      // Add new loi
      const newLoi: ProjetLoi = {
        id: `proj-${Date.now()}`,
        ...loiData
      };
      setProjets([...projets, newLoi]);
      toast.success(`Nouvelle loi "${loiData.titre}" créée`);
    }
    setIsModalOpen(false);
  };
  
  const handleDeleteLoi = (loiId: string) => {
    setProjets(projets.filter(p => p.id !== loiId));
    toast.info("Projet de loi supprimé");
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
    toast.success(`Vote démarré pour la loi "${loi.titre}"`);
  };

  const handleVote = (voteId: string, voteType: 'pour' | 'contre' | 'abstention', count: number = 1) => {
    setVotes(votes.map(vote => {
      if (vote.id === voteId) {
        return {
          ...vote,
          [voteType]: vote[voteType] + count
        };
      }
      return vote;
    }));
    
    const vote = votes.find(v => v.id === voteId);
    if (vote) {
      toast.success(`Vote "${voteType}" pour "${vote.titre}"`);
    }
  };

  const handleCompleteVote = (voteId: string) => {
    const vote = votes.find(v => v.id === voteId);
    if (!vote) return;
    
    // Déterminer si la loi a été adoptée ou rejetée
    const isAdopted = vote.pour > vote.contre;
    
    // Déplacer vers l'historique
    const historyEntry: HistoriqueLoi = {
      id: vote.id,
      titre: vote.titre,
      auteur: vote.auteur,
      dateProposition: vote.dateDebut,
      dateAdoption: new Date().toLocaleDateString('fr-FR'),
      description: vote.description,
      contenu: vote.contenu,
      votes: {
        pour: vote.pour,
        contre: vote.contre,
        abstention: vote.abstention
      },
      statut: isAdopted ? 'adoptée' : 'rejetée',
      saison: "Été 705"
    };
    
    setHistorique([historyEntry, ...historique]);
    setVotes(votes.filter(v => v.id !== voteId));
    
    toast.success(`Vote terminé pour "${vote.titre}". La loi a été ${isAdopted ? 'adoptée' : 'rejetée'}.`);
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
                onVote={handleVote}
                onCompleteVote={handleCompleteVote}
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
