
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ResourceTransaction } from './data/types';

interface TransactionsListProps {
  transactions: ResourceTransaction[];
}

export const TransactionsList: React.FC<TransactionsListProps> = ({ transactions }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Historique des transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Consultez l'historique des achats, ventes et transferts de ressources.
        </p>
        {transactions.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Ressource</TableHead>
                <TableHead>Quantité</TableHead>
                <TableHead>Prix unitaire</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map(transaction => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        transaction.type === 'purchase' ? 'destructive' : 
                        transaction.type === 'sale' ? 'default' : 
                        'secondary'
                      }
                    >
                      {transaction.type === 'purchase' && 'Achat'}
                      {transaction.type === 'sale' && 'Vente'}
                      {transaction.type === 'harvest' && 'Récolte'}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{transaction.resourceName}</TableCell>
                  <TableCell>{transaction.quantity}</TableCell>
                  <TableCell>{transaction.price} as</TableCell>
                  <TableCell className="text-right font-bold">{transaction.total} as</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center p-8">
            <p className="text-muted-foreground">Aucune transaction enregistrée</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
