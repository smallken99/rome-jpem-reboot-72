
import React from 'react';
import { StatBox } from '@/components/ui-custom/StatBox';
import { TrendingUp, TrendingDown, Wallet, Landmark } from 'lucide-react';
import { useEconomy } from '@/hooks/useEconomy';
import { formatMoney, formatPercentage } from '@/utils/formatUtils';

export const EconomieStats: React.FC = () => {
  const economy = useEconomy();
  const stats = economy.economyStats;
  
  // Calculer les transactions récentes pour les tendances
  const recentTransactions = economy.getRecentTransactions(20);
  const recentIncome = recentTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const recentExpenses = recentTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
    
  // Calculer les tendances sur les 3 derniers mois (estimation)
  const incomeTrend = (recentIncome / (stats.monthlyIncome * 3) - 1) * 100;
  const expensesTrend = (recentExpenses / (stats.monthlyExpenses * 3) - 1) * 100;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatBox 
        title="Revenus mensuels" 
        value={formatMoney(stats.monthlyIncome)} 
        description="Évolution récente"
        icon={<TrendingUp className="h-6 w-6" />}
        trend={incomeTrend > 0 ? "up" : incomeTrend < 0 ? "down" : "neutral"}
        trendValue={formatPercentage(Math.abs(incomeTrend))}
      />
      <StatBox 
        title="Dépenses mensuelles" 
        value={formatMoney(stats.monthlyExpenses)} 
        description="Évolution récente"
        icon={<TrendingDown className="h-6 w-6" />}
        trend={expensesTrend > 0 ? "up" : expensesTrend < 0 ? "down" : "neutral"}
        trendValue={formatPercentage(Math.abs(expensesTrend))}
      />
      <StatBox 
        title="Fortune totale" 
        value={formatMoney(economy.balance)} 
        description="Actifs financiers disponibles"
        icon={<Wallet className="h-6 w-6" />}
        trend="neutral"
        trendValue="0%"
      />
      <StatBox 
        title="Impôts annuels" 
        value={formatMoney(stats.annualTaxes)} 
        description={`Taux d'inflation: ${formatPercentage(stats.inflation)}`}
        icon={<Landmark className="h-6 w-6" />}
        trend="up"
        trendValue="-3%"
      />
    </div>
  );
};
