
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown, Coins, TrendingUp, TrendingDown } from 'lucide-react';
import { useEconomy } from '@/hooks/useEconomy';
import { EconomyStats } from '@/types/EconomyTypes';

export const EconomieStats: React.FC = () => {
  const { economyStats, transactions } = useEconomy();
  
  // Fonction pour obtenir les transactions récentes (les 30 derniers jours)
  const getRecentTransactions = () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return transactions.filter(t => new Date(t.date) >= thirtyDaysAgo);
  };
  
  const recentTransactions = getRecentTransactions();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Revenu Mensuel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{economyStats.monthlyIncome.toLocaleString()} As</div>
            <div className="p-2 bg-green-100 rounded-full">
              <ArrowUp className="h-4 w-4 text-green-600" />
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            +2.5% depuis le mois dernier
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Dépenses Mensuelles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{economyStats.monthlyExpenses.toLocaleString()} As</div>
            <div className="p-2 bg-red-100 rounded-full">
              <ArrowDown className="h-4 w-4 text-red-600" />
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            +3.2% depuis le mois dernier
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Impôts Annuels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{economyStats.annualTaxes.toLocaleString()} As</div>
            <div className="p-2 bg-blue-100 rounded-full">
              <Coins className="h-4 w-4 text-blue-600" />
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Taux d'inflation: {economyStats.inflation.toFixed(1)}%
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Bilan Global</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{economyStats.balance.toLocaleString()} As</div>
            <div className={`p-2 ${economyStats.balance >= 0 ? 'bg-green-100' : 'bg-red-100'} rounded-full`}>
              {economyStats.balance >= 0 
                ? <TrendingUp className="h-4 w-4 text-green-600" />
                : <TrendingDown className="h-4 w-4 text-red-600" />
              }
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {economyStats.balance >= 0 
              ? 'Position financière solide'
              : 'Attention: déficit en cours'
            }
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
