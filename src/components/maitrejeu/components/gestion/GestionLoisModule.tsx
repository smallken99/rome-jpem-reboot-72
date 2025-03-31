
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useMaitreJeu } from '../../context';
import { GestionContainer } from './GestionContainer';
import { Loi } from '../../types/lois';
import { toast } from 'sonner';

// Composants de tabs sous-traités pour les lois
import { LoiActives } from '../../components/republique/processus-legislatif/tabs/LoiActives';
import { LoiProposees } from '../../components/republique/processus-legislatif/tabs/LoiProposees';
import { LoiRejetees } from '../../components/republique/processus-legislatif/tabs/LoiRejetees';
import { HistoriqueLoi } from '../../components/republique/processus-legislatif/tabs/HistoriqueLoi';

export const GestionLoisModule: React.FC = () => {
  const { lois, addLoi, voteLoi } = useMaitreJeu();
  const [activeTab, setActiveTab] = useState('actives');
  const [selectedLoi, setSelectedLoi] = useState<Loi | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleViewLoi = (loi: Loi) => {
    setSelectedLoi(loi);
    toast.info(`Visualisation de: ${loi.titre}`, {
      description: `Proposée par ${loi.proposeur} - ${loi.date.year}, ${loi.date.season}`
    });
  };
  
  const handleVoterPour = (loiId: string) => {
    voteLoi(loiId, 'pour');
    toast.success("Vote POUR enregistré", {
      description: "Votre vote a été pris en compte avec succès"
    });
  };
  
  const handleVoterContre = (loiId: string) => {
    voteLoi(loiId, 'contre');
    toast.success("Vote CONTRE enregistré", {
      description: "Votre vote a été pris en compte avec succès"
    });
  };
  
  const handleVoterAbstention = (loiId: string) => {
    voteLoi(loiId, 'abstention');
    toast.success("ABSTENTION enregistrée", {
      description: "Votre abstention a été prise en compte avec succès"
    });
  };
  
  const handleAddLoi = () => {
    setSelectedLoi(null);
    setIsModalOpen(true);
  };
  
  const handleSaveLoi = (loiData: any) => {
    if (selectedLoi) {
      toast.success("Loi mise à jour avec succès");
    } else {
      addLoi({
        ...loiData,
        votesPositifs: 0,
        votesNégatifs: 0,
        votesAbstention: 0
      });
      toast.success("Nouvelle loi créée avec succès");
    }
    setIsModalOpen(false);
  };
  
  return (
    <GestionContainer
      title="Gestion des Lois"
      description="Gérer les lois de la République"
      onAddNew={handleAddLoi}
      addButtonLabel="Proposer une loi"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="actives">Lois actives</TabsTrigger>
          <TabsTrigger value="proposees">Lois proposées</TabsTrigger>
          <TabsTrigger value="rejetees">Lois rejetées</TabsTrigger>
          <TabsTrigger value="historique">Historique</TabsTrigger>
        </TabsList>
        
        <TabsContent value="actives" className="pt-4">
          <LoiActives lois={lois} onViewLoi={handleViewLoi} />
        </TabsContent>
        
        <TabsContent value="proposees" className="pt-4">
          <LoiProposees
            lois={lois}
            onViewLoi={handleViewLoi}
            onVoterPour={handleVoterPour}
            onVoterContre={handleVoterContre}
            onVoterAbstention={handleVoterAbstention}
          />
        </TabsContent>
        
        <TabsContent value="rejetees" className="pt-4">
          <LoiRejetees lois={lois} onViewLoi={handleViewLoi} />
        </TabsContent>
        
        <TabsContent value="historique" className="pt-4">
          <HistoriqueLoi lois={lois} />
        </TabsContent>
      </Tabs>
    </GestionContainer>
  );
};
