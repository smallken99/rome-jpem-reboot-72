
import React from 'react';
import { Transaction } from '@/types/EconomyTypes';
import { CalendarDays, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        Aucune transaction récente
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction, index) => (
        <div key={transaction.id || index} className="flex items-center justify-between border-b pb-4 last:border-0">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
              {transaction.type === 'income' 
                ? <ArrowUpRight className="h-4 w-4 text-green-600" /> 
                : <ArrowDownLeft className="h-4 w-4 text-red-600" />
              }
            </div>
            <div>
              <div className="font-medium">{transaction.description}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <CalendarDays className="h-3 w-3 mr-1" />
                <span>{new Date(transaction.date).toLocaleDateString()}</span>
                <span className="mx-1">•</span>
                <span>{transaction.category}</span>
              </div>
            </div>
          </div>
          <div className={`font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
            {transaction.type === 'income' ? '+' : '-'}{transaction.amount.toLocaleString()} As
          </div>
        </div>
      ))}
    </div>
  );
};
