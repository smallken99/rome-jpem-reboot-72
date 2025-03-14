
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, RotateCcw, Eye } from 'lucide-react';
import { formatNumber, formatDate } from '@/utils/formatUtils';
import { GameDate } from '@/components/maitrejeu/types/common';

interface Transaction {
  id: string;
  resourceName: string;
  quantity: number;
  type: 'achat' | 'vente' | 'transfert';
  from: string;
  to: string;
  date: GameDate;
  cost?: number;
}

interface TransactionsListProps {
  searchTerm?: string;
}

export const TransactionsList: React.FC<TransactionsListProps> = ({ searchTerm = '' }) => {
  // Données fictives de transactions
  const transactions: Transaction[] = [
    {
      id: '1',
      resourceName: 'Blé',
      quantity: 5000,
      type: 'achat',
      from: 'Marché de Rome',
      to: 'Entrepôt du Tibre',
      date: { year: 752, season: 'Ver' },
      cost: 2500
    },
    {
      id: '2',
      resourceName: 'Vin',
      quantity: 200,
      type: 'vente',
      from: 'Villa Campanie',
      to: 'Marchand de Capoue',
      date: { year: 752, season: 'Aestas' },
      cost: 1800
    },
    {
      id: '3',
      resourceName: 'Huile d\'olive',
      quantity: 150,
      type: 'transfert',
      from: 'Entrepôt du Tibre',
      to: 'Villa Rome',
      date: { year: 751, season: 'Hiems' }
    },
    {
      id: '4',
      resourceName: 'Marbre',
      quantity: 20,
      type: 'achat',
      from: 'Carrière de Luni',
      to: 'Chantier du Temple',
      date: { year: 752, season: 'Autumnus' },
      cost: 4500
    },
    {
      id: '5',
      resourceName: 'Laine',
      quantity: 500,
      type: 'vente',
      from: 'Magasin Rome',
      to: 'Négociant Étranger',
      date: { year: 752, season: 'Ver' },
      cost: 1200
    }
  ];

  // Filtrer les transactions par le terme de recherche
  const filteredTransactions = transactions.filter(transaction =>
    transaction.resourceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.to.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Obtenir la couleur de badge pour le type de transaction
  const getTransactionTypeBadge = (type: string) => {
    switch (type) {
      case 'achat': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'vente': return 'bg-green-100 text-green-800 border-green-200';
      case 'transfert': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Historique des transactions</h3>
        <Button size="sm">
          <RotateCcw className="h-4 w-4 mr-2" /> Nouvelle transaction
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ressource</TableHead>
            <TableHead>
              <div className="flex items-center">
                Quantité
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Origine</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>
              <div className="flex items-center">
                Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.resourceName}</TableCell>
                <TableCell>{formatNumber(transaction.quantity)}</TableCell>
                <TableCell>
                  <Badge className={getTransactionTypeBadge(transaction.type)}>
                    {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>{transaction.from}</TableCell>
                <TableCell>{transaction.to}</TableCell>
                <TableCell>{formatDate(transaction.date)}</TableCell>
                <TableCell className="text-right">
                  <Button size="icon" variant="ghost">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                Aucune transaction trouvée
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
