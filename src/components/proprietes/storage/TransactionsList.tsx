
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Transaction, TransactionsListProps } from './types';
import { Plus, ArrowUpDown, ArrowDownUp, ArrowLeftRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Données mockées
const mockTransactions: Transaction[] = [
  {
    id: '1',
    resourceId: '1',
    resourceName: 'Blé',
    type: 'acquisition',
    quantity: 100,
    date: new Date('2023-09-01'),
    responsible: 'Quintus Iulius',
    source: 'Marché agricole',
    cost: 1000
  },
  {
    id: '2',
    resourceId: '1',
    resourceName: 'Blé',
    type: 'consumption',
    quantity: 25,
    date: new Date('2023-09-05'),
    responsible: 'Servius Tullius',
    reason: 'Distribution aux clients'
  },
  {
    id: '3',
    resourceId: '2',
    resourceName: 'Vin',
    type: 'transfer',
    quantity: 50,
    date: new Date('2023-08-20'),
    responsible: 'Marcus Antonius',
    source: 'Entrepôt principal',
    destination: 'Cave du Palatin',
    reason: 'Préparation du banquet'
  }
];

export const TransactionsList: React.FC<TransactionsListProps> = ({
  searchTerm = '',
  resourceId,
  onTransactionSelect,
  onAddTransaction,
  filters = {}
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [sortField, setSortField] = useState<keyof Transaction>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Effet de filtrage et tri
  useEffect(() => {
    let filteredTransactions = [...mockTransactions];

    // Filtrage par ressource spécifique
    if (resourceId) {
      filteredTransactions = filteredTransactions.filter(
        transaction => transaction.resourceId === resourceId
      );
    }

    // Filtrage par terme de recherche
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredTransactions = filteredTransactions.filter(transaction =>
        transaction.resourceName.toLowerCase().includes(term) ||
        transaction.responsible.toLowerCase().includes(term) ||
        (transaction.source && transaction.source.toLowerCase().includes(term)) ||
        (transaction.destination && transaction.destination.toLowerCase().includes(term)) ||
        (transaction.reason && transaction.reason.toLowerCase().includes(term))
      );
    }

    // Filtrage par type
    if (filters.type) {
      filteredTransactions = filteredTransactions.filter(
        transaction => transaction.type === filters.type
      );
    }

    // Filtrage par date
    if (filters.startDate) {
      filteredTransactions = filteredTransactions.filter(
        transaction => transaction.date >= filters.startDate!
      );
    }
    if (filters.endDate) {
      filteredTransactions = filteredTransactions.filter(
        transaction => transaction.date <= filters.endDate!
      );
    }

    // Filtrage par responsable
    if (filters.responsible) {
      filteredTransactions = filteredTransactions.filter(
        transaction => transaction.responsible === filters.responsible
      );
    }

    // Tri des transactions
    filteredTransactions.sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[sortField] > b[sortField] ? 1 : -1;
      } else {
        return a[sortField] < b[sortField] ? 1 : -1;
      }
    });

    setTransactions(filteredTransactions);
  }, [searchTerm, resourceId, filters, sortField, sortDirection]);

  // Gestion du tri
  const handleSort = (field: keyof Transaction) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Rendu de l'icône et de la couleur selon le type de transaction
  const renderTransactionType = (type: Transaction['type']) => {
    switch (type) {
      case 'acquisition':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <ArrowDownUp className="h-3 w-3 mr-1" />
            Acquisition
          </Badge>
        );
      case 'consumption':
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            <ArrowDownUp className="h-3 w-3 mr-1 rotate-180" />
            Consommation
          </Badge>
        );
      case 'transfer':
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <ArrowLeftRight className="h-3 w-3 mr-1" />
            Transfert
          </Badge>
        );
      default:
        return type;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Transactions</CardTitle>
        <Button onClick={onAddTransaction} className="gap-1">
          <Plus className="h-4 w-4" />
          <span>Ajouter</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer" onClick={() => handleSort('date')}>
                  Date
                  <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('resourceName')}>
                  Ressource
                  <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('type')}>
                  Type
                  <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('quantity')}>
                  Quantité
                  <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('responsible')}>
                  Responsable
                  <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                </TableHead>
                <TableHead>Détails</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <TableRow 
                    key={transaction.id} 
                    className="cursor-pointer hover:bg-primary/5"
                    onClick={() => onTransactionSelect && onTransactionSelect(transaction)}
                  >
                    <TableCell>{transaction.date.toLocaleDateString()}</TableCell>
                    <TableCell className="font-medium">{transaction.resourceName}</TableCell>
                    <TableCell>{renderTransactionType(transaction.type)}</TableCell>
                    <TableCell>{transaction.quantity}</TableCell>
                    <TableCell>{transaction.responsible}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {transaction.type === 'acquisition' && transaction.source && (
                        <>Source: {transaction.source}</>
                      )}
                      {transaction.type === 'transfer' && (
                        <>{transaction.source} → {transaction.destination}</>
                      )}
                      {transaction.reason && (
                        <>Raison: {transaction.reason}</>
                      )}
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
      </CardContent>
    </Card>
  );
};
