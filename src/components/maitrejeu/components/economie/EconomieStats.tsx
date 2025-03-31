
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingDown, TrendingUp, DollarSign, Wallet, Landmark, AlertTriangle } from 'lucide-react';
import { EconomieStatsProps } from '../../types/economie';

export const EconomieStats: React.FC<EconomieStatsProps> = ({ 
  treasury, 
  economicFactors,
  economieRecords
}) => {
  const getTrendIcon = (value: number) => {
    return value >= 0 ? 
      <TrendingUp className="h-4 w-4 text-green-500" /> : 
      <TrendingDown className="h-4 w-4 text-red-500" />;
  };
  
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(amount);
  };
  
  const getIncomeGrowth = () => {
    if (!treasury.previousBalance) return 0;
    return ((treasury.income - treasury.previousBalance) / treasury.previousBalance) * 100;
  };
  
  // Calcul de l'augmentation du revenu
  const incomeGrowth = getIncomeGrowth();
  const incomeGrowthText = incomeGrowth >= 0 
    ? `+${incomeGrowth.toFixed(1)}%`
    : `${incomeGrowth.toFixed(1)}%`;
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Trésor public
          </CardTitle>
          <Landmark className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatAmount(treasury.balance)} <span className="text-sm font-normal">as</span></div>
          <p className="text-xs text-muted-foreground">
            Balance actuelle du trésor
          </p>
        </CardContent>
        <CardFooter className="p-2">
          {treasury.surplus >= 0 ? (
            <div className="flex items-center text-xs text-green-500">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>Excédent de {formatAmount(treasury.surplus)} as</span>
            </div>
          ) : (
            <div className="flex items-center text-xs text-red-500">
              <TrendingDown className="h-3 w-3 mr-1" />
              <span>Déficit de {formatAmount(Math.abs(treasury.surplus))} as</span>
            </div>
          )}
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Revenus
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatAmount(treasury.income)} <span className="text-sm font-normal">as</span></div>
          <div className="flex items-center pt-1">
            {getTrendIcon(incomeGrowth)}
            <span className={`text-xs ${incomeGrowth >= 0 ? 'text-green-500' : 'text-red-500'} ml-1`}>
              {incomeGrowthText}
            </span>
          </div>
        </CardContent>
        <CardFooter className="p-2">
          <div className="text-xs text-muted-foreground">
            <span className="font-medium">Principales sources:</span> Provinces ({formatAmount(economicFactors.provinceRevenue)} as), 
            Commerce ({formatAmount(economicFactors.tradeRevenue)} as)
          </div>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Dépenses
          </CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatAmount(treasury.expenses)} <span className="text-sm font-normal">as</span></div>
          <p className="text-xs text-muted-foreground pt-1">
            {((treasury.expenses / treasury.income) * 100).toFixed(1)}% du revenu total
          </p>
        </CardContent>
        <CardFooter className="p-2">
          <div className="text-xs text-muted-foreground">
            <span className="font-medium">Principales dépenses:</span> Militaire ({formatAmount(economicFactors.militaryExpense)} as), 
            Administration ({formatAmount(economicFactors.adminExpense)} as)
          </div>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Facteurs économiques
          </CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Inflation</span>
              <span className={`text-sm ${economicFactors.inflation && economicFactors.inflation > 5 ? 'text-red-500' : 'text-green-500'}`}>
                {economicFactors.inflation || 2}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Croissance</span>
              <span className={`text-sm ${economicFactors.growthRate && economicFactors.growthRate < 0 ? 'text-red-500' : 'text-green-500'}`}>
                {economicFactors.growthRate || 2.5}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Taux d'imposition</span>
              <span className="text-sm">
                {economicFactors.taxRate || 8}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
