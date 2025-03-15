
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  ArrowUpDown, 
  ChevronDown, 
  ChevronUp, 
  MoreHorizontal, 
  Pencil, 
  Trash2 
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { EconomieRecord, EconomieSort } from '../../types/economie';

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
  // Fonction pour formater la date
  const formatDate = (date: string | any) => {
    if (typeof date === 'string' && date.includes('T')) {
      // Si c'est une date ISO standard
      return new Date(date).toLocaleDateString('fr-FR');
    } else if (date && typeof date === 'object' && 'year' in date && 'season' in date) {
      // Si c'est un objet GameDate
      const seasonMap: Record<string, string> = {
        'SPRING': 'Printemps',
        'SUMMER': 'Été',
        'AUTUMN': 'Automne',
        'WINTER': 'Hiver',
        'Ver': 'Printemps',
        'Aestas': 'Été',
        'Autumnus': 'Automne',
        'Hiems': 'Hiver'
      };
      
      return `An ${date.year} - ${seasonMap[date.season] || date.season}`;
    }
    
    return 'Date inconnue';
  };
  
  // Fonction pour rendre le type de transaction avec une couleur
  const renderTransactionType = (type: string) => {
    if (type === 'income' || type === 'tax') {
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Revenu</Badge>;
    } else if (type === 'expense') {
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Dépense</Badge>;
    } else {
      return <Badge variant="outline">{type}</Badge>;
    }
  };
  
  // Fonction pour rendre le montant avec couleur
  const renderAmount = (amount: number) => {
    if (amount > 0) {
      return <span className="text-green-600">+{amount.toLocaleString()} As</span>;
    } else if (amount < 0) {
      return <span className="text-red-600">{amount.toLocaleString()} As</span>;
    } else {
      return <span>0 As</span>;
    }
  };
  
  // Fonction pour rendre l'icône de tri
  const renderSortIcon = (field: keyof EconomieRecord) => {
    if (sort.field !== field) return <ArrowUpDown className="h-4 w-4" />;
    return sort.direction === 'asc' ? 
      <ChevronUp className="h-4 w-4" /> : 
      <ChevronDown className="h-4 w-4" />;
  };
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button variant="ghost" size="sm" onClick={() => onSortChange('date')}>
                Date {renderSortIcon('date')}
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" size="sm" onClick={() => onSortChange('description')}>
                Description {renderSortIcon('description')}
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" size="sm" onClick={() => onSortChange('category')}>
                Catégorie {renderSortIcon('category')}
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" size="sm" onClick={() => onSortChange('type')}>
                Type {renderSortIcon('type')}
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" size="sm" onClick={() => onSortChange('amount')}>
                Montant {renderSortIcon('amount')}
              </Button>
            </TableHead>
            <TableHead className="w-[80px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.length > 0 ? (
            records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{formatDate(record.date)}</TableCell>
                <TableCell className="max-w-[300px] truncate">{record.description}</TableCell>
                <TableCell>{record.category}</TableCell>
                <TableCell>{renderTransactionType(record.type)}</TableCell>
                <TableCell>{renderAmount(record.amount)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(record.id)}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDelete(record.id)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                Aucune transaction trouvée.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
