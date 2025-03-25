
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useMaitreJeu } from '@/components/maitrejeu/context';
import { LoiActives } from './tabs/LoiActives';
import { LoiProposees } from './tabs/LoiProposees';
import { LoiRejetees } from './tabs/LoiRejetees';
import { HistoriqueLoi } from './tabs/HistoriqueLoi';
import { Loi } from '@/components/maitrejeu/types/lois';
import { LoiModal } from '@/components/maitrejeu/components/lois/LoiModal';
import { toast } from 'sonner';
import { formatGameDateForRender, isGameDate } from '@/components/maitrejeu/components/lois/utils/formatGameDate';

export const ProcessusLegislatif: React.FC = () => {
  const { lois, addLoi } = useMaitreJeu();
  
  const [activeTab, setActiveTab] = useState('actives');
  const [selectedLoi, setSelectedLoi] = useState<Loi | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleViewLoi = (loi: Loi) => {
    setSelectedLoi(loi);
    // Ici vous pourriez naviguer vers une page de détail ou ouvrir un modal
    toast.info(`Visualisation de: ${loi.titre || loi.title}`, {
      description: `Proposée par ${loi.proposeur || loi.auteur || loi.proposedBy} - ${formatGameDateForRender(loi.date)}`
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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Processus Législatif</h2>
        <Button onClick={handleAddLoi}>
          <Plus className="h-4 w-4 mr-2" />
          Proposer une loi
        </Button>
      </div>
      
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
    </div>
  );
};
