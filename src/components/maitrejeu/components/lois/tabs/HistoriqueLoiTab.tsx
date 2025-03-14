
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { HistoriqueLoiTabProps } from '../types';
import { formatDate, parseGameDate } from '@/utils/timeSystem';
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

  // Sort lois by date (most recent first)
  const sortedLois = [...lois].sort((a, b) => {
    const dateA = getLoiDate(a);
    const dateB = getLoiDate(b);
    return dateB.localeCompare(dateA);
  });

  // Helper function to get the date from different loi formats
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

  // Helper function to get the title
  const getLoiTitle = (loi: Loi): string => {
    return loi.titre || loi.title || '';
  };

  // Helper function to get the author
  const getLoiAuthor = (loi: Loi): string => {
    return loi.auteur || loi.proposeur || loi.proposedBy || '';
  };

  // Helper function to get the category
  const getLoiCategory = (loi: Loi): string => {
    return loi.categorieId || loi.catégorie || loi.category || '';
  };

  // Helper function to get the status
  const getLoiStatus = (loi: Loi): string => {
    return loi.statut || loi.status || loi.état || '';
  };

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
                <span>Votes: <span className="text-green-600 font-medium">{loi.votes?.pour || loi.votesPositifs || loi.votesFor || 0}</span> / <span className="text-red-600 font-medium">{loi.votes?.contre || loi.votesNégatifs || loi.votesAgainst || 0}</span></span>
                <span>Type: {loi.type || "Politique"}</span>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};
