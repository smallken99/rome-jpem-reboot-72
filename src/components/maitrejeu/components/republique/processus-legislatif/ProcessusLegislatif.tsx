
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ProjetsLoiTab } from './tabs/ProjetsLoiTab';
import { VotesEnCoursTab } from './tabs/VotesEnCoursTab';
import { HistoriqueLoiTab } from './tabs/HistoriqueLoiTab';
import { LoiModal } from './modals/LoiModal';
import { ConfirmationDialogs } from './components/ConfirmationDialogs';
import { useProcessusLegislatif } from './hooks/useProcessusLegislatif';

export interface ProcessusLegislatifProps {
  isEditable?: boolean;
}

export const ProcessusLegislatif: React.FC<ProcessusLegislatifProps> = ({
  isEditable = true
}) => {
  const {
    activeTab,
    setActiveTab,
    projets,
    votes,
    historique,
    isModalOpen,
    setIsModalOpen,
    selectedLoi,
    deleteConfirmOpen,
    setDeleteConfirmOpen,
    startVoteConfirmOpen, 
    setStartVoteConfirmOpen,
    handleAddLoi,
    handleEditLoi,
    handleSaveLoi,
    handleDeleteRequest,
    confirmDelete,
    handleStartVoteRequest,
    confirmStartVote,
    handleVote,
    handleCompleteVote
  } = useProcessusLegislatif(isEditable);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Processus Législatif</CardTitle>
          {isEditable && (
            <Button onClick={handleAddLoi} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle Proposition
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="projets">Projets de Loi</TabsTrigger>
              <TabsTrigger value="votes">Votes en Cours</TabsTrigger>
              <TabsTrigger value="historique">Historique</TabsTrigger>
            </TabsList>
            
            <TabsContent value="projets" className="mt-4">
              <ProjetsLoiTab 
                projets={projets} 
                isEditable={isEditable} 
                onEdit={handleEditLoi} 
                onDelete={handleDeleteRequest} 
                onStartVote={handleStartVoteRequest} 
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
                isEditable={isEditable}
                formatSeason={(s) => s}
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
      
      <ConfirmationDialogs
        deleteConfirmOpen={deleteConfirmOpen}
        setDeleteConfirmOpen={setDeleteConfirmOpen}
        startVoteConfirmOpen={startVoteConfirmOpen}
        setStartVoteConfirmOpen={setStartVoteConfirmOpen}
        confirmDelete={confirmDelete}
        confirmStartVote={confirmStartVote}
        loiToStartVote={selectedLoi}
      />
    </div>
  );
};
