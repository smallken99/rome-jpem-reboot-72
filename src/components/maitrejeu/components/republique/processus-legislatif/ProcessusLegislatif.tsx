
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
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

export interface ProcessusLegislatifProps {
  isEditable?: boolean;
}

export const ProcessusLegislatif: React.FC<ProcessusLegislatifProps> = ({
  isEditable = true
}) => {
  const [activeTab, setActiveTab] = useState('projets');
  
  const [projets, setProjets] = useState<ProjetLoi[]>(() => {
    return projetsData.map(projet => ({
      ...projet,
      description: projet.description || '',
      contenu: Array.isArray(projet.contenu) ? projet.contenu : (projet.contenu ? [projet.contenu] : [])
    }));
  });
  
  const [votes, setVotes] = useState<VoteLoi[]>(() => {
    return votesData.map(vote => ({
      ...vote,
      description: vote.description || '',
      contenu: Array.isArray(vote.contenu) ? vote.contenu : (vote.contenu ? [vote.contenu] : [])
    }));
  });
  
  const [historique, setHistorique] = useState<HistoriqueLoi[]>(() => {
    return historiqueData.map(histoire => {
      let votesObj;
      if (typeof histoire.votes === 'string') {
        const parts = histoire.votes.split('-');
        votesObj = {
          pour: parseInt(parts[0]) || 0,
          contre: parseInt(parts[1]) || 0,
          abstention: parseInt(parts[2]) || 0
        };
      } else {
        votesObj = histoire.votes || { pour: 0, contre: 0, abstention: 0 };
      }
      
      return {
        ...histoire,
        dateProposition: histoire.date || '',
        dateAdoption: histoire.date || '',
        contenu: Array.isArray(histoire.contenu) ? histoire.contenu : (histoire.contenu ? [histoire.contenu] : []),
        statut: histoire.resultat === 'Adoptée' ? 'adopté' : 'rejeté',
        description: histoire.description || 'Aucune description',
        votes: votesObj
      };
    });
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLoi, setSelectedLoi] = useState<ProjetLoi | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [loiToDelete, setLoiToDelete] = useState<string | null>(null);
  const [startVoteConfirmOpen, setStartVoteConfirmOpen] = useState(false);
  const [loiToStartVote, setLoiToStartVote] = useState<ProjetLoi | null>(null);
  
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
      setProjets(projets.map(p => p.id === selectedLoi.id ? { ...p, ...loiData } : p));
      toast.success(`Loi "${loiData.titre}" mise à jour`);
    } else {
      const newLoi: ProjetLoi = {
        id: `proj-${Date.now()}`,
        ...loiData
      };
      setProjets([...projets, newLoi]);
      toast.success(`Nouvelle loi "${loiData.titre}" créée`);
    }
    setIsModalOpen(false);
  };
  
  const handleDeleteRequest = (loiId: string) => {
    setLoiToDelete(loiId);
    setDeleteConfirmOpen(true);
  };
  
  const confirmDelete = () => {
    if (loiToDelete) {
      setProjets(projets.filter(p => p.id !== loiToDelete));
      toast.info("Projet de loi supprimé");
      setDeleteConfirmOpen(false);
      setLoiToDelete(null);
    }
  };
  
  const handleStartVoteRequest = (loi: ProjetLoi) => {
    setLoiToStartVote(loi);
    setStartVoteConfirmOpen(true);
  };
  
  const confirmStartVote = () => {
    if (loiToStartVote) {
      setProjets(projets.filter(p => p.id !== loiToStartVote.id));
      
      const newVote: VoteLoi = {
        id: loiToStartVote.id,
        titre: loiToStartVote.titre,
        auteur: loiToStartVote.auteur,
        dateDebut: new Date().toLocaleDateString('fr-FR'),
        dateFin: "À déterminer",
        description: loiToStartVote.description,
        contenu: loiToStartVote.contenu,
        pour: 0,
        contre: 0,
        abstention: 0
      };
      
      setVotes([...votes, newVote]);
      toast.success(`Vote démarré pour la loi "${loiToStartVote.titre}"`);
      setStartVoteConfirmOpen(false);
      setLoiToStartVote(null);
    }
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
    
    const isAdopted = vote.pour > vote.contre;
    
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
      statut: isAdopted ? 'adopté' : 'rejeté',
      resultat: isAdopted ? 'Adoptée' : 'Rejetée',
      date: vote.dateDebut
    };
    
    setHistorique([historyEntry, ...historique]);
    setVotes(votes.filter(v => v.id !== voteId));
    
    toast.success(`Vote terminé : Loi ${isAdopted ? 'adoptée' : 'rejetée'}`);
  };
  
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
      
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer ce projet de loi ? Cette action ne peut pas être annulée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">Supprimer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <AlertDialog open={startVoteConfirmOpen} onOpenChange={setStartVoteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Démarrer un vote</AlertDialogTitle>
            <AlertDialogDescription>
              Voulez-vous soumettre cette loi au vote du Sénat ? Une fois le vote commencé, le projet ne pourra plus être modifié.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmStartVote}>Démarrer le vote</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
