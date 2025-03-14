
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { HistoriqueLoiTabProps } from '../types';
import { formatDate, parseGameDate } from '@/utils/timeSystem';

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
    const dateA = a.dateProposition || (a.date ? formatDate(a.date) : '');
    const dateB = b.dateProposition || (b.date ? formatDate(b.date) : '');
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
                  <h3 className="text-lg font-medium">{loi.titre || loi.title}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-sm text-muted-foreground">
                      {formatDate(parseGameDate(loi.dateProposition || loi.date))}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Proposée par {loi.auteur || loi.proposeur || loi.proposedBy}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {loi.categorieId || loi.catégorie || loi.category}
                    </span>
                  </div>
                  <p className="text-sm mt-2 line-clamp-2">
                    {loi.description}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge className={`${getStatusColor(loi.statut || loi.status || loi.état || '')}`}>
                    {loi.statut || mapStatus(loi.status || loi.état || '')}
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
                <span>Votes: <span className="text-green-600 font-medium">{loi.votes?.pour || 0}</span> / <span className="text-red-600 font-medium">{loi.votes?.contre || 0}</span></span>
                <span>Type: {loi.type}</span>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

// Map status to display string
function mapStatus(status: string): string {
  switch (status) {
    case 'proposed': return 'proposée';
    case 'active': return 'promulguée';
    case 'rejected': return 'rejetée';
    case 'expired': return 'expirée';
    default: return status;
  }
}
