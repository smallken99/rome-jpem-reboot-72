
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, FileText } from 'lucide-react';
import { formatCurrency } from '@/utils/formatUtils';

interface Transaction {
  id: string;
  date: string;
  type: 'achat' | 'vente' | 'transfert' | 'récolte';
  resource: string;
  quantity: number;
  price?: number;
  totalValue: number;
  from?: string;
  to: string;
  status: 'complété' | 'en cours' | 'planifié';
}

interface ResourceTransactionsProps {
  searchTerm: string;
}

export const ResourceTransactions: React.FC<ResourceTransactionsProps> = ({ searchTerm }) => {
  // Exemple de données
  const transactions: Transaction[] = [
    {
      id: '1',
      date: '748 AUC, Été',
      type: 'achat',
      resource: 'Blé',
      quantity: 500,
      price: 2,
      totalValue: 1000,
      from: 'Marché de Rome',
      to: 'Entrepôt Principal',
      status: 'complété'
    },
    {
      id: '2',
      date: '748 AUC, Été',
      type: 'vente',
      resource: 'Vin',
      quantity: 50,
      price: 15,
      totalValue: 750,
      from: 'Villa Toscana',
      to: 'Marchand Antonius',
      status: 'complété'
    },
    {
      id: '3',
      date: '748 AUC, Automne',
      type: 'transfert',
      resource: 'Huile d\'olive',
      quantity: 100,
      totalValue: 600,
      from: 'Villa Toscana',
      to: 'Domus Palatinus',
      status: 'en cours'
    },
    {
      id: '4',
      date: '749 AUC, Printemps',
      type: 'récolte',
      resource: 'Olives',
      quantity: 300,
      totalValue: 900,
      to: 'Villa Toscana',
      status: 'planifié'
    }
  ];
  
  // Filtrer les transactions selon le terme de recherche
  const filteredTransactions = transactions.filter(
    transaction => transaction.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (transaction.from && transaction.from.toLowerCase().includes(searchTerm.toLowerCase())) ||
    transaction.to.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Rendu des badges de type de transaction
  const renderTypeBadge = (type: 'achat' | 'vente' | 'transfert' | 'récolte') => {
    switch (type) {
      case 'achat':
        return <Badge className="bg-blue-500">Achat</Badge>;
      case 'vente':
        return <Badge className="bg-green-500">Vente</Badge>;
      case 'transfert':
        return <Badge className="bg-purple-500">Transfert</Badge>;
      case 'récolte':
        return <Badge className="bg-amber-500">Récolte</Badge>;
      default:
        return <Badge>Autre</Badge>;
    }
  };
  
  // Rendu des badges de statut
  const renderStatusBadge = (status: 'complété' | 'en cours' | 'planifié') => {
    switch (status) {
      case 'complété':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Complété</Badge>;
      case 'en cours':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">En cours</Badge>;
      case 'planifié':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">Planifié</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Ressource</TableHead>
            <TableHead>Quantité</TableHead>
            <TableHead>Valeur</TableHead>
            <TableHead>De/Vers</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center h-24 text-muted-foreground">
                Aucune transaction trouvée.
              </TableCell>
            </TableRow>
          ) : (
            filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{renderTypeBadge(transaction.type)}</TableCell>
                <TableCell className="font-medium">{transaction.resource}</TableCell>
                <TableCell>{transaction.quantity} unités</TableCell>
                <TableCell>{formatCurrency(transaction.totalValue)}</TableCell>
                <TableCell>
                  {transaction.type === 'récolte' ? (
                    <span>→ {transaction.to}</span>
                  ) : (
                    <span>{transaction.from} → {transaction.to}</span>
                  )}
                </TableCell>
                <TableCell>{renderStatusBadge(transaction.status)}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => console.log(`View details for transaction ${transaction.id}`)}
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => console.log(`Edit transaction ${transaction.id}`)}
                    disabled={transaction.status === 'complété'}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => console.log(`Delete transaction ${transaction.id}`)}
                    disabled={transaction.status === 'complété'}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
