
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Calendar } from 'lucide-react';
import { formatDate } from '@/utils/formatUtils';
import { HistoriqueLoiTabProps } from '../types';

export const HistoriqueLoiTab: React.FC<HistoriqueLoiTabProps> = ({ 
  lois = [], 
  onViewLoi, 
  formatSeason = (season) => season 
}) => {
  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titre</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Proposée par</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Saison</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lois.length > 0 ? (
            lois.map((loi) => (
              <TableRow key={loi.id}>
                <TableCell className="font-medium">{loi.title || loi.titre}</TableCell>
                <TableCell>{loi.date ? formatDate(loi.date) : '-'}</TableCell>
                <TableCell>{loi.proposedBy || loi.proposeur}</TableCell>
                <TableCell>{loi.category || loi.catégorie}</TableCell>
                <TableCell>
                  {loi.date?.season ? formatSeason(loi.date.season) : '-'}
                </TableCell>
                <TableCell>
                  <Badge
                    className={loi.status === 'active' || loi.état === 'Promulguée' 
                      ? 'bg-green-100 text-green-800 border-green-200' 
                      : loi.status === 'rejected' || loi.état === 'rejetée'
                      ? 'bg-red-100 text-red-800 border-red-200'
                      : 'bg-blue-100 text-blue-800 border-blue-200'
                    }
                  >
                    {loi.status || loi.état}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => onViewLoi(loi)}>
                    <Eye className="h-4 w-4 mr-2" /> Voir
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                Aucune loi dans l'historique
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
