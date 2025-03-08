
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, ThumbsUp, ThumbsDown, Clock } from 'lucide-react';
import { formatDate } from '@/utils/formatUtils';
import { Loi, LoisTableProps } from '../types/maitreJeuTypes';
import { useMaitreJeu } from '../context/MaitreJeuContext';
import { toast } from 'sonner';

export const LoisTable: React.FC<LoisTableProps> = ({ lois, searchTerm = '' }) => {
  const { voteLoi, finalizeLoi } = useMaitreJeu();
  const [sortColumn, setSortColumn] = useState<keyof Loi>('titre');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Filter lois based on search term
  const filteredLois = lois.filter(loi => 
    loi.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loi.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort lois based on selected column and direction
  const sortedLois = [...filteredLois].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });
  
  const handleSort = (column: keyof Loi) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };
  
  const handleVote = (loiId: string, vote: 'pour' | 'contre' | 'abstention') => {
    voteLoi(loiId, vote, 1);
    
    if (vote === 'pour') {
      toast.success('Vote POUR enregistré');
    } else if (vote === 'contre') {
      toast.error('Vote CONTRE enregistré');
    } else {
      toast.info('Abstention enregistrée');
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'proposée':
        return 'bg-yellow-500';
      case 'votée':
        return 'bg-green-500';
      case 'rejetée':
        return 'bg-red-500';
      case 'amendée':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  return (
    <div className="relative overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('titre')}
            >
              <div className="flex items-center gap-1">
                <span>Titre</span>
                <ArrowUpDown className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead>Proposée par</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Votes</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedLois.map(loi => (
            <TableRow key={loi.id}>
              <TableCell className="font-medium">{loi.titre}</TableCell>
              <TableCell>{loi.proposeur}</TableCell>
              <TableCell>{loi.date.year} {loi.date.season}</TableCell>
              <TableCell>{loi.catégorie || 'Générale'}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(loi.état || '')}>
                  {loi.état || 'N/A'}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-100">
                    <ThumbsUp className="h-3 w-3 mr-1 text-green-600" /> 
                    {loi.votesPositifs}
                  </Badge>
                  <Badge variant="outline" className="bg-red-100">
                    <ThumbsDown className="h-3 w-3 mr-1 text-red-600" /> 
                    {loi.votesNégatifs}
                  </Badge>
                </div>
              </TableCell>
              <TableCell className="text-right">
                {loi.état === 'proposée' && (
                  <div className="flex items-center justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-green-600 hover:text-green-700 hover:bg-green-100"
                      onClick={() => handleVote(loi.id, 'pour')}
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-red-600 hover:text-red-700 hover:bg-red-100"
                      onClick={() => handleVote(loi.id, 'contre')}
                    >
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                      onClick={() => handleVote(loi.id, 'abstention')}
                    >
                      <Clock className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
          
          {filteredLois.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                Aucune loi trouvée
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
