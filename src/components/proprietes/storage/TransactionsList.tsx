
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PropertyTransaction } from '../types/property';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Search, Plus, Filter, ArrowDown, ArrowUp } from 'lucide-react';
import { formatCurrency } from '@/utils/currencyUtils';
import { formatDate } from '@/utils/dateUtils';

interface TransactionsListProps {
  transactions: PropertyTransaction[];
  searchTerm?: string;
  resourceId?: string;
  onTransactionSelect?: (transaction: PropertyTransaction) => void;
  onAddTransaction?: () => void;
  filters?: {
    resourceName?: string;
    type?: string;
    startDate?: Date;
    endDate?: Date;
    responsible?: string;
  };
}

export const TransactionsList: React.FC<TransactionsListProps> = ({
  transactions,
  searchTerm: initialSearchTerm,
  resourceId,
  onTransactionSelect,
  onAddTransaction,
  filters: initialFilters
}) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm || '');
  const [sortField, setSortField] = useState<keyof PropertyTransaction>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filters, setFilters] = useState(initialFilters || {});
  const [filteredTransactions, setFilteredTransactions] = useState<PropertyTransaction[]>([]);

  useEffect(() => {
    let filtered = [...transactions];

    // Filter by resourceId if provided
    if (resourceId) {
      filtered = filtered.filter(t => t.resourceId === resourceId);
    }

    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.resourceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.responsible.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t.reason && t.reason.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply additional filters
    if (filters.resourceName) {
      filtered = filtered.filter(t => t.resourceName === filters.resourceName);
    }
    
    if (filters.type) {
      filtered = filtered.filter(t => t.type === filters.type);
    }
    
    if (filters.startDate) {
      filtered = filtered.filter(t => new Date(t.date) >= new Date(filters.startDate!));
    }
    
    if (filters.endDate) {
      filtered = filtered.filter(t => new Date(t.date) <= new Date(filters.endDate!));
    }
    
    if (filters.responsible) {
      filtered = filtered.filter(t => t.responsible === filters.responsible);
    }

    // Sort the transactions
    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (aValue === bValue) return 0;
      
      const compareResult = aValue < bValue ? -1 : 1;
      return sortDirection === 'asc' ? compareResult : -compareResult;
    });

    setFilteredTransactions(filtered);
  }, [transactions, searchTerm, resourceId, filters, sortField, sortDirection]);

  const handleSort = (field: keyof PropertyTransaction) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: keyof PropertyTransaction) => {
    if (field !== sortField) return null;
    return sortDirection === 'asc' ? <ArrowUp className="h-4 w-4 ml-1" /> : <ArrowDown className="h-4 w-4 ml-1" />;
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Transactions</CardTitle>
        <div className="flex space-x-2">
          {onAddTransaction && (
            <Button size="sm" onClick={onAddTransaction}>
              <Plus className="h-4 w-4 mr-1" /> Ajouter
            </Button>
          )}
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-1" /> Filtrer
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative mb-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher des transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>

        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px] cursor-pointer" onClick={() => handleSort('date')}>
                  <div className="flex items-center">
                    Date {getSortIcon('date')}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('resourceName')}>
                  <div className="flex items-center">
                    Ressource {getSortIcon('resourceName')}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('type')}>
                  <div className="flex items-center">
                    Type {getSortIcon('type')}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer text-right" onClick={() => handleSort('quantity')}>
                  <div className="flex items-center justify-end">
                    Quantité {getSortIcon('quantity')}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer text-right" onClick={() => handleSort('cost')}>
                  <div className="flex items-center justify-end">
                    Coût {getSortIcon('cost')}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('responsible')}>
                  <div className="flex items-center">
                    Responsable {getSortIcon('responsible')}
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map(transaction => (
                  <TableRow 
                    key={transaction.id} 
                    className={onTransactionSelect ? 'cursor-pointer hover:bg-muted' : ''}
                    onClick={() => onTransactionSelect?.(transaction)}
                  >
                    <TableCell>{formatDate(transaction.date)}</TableCell>
                    <TableCell className="font-medium">{transaction.resourceName}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.type === 'acquisition' ? 'bg-green-100 text-green-800' :
                        transaction.type === 'consumption' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {transaction.type === 'acquisition' ? 'Acquisition' :
                         transaction.type === 'consumption' ? 'Consommation' : 'Transfert'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">{transaction.quantity}</TableCell>
                    <TableCell className="text-right">
                      {transaction.cost ? formatCurrency(transaction.cost) : '-'}
                    </TableCell>
                    <TableCell>{transaction.responsible}</TableCell>
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
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="text-sm text-muted-foreground">
          {filteredTransactions.length} transaction(s) trouvée(s)
        </span>
      </CardFooter>
    </Card>
  );
};
