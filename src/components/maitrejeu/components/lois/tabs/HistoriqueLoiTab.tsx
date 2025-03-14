import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { HistoriqueLoiTabProps } from '../types';
import { formatGameDate } from '@/utils/dateConverters';
import { Loi } from '@/components/maitrejeu/types/lois';

export const HistoriqueLoiTab: React.FC<HistoriqueLoiTabProps> = ({ 
  lois, 
  onViewLoi,
  formatSeason 
}) => {
  const getStatusColor = (status: string) => {
    if (status === 'promulguée' || status === 'active') return 'bg-green-100 text-green-800';
    if (status === 'rejetée' || status === 'rejected') return 'bg-red-100 text-red-800';
    if (status === 'proposée' || status === 'proposed') return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getVoteCount = (loi: Loi, type: 'pour' | 'contre' | 'abstention'): number => {
    if (loi.votes && loi.votes[type] !== undefined) {
      return loi.votes[type];
    }
    
    if (type === 'pour' && (loi.votesPositifs !== undefined || loi.votesFor !== undefined)) {
      return loi.votesPositifs || loi.votesFor || 0;
    }
    
    if (type === 'contre' && (loi.votesNégatifs !== undefined || loi.votesAgainst !== undefined)) {
      return loi.votesNégatifs || loi.votesAgainst || 0;
    }
    
    if (type === 'abstention' && loi.votesAbstention !== undefined) {
      return loi.votesAbstention;
    }
    
    return 0;
  };

  const getLoiType = (loi: Loi): string => {
    return loi.type || loi.catégorie || loi.category || 'Politique';
  };

  const getLoiDate = (loi: Loi): string => {
    if (loi.dateProposition) {
      return typeof loi.dateProposition === 'string' 
        ? loi.dateProposition 
        : `${loi.dateProposition.year} ${loi.dateProposition.season}`;
    }
    if (loi.date) {
      return typeof loi.date === 'string'
        ? loi.date
        : `${loi.date.year} ${loi.date.season}`;
    }
    return '';
  };

  const getLoiTitle = (loi: Loi): string => {
    return loi.titre || loi.title || '';
  };

  const getLoiAuthor = (loi: Loi): string => {
    return loi.auteur || loi.proposeur || loi.proposedBy || '';
  };

  const getLoiCategory = (loi: Loi): string => {
    return loi.categorieId || loi.catégorie || loi.category || '';
  };

  const getLoiStatus = (loi: Loi): string => {
    return loi.statut || loi.status || loi.état || '';
  };

  const getVotesFor = (loi: Loi): number => {
    return getVoteCount(loi, 'pour');
  };

  const getVotesAgainst = (loi: Loi): number => {
    return getVoteCount(loi, 'contre');
  };

  const sortedLois = [...lois].sort((a, b) => {
    const dateA = getLoiDate(a);
    const dateB = getLoiDate(b);
    return dateB.localeCompare(dateA);
  });

  return (
    <div className="space-y-4">
      {sortedLois.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            Aucune loi enregistrée.
          </CardContent>
        </Card>
      ) : (
        sortedLois.map((loi) => (
          <Card key={loi.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-medium">{getLoiTitle(loi)}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-sm text-muted-foreground">
                      {getLoiDate(loi)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Proposée par {getLoiAuthor(loi)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {getLoiCategory(loi)}
                    </span>
                  </div>
                  <p className="text-sm mt-2 line-clamp-2">
                    {loi.description}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge className={`${getStatusColor(getLoiStatus(loi))}`}>
                    {getLoiStatus(loi)}
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onViewLoi(loi)}
                  >
                    Voir détails
                  </Button>
                </div>
              </div>
              <Separator className="my-3" />
              <div className="flex justify-between text-xs">
                <span>Votes: <span className="text-green-600 font-medium">{getVotesFor(loi)}</span> / <span className="text-red-600 font-medium">{getVotesAgainst(loi)}</span></span>
                <span>Type: {getLoiType(loi)}</span>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};
