
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  ChevronDown, 
  ChevronUp, 
  Edit, 
  Trash2,
  ArrowDownUp
} from 'lucide-react';
import { formatDate } from '@/utils/formatUtils';
import { formatCurrency } from '@/utils/currencyUtils';
import { EconomieRecord, EconomieSort, EconomieTableProps } from '../../types/economie';
import { Badge } from '@/components/ui/badge';

export const EconomieTable: React.FC<EconomieTableProps> = ({
  records,
  sort,
  onSortChange,
  onEdit,
  onDelete
}) => {
  const getSortIcon = (field: keyof EconomieRecord) => {
    if (sort.field !== field) return <ArrowDownUp className="h-4 w-4 text-muted-foreground" />;
    return sort.direction === 'asc' ? 
      <ChevronUp className="h-4 w-4" /> : 
      <ChevronDown className="h-4 w-4" />;
  };

  const handleSort = (field: keyof EconomieRecord) => {
    onSortChange(field);
  };

  return (
    <Table>
      <TableCaption>Historique des transactions économiques</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="cursor-pointer" onClick={() => handleSort('date')}>
            <div className="flex items-center gap-1">
              Date {getSortIcon('date')}
            </div>
          </TableHead>
          <TableHead className="cursor-pointer" onClick={() => handleSort('type')}>
            <div className="flex items-center gap-1">
              Type {getSortIcon('type')}
            </div>
          </TableHead>
          <TableHead className="cursor-pointer" onClick={() => handleSort('amount')}>
            <div className="flex items-center gap-1">
              Montant {getSortIcon('amount')}
            </div>
          </TableHead>
          <TableHead className="cursor-pointer" onClick={() => handleSort('category')}>
            <div className="flex items-center gap-1">
              Catégorie {getSortIcon('category')}
            </div>
          </TableHead>
          <TableHead className="cursor-pointer" onClick={() => handleSort('description')}>
            <div className="flex items-center gap-1">
              Description {getSortIcon('description')}
            </div>
          </TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {records.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
              Aucune transaction trouvée
            </TableCell>
          </TableRow>
        ) : (
          records.map((record) => (
            <TableRow key={record.id}>
              <TableCell>
                {typeof record.date === 'string' 
                  ? record.date 
                  : formatDate(record.date)}
              </TableCell>
              <TableCell>
                <Badge 
                  variant={record.type === 'income' ? 'success' : record.type === 'expense' ? 'destructive' : 'outline'}
                >
                  {record.type === 'income' ? 'Revenu' : 
                   record.type === 'expense' ? 'Dépense' : 
                   record.type.charAt(0).toUpperCase() + record.type.slice(1)}
                </Badge>
              </TableCell>
              <TableCell className={record.amount >= 0 ? 'text-green-600' : 'text-red-600'}>
                {formatCurrency(record.amount)}
              </TableCell>
              <TableCell>
                {record.category.charAt(0).toUpperCase() + record.category.slice(1)}
              </TableCell>
              <TableCell className="max-w-sm truncate">
                {record.description}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(record)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(record.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
