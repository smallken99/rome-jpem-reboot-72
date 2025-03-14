import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Calendar } from 'lucide-react';
import { formatDate } from '@/utils/formatUtils';
import { LoisActivesTabProps } from '../types';
import { Loi } from '@/components/maitrejeu/types/lois';
import { ensureLoiCompliance } from '../utils/loiAdapter';

export const LoisActivesTab: React.FC<LoisActivesTabProps> = ({ lois, onViewLoi }) => {
  // Helper functions to handle different Loi formats
  const getLoiTitle = (loi: Loi): string => {
    return loi.titre || loi.title || '';
  };
  
  const getLoiImplementationDate = (loi: Loi): string => {
    if (loi.implementationDate) {
      return formatDate(loi.implementationDate);
    }
    return '-';
  };
  
  const getLoiProposer = (loi: Loi): string => {
    return loi.proposedBy || loi.proposeur || loi.auteur || '';
  };
  
  const getLoiCategory = (loi: Loi): string => {
    return loi.category || loi.catégorie || loi.categorieId || '';
  };
  
  const getLoiExpirationDate = (loi: Loi): string | null => {
    if (loi.expirationDate) {
      return formatDate(loi.expirationDate);
    }
    return null;
  };
  
  // Assurer la compatibilité des lois
  const compliantLois = lois.map(loi => ensureLoiCompliance(loi));
  
  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titre</TableHead>
            <TableHead>Date d'implémentation</TableHead>
            <TableHead>Proposée par</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Expiration</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {compliantLois.length > 0 ? (
            compliantLois.map((loi) => (
              <TableRow key={loi.id}>
                <TableCell className="font-medium">{getLoiTitle(loi)}</TableCell>
                <TableCell>{getLoiImplementationDate(loi)}</TableCell>
                <TableCell>{getLoiProposer(loi)}</TableCell>
                <TableCell>{getLoiCategory(loi)}</TableCell>
                <TableCell>
                  {getLoiExpirationDate(loi) ? (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                      {getLoiExpirationDate(loi)}
                    </div>
                  ) : (
                    <Badge variant="outline">Permanente</Badge>
                  )}
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
              <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                Aucune loi active
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
