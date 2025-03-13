
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, User } from 'lucide-react';
import { formatMoney } from '@/utils/formatUtils';

interface Loan {
  id: string;
  type: 'lent' | 'borrowed';
  amount: number;
  interest: number;
  counterparty: string;
  startDate: string;
  dueDate: string;
  status: 'active' | 'overdue' | 'paid';
  collateral?: string;
}

export const ActiveLoans: React.FC = () => {
  // Mock data - would come from an API in a real app
  const loans: Loan[] = [
    {
      id: '1',
      type: 'lent',
      amount: 10000,
      interest: 8,
      counterparty: 'Marcus Antonius',
      startDate: '1 Mars 2024',
      dueDate: '1 Septembre 2024',
      status: 'active'
    },
    {
      id: '2',
      type: 'borrowed',
      amount: 25000,
      interest: 12,
      counterparty: 'Crassus',
      startDate: '15 Janvier 2024',
      dueDate: '15 Janvier 2025',
      status: 'active',
      collateral: 'Vignoble de Campanie'
    },
    {
      id: '3',
      type: 'lent',
      amount: 5000,
      interest: 10,
      counterparty: 'Publius Cornelius',
      startDate: '10 Décembre 2023',
      dueDate: '10 Juin 2024',
      status: 'overdue'
    }
  ];
  
  // Calculer les montants totaux
  const totalLent = loans
    .filter(loan => loan.type === 'lent' && loan.status !== 'paid')
    .reduce((sum, loan) => sum + loan.amount, 0);
  
  const totalBorrowed = loans
    .filter(loan => loan.type === 'borrowed' && loan.status !== 'paid')
    .reduce((sum, loan) => sum + loan.amount, 0);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Actif</Badge>;
      case 'overdue':
        return <Badge variant="destructive">En retard</Badge>;
      case 'paid':
        return <Badge variant="success">Remboursé</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };
  
  const handlePayLoan = (id: string) => {
    // This would be implemented in a real app
    alert(`Remboursement du prêt ${id} - fonctionnalité en développement`);
  };

  const handleCollectPayment = (id: string) => {
    // This would be implemented in a real app
    alert(`Collecte du paiement pour le prêt ${id} - fonctionnalité en développement`);
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="bg-blue-50/50 border-blue-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Montant prêté</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">{formatMoney(totalLent)}</div>
            <p className="text-xs text-blue-600">Montant total prêté à d'autres</p>
          </CardContent>
        </Card>
        
        <Card className="bg-amber-50/50 border-amber-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-amber-800">Montant emprunté</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-700">{formatMoney(totalBorrowed)}</div>
            <p className="text-xs text-amber-600">Montant total emprunté à rembourser</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Prêts actifs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Partie</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Intérêt</TableHead>
                <TableHead>Échéance</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loans.map((loan) => (
                <TableRow key={loan.id}>
                  <TableCell>
                    <Badge variant={loan.type === 'lent' ? 'outline' : 'secondary'}>
                      {loan.type === 'lent' ? 'Prêté' : 'Emprunté'}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    {loan.counterparty}
                  </TableCell>
                  <TableCell>{formatMoney(loan.amount)}</TableCell>
                  <TableCell>{loan.interest}%</TableCell>
                  <TableCell>{loan.dueDate}</TableCell>
                  <TableCell>{getStatusBadge(loan.status)}</TableCell>
                  <TableCell className="text-right">
                    {loan.type === 'borrowed' ? (
                      <Button size="sm" onClick={() => handlePayLoan(loan.id)}>
                        <CreditCard className="mr-1 h-3 w-3" />
                        Rembourser
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => handleCollectPayment(loan.id)}>
                        Collecter
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {loans.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                    Aucun prêt actif
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="bg-muted p-4 rounded-md">
        <h3 className="font-medium">À propos des prêts</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Dans la Rome antique, les prêts étaient une activité financière courante, souvent avec des taux 
          d'intérêt variant entre 4% et 12% annuellement. Les patriciens les plus riches faisaient 
          souvent office de banquiers pour d'autres citoyens.
        </p>
      </div>
    </div>
  );
};
