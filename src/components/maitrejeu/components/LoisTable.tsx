
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LoisTableProps } from '../types/maitreJeuTypes';
import { formatRomanDate } from '@/utils/timeSystem';

export const LoisTable: React.FC<LoisTableProps> = ({ lois, onVote }) => {
  const getEtatBadge = (etat: string) => {
    switch (etat) {
      case 'proposée':
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">Proposée</Badge>;
      case 'votée':
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Votée</Badge>;
      case 'rejetée':
        return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Rejetée</Badge>;
      case 'en vigueur':
        return <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">En vigueur</Badge>;
      case 'abrogée':
        return <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">Abrogée</Badge>;
      default:
        return <Badge variant="outline">{etat}</Badge>;
    }
  };
  
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'politique':
        return <Badge className="bg-blue-100 text-blue-800">Politique</Badge>;
      case 'militaire':
        return <Badge className="bg-red-100 text-red-800">Militaire</Badge>;
      case 'économique':
        return <Badge className="bg-green-100 text-green-800">Économique</Badge>;
      case 'religieux':
        return <Badge className="bg-purple-100 text-purple-800">Religieux</Badge>;
      case 'social':
        return <Badge className="bg-orange-100 text-orange-800">Social</Badge>;
      default:
        return <Badge>{category}</Badge>;
    }
  };
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titre</TableHead>
            <TableHead>Proposeur</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>État</TableHead>
            <TableHead className="text-right">Votes Pour/Contre</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lois.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                Aucune loi proposée
              </TableCell>
            </TableRow>
          ) : (
            lois.map((loi) => (
              <TableRow key={loi.id}>
                <TableCell className="font-medium">{loi.titre}</TableCell>
                <TableCell>{loi.proposeur}</TableCell>
                <TableCell>{formatRomanDate(loi.date.year, loi.date.season, loi.date.day)}</TableCell>
                <TableCell>{getCategoryBadge(loi.catégorie)}</TableCell>
                <TableCell>{getEtatBadge(loi.état)}</TableCell>
                <TableCell className="text-right">
                  <span className="text-green-600 font-medium">{loi.votesPositifs}</span>
                  <span className="mx-1">/</span>
                  <span className="text-red-600 font-medium">{loi.votesNégatifs}</span>
                </TableCell>
                <TableCell className="text-right">
                  {loi.état === 'proposée' && onVote && (
                    <div className="flex items-center justify-end gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-green-600 hover:text-green-700 hover:bg-green-50"
                        onClick={() => onVote(loi.id, 'pour', 1)}
                      >
                        Pour
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => onVote(loi.id, 'contre', 1)}
                      >
                        Contre
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                        onClick={() => onVote(loi.id, 'abstention', 1)}
                      >
                        Abstention
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
