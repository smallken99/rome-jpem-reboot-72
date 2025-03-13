
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatMoney } from '@/utils/formatUtils';

interface TaxPayment {
  id: string;
  date: string;
  amount: number;
  type: 'income' | 'property' | 'wealth';
  status: 'paid' | 'pending' | 'late';
  reference: string;
}

export const TaxHistory: React.FC = () => {
  // Mock data - would come from an API in a real app
  const taxHistory: TaxPayment[] = [
    {
      id: '1',
      date: '15 Mars 2023',
      amount: 5000,
      type: 'property',
      status: 'paid',
      reference: 'TX-PROP-2023-1'
    },
    {
      id: '2',
      date: '1 Juin 2023',
      amount: 3200,
      type: 'income',
      status: 'paid',
      reference: 'TX-INC-2023-2'
    },
    {
      id: '3',
      date: '15 Septembre 2023',
      amount: 5200,
      type: 'property',
      status: 'paid',
      reference: 'TX-PROP-2023-3'
    },
    {
      id: '4',
      date: '1 Décembre 2023',
      amount: 3500,
      type: 'income',
      status: 'paid',
      reference: 'TX-INC-2023-4'
    },
    {
      id: '5',
      date: '15 Mars 2024',
      amount: 5500,
      type: 'property',
      status: 'paid',
      reference: 'TX-PROP-2024-1'
    },
    {
      id: '6',
      date: '1 Juin 2024',
      amount: 3800,
      type: 'income',
      status: 'pending',
      reference: 'TX-INC-2024-2'
    },
  ];
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge variant="success">Payé</Badge>;
      case 'pending':
        return <Badge variant="outline">En attente</Badge>;
      case 'late':
        return <Badge variant="destructive">En retard</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };
  
  const getTaxTypeLabel = (type: string) => {
    switch (type) {
      case 'property':
        return 'Impôt foncier';
      case 'income':
        return 'Impôt sur le revenu';
      case 'wealth':
        return 'Impôt sur la fortune';
      default:
        return 'Autre impôt';
    }
  };
  
  // Calculate totals
  const totalPaid = taxHistory
    .filter(tax => tax.status === 'paid')
    .reduce((sum, tax) => sum + tax.amount, 0);
  
  const totalPending = taxHistory
    .filter(tax => tax.status === 'pending')
    .reduce((sum, tax) => sum + tax.amount, 0);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total des impôts payés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatMoney(totalPaid)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Impôts en attente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatMoney(totalPending)}</div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Historique des paiements d'impôts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Référence</TableHead>
                <TableHead className="text-right">Montant</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {taxHistory.map((tax) => (
                <TableRow key={tax.id}>
                  <TableCell>{tax.date}</TableCell>
                  <TableCell>{getTaxTypeLabel(tax.type)}</TableCell>
                  <TableCell className="font-mono text-sm">{tax.reference}</TableCell>
                  <TableCell className="text-right">{formatMoney(tax.amount)}</TableCell>
                  <TableCell>{getStatusBadge(tax.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
