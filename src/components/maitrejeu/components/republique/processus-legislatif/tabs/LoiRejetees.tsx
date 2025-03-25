
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { Loi } from '@/components/maitrejeu/types/lois';
import { formatGameDateForRender } from '@/components/maitrejeu/components/lois/utils/formatGameDate';

interface LoiRejeteesProps {
  lois: Loi[];
  onViewLoi: (loi: Loi) => void;
  formatSeason: (season: string) => string;
}

export const LoiRejetees: React.FC<LoiRejeteesProps> = ({ lois, onViewLoi, formatSeason }) => {
  return (
    <div className="space-y-4">
      {lois.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          Aucune loi rejetée dans la période actuelle
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Loi</TableHead>
              <TableHead>Proposeur</TableHead>
              <TableHead>Date du rejet</TableHead>
              <TableHead>Votes contre</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lois.map((loi) => (
              <TableRow key={loi.id}>
                <TableCell className="font-medium">
                  {loi.titre || loi.name || loi.title}
                  {loi.catégorie && (
                    <Badge variant="outline" className="ml-2">
                      {loi.catégorie}
                    </Badge>
                  )}
                </TableCell>
                <TableCell>{loi.proposeur || loi.auteur || loi.proposedBy}</TableCell>
                <TableCell>
                  {formatGameDateForRender(loi.date)}
                </TableCell>
                <TableCell>
                  {loi.votes ? loi.votes.contre : (loi.votesNégatifs || loi.votesAgainst || "N/A")}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewLoi(loi)}
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
