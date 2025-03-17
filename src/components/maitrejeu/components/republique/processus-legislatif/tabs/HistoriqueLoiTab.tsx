
import React from 'react';
import { HistoriqueLoi } from '../types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { History, Check, X } from 'lucide-react';

interface HistoriqueLoiTabProps {
  historique: HistoriqueLoi[];
  formatSeason?: (season: string) => string;
  isEditable?: boolean;
}

export const HistoriqueLoiTab: React.FC<HistoriqueLoiTabProps> = ({ 
  historique,
  formatSeason = (s) => s,
  isEditable = false
}) => {
  // Format the votes for display
  const formatVotes = (votes: any): string => {
    if (typeof votes === 'string') return votes;
    
    if (votes && typeof votes === 'object') {
      return `${votes.pour}-${votes.contre}-${votes.abstention}`;
    }
    
    return 'Votes non comptabilisés';
  };

  return (
    <div className="space-y-4">
      {historique.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          Aucune loi dans l'historique
        </div>
      ) : (
        historique.map(loi => (
          <Card key={loi.id} className="overflow-hidden">
            <div className="flex items-start p-4 pb-2">
              <div className="p-2 rounded-full bg-purple-100 mr-3">
                <History className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{loi.titre}</h3>
                    <p className="text-sm text-muted-foreground">
                      Proposé par {loi.auteur} le {loi.date || loi.dateProposition}
                    </p>
                  </div>
                  <Badge className={
                    (loi.resultat === 'Adoptée' || loi.statut === 'adopté') 
                      ? "bg-green-100 text-green-800 flex items-center gap-1" 
                      : "bg-red-100 text-red-800 flex items-center gap-1"
                  }>
                    {(loi.resultat === 'Adoptée' || loi.statut === 'adopté') ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <X className="h-3 w-3" />
                    )}
                    {loi.resultat || loi.statut}
                  </Badge>
                </div>
                <p className="mt-2 text-sm">{loi.description}</p>
                <div className="flex items-center mt-2 text-xs text-muted-foreground">
                  <span className="font-medium">Votes:</span>
                  <span className="ml-1">{formatVotes(loi.votes)}</span>
                </div>
              </div>
            </div>
            <div className="px-4 py-2 bg-muted/10 flex justify-end">
              <Button variant="outline" size="sm">Détails</Button>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};
