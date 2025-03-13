
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, XCircle } from 'lucide-react';
import { LoisRejeteesTabProps } from '../types';

export const LoisRejeteesTab: React.FC<LoisRejeteesTabProps> = ({ lois, onViewLoi }) => {
  const rejectedLois = lois.filter(loi => loi.statut === 'rejetée');
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Lois Rejetées</h3>
        <Badge className="bg-red-500">{rejectedLois.length} lois rejetées</Badge>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Auteur</TableHead>
              <TableHead>Date de Rejet</TableHead>
              <TableHead>Votes Contre</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rejectedLois.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                  Aucune loi rejetée dans les archives.
                </TableCell>
              </TableRow>
            ) : (
              rejectedLois.map(loi => (
                <TableRow key={loi.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <XCircle className="h-4 w-4 mr-2 text-red-500" />
                      {loi.titre}
                    </div>
                  </TableCell>
                  <TableCell>{loi.auteur}</TableCell>
                  <TableCell>{loi.dateVote}</TableCell>
                  <TableCell>{loi.votes?.contre || 0}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => onViewLoi(loi)}>
                      <Eye className="h-4 w-4 mr-2" />
                      Détails
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
