
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Traite } from './types';
import { traitesMock } from './data';

interface TraitesListProps {
  searchTerm?: string;
}

export const TraitesList: React.FC<TraitesListProps> = ({ searchTerm = '' }) => {
  // Filter traites based on searchTerm if provided
  const filteredTraites = searchTerm
    ? traitesMock.filter(traite => 
        traite.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        traite.parties.some(party => party.toLowerCase().includes(searchTerm.toLowerCase())) ||
        traite.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : traitesMock;
    
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Parties</TableHead>
          <TableHead>Ratification</TableHead>
          <TableHead>Expiration</TableHead>
          <TableHead>Statut</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredTraites.map(traite => (
          <TableRow key={traite.id}>
            <TableCell className="font-medium">{traite.titre}</TableCell>
            <TableCell>{traite.type}</TableCell>
            <TableCell>{traite.parties.join(', ')}</TableCell>
            <TableCell>{traite.dateSignature}</TableCell>
            <TableCell>{traite.duree || 'Indéterminée'}</TableCell>
            <TableCell>
              <Badge className={
                traite.statut === "Actif" ? "bg-green-500" : 
                traite.statut === "Expiré" ? "bg-gray-500" : 
                traite.statut === "En négociation" ? "bg-yellow-500" : 
                "bg-red-500"
              }>
                {traite.statut}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
