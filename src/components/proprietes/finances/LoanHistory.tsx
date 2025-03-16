
import React from 'react';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  Badge 
} from '@/components/ui/badge';
import { 
  Calendar, Check, Clock, TrendingUp
} from 'lucide-react';
import { LoanHistory as LoanHistoryType } from './hooks/useLoanManagement';
import { formatCurrency } from '@/utils/currencyUtils';

interface LoanHistoryProps {
  loanHistory: LoanHistoryType[];
}

export const LoanHistory: React.FC<LoanHistoryProps> = ({ loanHistory }) => {
  return (
    <div className="space-y-6">
      {loanHistory.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            Vous n'avez pas encore d'historique de prêts.
          </p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Prêteur</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Intérêt</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Total payé</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loanHistory.map((loan) => {
              const interestPaid = loan.totalPaid - loan.amount;
              
              return (
                <TableRow key={loan.id}>
                  <TableCell>
                    <div className="font-medium">{loan.lender}</div>
                  </TableCell>
                  <TableCell>
                    <div>{formatCurrency(loan.amount)}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 text-muted-foreground mr-2" />
                      <span>{loan.interestRate}%</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {formatCurrency(interestPaid)} payés en intérêts
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                      <span>Contracté le {loan.dateIssued.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>Remboursé le {loan.dateRepaid.toLocaleDateString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{formatCurrency(loan.totalPaid)}</div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={loan.status === 'repaid' ? 'outline' : 'destructive'} 
                      className={
                        loan.status === 'repaid' 
                          ? 'bg-green-50 text-green-700 border-green-200' 
                          : ''
                      }
                    >
                      {loan.status === 'repaid' ? (
                        <span className="flex items-center">
                          <Check className="h-3 w-3 mr-1" />
                          Remboursé
                        </span>
                      ) : 'Défaillant'}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
