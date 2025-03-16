
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Filter, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { formatCurrency } from '@/utils/currencyUtils';
import { formatDate } from '@/utils/dateUtils';
import { Badge } from '@/components/ui/badge';
import { EconomieRecord, EconomieSort } from '../../types/economie';

export interface EconomieTableProps {
  records: EconomieRecord[];
  onEdit: (record: EconomieRecord) => void;
  onDelete: (id: string) => void;
  sort: EconomieSort;
  onSortChange: (field: keyof EconomieRecord) => void;
}

export const EconomieTable: React.FC<EconomieTableProps> = ({ 
  records, 
  onEdit, 
  onDelete,
  sort,
  onSortChange
}) => {
  const getSortIcon = (field: keyof EconomieRecord) => {
    if (sort.field !== field) return <ArrowUpDown className="h-4 w-4" />;
    return sort.direction === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
  };

  const getTypeColor = (type: string): string => {
    switch (type) {
      case 'income': return 'text-green-600';
      case 'expense': return 'text-red-600';
      case 'tax': return 'text-blue-600';
      default: return '';
    }
  };

  const getCategoryBadge = (category: string): JSX.Element => {
    let variant: 'default' | 'secondary' | 'destructive' | 'outline' = 'default';
    
    switch (category) {
      case 'Impôts':
        variant = 'default';
        break;
      case 'Armée':
        variant = 'destructive';
        break;
      case 'Construction':
        variant = 'outline';
        break;
      case 'Commerce':
        variant = 'secondary';
        break;
      default:
        variant = 'default';
    }
    
    return <Badge variant={variant}>{category}</Badge>;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">
            <Button 
              variant="ghost" 
              onClick={() => onSortChange('date')}
              className="h-8 px-2 text-xs"
            >
              Date {getSortIcon('date')}
            </Button>
          </TableHead>
          <TableHead className="w-[180px]">
            <Button 
              variant="ghost" 
              onClick={() => onSortChange('description')}
              className="h-8 px-2 text-xs"
            >
              Description {getSortIcon('description')}
            </Button>
          </TableHead>
          <TableHead>
            <Button 
              variant="ghost" 
              onClick={() => onSortChange('category')}
              className="h-8 px-2 text-xs"
            >
              Catégorie {getSortIcon('category')}
            </Button>
          </TableHead>
          <TableHead>
            <Button 
              variant="ghost" 
              onClick={() => onSortChange('source')}
              className="h-8 px-2 text-xs"
            >
              Source {getSortIcon('source')}
            </Button>
          </TableHead>
          <TableHead className="text-right">
            <Button 
              variant="ghost" 
              onClick={() => onSortChange('amount')}
              className="h-8 px-2 text-xs"
            >
              Montant {getSortIcon('amount')}
            </Button>
          </TableHead>
          <TableHead className="w-[100px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {records.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
              Aucune transaction trouvée
            </TableCell>
          </TableRow>
        ) : (
          records.map((record) => (
            <TableRow key={record.id}>
              <TableCell className="font-medium">
                {typeof record.date === 'string' 
                  ? formatDate(new Date(record.date)) 
                  : `${record.date.year} ${record.date.season}`}
              </TableCell>
              <TableCell>{record.description}</TableCell>
              <TableCell>{getCategoryBadge(record.category)}</TableCell>
              <TableCell>{record.source}</TableCell>
              <TableCell className={`text-right font-medium ${getTypeColor(record.type)}`}>
                {record.type === 'expense' ? '-' : ''}{formatCurrency(Math.abs(record.amount))}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onEdit(record)}
                    className="h-8 w-8"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onDelete(record.id)}
                    className="h-8 w-8 text-destructive"
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
