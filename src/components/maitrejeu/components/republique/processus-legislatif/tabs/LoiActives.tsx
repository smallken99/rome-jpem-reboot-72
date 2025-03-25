
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, FileText } from 'lucide-react';
import { Loi } from '@/components/maitrejeu/types/lois';

interface LoiActivesProps {
  lois: Loi[];
  onViewLoi: (loi: Loi) => void;
  formatSeason: (season: string) => string;
  onPromulguer: (loiId: string) => void;
}

export const LoiActives: React.FC<LoiActivesProps> = ({ lois, onViewLoi, formatSeason, onPromulguer }) => {
  return (
    <div className="space-y-4">
      {lois.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          Aucune loi actuellement en vigueur
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Loi</TableHead>
              <TableHead>Proposeur</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>État</TableHead>
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
                  {loi.date && typeof loi.date === 'object' && 'year' in loi.date 
                    ? `${formatSeason(loi.date.season)} ${loi.date.year}`
                    : loi.date}
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={loi.état === 'En vigueur' ? 'default' : 'secondary'}
                  >
                    {loi.état}
                  </Badge>
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
                  {loi.état === 'Adoptée' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onPromulguer(loi.id)}
                      className="h-8 w-8 p-0"
                    >
                      <FileText className="h-4 w-4" />
                      <span className="sr-only">Promulguer</span>
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
