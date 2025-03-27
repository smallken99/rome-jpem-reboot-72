
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Star, ArrowUpDown } from 'lucide-react';
import { Loi } from '@/components/maitrejeu/types/lois';
import { formatGameDateForRender } from '@/components/maitrejeu/components/lois/utils/formatGameDate';

interface LoiActivesProps {
  lois: Loi[];
  onViewLoi: (loi: Loi) => void;
}

export const LoiActives: React.FC<LoiActivesProps> = ({ lois, onViewLoi }) => {
  // Filtrer les lois actives (promulguées/en vigueur)
  const loisActives = lois.filter(loi => 
    loi.état === 'Promulguée' || 
    loi.état === 'En vigueur' || 
    loi.status === 'active' || 
    loi.status === 'promulguée'
  );

  if (loisActives.length === 0) {
    return (
      <div className="text-center py-8 border rounded-lg bg-muted/20">
        <p className="text-muted-foreground">Aucune loi active à afficher</p>
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
            <TableHead>Proposeur</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loisActives.map((loi) => (
            <TableRow key={loi.id}>
              <TableCell className="font-medium">
                {loi.titre || loi.title}
              </TableCell>
              <TableCell>
                <Badge variant="outline">
                  {loi.catégorie || loi.category}
                </Badge>
              </TableCell>
              <TableCell>{loi.proposeur || loi.proposedBy || loi.auteur}</TableCell>
              <TableCell>{formatGameDateForRender(loi.date)}</TableCell>
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
