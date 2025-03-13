
import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useEconomy } from '@/hooks/useEconomy';

export const TresorTable: React.FC = () => {
  const { transactions } = useEconomy();
  
  const formatTransactionDate = (dateInput: string | Date): string => {
    try {
      const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
      return format(date, 'dd MMM yyyy', { locale: fr });
    } catch (error) {
      return 'Date invalide';
    }
  };
  
  return (
    <div className="mt-6 overflow-hidden border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Montant</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                Aucune transaction à afficher
              </TableCell>
            </TableRow>
          ) : (
            transactions.slice(0, 10).map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{formatTransactionDate(transaction.date)}</TableCell>
                <TableCell>
                  <Badge variant={transaction.type === 'income' ? 'success' : 'destructive'} className="capitalize">
                    {transaction.type === 'income' ? 'Revenus' : 'Dépenses'}
                  </Badge>
                </TableCell>
                <TableCell className={transaction.type === 'income' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                  {transaction.type === 'income' ? '+' : '-'}{transaction.amount.toLocaleString()} As
                </TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell className="max-w-xs truncate">{transaction.description}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
