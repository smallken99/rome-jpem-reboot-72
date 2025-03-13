
import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { formatMoney } from '@/utils/formatUtils';
import { formatDate } from '@/utils/dateUtils';
import { Transaction } from '@/types/EconomyTypes';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        Aucune transaction récente
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div 
          key={transaction.id} 
          className="flex items-center justify-between py-2 border-b last:border-0"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${transaction.amount >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
              {transaction.amount >= 0 ? (
                <ArrowUp className="h-4 w-4 text-green-600" />
              ) : (
                <ArrowDown className="h-4 w-4 text-red-600" />
              )}
            </div>
            <div>
              <p className="font-medium">{transaction.description}</p>
              <p className="text-sm text-muted-foreground">{formatDate(transaction.date)}</p>
            </div>
          </div>
          <span className={`font-medium ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatMoney(transaction.amount)}
          </span>
        </div>
      ))}
    </div>
  );
};
