
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loi, LoisTableProps } from '../types/maitreJeuTypes';
import { formatDate } from '@/utils/formatUtils';

export const LoisTable: React.FC<LoisTableProps> = ({ 
  lois = [],
  searchTerm = ""
}) => {
  const filteredLois = searchTerm 
    ? lois.filter(loi => 
        loi.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loi.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loi.proposeur.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : lois;
  
  // Fonction pour obtenir le badge de statut approprié
  const getStatusBadge = (statut: string) => {
    switch(statut) {
      case 'proposée':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Proposée</Badge>;
      case 'votée':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Votée</Badge>;
      case 'rejetée':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejetée</Badge>;
      case 'amendée':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Amendée</Badge>;
      default:
        return <Badge variant="outline">Inconnue</Badge>;
    }
  };
  
  // Fonction pour obtenir le badge de catégorie approprié
  const getCategoryBadge = (category: string) => {
    switch(category) {
      case 'politique':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Politique</Badge>;
      case 'économique':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Économique</Badge>;
      case 'militaire':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Militaire</Badge>;
      case 'religieuse':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Religieuse</Badge>;
      case 'sociale':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Sociale</Badge>;
      default:
        return <Badge variant="outline">{category}</Badge>;
    }
  };
  
  return (
    <div className="bg-white rounded-md shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Loi</TableHead>
            <TableHead>Proposée par</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Votes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLois.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                Aucune loi trouvée.
              </TableCell>
            </TableRow>
          ) : (
            filteredLois.map((loi) => (
              <TableRow key={loi.id}>
                <TableCell className="font-medium">{loi.titre}</TableCell>
                <TableCell>{loi.proposeur}</TableCell>
                <TableCell>{formatDate(loi.date.year, loi.date.season, loi.date.day)}</TableCell>
                <TableCell>{getCategoryBadge(loi.catégorie)}</TableCell>
                <TableCell>{getStatusBadge(loi.état)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-green-600 text-sm">
                      +{loi.votesPositifs}
                    </span>
                    <span className="text-red-600 text-sm">
                      -{loi.votesNégatifs}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
