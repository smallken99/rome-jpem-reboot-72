
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, ThumbsUp, ThumbsDown } from 'lucide-react';
import { formatDate } from '@/utils/formatUtils';
import { LoisRejeteesTabProps } from '../types';

export const LoisRejeteesTab: React.FC<LoisRejeteesTabProps> = ({ lois, onViewLoi }) => {
  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titre</TableHead>
            <TableHead>Date de décision</TableHead>
            <TableHead>Proposée par</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Résultat du vote</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lois.length > 0 ? (
            lois.map((loi) => (
              <TableRow key={loi.id}>
                <TableCell className="font-medium">{loi.title}</TableCell>
                <TableCell>{formatDate(loi.date)}</TableCell>
                <TableCell>{loi.proposedBy}</TableCell>
                <TableCell>{loi.category}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-100 text-green-800 border-green-200 flex items-center">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      {loi.votesFor || 0}
                    </Badge>
                    <Badge className="bg-red-100 text-red-800 border-red-200 flex items-center">
                      <ThumbsDown className="h-3 w-3 mr-1" />
                      {loi.votesAgainst || 0}
                    </Badge>
                  </div>
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
                Aucune loi rejetée
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
