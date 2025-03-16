
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  CalendarClock, AlertTriangle, CreditCard,
  TrendingUp, Coins, Clock 
} from 'lucide-react';
import { Loan } from './hooks/useLoanManagement';
import { formatCurrency } from '@/utils/currencyUtils';
import { Progress } from '@/components/ui/progress';

interface ActiveLoansProps {
  loans: Loan[];
  onPayment: (loanId: string) => void;
  calculateInterest: (loan: Loan) => number;
  balance: number;
}

export const ActiveLoans: React.FC<ActiveLoansProps> = ({ 
  loans, 
  onPayment, 
  calculateInterest,
  balance 
}) => {
  const isPaymentDueSoon = (loan: Loan): boolean => {
    if (!loan.nextPaymentDue) return false;
    
    const now = new Date();
    const dueDate = new Date(loan.nextPaymentDue);
    const daysDifference = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 3600 * 24));
    
    return daysDifference <= 15; // Less than 15 days until payment is due
  };
  
  // Calculer la somme totale due
  const totalDue = loans.reduce((sum, loan) => {
    return sum + loan.amount * (1 + (loan.interestRate / 100) * loan.duration);
  }, 0);
  
  // Calculer le prochain paiement total
  const nextTotalPayment = loans.reduce((sum, loan) => {
    return sum + calculateInterest(loan);
  }, 0);
  
  return (
    <div className="space-y-6">
      {loans.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            Vous n'avez actuellement aucun prêt actif.
          </p>
          <Button variant="outline">Demander un prêt</Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Coins className="h-4 w-4 mr-2 text-muted-foreground" />
                  Dette Totale
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalDue)}</div>
                <p className="text-xs text-muted-foreground mt-1">Montant total à rembourser (principal + intérêts)</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <CalendarClock className="h-4 w-4 mr-2 text-muted-foreground" />
                  Prochain Paiement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(nextTotalPayment)}</div>
                <p className="text-xs text-muted-foreground mt-1">Montant du prochain paiement trimestriel</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-muted-foreground" />
                  Intérêts Versés
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalDue - loans.reduce((sum, loan) => sum + loan.amount, 0))}</div>
                <p className="text-xs text-muted-foreground mt-1">Montant total des intérêts sur vos prêts</p>
              </CardContent>
            </Card>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Prêteur</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Taux</TableHead>
                <TableHead>Durée</TableHead>
                <TableHead>Progression</TableHead>
                <TableHead>Prochain paiement</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loans.map((loan) => {
                const totalPayments = loan.duration * 4; // 4 paiements par an
                const paymentsMade = totalPayments - loan.remainingPayments;
                const progress = (paymentsMade / totalPayments) * 100;
                const paymentAmount = calculateInterest(loan);
                const paymentDueSoon = isPaymentDueSoon(loan);
                const canMakePayment = balance >= paymentAmount;
                
                return (
                  <TableRow key={loan.id}>
                    <TableCell>
                      <div className="font-medium">{loan.lender}</div>
                      <div className="text-xs text-muted-foreground">{loan.purpose}</div>
                    </TableCell>
                    <TableCell>
                      <div>{formatCurrency(loan.amount)}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{loan.interestRate}%</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{loan.duration} an{loan.duration > 1 ? 's' : ''}</div>
                      <div className="text-xs text-muted-foreground">
                        {paymentsMade}/{totalPayments} paiements
                      </div>
                    </TableCell>
                    <TableCell className="min-w-[150px]">
                      <Progress value={progress} className="h-2" />
                    </TableCell>
                    <TableCell>
                      {loan.nextPaymentDue && (
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            {paymentDueSoon ? (
                              <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                            ) : (
                              <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                            )}
                            <span className={paymentDueSoon ? "text-amber-700" : ""}>
                              {loan.nextPaymentDue.toLocaleDateString()}
                            </span>
                          </div>
                          <div className="font-medium mt-1">
                            {formatCurrency(paymentAmount)}
                          </div>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => onPayment(loan.id)}
                        disabled={!canMakePayment}
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Payer
                      </Button>
                      {!canMakePayment && (
                        <div className="text-xs text-red-500 mt-1">Fonds insuffisants</div>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
};
