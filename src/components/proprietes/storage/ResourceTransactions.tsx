
import React from 'react';
import { ResourceTransaction } from '../types';
import { formatDate } from '@/utils/formatUtils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ArrowDownIcon, ArrowUpIcon, ArrowRightIcon } from 'lucide-react';
import { GameDate } from '@/components/maitrejeu/types/common';
import { convertDateToGameDate, parseGameDate } from '@/utils/dateConverters';

interface ResourceTransactionsProps {
  transactions: ResourceTransaction[];
  title?: string;
  maxHeight?: number;
}

export const formatTransactionType = (type: 'achat' | 'vente' | 'transfert') => {
  switch (type) {
    case 'achat':
      return { icon: <ArrowDownIcon className="h-4 w-4 text-red-500" />, label: 'Achat', color: 'bg-red-100 text-red-800 border-red-300' };
    case 'vente':
      return { icon: <ArrowUpIcon className="h-4 w-4 text-green-500" />, label: 'Vente', color: 'bg-green-100 text-green-800 border-green-300' };
    case 'transfert':
      return { icon: <ArrowRightIcon className="h-4 w-4 text-blue-500" />, label: 'Transfert', color: 'bg-blue-100 text-blue-800 border-blue-300' };
  }
};

// Date formatting helper that converts Date to GameDate when needed
const formatTransactionDate = (date: Date | GameDate): string => {
  // If it's a Date object, convert it to GameDate
  if (date instanceof Date) {
    const gameDate = convertDateToGameDate(date);
    return `An ${gameDate.year}, ${gameDate.season}`;
  }
  
  // If it's already a GameDate
  if (typeof date === 'object' && 'year' in date && 'season' in date) {
    return `An ${date.year}, ${date.season}`;
  }
  
  // Fallback
  return formatDate(date as any);
};

export const ResourceTransactions: React.FC<ResourceTransactionsProps> = ({ 
  transactions, 
  title = "Transactions récentes",
  maxHeight
}) => {
  return (
    <Card>
      <CardHeader className="px-4 pt-4 pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pt-0 pb-3">
        <ScrollArea className={maxHeight ? `max-h-[${maxHeight}px]` : "max-h-[300px]"}>
          <div className="space-y-3">
            {transactions.length > 0 ? (
              transactions.map((transaction, index) => {
                const { icon, label, color } = formatTransactionType(transaction.type);
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {icon}
                        <div>
                          <p className="text-sm font-medium">{transaction.resourceName}</p>
                          <p className="text-xs text-gray-500">
                            {formatTransactionDate(transaction.date)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {transaction.type === 'achat' ? '-' : '+'}
                          {transaction.quantity} {transaction.unit}
                        </p>
                        <Badge className={`text-xs ${color}`} variant="outline">
                          {label}
                        </Badge>
                      </div>
                    </div>
                    {index < transactions.length - 1 && <Separator className="my-2" />}
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-center text-gray-500 py-4">
                Aucune transaction récente
              </p>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ResourceTransactions;
