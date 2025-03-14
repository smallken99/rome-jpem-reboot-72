
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loi } from '../../types/lois';
import { formatSeasonDisplay } from '@/utils/timeSystem';
import { parseGameDate } from '@/utils/dateConverters';

interface LoisListProps {
  lois: Loi[];
  showActions?: boolean;
  onViewLoi?: (loiId: string) => void;
  onEditLoi?: (loiId: string) => void;
  onVoteLoi?: (loiId: string) => void;
}

export const LoisList: React.FC<LoisListProps> = ({
  lois,
  showActions = true,
  onViewLoi,
  onEditLoi,
  onVoteLoi
}) => {
  const getStatusColor = (status: string = '') => {
    status = status.toLowerCase();
    if (status.includes('activ') || status.includes('promulg')) return 'bg-green-100 text-green-800';
    if (status.includes('rejet')) return 'bg-red-100 text-red-800';
    if (status.includes('propo') || status.includes('délib')) return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-800';
  };
  
  const getCategoryColor = (category: string = '') => {
    category = category.toLowerCase();
    if (category.includes('polit')) return 'bg-purple-100 text-purple-800';
    if (category.includes('écono') || category.includes('econo')) return 'bg-green-100 text-green-800';
    if (category.includes('milit')) return 'bg-red-100 text-red-800';
    if (category.includes('relig')) return 'bg-amber-100 text-amber-800';
    if (category.includes('socia')) return 'bg-pink-100 text-pink-800';
    return 'bg-blue-100 text-blue-800';
  };
  
  const formatDate = (date: string | GameDate | undefined) => {
    if (!date) return 'Date inconnue';
    
    // Convert to GameDate if it's a string
    const gameDate = typeof date === 'string' ? parseGameDate(date) : date;
    
    return `An ${gameDate.year}, ${formatSeasonDisplay(gameDate.season)}`;
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titre</TableHead>
            <TableHead>Proposeur</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>État</TableHead>
            {showActions && <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>

        <TableBody>
          {lois.length === 0 ? (
            <TableRow>
              <TableCell colSpan={showActions ? 6 : 5} className="text-center h-24 text-muted-foreground">
                Aucune loi trouvée
              </TableCell>
            </TableRow>
          ) : (
            lois.map((loi) => (
              <TableRow key={loi.id}>
                <TableCell className="font-medium">
                  {loi.titre || loi.title}
                </TableCell>
                
                <TableCell>{loi.proposeur || loi.proposedBy || loi.auteur}</TableCell>
                
                <TableCell>
                  <Badge className={getCategoryColor(loi.category || loi.catégorie || loi.categorieId)}>
                    {loi.category || loi.catégorie || loi.categorieId}
                  </Badge>
                </TableCell>
                
                <TableCell>{formatDate(loi.date || loi.dateProposition)}</TableCell>
                
                <TableCell>
                  <Badge className={getStatusColor(loi.status || loi.état || loi.statut)}>
                    {loi.status || loi.état || loi.statut}
                  </Badge>
                </TableCell>
                
                {showActions && (
                  <TableCell className="text-right">
                    {onViewLoi && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => onViewLoi(loi.id)}
                      >
                        Voir
                      </Button>
                    )}
                    
                    {onEditLoi && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => onEditLoi(loi.id)}
                      >
                        Modifier
                      </Button>
                    )}
                    
                    {onVoteLoi && (loi.status === 'proposed' || loi.statut === 'proposée' || loi.état === 'En délibération') && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => onVoteLoi(loi.id)}
                      >
                        Voter
                      </Button>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
