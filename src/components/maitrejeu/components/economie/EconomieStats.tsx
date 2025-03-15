
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMaitreJeu } from '../../context';
import { TrendingDown, TrendingUp, Wallet, Landmark, ArrowRight, CreditCard } from 'lucide-react';

export const EconomieStats: React.FC = () => {
  const { treasury, economicFactors, economieRecords } = useMaitreJeu();
  
  // Calculer les revenus et dépenses totaux
  const totalIncome = economieRecords
    .filter(record => record.type === 'income')
    .reduce((sum, record) => sum + record.amount, 0);
  
  const totalExpense = economieRecords
    .filter(record => record.type === 'expense')
    .reduce((sum, record) => sum + Math.abs(record.amount), 0);
  
  // Calculer la variation par rapport au solde précédent
  const balanceChange = treasury.balance - (treasury.previousBalance || 0);
  const balanceChangePercent = treasury.previousBalance 
    ? Math.round((balanceChange / treasury.previousBalance) * 100) 
    : 0;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Trésor Public</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{treasury.balance.toLocaleString()} As</div>
          <div className="flex items-center mt-1">
            {balanceChange > 0 ? (
              <>
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-xs text-green-500">+{balanceChange.toLocaleString()} As ({balanceChangePercent}%)</span>
              </>
            ) : balanceChange < 0 ? (
              <>
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-xs text-red-500">{balanceChange.toLocaleString()} As ({balanceChangePercent}%)</span>
              </>
            ) : (
              <>
                <ArrowRight className="h-4 w-4 text-muted-foreground mr-1" />
                <span className="text-xs text-muted-foreground">Pas de changement</span>
              </>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Revenus</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalIncome.toLocaleString()} As</div>
          <p className="text-xs text-muted-foreground mt-1">
            {economieRecords.filter(r => r.type === 'income').length} transactions
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Dépenses</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalExpense.toLocaleString()} As</div>
          <p className="text-xs text-muted-foreground mt-1">
            {economieRecords.filter(r => r.type === 'expense').length} transactions
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Inflation</CardTitle>
          <Landmark className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{economicFactors?.inflationRate || 0}%</div>
          <p className="text-xs text-muted-foreground mt-1">
            Croissance: {economicFactors?.growthRate || 0}%
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
