
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, ThumbsUp, ThumbsDown } from 'lucide-react';
import { formatDate } from '@/utils/formatUtils';
import { LoisProposeesTabProps } from '../types';
import { Loi } from '@/components/maitrejeu/types/lois';

export const LoisProposeesTab: React.FC<LoisProposeesTabProps> = ({ lois, onViewLoi }) => {
  // Helper functions to handle different Loi formats
  const getLoiTitle = (loi: Loi): string => {
    return loi.titre || loi.title || '';
  };
  
  const getLoiDate = (loi: Loi): string => {
    if (loi.dateProposition) {
      return typeof loi.dateProposition === 'string' 
        ? loi.dateProposition 
        : formatDate(loi.dateProposition);
    }
    if (loi.date) {
      return typeof loi.date === 'string'
        ? loi.date
        : formatDate(loi.date);
    }
    return '';
  };
  
  const getLoiProposer = (loi: Loi): string => {
    return loi.proposedBy || loi.proposeur || loi.auteur || '';
  };
  
  const getLoiCategory = (loi: Loi): string => {
    return loi.category || loi.catégorie || loi.categorieId || '';
  };
  
  const getLoiVotesFor = (loi: Loi): number => {
    return loi.votesFor || loi.votesPositifs || (loi.votes?.pour || 0);
  };
  
  const getLoiVotesAgainst = (loi: Loi): number => {
    return loi.votesAgainst || loi.votesNégatifs || (loi.votes?.contre || 0);
  };
  
  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titre</TableHead>
            <TableHead>Date de proposition</TableHead>
            <TableHead>Proposée par</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Votes</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lois.length > 0 ? (
            lois.map((loi) => (
              <TableRow key={loi.id}>
                <TableCell className="font-medium">{getLoiTitle(loi)}</TableCell>
                <TableCell>{getLoiDate(loi)}</TableCell>
                <TableCell>{getLoiProposer(loi)}</TableCell>
                <TableCell>{getLoiCategory(loi)}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-100 text-green-800 border-green-200 flex items-center">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      {getLoiVotesFor(loi)}
                    </Badge>
                    <Badge className="bg-red-100 text-red-800 border-red-200 flex items-center">
                      <ThumbsDown className="h-3 w-3 mr-1" />
                      {getLoiVotesAgainst(loi)}
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
                Aucune loi proposée
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
