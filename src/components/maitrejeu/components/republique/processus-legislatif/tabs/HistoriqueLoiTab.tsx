
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { HistoriqueLoi } from '../types';

interface HistoriqueLoiTabProps {
  historique: HistoriqueLoi[];
  formatSeason: (season: string) => string;
  isEditable: boolean;
}

export const HistoriqueLoiTab: React.FC<HistoriqueLoiTabProps> = ({
  historique,
  formatSeason,
  isEditable
}) => {
  const getResultBadge = (resultat: 'Adoptée' | 'Rejetée') => {
    switch (resultat) {
      case 'Adoptée':
        return <Badge className="bg-green-100 text-green-800">Adoptée</Badge>;
      case 'Rejetée':
        return <Badge className="bg-red-100 text-red-800">Rejetée</Badge>;
      default:
        return <Badge>{resultat}</Badge>;
    }
  };
  
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titre</TableHead>
            <TableHead>Auteur</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Résultat</TableHead>
            <TableHead>Votes (P/C/A)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {historique.map((loi) => (
            <TableRow key={loi.id}>
              <TableCell className="font-medium">{loi.titre}</TableCell>
              <TableCell>{loi.auteur}</TableCell>
              <TableCell>{loi.date}</TableCell>
              <TableCell>{getResultBadge(loi.resultat)}</TableCell>
              <TableCell>{loi.votes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {historique.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>Aucune loi dans l'historique</p>
        </div>
      )}
    </div>
  );
};
