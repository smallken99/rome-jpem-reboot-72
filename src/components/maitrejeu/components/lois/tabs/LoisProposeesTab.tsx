
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Clock, FileText } from 'lucide-react';
import { LoisProposeesTabProps } from '../types';

export const LoisProposeesTab: React.FC<LoisProposeesTabProps> = ({ lois, onViewLoi }) => {
  const proposedLois = lois.filter(loi => loi.statut === 'proposée' || loi.statut === 'en_débat');
  
  const getStatusBadge = (statut: string) => {
    switch(statut) {
      case 'proposée':
        return <Badge className="bg-blue-500">Proposée</Badge>;
      case 'en_débat':
        return <Badge className="bg-amber-500">En débat</Badge>;
      default:
        return <Badge>Autre</Badge>;
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Lois Proposées</h3>
        <Badge className="bg-blue-500">{proposedLois.length} lois en attente</Badge>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Auteur</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date de Proposition</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proposedLois.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                  Aucune loi proposée pour le moment.
                </TableCell>
              </TableRow>
            ) : (
              proposedLois.map(loi => (
                <TableRow key={loi.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      {loi.statut === 'proposée' ? (
                        <FileText className="h-4 w-4 mr-2 text-blue-500" />
                      ) : (
                        <Clock className="h-4 w-4 mr-2 text-amber-500" />
                      )}
                      {loi.titre}
                    </div>
                  </TableCell>
                  <TableCell>{loi.auteur}</TableCell>
                  <TableCell>{getStatusBadge(loi.statut)}</TableCell>
                  <TableCell>{loi.dateProposition}</TableCell>
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
