
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatBox } from '@/components/ui-custom/StatBox';
import { Coins, TrendingUp, TrendingDown, Scale } from 'lucide-react';
import { useMaitreJeu } from '@/components/maitrejeu/context';
import { formatMoney } from '@/utils/formatUtils';

export const EconomieStats: React.FC = () => {
  const { economieRecords, treasury } = useMaitreJeu();
  
  const calculateTrend = (current: number, previous: number): { trend: 'up' | 'down' | 'neutral', percentage: string } => {
    if (previous === 0) return { trend: 'neutral', percentage: '0%' };
    
    const diff = current - previous;
    const percentChange = (diff / previous) * 100;
    
    if (Math.abs(percentChange) < 0.5) return { trend: 'neutral', percentage: '0%' };
    return {
      trend: percentChange > 0 ? 'up' : 'down',
      percentage: `${Math.abs(percentChange).toFixed(1)}%`
    };
  };
  
  // Calculer les revenus et dépenses des 2 dernières saisons pour les tendances
  const currentIncome = economieRecords
    .filter(record => record.type === 'income' && 
            record.date.year === treasury.lastUpdated.year && 
            record.date.season === treasury.lastUpdated.season)
    .reduce((sum, record) => sum + record.amount, 0);
    
  const currentExpenses = economieRecords
    .filter(record => record.type === 'expense' && 
            record.date.year === treasury.lastUpdated.year && 
            record.date.season === treasury.lastUpdated.season)
    .reduce((sum, record) => sum + record.amount, 0);
  
  // Obtenir la saison précédente
  const getSeasonAndYear = (year: number, season: string): {year: number, season: string} => {
    const seasons = ['WINTER', 'SPRING', 'SUMMER', 'AUTUMN'];
    const idx = seasons.indexOf(season);
    if (idx <= 0) return { year: year - 1, season: 'AUTUMN' };
    return { year, season: seasons[idx - 1] };
  };
  
  const prevPeriod = getSeasonAndYear(treasury.lastUpdated.year, treasury.lastUpdated.season);
  
  const previousIncome = economieRecords
    .filter(record => record.type === 'income' && 
            record.date.year === prevPeriod.year && 
            record.date.season === prevPeriod.season)
    .reduce((sum, record) => sum + record.amount, 0);
    
  const previousExpenses = economieRecords
    .filter(record => record.type === 'expense' && 
            record.date.year === prevPeriod.year && 
            record.date.season === prevPeriod.season)
    .reduce((sum, record) => sum + record.amount, 0);
  
  const incomeTrend = calculateTrend(currentIncome, previousIncome);
  const expenseTrend = calculateTrend(currentExpenses, previousExpenses);
  const balanceTrend = calculateTrend(treasury.balance, treasury.balance - (currentIncome - currentExpenses));
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatBox
        title="Trésor Public"
        value={formatMoney(treasury.balance)}
        description={`Dernière mise à jour: ${treasury.lastUpdated.season} ${treasury.lastUpdated.year}`}
        icon={<Coins className="h-5 w-5" />}
        trend={balanceTrend.trend}
        trendValue={balanceTrend.percentage}
      />
      
      <StatBox
        title="Revenus (saison actuelle)"
        value={formatMoney(currentIncome)}
        description="Total des revenus de la saison en cours"
        icon={<TrendingUp className="h-5 w-5" />}
        trend={incomeTrend.trend}
        trendValue={incomeTrend.percentage}
      />
      
      <StatBox
        title="Dépenses (saison actuelle)"
        value={formatMoney(currentExpenses)}
        description="Total des dépenses de la saison en cours"
        icon={<TrendingDown className="h-5 w-5" />}
        trend={expenseTrend.trend === 'up' ? 'down' : expenseTrend.trend === 'down' ? 'up' : 'neutral'}
        trendValue={expenseTrend.percentage}
      />
      
      <StatBox
        title="Taux d'inflation"
        value={`${treasury.inflationRate.toFixed(1)}%`}
        description="Impact sur les prix et l'économie"
        icon={<Scale className="h-5 w-5" />}
      />
    </div>
  );
};
