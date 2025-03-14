import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowDownIcon, ArrowUpIcon, Package, RefreshCw } from 'lucide-react';
import { formatDate } from '@/utils/formatUtils';
import { convertDateToGameDate } from '@/utils/dateConverters';

interface ResourceTransaction {
  id: string;
  date: Date;
  resourceName: string;
  type: 'entrée' | 'sortie' | 'transfert';
  quantity: number;
  fromLocation?: string;
  toLocation?: string;
  reason: string;
}

// Sample data
const resourceTransactions: ResourceTransaction[] = [
  { 
    id: '1', 
    date: new Date(2023, 2, 15), 
    resourceName: 'Blé', 
    type: 'entrée', 
    quantity: 1200, 
    toLocation: 'Terres Agricoles', 
    reason: 'Récolte de printemps' 
  },
  { 
    id: '2', 
    date: new Date(2023, 2, 20), 
    resourceName: 'Vin', 
    type: 'sortie', 
    quantity: 300, 
    fromLocation: 'Villa Tusculana', 
    reason: 'Vente au marché' 
  },
  { 
    id: '3', 
    date: new Date(2023, 3, 5), 
    resourceName: 'Huile', 
    type: 'transfert', 
    quantity: 500, 
    fromLocation: 'Entrepôt du Port', 
    toLocation: 'Domus Palatina',
    reason: 'Réorganisation des stocks' 
  },
  { 
    id: '4', 
    date: new Date(2023, 3, 12), 
    resourceName: 'Blé', 
    type: 'sortie', 
    quantity: 800, 
    fromLocation: 'Terres Agricoles', 
    reason: 'Distribution aux clients' 
  },
];

export const ResourceTransactions: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5 text-muted-foreground" />
          Mouvements de Ressources
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Ressource</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Quantité</TableHead>
              <TableHead>Origine/Destination</TableHead>
              <TableHead>Raison</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resourceTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{formatDate(transaction.date)}</TableCell>
                <TableCell className="font-medium">{transaction.resourceName}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      transaction.type === 'entrée' ? 'success' : 
                      transaction.type === 'sortie' ? 'destructive' : 'default'
                    }
                    className="flex items-center gap-1 w-fit"
                  >
                    {transaction.type === 'entrée' && <ArrowDownIcon className="h-3 w-3" />}
                    {transaction.type === 'sortie' && <ArrowUpIcon className="h-3 w-3" />}
                    {transaction.type === 'transfert' && <RefreshCw className="h-3 w-3" />}
                    {transaction.type}
                  </Badge>
                </TableCell>
                <TableCell>{transaction.quantity} unités</TableCell>
                <TableCell>
                  {transaction.type === 'entrée' && <span>→ {transaction.toLocation}</span>}
                  {transaction.type === 'sortie' && <span>{transaction.fromLocation} →</span>}
                  {transaction.type === 'transfert' && <span>{transaction.fromLocation} → {transaction.toLocation}</span>}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{transaction.reason}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
