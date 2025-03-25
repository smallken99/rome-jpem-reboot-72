
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, ThumbsUp, ThumbsDown, MinusCircle } from 'lucide-react';
import { Loi } from '@/components/maitrejeu/types/lois';

interface LoiProposeesProps {
  lois: Loi[];
  onViewLoi: (loi: Loi) => void;
  formatSeason: (season: string) => string;
  onVoterPour?: (loiId: string) => void;
  onVoterContre?: (loiId: string) => void;
  onVoterAbstention?: (loiId: string) => void;
}

export const LoiProposees: React.FC<LoiProposeesProps> = ({ 
  lois, 
  onViewLoi, 
  formatSeason, 
  onVoterPour,
  onVoterContre,
  onVoterAbstention
}) => {
  // Format date function
  const formatDate = (date: any): string => {
    if (!date) return "-";
    if (typeof date === 'string') return date;
    if (typeof date === 'object' && 'year' in date && 'season' in date) {
      return `${formatSeason(date.season)} ${date.year}`;
    }
    return "-";
  };
  
  return (
    <div className="space-y-4">
      {lois.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          Aucune loi proposée dans la période actuelle
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Loi</TableHead>
              <TableHead>Proposeur</TableHead>
              <TableHead>Date de proposition</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lois.map((loi) => (
              <TableRow key={loi.id}>
                <TableCell className="font-medium">
                  {loi.titre || loi.title || loi.name}
                  <Badge variant="secondary" className="ml-2">
                    Proposée
                  </Badge>
                </TableCell>
                <TableCell>{loi.proposeur || loi.auteur || loi.proposedBy}</TableCell>
                <TableCell>
                  {formatDate(loi.dateProposition || loi.date)}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{loi.catégorie || loi.category || loi.catégorieId}</Badge>
                </TableCell>
                <TableCell className="text-right flex items-center justify-end gap-1">
                  {onVoterPour && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onVoterPour(loi.id)}
                      title="Voter pour"
                      className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span className="sr-only">Pour</span>
                    </Button>
                  )}
                  
                  {onVoterContre && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onVoterContre(loi.id)}
                      title="Voter contre"
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <ThumbsDown className="h-4 w-4" />
                      <span className="sr-only">Contre</span>
                    </Button>
                  )}
                  
                  {onVoterAbstention && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onVoterAbstention(loi.id)}
                      title="S'abstenir"
                      className="h-8 w-8 p-0 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                    >
                      <MinusCircle className="h-4 w-4" />
                      <span className="sr-only">Abstention</span>
                    </Button>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewLoi(loi)}
                    title="Voir les détails"
                    className="h-8 w-8 p-0"
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">Voir</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
