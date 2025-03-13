
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, CheckCircle } from 'lucide-react';
import { LoisActivesTabProps } from '../types';

export const LoisActivesTab: React.FC<LoisActivesTabProps> = ({ lois, onViewLoi }) => {
  const activeLois = lois.filter(loi => loi.statut === 'promulguée');
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Lois Actives</h3>
        <Badge className="bg-green-500">{activeLois.length} lois en vigueur</Badge>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Auteur</TableHead>
              <TableHead>Date de Promulgation</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activeLois.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                  Aucune loi actuellement en vigueur.
                </TableCell>
              </TableRow>
            ) : (
              activeLois.map(loi => (
                <TableRow key={loi.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      {loi.titre}
                    </div>
                  </TableCell>
                  <TableCell>{loi.auteur}</TableCell>
                  <TableCell>{loi.dateVote}</TableCell>
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
