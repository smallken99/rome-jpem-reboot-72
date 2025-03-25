
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { LoiActives } from './tabs/LoiActives';
import { LoiProposees } from './tabs/LoiProposees';
import { LoiRejetees } from './tabs/LoiRejetees';
import { HistoriqueLoi } from './tabs/HistoriqueLoi';
import { LoiModal } from './LoiModal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useGameTime } from '@/hooks/useGameTime';
import { useMaitreJeu } from '@/components/maitrejeu/context';
import { Loi } from '@/components/maitrejeu/types/lois';

export const ProcessusLegislatif: React.FC = () => {
  const [activeTab, setActiveTab] = useState('actives');
  const [isLoiModalOpen, setIsLoiModalOpen] = useState(false);
  const [selectedLoi, setSelectedLoi] = useState<Loi | undefined>(undefined);
  
  const { formatSeason } = useGameTime();
  const { lois, addLoi, voteLoi } = useMaitreJeu();
  
  // Filter laws based on status
  const loisActives = lois.filter(loi => loi.état === 'Promulguée' || loi.état === 'En vigueur');
  const loisProposees = lois.filter(loi => loi.état === 'Proposée' || loi.état === 'En discussion');
  const loisRejetees = lois.filter(loi => loi.état === 'Rejetée');
  const loisHistorique = [...lois].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
  
  const handleViewLoi = (loi?: Loi) => {
    setSelectedLoi(loi);
    setIsLoiModalOpen(true);
  };
  
  const handleSaveLoi = (loiData: any) => {
    if (selectedLoi) {
      // Update existing law - in a real implementation
      console.log('Update law:', loiData);
    } else {
      // Add new law
      addLoi({
        ...loiData,
        date: new Date().toISOString()
      });
    }
    setIsLoiModalOpen(false);
    setSelectedLoi(undefined);
  };
  
  const handleVotePour = (loiId: string) => {
    voteLoi(loiId, 'pour', 10); // 10 votes for example
  };
  
  const handleVoteContre = (loiId: string) => {
    voteLoi(loiId, 'contre', 5); // 5 votes for example
  };
  
  const handleVoteAbstention = (loiId: string) => {
    voteLoi(loiId, 'abstention', 3); // 3 votes for example
  };
  
  const handlePromulguer = (loiId: string) => {
    // In a real implementation this would update the law status
    console.log('Promulguer law:', loiId);
  };
  
  const categories = [
    { id: 'civile', name: 'Civile', description: 'Lois concernant les citoyens' },
    { id: 'militaire', name: 'Militaire', description: 'Lois concernant l\'armée' },
    { id: 'economique', name: 'Économique', description: 'Lois concernant l\'économie' },
    { id: 'politique', name: 'Politique', description: 'Lois concernant le gouvernement' },
    { id: 'religieuse', name: 'Religieuse', description: 'Lois concernant les cultes' },
    { id: 'judiciaire', name: 'Judiciaire', description: 'Lois concernant la justice' }
  ];
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold">Processus Législatif</h2>
            <p className="text-muted-foreground">
              Gérez les lois de la République
            </p>
          </div>
          <Button onClick={() => handleViewLoi()} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Proposer une loi
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="actives">En vigueur</TabsTrigger>
            <TabsTrigger value="proposees">Proposées</TabsTrigger>
            <TabsTrigger value="rejetees">Rejetées</TabsTrigger>
            <TabsTrigger value="historique">Historique</TabsTrigger>
          </TabsList>
          
          <TabsContent value="actives">
            <LoiActives 
              lois={loisActives} 
              onViewLoi={handleViewLoi} 
              formatSeason={formatSeason} 
              onPromulguer={handlePromulguer}
            />
          </TabsContent>
          
          <TabsContent value="proposees">
            <LoiProposees 
              lois={loisProposees} 
              onViewLoi={handleViewLoi} 
              formatSeason={formatSeason}
              onVoterPour={handleVotePour}
              onVoterContre={handleVoteContre}
              onVoterAbstention={handleVoteAbstention}
            />
          </TabsContent>
          
          <TabsContent value="rejetees">
            <LoiRejetees 
              lois={loisRejetees} 
              onViewLoi={handleViewLoi} 
              formatSeason={formatSeason} 
            />
          </TabsContent>
          
          <TabsContent value="historique">
            <HistoriqueLoi 
              lois={loisHistorique} 
              onViewLoi={handleViewLoi} 
              formatSeason={formatSeason} 
            />
          </TabsContent>
        </Tabs>
        
        <LoiModal 
          isOpen={isLoiModalOpen}
          onClose={() => {
            setIsLoiModalOpen(false);
            setSelectedLoi(undefined);
          }}
          onSave={handleSaveLoi}
          loi={selectedLoi}
          categories={categories}
        />
      </CardContent>
    </Card>
  );
};
