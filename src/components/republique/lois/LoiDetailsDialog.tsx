
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Loi, useLois } from './hooks/useLois';
import { CheckCircle, XCircle, Clock, File, User, Calendar, Tag } from 'lucide-react';

interface LoiDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loi: Loi | null;
  onVote?: (loi: Loi) => void;
  onPromulguer?: (loi: Loi) => void;
}

export const LoiDetailsDialog: React.FC<LoiDetailsDialogProps> = ({
  open,
  onOpenChange,
  loi,
  onVote,
  onPromulguer
}) => {
  const { getCategorie } = useLois();
  
  if (!loi) return null;
  
  const categorie = getCategorie(loi.categorieId);
  
  // Fonction pour obtenir le badge de statut
  const getStatusBadge = (statut: Loi['statut']) => {
    switch(statut) {
      case 'proposée':
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200">Proposée</Badge>;
      case 'en_débat':
        return <Badge className="bg-amber-50 text-amber-700 border-amber-200">En débat</Badge>;
      case 'votée':
        return <Badge className="bg-green-50 text-green-700 border-green-200">Votée</Badge>;
      case 'rejetée':
        return <Badge className="bg-red-50 text-red-700 border-red-200">Rejetée</Badge>;
      case 'promulguée':
        return <Badge className="bg-purple-50 text-purple-700 border-purple-200">Promulguée</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="font-cinzel text-xl flex items-center gap-2">
            {loi.titre}
            {getStatusBadge(loi.statut)}
          </DialogTitle>
          <DialogDescription>
            {categorie?.nom} • {loi.dateProposition}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="p-4 bg-muted/30 rounded-md">
            <p>{loi.description}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Auteur:</span>
                <span className="font-medium">{loi.auteur}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Proposée le:</span>
                <span className="font-medium">{loi.dateProposition}</span>
              </div>
              
              {loi.dateVote && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Votée le:</span>
                  <span className="font-medium">{loi.dateVote}</span>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <File className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Catégorie:</span>
                <span className="font-medium">{categorie?.nom || 'Inconnue'}</span>
              </div>
              
              <div className="flex flex-wrap items-center gap-1 text-sm">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground mr-1">Tags:</span>
                {loi.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                ))}
              </div>
            </div>
          </div>
          
          {loi.votes && (
            <>
              <Separator />
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Résultat du vote</h3>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-2 bg-green-50 rounded-md">
                    <div className="text-green-700 font-bold text-lg">{loi.votes.pour}</div>
                    <div className="text-xs text-muted-foreground">Pour</div>
                  </div>
                  
                  <div className="p-2 bg-red-50 rounded-md">
                    <div className="text-red-700 font-bold text-lg">{loi.votes.contre}</div>
                    <div className="text-xs text-muted-foreground">Contre</div>
                  </div>
                  
                  <div className="p-2 bg-gray-50 rounded-md">
                    <div className="text-gray-700 font-bold text-lg">{loi.votes.abstention}</div>
                    <div className="text-xs text-muted-foreground">Abstention</div>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: `${(loi.votes.pour / (loi.votes.pour + loi.votes.contre + loi.votes.abstention)) * 100}%` }}
                  ></div>
                </div>
                
                <div className="text-xs text-center text-muted-foreground mt-1">
                  {Math.round((loi.votes.pour / (loi.votes.pour + loi.votes.contre + loi.votes.abstention)) * 100)}% d'approbation
                </div>
              </div>
            </>
          )}
        </div>
        
        <DialogFooter className="gap-2">
          <div className="mr-auto">
            {loi.statut === 'proposée' && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                En attente de débat
              </Badge>
            )}
            
            {loi.statut === 'en_débat' && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                En cours de débat
              </Badge>
            )}
          </div>
          
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fermer
          </Button>
          
          {onVote && (loi.statut === 'proposée' || loi.statut === 'en_débat') && (
            <Button onClick={() => onVote(loi)}>
              <Clock className="h-4 w-4 mr-2" />
              Passer au vote
            </Button>
          )}
          
          {onPromulguer && loi.statut === 'votée' && (
            <Button onClick={() => onPromulguer(loi)}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Promulguer
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
