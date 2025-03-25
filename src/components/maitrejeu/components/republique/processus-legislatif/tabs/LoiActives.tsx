
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loi } from '@/components/maitrejeu/types/lois';
import { formatGameDateForRender } from '@/components/maitrejeu/components/lois/utils/formatGameDate';
import { Eye, FileText, Ban } from 'lucide-react';

interface LoiActivesProps {
  lois: Loi[];
  onViewLoi: (loi: Loi) => void;
  onVeto?: (loi: Loi) => void;
}

export const LoiActives: React.FC<LoiActivesProps> = ({ lois, onViewLoi, onVeto }) => {
  const activeLois = lois.filter(
    loi => loi.état === 'Promulguée' || loi.état === 'En vigueur' || loi.statut === 'promulguée' || loi.status === 'active'
  );

  if (activeLois.length === 0) {
    return (
      <div className="p-8 text-center">
        <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">Aucune loi active</h3>
        <p className="text-muted-foreground">Les lois promulguées apparaîtront ici.</p>
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
          <TableHead>Statut</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {activeLois.map(loi => (
          <TableRow key={loi.id}>
            <TableCell className="font-medium">{loi.titre || loi.title}</TableCell>
            <TableCell>{loi.proposeur || loi.auteur || loi.proposedBy}</TableCell>
            <TableCell>{formatGameDateForRender(loi.date)}</TableCell>
            <TableCell>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {loi.état || loi.status || loi.statut || "Active"}
              </Badge>
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
              {onVeto && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onVeto(loi)}
                  title="Abroger la loi"
                  className="text-destructive"
                >
                  <Ban className="h-4 w-4" />
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
