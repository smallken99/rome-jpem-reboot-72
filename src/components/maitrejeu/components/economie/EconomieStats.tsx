import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatBox } from '@/components/ui-custom/StatBox';
import { Coins, TrendingUp, TrendingDown, Scale } from 'lucide-react';
import { useMaitreJeu } from '@/components/maitrejeu/context';
import { formatMoney } from '@/utils/formatUtils';
import { GameDate, parseStringToGameDate } from '@/components/maitrejeu/types/common';

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
  
  // Function to safely parse GameDate from string or use directly
  const parseGameDate = (date: string | GameDate): GameDate => {
    return parseStringToGameDate(date);
  };
  
  // Calculate income and expenses for the last 2 seasons for trends
  const currentIncome = economieRecords
    .filter(record => {
      const recordDate = parseGameDate(record.date);
      const treasuryDate = parseGameDate(treasury.lastUpdated);
      
      return record.type === 'income' && 
        recordDate.year === treasuryDate.year && 
        recordDate.season === treasuryDate.season;
    })
    .reduce((sum, record) => sum + record.amount, 0);
    
  const currentExpenses = economieRecords
    .filter(record => {
      const recordDate = parseGameDate(record.date);
      const treasuryDate = parseGameDate(treasury.lastUpdated);
      
      return record.type === 'expense' && 
        recordDate.year === treasuryDate.year && 
        recordDate.season === treasuryDate.season;
    })
    .reduce((sum, record) => sum + record.amount, 0);
  
  // Get the previous season
  const getSeasonAndYear = (date: GameDate): {year: number, season: string} => {
    const seasons = ['WINTER', 'SPRING', 'SUMMER', 'AUTUMN'];
    const season = String(date.season);
    const idx = seasons.indexOf(season);
    if (idx <= 0) return { year: date.year - 1, season: 'AUTUMN' };
    return { year: date.year, season: seasons[idx - 1] };
  };
  
  const treasuryDate = parseGameDate(treasury.lastUpdated);
  const prevPeriod = getSeasonAndYear(treasuryDate);
  
  const previousIncome = economieRecords
    .filter(record => {
      const recordDate = parseGameDate(record.date);
      
      return record.type === 'income' && 
        recordDate.year === prevPeriod.year && 
        String(recordDate.season) === prevPeriod.season;
    })
    .reduce((sum, record) => sum + record.amount, 0);
    
  const previousExpenses = economieRecords
    .filter(record => {
      const recordDate = parseGameDate(record.date);
      
      return record.type === 'expense' && 
        recordDate.year === prevPeriod.year && 
        String(recordDate.season) === prevPeriod.season;
    })
    .reduce((sum, record) => sum + record.amount, 0);
  
  const incomeTrend = calculateTrend(currentIncome, previousIncome);
  const expenseTrend = calculateTrend(currentExpenses, previousExpenses);
  const balanceTrend = calculateTrend(treasury.balance, treasury.balance - (currentIncome - currentExpenses));
  
  const formatTreasuryDate = () => {
    const date = parseGameDate(treasury.lastUpdated);
    return `${date.season} ${date.year}`;
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatBox
        title="Trésor Public"
        value={formatMoney(treasury.balance)}
        description={`Dernière mise à jour: ${formatTreasuryDate()}`}
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
