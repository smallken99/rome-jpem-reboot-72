
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loi, useLois } from './hooks/useLois';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { ThumbsUp, ThumbsDown, Minus } from 'lucide-react';

interface LoiVoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loi: Loi | null;
  onSuccess: () => void;
}

export const LoiVoteDialog: React.FC<LoiVoteDialogProps> = ({
  open,
  onOpenChange,
  loi,
  onSuccess
}) => {
  const { voterLoi } = useLois();
  const [votes, setVotes] = useState({
    pour: 0,
    contre: 0,
    abstention: 0
  });
  
  // Simuler la répartition des votes
  const handleSimulate = () => {
    // Un total fixe de sénateurs (pour la simulation)
    const totalSenateurs = 300;
    
    // Répartition aléatoire avec une tendance au pour (simulation)
    const pour = Math.floor(Math.random() * (totalSenateurs * 0.6) + totalSenateurs * 0.3);
    const contre = Math.floor(Math.random() * (totalSenateurs * 0.4));
    const abstention = totalSenateurs - pour - contre;
    
    setVotes({
      pour,
      contre,
      abstention
    });
  };
  
  const handleVote = () => {
    if (!loi) return;
    
    voterLoi(loi.id, votes);
    toast.success("Vote enregistré avec succès");
    onSuccess();
    onOpenChange(false);
  };
  
  if (!loi) return null;
  
  const totalVotes = votes.pour + votes.contre + votes.abstention;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="font-cinzel text-xl">Vote de la loi</DialogTitle>
          <DialogDescription>
            {loi.titre}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="p-4 bg-muted/30 rounded-md">
            <p className="text-sm">{loi.description}</p>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Répartition des votes</Label>
                <Button variant="outline" size="sm" onClick={handleSimulate}>
                  Simuler un vote
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-green-50 rounded-md flex flex-col items-center justify-center">
                  <ThumbsUp className="h-5 w-5 text-green-600 mb-1" />
                  <div className="text-green-700 font-bold text-xl">{votes.pour}</div>
                  <div className="text-xs text-muted-foreground">Pour</div>
                  {totalVotes > 0 && (
                    <Badge variant="outline" className="mt-1">
                      {Math.round((votes.pour / totalVotes) * 100)}%
                    </Badge>
                  )}
                </div>
                
                <div className="p-3 bg-red-50 rounded-md flex flex-col items-center justify-center">
                  <ThumbsDown className="h-5 w-5 text-red-600 mb-1" />
                  <div className="text-red-700 font-bold text-xl">{votes.contre}</div>
                  <div className="text-xs text-muted-foreground">Contre</div>
                  {totalVotes > 0 && (
                    <Badge variant="outline" className="mt-1">
                      {Math.round((votes.contre / totalVotes) * 100)}%
                    </Badge>
                  )}
                </div>
                
                <div className="p-3 bg-gray-50 rounded-md flex flex-col items-center justify-center">
                  <Minus className="h-5 w-5 text-gray-600 mb-1" />
                  <div className="text-gray-700 font-bold text-xl">{votes.abstention}</div>
                  <div className="text-xs text-muted-foreground">Abstention</div>
                  {totalVotes > 0 && (
                    <Badge variant="outline" className="mt-1">
                      {Math.round((votes.abstention / totalVotes) * 100)}%
                    </Badge>
                  )}
                </div>
              </div>
              
              {totalVotes > 0 && (
                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div className="flex h-full">
                    <div 
                      className="h-full bg-green-500"
                      style={{ width: `${(votes.pour / totalVotes) * 100}%` }}
                    ></div>
                    <div 
                      className="h-full bg-red-500"
                      style={{ width: `${(votes.contre / totalVotes) * 100}%` }}
                    ></div>
                    <div 
                      className="h-full bg-gray-400"
                      style={{ width: `${(votes.abstention / totalVotes) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              <div className="text-center mt-2">
                <span className="text-sm">
                  {totalVotes} votes au total
                </span>
                {' • '}
                <span className={`text-sm font-medium ${votes.pour > votes.contre ? 'text-green-600' : 'text-red-600'}`}>
                  {votes.pour > votes.contre ? 'Approuvée' : 'Rejetée'}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button 
            onClick={handleVote}
            disabled={totalVotes === 0}
          >
            Enregistrer le vote
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
