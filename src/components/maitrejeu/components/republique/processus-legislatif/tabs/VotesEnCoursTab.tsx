
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { VoteLoi } from '../types';
import { ThumbsUp, ThumbsDown, Minus, Check } from 'lucide-react';

interface VotesEnCoursTabProps {
  votes: VoteLoi[];
  isEditable: boolean;
  onVote?: (voteId: string, voteType: 'pour' | 'contre' | 'abstention', count?: number) => void;
  onCompleteVote?: (voteId: string) => void;
}

export const VotesEnCoursTab: React.FC<VotesEnCoursTabProps> = ({
  votes,
  isEditable,
  onVote,
  onCompleteVote
}) => {
  const [selectedVote, setSelectedVote] = useState<VoteLoi | null>(null);
  const [voteDialogOpen, setVoteDialogOpen] = useState(false);
  const [completeDialogOpen, setCompleteDialogOpen] = useState(false);
  
  const calculateProgress = (pour: number, contre: number, abstention: number) => {
    const total = pour + contre + abstention;
    if (total === 0) return { pour: 0, contre: 0, abstention: 0 };
    
    return {
      pour: (pour / total) * 100,
      contre: (contre / total) * 100,
      abstention: (abstention / total) * 100
    };
  };
  
  const handleVoteClick = (vote: VoteLoi) => {
    setSelectedVote(vote);
    setVoteDialogOpen(true);
  };
  
  const handleCompleteClick = (vote: VoteLoi) => {
    setSelectedVote(vote);
    setCompleteDialogOpen(true);
  };
  
  const submitVote = (type: 'pour' | 'contre' | 'abstention', count: number = 1) => {
    if (selectedVote && onVote) {
      onVote(selectedVote.id, type, count);
      setVoteDialogOpen(false);
    }
  };
  
  const confirmCompleteVote = () => {
    if (selectedVote && onCompleteVote) {
      onCompleteVote(selectedVote.id);
      setCompleteDialogOpen(false);
    }
  };
  
  const isVoteComplete = (vote: VoteLoi) => {
    const total = vote.pour + vote.contre + vote.abstention;
    return total >= 10; // Exemple: le vote est considéré complet si au moins 10 votes ont été exprimés
  };
  
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titre</TableHead>
            <TableHead>Auteur</TableHead>
            <TableHead>Date début</TableHead>
            <TableHead>Date fin</TableHead>
            <TableHead>Résultats actuels</TableHead>
            {isEditable && <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {votes.map((vote) => {
            const progress = calculateProgress(vote.pour, vote.contre, vote.abstention);
            const total = vote.pour + vote.contre + vote.abstention;
            
            return (
              <TableRow key={vote.id}>
                <TableCell className="font-medium">{vote.titre}</TableCell>
                <TableCell>{vote.auteur}</TableCell>
                <TableCell>{vote.dateDebut}</TableCell>
                <TableCell>{vote.dateFin}</TableCell>
                <TableCell className="w-[300px]">
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span>Pour: {vote.pour} ({total > 0 ? ((vote.pour / total) * 100).toFixed(1) : 0}%)</span>
                      <span>Contre: {vote.contre} ({total > 0 ? ((vote.contre / total) * 100).toFixed(1) : 0}%)</span>
                      <span>Abst.: {vote.abstention} ({total > 0 ? ((vote.abstention / total) * 100).toFixed(1) : 0}%)</span>
                    </div>
                    <div className="flex h-2 overflow-hidden rounded-full bg-gray-200">
                      <div 
                        className="bg-green-500 h-full" 
                        style={{ width: `${progress.pour}%` }}
                      ></div>
                      <div 
                        className="bg-red-500 h-full" 
                        style={{ width: `${progress.contre}%` }}
                      ></div>
                      <div 
                        className="bg-gray-400 h-full" 
                        style={{ width: `${progress.abstention}%` }}
                      ></div>
                    </div>
                  </div>
                </TableCell>
                {isEditable && (
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleVoteClick(vote)}>
                        Voter
                      </Button>
                      {isVoteComplete(vote) && (
                        <Button variant="outline" size="sm" className="text-green-600" onClick={() => handleCompleteClick(vote)}>
                          <Check className="h-4 w-4 mr-1" />
                          Terminer
                        </Button>
                      )}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      
      {votes.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>Aucun vote en cours</p>
        </div>
      )}
      
      {/* Dialogue de vote */}
      <Dialog open={voteDialogOpen} onOpenChange={setVoteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Vote sur: {selectedVote?.titre}</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 gap-4 pt-4">
            <div className="text-sm text-muted-foreground mb-2">
              <p>{selectedVote?.description}</p>
            </div>
            
            <div className="flex justify-center gap-2 flex-col space-y-2">
              <Button 
                className="bg-green-600 hover:bg-green-700 gap-2"
                onClick={() => submitVote('pour')}
              >
                <ThumbsUp className="h-4 w-4" />
                Voter pour
              </Button>
              
              <Button 
                variant="outline" 
                className="text-red-600 border-red-600 hover:bg-red-50 gap-2"
                onClick={() => submitVote('contre')}
              >
                <ThumbsDown className="h-4 w-4" />
                Voter contre
              </Button>
              
              <Button 
                variant="outline" 
                className="text-gray-600 gap-2"
                onClick={() => submitVote('abstention')}
              >
                <Minus className="h-4 w-4" />
                S'abstenir
              </Button>
            </div>
            
            <div className="space-y-2 mt-4">
              <p className="text-sm font-medium">Vote multiple:</p>
              <div className="grid grid-cols-3 gap-2">
                {[5, 10, 25].map(count => (
                  <React.Fragment key={count}>
                    <Button size="sm" variant="outline" onClick={() => submitVote('pour', count)}>
                      +{count} Pour
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => submitVote('contre', count)}>
                      +{count} Contre
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => submitVote('abstention', count)}>
                      +{count} Abst.
                    </Button>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex justify-between">
            <Button variant="ghost" onClick={() => setVoteDialogOpen(false)}>
              Annuler
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialogue de finalisation du vote */}
      <AlertDialog open={completeDialogOpen} onOpenChange={setCompleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Terminer le vote</AlertDialogTitle>
            <AlertDialogDescription>
              Voulez-vous vraiment terminer le vote sur cette loi ? 
              Les résultats actuels seront définitifs.
              
              {selectedVote && (
                <div className="mt-4 p-3 border rounded-lg">
                  <p className="font-medium">{selectedVote.titre}</p>
                  <div className="flex justify-between mt-2 text-sm">
                    <Badge variant="outline" className="bg-green-50 text-green-700">Pour: {selectedVote.pour}</Badge>
                    <Badge variant="outline" className="bg-red-50 text-red-700">Contre: {selectedVote.contre}</Badge>
                    <Badge variant="outline" className="bg-gray-50 text-gray-700">Abstention: {selectedVote.abstention}</Badge>
                  </div>
                  <div className="mt-2 text-sm">
                    {selectedVote.pour > selectedVote.contre ? (
                      <span className="text-green-600 font-medium">Cette loi sera adoptée.</span>
                    ) : (
                      <span className="text-red-600 font-medium">Cette loi sera rejetée.</span>
                    )}
                  </div>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmCompleteVote}>Confirmer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
