
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Filter, Plus } from 'lucide-react';
import { PropertyTransaction } from '../types/property';
import { format } from 'date-fns';

interface TransactionsListProps {
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
  searchTerm,
  resourceId,
  onTransactionSelect,
  onAddTransaction,
  filters,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [localSearch, setLocalSearch] = useState(searchTerm || '');
  const [transactionType, setTransactionType] = useState<string>('all');
  
  // Mock transaction data - in a real implementation, this would come from a hook or context
  const transactions: PropertyTransaction[] = [
    {
      id: 'tx-1',
      resourceId: 'res-1',
      resourceName: 'Blé',
      type: 'acquisition',
      quantity: 1000,
      date: new Date('2023-07-15'),
      responsible: 'Gaius Servius',
      source: 'Sicile',
      cost: 5000,
      reason: 'Approvisionnement saisonnier'
    },
    {
      id: 'tx-2',
      resourceId: 'res-3',
      resourceName: 'Vin',
      type: 'consumption',
      quantity: 50,
      date: new Date('2023-07-20'),
      responsible: 'Quintus Fabius',
      destination: 'Banquet Sénatorial',
      reason: 'Célébration des victoires en Gaule'
    },
    {
      id: 'tx-3',
      resourceId: 'res-2',
      resourceName: 'Huile d\'olive',
      type: 'transfer',
      quantity: 200,
      date: new Date('2023-07-25'),
      responsible: 'Marcus Tullius',
      source: 'Entrepôt Principal',
      destination: 'Villa Toscane',
      reason: 'Redistribution des stocks'
    }
  ];
  
  // Filter transactions based on search, resource, and type
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = localSearch
      ? transaction.resourceName.toLowerCase().includes(localSearch.toLowerCase()) ||
        transaction.responsible.toLowerCase().includes(localSearch.toLowerCase()) ||
        (transaction.reason && transaction.reason.toLowerCase().includes(localSearch.toLowerCase()))
      : true;
      
    const matchesResource = resourceId
      ? transaction.resourceId === resourceId
      : true;
      
    const matchesType = transactionType !== 'all'
      ? transaction.type === transactionType
      : true;
      
    return matchesSearch && matchesResource && matchesType;
  });
  
  // Pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Transactions</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onAddTransaction}>
            <Plus className="h-4 w-4 mr-1" /> Filtre
          </Button>
          <Button size="sm" onClick={onAddTransaction}>
            <Plus className="h-4 w-4 mr-1" /> Transaction
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher des transactions..."
              className="pl-8"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
          </div>
          <Select
            value={transactionType}
            onValueChange={setTransactionType}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type de transaction" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="acquisition">Acquisition</SelectItem>
              <SelectItem value="consumption">Consommation</SelectItem>
              <SelectItem value="transfer">Transfert</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ressource</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Quantité</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="hidden md:table-cell">Responsable</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTransactions.length > 0 ? (
                paginatedTransactions.map(transaction => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.resourceName}</TableCell>
                    <TableCell>
                      {transaction.type === 'acquisition' && 'Acquisition'}
                      {transaction.type === 'consumption' && 'Consommation'}
                      {transaction.type === 'transfer' && 'Transfert'}
                    </TableCell>
                    <TableCell>{transaction.quantity}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {format(transaction.date, 'dd/MM/yyyy')}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{transaction.responsible}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost" 
                        size="sm"
                        onClick={() => onTransactionSelect?.(transaction)}
                      >
                        Détails
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6">
                    Aucune transaction trouvée
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {totalPages > 1 && (
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={currentPage === index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </CardContent>
    </Card>
  );
};
