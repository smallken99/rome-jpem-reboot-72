
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { PropertyTransaction, TransactionsListProps } from '../types/property';

/**
 * TransactionsList component for displaying property transactions
 */
export const TransactionsList: React.FC<TransactionsListProps> = ({
  searchTerm: externalSearchTerm,
  resourceId,
  onTransactionSelect,
  onAddTransaction,
  filters = {}
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  
  // Sample transactions data for demonstration
  const transactions: PropertyTransaction[] = [
    {
      id: '1',
      resourceId: 'wheat-001',
      resourceName: 'Blé',
      type: 'acquisition',
      quantity: 100,
      date: new Date(2023, 3, 15),
      responsible: 'Marcus Licinius',
      source: 'Marché de Rome',
      cost: 500
    },
    {
      id: '2',
      resourceId: 'wine-001',
      resourceName: 'Vin',
      type: 'consumption',
      quantity: 20,
      date: new Date(2023, 4, 1),
      responsible: 'Tullia',
      destination: 'Banquet Sénatorial'
    },
    {
      id: '3',
      resourceId: 'olive-oil-001',
      resourceName: 'Huile d\'olive',
      type: 'transfer',
      quantity: 50,
      date: new Date(2023, 4, 12),
      responsible: 'Gaius Marius',
      source: 'Villa Campania',
      destination: 'Domus Rome'
    }
  ];
  
  // Use external search term if provided, otherwise use local state
  const searchTerm = externalSearchTerm !== undefined ? externalSearchTerm : localSearchTerm;
  
  // Filter transactions based on search term and filters
  const filteredTransactions = useMemo(() => {
    let result = [...transactions];
    
    // Apply search term filter
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(t => 
        t.resourceName.toLowerCase().includes(lowerSearch) ||
        t.responsible.toLowerCase().includes(lowerSearch) ||
        (t.source && t.source.toLowerCase().includes(lowerSearch)) ||
        (t.destination && t.destination.toLowerCase().includes(lowerSearch))
      );
    }
    
    // Apply resource ID filter
    if (resourceId) {
      result = result.filter(t => t.resourceId === resourceId);
    }
    
    // Apply additional filters
    if (filters.resourceName) {
      result = result.filter(t => t.resourceName === filters.resourceName);
    }
    
    if (filters.type) {
      result = result.filter(t => t.type === filters.type);
    }
    
    if (filters.startDate) {
      result = result.filter(t => t.date >= filters.startDate!);
    }
    
    if (filters.endDate) {
      result = result.filter(t => t.date <= filters.endDate!);
    }
    
    if (filters.responsible) {
      result = result.filter(t => t.responsible === filters.responsible);
    }
    
    return result;
  }, [transactions, searchTerm, resourceId, filters]);
  
  // Pagination
  const paginatedTransactions = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return filteredTransactions.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTransactions, page, itemsPerPage]);
  
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">
          Transactions ({filteredTransactions.length})
        </CardTitle>
        <div className="flex gap-2">
          <Input
            placeholder="Rechercher..."
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            className="w-[200px]"
          />
          <Button variant="outline" size="sm" onClick={onAddTransaction}>
            Ajouter
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Ressource</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Quantité</TableHead>
              <TableHead>Responsable</TableHead>
              <TableHead>Détails</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTransactions.map(transaction => (
              <TableRow key={transaction.id} onClick={() => onTransactionSelect?.(transaction)} className="cursor-pointer">
                <TableCell>{transaction.date.toLocaleDateString()}</TableCell>
                <TableCell>{transaction.resourceName}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      transaction.type === 'acquisition' ? 'success' :
                      transaction.type === 'consumption' ? 'destructive' : 'outline'
                    }
                  >
                    {transaction.type}
                  </Badge>
                </TableCell>
                <TableCell>{transaction.quantity}</TableCell>
                <TableCell>{transaction.responsible}</TableCell>
                <TableCell>
                  {transaction.source && <div>Source: {transaction.source}</div>}
                  {transaction.destination && <div>Destination: {transaction.destination}</div>}
                  {transaction.cost && <div>Coût: {transaction.cost} As</div>}
                </TableCell>
              </TableRow>
            ))}
            {paginatedTransactions.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                  Aucune transaction trouvée
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(prev => Math.max(1, prev - 1))}
          disabled={page === 1}
        >
          Précédent
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
          disabled={page === totalPages || totalPages === 0}
        >
          Suivant
        </Button>
      </CardFooter>
    </Card>
  );
};

// Add missing Badge import
import { Badge } from '@/components/ui/badge';
