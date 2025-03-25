
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, ThumbsUp, ThumbsDown, MinusCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Loi } from '@/components/maitrejeu/types/lois';

interface LoiProposeesProps {
  lois: Loi[];
  onViewLoi: (loi: Loi) => void;
  formatSeason: (season: string) => string;
  onVoterPour: (loiId: string) => void;
  onVoterContre: (loiId: string) => void;
  onVoterAbstention: (loiId: string) => void;
}

export const LoiProposees: React.FC<LoiProposeesProps> = ({ 
  lois, 
  onViewLoi, 
  formatSeason, 
  onVoterPour, 
  onVoterContre, 
  onVoterAbstention 
}) => {
  // Calculer le pourcentage de votes positifs
  const calculateProgress = (loi: Loi) => {
    if (!loi.votes) return 0;
    
    const totalVotes = loi.votes.pour + loi.votes.contre + loi.votes.abstention;
    if (totalVotes === 0) return 0;
    
    return Math.round((loi.votes.pour / totalVotes) * 100);
  };
  
  return (
    <div className="space-y-4">
      {lois.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          Aucune loi en cours de proposition
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Loi</TableHead>
              <TableHead>Proposeur</TableHead>
              <TableHead>État</TableHead>
              <TableHead>Votes</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lois.map((loi) => (
              <TableRow key={loi.id}>
                <TableCell className="font-medium">
                  {loi.titre || loi.name}
                  {loi.catégorie && (
                    <Badge variant="outline" className="ml-2">
                      {loi.catégorie}
                    </Badge>
                  )}
                </TableCell>
                <TableCell>{loi.proposeur || loi.auteur}</TableCell>
                <TableCell>
                  <Badge 
                    variant={loi.état === 'En discussion' ? 'outline' : 'secondary'}
                  >
                    {loi.état}
                  </Badge>
                </TableCell>
                <TableCell className="w-[140px]">
                  <div className="space-y-2">
                    <Progress 
                      value={calculateProgress(loi)} 
                      className="h-2"
                    />
                    <div className="text-xs text-muted-foreground">
                      {loi.votes ? (
                        <>
                          Pour: {loi.votes.pour} | 
                          Contre: {loi.votes.contre} | 
                          Abst.: {loi.votes.abstention}
                        </>
                      ) : "Aucun vote"}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewLoi(loi)}
                      className="h-8 w-8 p-0"
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Voir</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onVoterPour(loi.id)}
                      className="h-8 w-8 p-0 text-green-600"
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span className="sr-only">Pour</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onVoterContre(loi.id)}
                      className="h-8 w-8 p-0 text-red-600"
                    >
                      <ThumbsDown className="h-4 w-4" />
                      <span className="sr-only">Contre</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onVoterAbstention(loi.id)}
                      className="h-8 w-8 p-0 text-gray-400"
                    >
                      <MinusCircle className="h-4 w-4" />
                      <span className="sr-only">Abstention</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
