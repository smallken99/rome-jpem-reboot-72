
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Calendar } from 'lucide-react';
import { formatDate } from '@/utils/formatUtils';
import { LoisActivesTabProps } from '../types';

export const LoisActivesTab: React.FC<LoisActivesTabProps> = ({ lois, onViewLoi }) => {
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
          {lois.length > 0 ? (
            lois.map((loi) => (
              <TableRow key={loi.id}>
                <TableCell className="font-medium">{loi.title}</TableCell>
                <TableCell>{loi.implementationDate ? formatDate(loi.implementationDate) : '-'}</TableCell>
                <TableCell>{loi.proposedBy}</TableCell>
                <TableCell>{loi.category}</TableCell>
                <TableCell>
                  {loi.expirationDate ? (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                      {formatDate(loi.expirationDate)}
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
