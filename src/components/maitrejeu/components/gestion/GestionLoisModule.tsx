
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useMaitreJeu } from '../../context/MaitreJeuContext';
import { Loi } from '../../types/lois';
import { LoiModal } from '../../components/lois/LoiModal';
import { toast } from 'sonner';
import { LoiActives } from '../../components/lois/tabs/LoiActives';
import { LoiProposees } from '../../components/lois/tabs/LoiProposees';
import { LoiRejetees } from '../../components/lois/tabs/LoiRejetees';
import { HistoriqueLoi } from '../../components/lois/tabs/HistoriqueLoi';
import { GestionContainer } from './GestionContainer';
import { formatGameDate } from '../../types/common';

export const GestionLoisModule: React.FC = () => {
  const { lois, addLoi, updateLoi } = useMaitreJeu();
  
  const [activeTab, setActiveTab] = useState('actives');
  const [selectedLoi, setSelectedLoi] = useState<Loi | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleViewLoi = (loi: Loi) => {
    setSelectedLoi(loi);
    // Ici vous pourriez naviguer vers une page de détail ou ouvrir un modal
    toast.info(`Visualisation de: ${loi.titre || loi.title}`, {
      description: `Proposée par ${loi.proposeur || loi.auteur || loi.proposedBy} - ${formatGameDate(loi.date)}`
    });
  };
  
  const handleVoterPour = (loiId: string) => {
    toast.success("Vote POUR enregistré", {
      description: "Votre vote a été pris en compte avec succès"
    });
    // Dans une vraie implémentation, vous appelleriez un service pour enregistrer le vote
  };
  
  const handleVoterContre = (loiId: string) => {
    toast.success("Vote CONTRE enregistré", {
      description: "Votre vote a été pris en compte avec succès"
    });
  };
  
  const handleVoterAbstention = (loiId: string) => {
    toast.success("ABSTENTION enregistrée", {
      description: "Votre abstention a été prise en compte avec succès"
    });
  };
  
  const handleAddLoi = () => {
    setSelectedLoi(null);
    setIsModalOpen(true);
  };
  
  const handleSaveLoi = (loiData: any) => {
    // Si nous éditons une loi existante
    if (selectedLoi) {
      // Mise à jour à implémenter
      updateLoi({
        ...selectedLoi,
        ...loiData
      });
      toast.success("Loi mise à jour avec succès");
    } else {
      // Création d'une nouvelle loi
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
      title="Processus Législatif"
      description="Gérez les lois proposées, votées et appliquées dans la République"
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
      
      {/* Modal pour ajouter/éditer une loi */}
      <LoiModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveLoi}
        loi={selectedLoi}
      />
    </GestionContainer>
  );
};
