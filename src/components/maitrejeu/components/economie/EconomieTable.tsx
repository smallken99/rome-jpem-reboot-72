
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { EconomieRecord } from '../../types/economie';
import { formatCurrency } from '@/utils/formatUtils';

interface EconomieTableProps {
  records: EconomieRecord[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const EconomieTable: React.FC<EconomieTableProps> = ({ 
  records, 
  onEdit, 
  onDelete 
}) => {
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'income':
        return <Badge className="bg-green-500">Revenu</Badge>;
      case 'expense':
        return <Badge className="bg-red-500">Dépense</Badge>;
      case 'transfer':
        return <Badge className="bg-blue-500">Transfert</Badge>;
      case 'tax':
        return <Badge className="bg-purple-500">Impôt</Badge>;
      default:
        return <Badge>Autre</Badge>;
    }
  };
  
  const getSourceDisplay = (source: string) => {
    switch(source) {
      case 'treasury':
        return 'Trésor Public';
      case 'province':
        return 'Province';
      case 'trade':
        return 'Commerce';
      case 'tax':
        return 'Taxation';
      default:
        return source;
    }
  };
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Montant</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                Aucun enregistrement économique trouvé.
              </TableCell>
            </TableRow>
          ) : (
            records.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">{record.description}</TableCell>
                <TableCell>{getStatusBadge(record.type)}</TableCell>
                <TableCell>{getSourceDisplay(record.source)}</TableCell>
                <TableCell>{formatCurrency(record.amount)}</TableCell>
                <TableCell>{record.date}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(record.id)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(record.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
