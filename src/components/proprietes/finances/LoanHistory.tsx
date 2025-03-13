
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatMoney } from '@/utils/formatUtils';

interface LoanRecord {
  id: string;
  type: 'lent' | 'borrowed';
  amount: number;
  interest: number;
  counterparty: string;
  startDate: string;
  endDate: string;
  status: 'paid' | 'defaulted' | 'forgiven';
  notes?: string;
}

export const LoanHistory: React.FC = () => {
  // Mock data - would come from an API in a real app
  const loanHistory: LoanRecord[] = [
    {
      id: '1',
      type: 'lent',
      amount: 8000,
      interest: 6,
      counterparty: 'Titus Flavius',
      startDate: '15 Mars 2022',
      endDate: '20 Octobre 2022',
      status: 'paid'
    },
    {
      id: '2',
      type: 'borrowed',
      amount: 15000,
      interest: 10,
      counterparty: 'Crassus',
      startDate: '1 Avril 2022',
      endDate: '1 Avril 2023',
      status: 'paid',
      notes: 'Remboursé en avance'
    },
    {
      id: '3',
      type: 'lent',
      amount: 3000,
      interest: 8,
      counterparty: 'Lucius Vitellius',
      startDate: '20 Juin 2022',
      endDate: '15 Janvier 2023',
      status: 'defaulted',
      notes: 'Défaut de paiement - procédure légale en cours'
    },
    {
      id: '4',
      type: 'lent',
      amount: 2000,
      interest: 5,
      counterparty: 'Quintus Fabius',
      startDate: '10 Septembre 2022',
      endDate: '10 Mars 2023',
      status: 'forgiven',
      notes: 'Dette pardonnée après service rendu à la famille'
    }
  ];
  
  // Calculer les montants totaux
  const totalLent = loanHistory
    .filter(loan => loan.type === 'lent')
    .reduce((sum, loan) => sum + loan.amount, 0);
  
  const totalBorrowed = loanHistory
    .filter(loan => loan.type === 'borrowed')
    .reduce((sum, loan) => sum + loan.amount, 0);
  
  const totalDefaulted = loanHistory
    .filter(loan => loan.status === 'defaulted')
    .reduce((sum, loan) => sum + loan.amount, 0);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge variant="success">Remboursé</Badge>;
      case 'defaulted':
        return <Badge variant="destructive">Défaut de paiement</Badge>;
      case 'forgiven':
        return <Badge variant="outline">Dette pardonnée</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total prêté (historique)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatMoney(totalLent)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total emprunté (historique)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatMoney(totalBorrowed)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pertes sur défauts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatMoney(totalDefaulted)}</div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Historique des prêts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Partie</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Intérêt</TableHead>
                <TableHead>Période</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loanHistory.map((loan) => (
                <TableRow key={loan.id}>
                  <TableCell>
                    <Badge variant={loan.type === 'lent' ? 'outline' : 'secondary'}>
                      {loan.type === 'lent' ? 'Prêté' : 'Emprunté'}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{loan.counterparty}</TableCell>
                  <TableCell>{formatMoney(loan.amount)}</TableCell>
                  <TableCell>{loan.interest}%</TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {loan.startDate} — {loan.endDate}
                    </span>
                  </TableCell>
                  <TableCell>{getStatusBadge(loan.status)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {loan.notes || '-'}
                  </TableCell>
                </TableRow>
              ))}
              {loanHistory.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                    Aucun historique de prêt
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
