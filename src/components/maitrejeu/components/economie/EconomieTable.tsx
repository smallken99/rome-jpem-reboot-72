
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { formatDate, formatMoney } from '@/utils/formatUtils';
import { EconomieRecord, EconomieFilter, EconomieSort } from '@/components/maitrejeu/types/economie';
import { useMaitreJeu } from '@/components/maitrejeu/context';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EconomieTableProps {
  records: EconomieRecord[];
  onEdit: (id: string) => void;
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
  const { senateurs, provinces } = useMaitreJeu();
  
  const getSenateurName = (id?: string) => {
    if (!id) return '-';
    const senateur = senateurs.find(s => s.id === id);
    return senateur ? senateur.nom : 'Inconnu';
  };
  
  const getProvinceName = (id?: string) => {
    if (!id) return '-';
    const province = provinces.find(p => p.id === id);
    return province ? province.nom : 'Inconnue';
  };
  
  const renderSortIcon = (field: keyof EconomieRecord) => {
    if (sort.field !== field) return <ArrowUpDown className="ml-2 h-4 w-4" />;
    return sort.direction === 'asc' ? 
      <ArrowUpDown className="ml-2 h-4 w-4 text-primary" /> : 
      <ArrowUpDown className="ml-2 h-4 w-4 text-primary rotate-180" />;
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">
              <Button 
                variant="ghost" 
                onClick={() => onSortChange('date')}
                className="flex items-center font-semibold"
              >
                Date {renderSortIcon('date')}
              </Button>
            </TableHead>
            <TableHead>
              <Button 
                variant="ghost" 
                onClick={() => onSortChange('source')}
                className="flex items-center font-semibold"
              >
                Source {renderSortIcon('source')}
              </Button>
            </TableHead>
            <TableHead>
              <Button 
                variant="ghost" 
                onClick={() => onSortChange('category')}
                className="flex items-center font-semibold"
              >
                Catégorie {renderSortIcon('category')}
              </Button>
            </TableHead>
            <TableHead className="text-right">
              <Button 
                variant="ghost" 
                onClick={() => onSortChange('amount')}
                className="flex items-center font-semibold ml-auto"
              >
                Montant {renderSortIcon('amount')}
              </Button>
            </TableHead>
            <TableHead>Entité affectée</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                Aucune transaction économique trouvée.
              </TableCell>
            </TableRow>
          ) : (
            records.map(record => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">
                  {formatDate(record.date.year, record.date.season)}
                  {record.isRecurring && (
                    <Badge variant="outline" className="ml-2">Récurrent</Badge>
                  )}
                </TableCell>
                <TableCell>{record.source}</TableCell>
                <TableCell>{record.category}</TableCell>
                <TableCell className={`text-right font-semibold ${record.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  {record.type === 'income' ? '+' : '-'}{formatMoney(record.amount)}
                </TableCell>
                <TableCell>
                  {record.affectedSenateurId ? getSenateurName(record.affectedSenateurId) : 
                   record.affectedProvinceId ? getProvinceName(record.affectedProvinceId) : 'Trésor public'}
                </TableCell>
                <TableCell>
                  <Badge variant={record.type === 'income' ? 'default' : 'destructive'}>
                    {record.type === 'income' ? 'Revenu' : 'Dépense'}
                  </Badge>
                </TableCell>
                <TableCell className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => onEdit(record.id)}
                  >
                    Modifier
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => onDelete(record.id)}
                  >
                    Supprimer
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
