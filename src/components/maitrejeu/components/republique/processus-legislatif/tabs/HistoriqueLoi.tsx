
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Loi } from '@/components/maitrejeu/types/lois';
import { formatGameDateForRender } from '@/components/maitrejeu/components/lois/utils/formatGameDate';

interface HistoriqueLoiProps {
  lois: Loi[];
  onViewLoi: (loi: Loi) => void;
  formatSeason: (season: string) => string;
}

export const HistoriqueLoi: React.FC<HistoriqueLoiProps> = ({ lois, onViewLoi, formatSeason }) => {
  // Get status badge variant and icon
  const getStatusBadge = (etat: string) => {
    let variant = "outline";
    let icon = <AlertCircle className="h-3 w-3 mr-1" />;
    
    if (etat === "Promulguée" || etat === "En vigueur" || etat === "promulguée" || etat === "active" || etat === "adoptée") {
      variant = "success";
      icon = <CheckCircle className="h-3 w-3 mr-1" />;
    } else if (etat === "Rejetée" || etat === "rejetée" || etat === "rejected") {
      variant = "destructive";
      icon = <XCircle className="h-3 w-3 mr-1" />;
    }
    
    return { variant, icon };
  };
  
  return (
    <div className="space-y-4">
      {lois.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          Aucune loi dans l'historique
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
            {lois.map((loi) => {
              const { variant, icon } = getStatusBadge(loi.état);
              return (
                <TableRow key={loi.id}>
                  <TableCell className="font-medium">
                    {loi.titre || loi.title || loi.name}
                  </TableCell>
                  <TableCell>{loi.proposeur || loi.auteur || loi.proposedBy}</TableCell>
                  <TableCell>
                    {formatGameDateForRender(loi.date)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={variant as any} className="flex items-center">
                      {icon}
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
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
