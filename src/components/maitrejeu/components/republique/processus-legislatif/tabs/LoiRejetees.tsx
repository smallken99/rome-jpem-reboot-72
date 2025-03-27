
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';
import { Loi } from '@/components/maitrejeu/types/lois';
import { formatGameDateForRender } from '@/components/maitrejeu/components/lois/utils/formatGameDate';

interface LoiRejeteesProps {
  lois: Loi[];
  onViewLoi: (loi: Loi) => void;
}

export const LoiRejetees: React.FC<LoiRejeteesProps> = ({ lois, onViewLoi }) => {
  // Filtrer les lois rejetées
  const loisRejetees = lois.filter(loi => 
    loi.état === 'Rejetée' || 
    loi.status === 'rejetée' || 
    loi.status === 'rejected'
  );

  if (loisRejetees.length === 0) {
    return (
      <div className="text-center py-8 border rounded-lg bg-muted/20">
        <p className="text-muted-foreground">Aucune loi rejetée à afficher</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titre</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Votes</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loisRejetees.map((loi) => (
            <TableRow key={loi.id}>
              <TableCell className="font-medium">
                {loi.titre || loi.title}
              </TableCell>
              <TableCell>
                <Badge variant="outline">
                  {loi.catégorie || loi.category}
                </Badge>
              </TableCell>
              <TableCell>{formatGameDateForRender(loi.date)}</TableCell>
              <TableCell>
                <div className="text-sm">
                  Pour: {loi.votesPositifs || loi.votes?.pour || 0}, 
                  Contre: {loi.votesNégatifs || loi.votes?.contre || 0}, 
                  Abst.: {loi.votesAbstention || loi.votes?.abstention || 0}
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
