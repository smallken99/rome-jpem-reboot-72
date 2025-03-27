
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, ThumbsUp, ThumbsDown, Pause } from 'lucide-react';
import { Loi } from '@/components/maitrejeu/types/lois';
import { formatGameDateForRender } from '@/components/maitrejeu/components/lois/utils/formatGameDate';

interface LoiProposeesProps {
  lois: Loi[];
  onViewLoi: (loi: Loi) => void;
  onVoterPour: (loiId: string) => void;
  onVoterContre: (loiId: string) => void;
  onVoterAbstention: (loiId: string) => void;
}

export const LoiProposees: React.FC<LoiProposeesProps> = ({
  lois,
  onViewLoi,
  onVoterPour,
  onVoterContre,
  onVoterAbstention
}) => {
  // Filtrer les lois proposées
  const loisProposees = lois.filter(loi => 
    loi.état === 'Proposée' || 
    loi.état === 'En discussion' || 
    loi.status === 'proposée' || 
    loi.status === 'En délibération'
  );

  if (loisProposees.length === 0) {
    return (
      <div className="text-center py-8 border rounded-lg bg-muted/20">
        <p className="text-muted-foreground">Aucune loi proposée à afficher</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titre</TableHead>
            <TableHead>Proposeur</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-center">Vote</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loisProposees.map((loi) => (
            <TableRow key={loi.id}>
              <TableCell className="font-medium">
                <div className="flex flex-col">
                  <span>{loi.titre || loi.title}</span>
                  <Badge variant="outline" className="mt-1 w-fit">
                    {loi.catégorie || loi.category}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>{loi.proposeur || loi.proposedBy || loi.auteur}</TableCell>
              <TableCell>{formatGameDateForRender(loi.date)}</TableCell>
              <TableCell>
                <div className="flex justify-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onVoterPour(loi.id)}
                  >
                    <ThumbsUp className="h-4 w-4 text-green-600" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onVoterContre(loi.id)}
                  >
                    <ThumbsDown className="h-4 w-4 text-red-600" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onVoterAbstention(loi.id)}
                  >
                    <Pause className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onViewLoi(loi)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
