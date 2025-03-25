
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loi } from '@/components/maitrejeu/types/lois';
import { formatGameDateForRender } from '@/components/maitrejeu/components/lois/utils/formatGameDate';
import { Eye, ThumbsUp, ThumbsDown, Minus } from 'lucide-react';

interface LoiProposeesProps {
  lois: Loi[];
  onViewLoi: (loi: Loi) => void;
  onVoterPour?: (loiId: string) => void;
  onVoterContre?: (loiId: string) => void;
  onVoterAbstention?: (loiId: string) => void;
}

export const LoiProposees: React.FC<LoiProposeesProps> = ({ 
  lois, 
  onViewLoi, 
  onVoterPour, 
  onVoterContre, 
  onVoterAbstention 
}) => {
  const proposedLois = lois.filter(
    loi => loi.état === 'Proposée' || loi.état === 'En discussion' || 
          loi.statut === 'proposée' || loi.status === 'proposed' || 
          loi.statut === 'En délibération'
  );

  if (proposedLois.length === 0) {
    return (
      <div className="p-8 text-center">
        <Eye className="h-12 w-12 mx-auto text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">Aucune loi proposée</h3>
        <p className="text-muted-foreground">Les nouvelles propositions de loi apparaîtront ici.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Titre</TableHead>
          <TableHead>Proposée par</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Catégorie</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {proposedLois.map(loi => (
          <TableRow key={loi.id}>
            <TableCell className="font-medium">{loi.titre || loi.title}</TableCell>
            <TableCell>{loi.proposeur || loi.auteur || loi.proposedBy}</TableCell>
            <TableCell>{formatGameDateForRender(loi.date)}</TableCell>
            <TableCell>
              <Badge variant="outline">
                {loi.catégorie || loi.category || loi.type || "Politique"}
              </Badge>
            </TableCell>
            <TableCell className="text-right space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onViewLoi(loi)}
                title="Voir détails"
              >
                <Eye className="h-4 w-4" />
              </Button>
              {onVoterPour && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onVoterPour(loi.id)}
                  title="Voter pour"
                  className="text-green-600"
                >
                  <ThumbsUp className="h-4 w-4" />
                </Button>
              )}
              {onVoterContre && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onVoterContre(loi.id)}
                  title="Voter contre"
                  className="text-destructive"
                >
                  <ThumbsDown className="h-4 w-4" />
                </Button>
              )}
              {onVoterAbstention && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onVoterAbstention(loi.id)}
                  title="S'abstenir"
                  className="text-muted-foreground"
                >
                  <Minus className="h-4 w-4" />
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
