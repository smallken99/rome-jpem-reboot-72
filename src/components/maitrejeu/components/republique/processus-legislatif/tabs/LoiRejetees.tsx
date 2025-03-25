
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loi } from '@/components/maitrejeu/types/lois';
import { formatGameDateForRender } from '@/components/maitrejeu/components/lois/utils/formatGameDate';
import { Eye, Ban } from 'lucide-react';

interface LoiRejeteesProps {
  lois: Loi[];
  onViewLoi: (loi: Loi) => void;
  onProposerAgain?: (loi: Loi) => void;
}

export const LoiRejetees: React.FC<LoiRejeteesProps> = ({ lois, onViewLoi, onProposerAgain }) => {
  const rejectedLois = lois.filter(
    loi => loi.état === 'Rejetée' || loi.statut === 'rejetée' || loi.status === 'rejected'
  );

  if (rejectedLois.length === 0) {
    return (
      <div className="p-8 text-center">
        <Ban className="h-12 w-12 mx-auto text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">Aucune loi rejetée</h3>
        <p className="text-muted-foreground">Les lois rejetées apparaîtront ici.</p>
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
          <TableHead>Résultat du vote</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rejectedLois.map(loi => (
          <TableRow key={loi.id}>
            <TableCell className="font-medium">{loi.titre || loi.title}</TableCell>
            <TableCell>{loi.proposeur || loi.auteur || loi.proposedBy}</TableCell>
            <TableCell>{formatGameDateForRender(loi.date)}</TableCell>
            <TableCell>
              <div className="flex items-center space-x-1">
                <Badge variant="outline" className="bg-red-100 text-red-800">
                  Rejetée
                </Badge>
                <span className="text-xs text-muted-foreground">
                  ({loi.votesPositifs || loi.votesFor || loi.votes?.pour || 0} pour, {loi.votesNégatifs || loi.votesAgainst || loi.votes?.contre || 0} contre, {loi.votesAbstention || loi.votes?.abstention || 0} abst.)
                </span>
              </div>
            </TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onViewLoi(loi)}
                title="Voir détails"
              >
                <Eye className="h-4 w-4" />
              </Button>
              {onProposerAgain && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onProposerAgain(loi)}
                  title="Proposer à nouveau"
                >
                  Reproposer
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
