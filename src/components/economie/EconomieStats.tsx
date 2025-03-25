
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { useEconomy } from '@/hooks/useEconomy';
import { formatCurrency } from '@/utils/currencyUtils';

export const EconomieStats: React.FC = () => {
  const { balance, getFinancialStats } = useEconomy();
  const stats = getFinancialStats();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Wallet className="mr-2 h-5 w-5 text-muted-foreground" />
            Solde actuel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">{formatCurrency(balance)}</p>
          <p className="text-sm text-muted-foreground">Trésorerie disponible</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-green-600" />
            Revenus mensuels
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold text-green-600">+{formatCurrency(stats.monthlyIncome)}</p>
          <p className="text-sm text-muted-foreground">Derniers 30 jours</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <TrendingDown className="mr-2 h-5 w-5 text-red-600" />
            Dépenses mensuelles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold text-red-600">-{formatCurrency(stats.monthlyExpenses)}</p>
          <p className="text-sm text-muted-foreground">Derniers 30 jours</p>
        </CardContent>
      </Card>
    </div>
  );
};
