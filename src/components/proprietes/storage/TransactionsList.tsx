
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Plus } from 'lucide-react';
import { Transaction, TransactionsListProps } from './types';
import { dateToGameDate } from '@/components/maitrejeu/types/common';

const getTransactionTypeColor = (type: string) => {
  switch (type) {
    case 'acquisition':
      return 'bg-green-100 text-green-800';
    case 'consumption':
      return 'bg-red-100 text-red-800';
    case 'transfer':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getTransactionTypeLabel = (type: string) => {
  switch (type) {
    case 'acquisition':
      return 'Acquisition';
    case 'consumption':
      return 'Consommation';
    case 'transfer':
      return 'Transfert';
    default:
      return type;
  }
};

const TransactionsList: React.FC<TransactionsListProps> = ({
  searchTerm = '',
  resourceId,
  onTransactionSelect,
  onAddTransaction,
  filters
}) => {
  // Example transactions for demo
  const [transactions, setTransactions] = React.useState<Transaction[]>([
    {
      id: '1',
      resourceId: '1',
      resourceName: 'Blé',
      type: 'acquisition',
      quantity: 200,
      date: new Date(2022, 2, 10),
      responsible: 'Marcus Aurelius',
      source: 'Marché de Rome',
      cost: 500
    },
    {
      id: '2',
      resourceId: '1',
      resourceName: 'Blé',
      type: 'consumption',
      quantity: 50,
      date: new Date(2022, 2, 15),
      responsible: 'Lucius Verus',
      destination: 'Cuisine principale',
      reason: 'Banquet sénatorial'
    },
    {
      id: '3',
      resourceId: '2',
      resourceName: 'Huile d\'olive',
      type: 'transfer',
      quantity: 30,
      date: new Date(2022, 3, 5),
      responsible: 'Claudius Maximus',
      source: 'Cellier principal',
      destination: 'Villa de campagne',
      reason: 'Déplacement saisonnier'
    }
  ]);
  
  // Filter transactions based on search term, resource ID, and filters
  const filteredTransactions = transactions.filter(transaction => {
    // Filter by resource ID if provided
    if (resourceId && transaction.resourceId !== resourceId) {
      return false;
    }
    
    // Search term filter
    if (
      searchTerm && 
      !transaction.resourceName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !transaction.responsible.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    
    // Apply other filters if provided
    if (filters) {
      if (filters.resourceName && transaction.resourceName !== filters.resourceName) {
        return false;
      }
      if (filters.type && transaction.type !== filters.type) {
        return false;
      }
      if (filters.startDate && transaction.date < filters.startDate) {
        return false;
      }
      if (filters.endDate && transaction.date > filters.endDate) {
        return false;
      }
      if (filters.responsible && transaction.responsible !== filters.responsible) {
        return false;
      }
    }
    
    return true;
  });
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Transactions</span>
          {onAddTransaction && (
            <Button onClick={onAddTransaction} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle transaction
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ressource</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Quantité</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Responsable</TableHead>
              <TableHead>Détails</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  Aucune transaction trouvée
                </TableCell>
              </TableRow>
            ) : (
              filteredTransactions.map(transaction => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.resourceName}</TableCell>
                  <TableCell>
                    <Badge className={getTransactionTypeColor(transaction.type)}>
                      {getTransactionTypeLabel(transaction.type)}
                    </Badge>
                  </TableCell>
                  <TableCell>{transaction.quantity}</TableCell>
                  <TableCell>{transaction.date.toLocaleDateString()}</TableCell>
                  <TableCell>{transaction.responsible}</TableCell>
                  <TableCell>
                    {transaction.type === 'acquisition' && transaction.source}
                    {transaction.type === 'consumption' && transaction.destination}
                    {transaction.type === 'transfer' && `${transaction.source} → ${transaction.destination}`}
                  </TableCell>
                  <TableCell className="text-right">
                    {onTransactionSelect && (
                      <Button variant="ghost" size="icon" onClick={() => onTransactionSelect(transaction)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>Total: {filteredTransactions.length} transactions</div>
      </CardFooter>
    </Card>
  );
};

export default TransactionsList;
