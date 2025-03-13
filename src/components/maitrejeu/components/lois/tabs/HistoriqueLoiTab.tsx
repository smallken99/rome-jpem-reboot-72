
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, History } from 'lucide-react';
import { HistoriqueLoiTabProps } from '../types';

export const HistoriqueLoiTab: React.FC<HistoriqueLoiTabProps> = ({ lois, onViewLoi, formatSeason }) => {
  // Trier les lois par date
  const sortedLois = [...lois].sort((a, b) => {
    const yearA = parseInt(a.dateProposition.split(' ')[0]);
    const yearB = parseInt(b.dateProposition.split(' ')[0]);
    return yearB - yearA; // Ordre décroissant
  });
  
  const getStatusBadge = (statut: string) => {
    switch(statut) {
      case 'proposée':
        return <Badge className="bg-blue-500">Proposée</Badge>;
      case 'en_débat':
        return <Badge className="bg-amber-500">En débat</Badge>;
      case 'votée':
        return <Badge className="bg-purple-500">Votée</Badge>;
      case 'promulguée':
        return <Badge className="bg-green-500">Promulguée</Badge>;
      case 'rejetée':
        return <Badge className="bg-red-500">Rejetée</Badge>;
      default:
        return <Badge>Autre</Badge>;
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Historique des Lois</h3>
        <Badge variant="outline" className="flex items-center">
          <History className="h-3 w-3 mr-1" />
          {lois.length} lois au total
        </Badge>
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
            {sortedLois.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                  Aucune loi dans les archives.
                </TableCell>
              </TableRow>
            ) : (
              sortedLois.map(loi => (
                <TableRow key={loi.id}>
                  <TableCell className="font-medium">{loi.titre}</TableCell>
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
