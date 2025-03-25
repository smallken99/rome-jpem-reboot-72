
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, CheckCircle } from 'lucide-react';
import { Loi } from '@/components/maitrejeu/types/lois';
import { formatGameDateForRender } from '@/components/maitrejeu/components/lois/utils/formatGameDate';

interface LoiActivesProps {
  lois: Loi[];
  onViewLoi: (loi: Loi) => void;
  formatSeason: (season: string) => string;
  onPromulguer?: (loiId: string) => void;
}

export const LoiActives: React.FC<LoiActivesProps> = ({ lois, onViewLoi, formatSeason, onPromulguer }) => {
  return (
    <div className="space-y-4">
      {lois.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          Aucune loi active dans la période actuelle
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Loi</TableHead>
              <TableHead>Proposeur</TableHead>
              <TableHead>Date d'application</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lois.map((loi) => (
              <TableRow key={loi.id}>
                <TableCell className="font-medium">
                  {loi.titre || loi.title || loi.name}
                  <Badge variant="success" className="ml-2">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    En vigueur
                  </Badge>
                </TableCell>
                <TableCell>{loi.proposeur || loi.auteur || loi.proposedBy}</TableCell>
                <TableCell>
                  {formatGameDateForRender(loi.date)}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{loi.catégorie || loi.category || loi.catégorieId}</Badge>
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
