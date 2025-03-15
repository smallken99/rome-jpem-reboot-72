
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useMaitreJeu } from '../../context';
import { ArrowDown, ArrowUp, Coins, TrendingDown, TrendingUp } from 'lucide-react';

export const StatsEconomieTab: React.FC = () => {
  const { economieRecords, treasury, economicFactors } = useMaitreJeu();
  
  // Calcul de statistiques économiques
  const revenues = economieRecords
    .filter(r => r.type === 'revenu')
    .reduce((total, r) => total + r.montant, 0);
    
  const depenses = economieRecords
    .filter(r => r.type === 'depense')
    .reduce((total, r) => total + r.montant, 0);
    
  const balance = treasury?.balance || 0;
  const previousBalance = treasury?.previousBalance || 0;
  const balanceChange = balance - previousBalance;
  const balanceChangePercent = previousBalance ? 
    Math.round((balanceChange / Math.abs(previousBalance)) * 100) : 0;
  
  const isBalancePositive = balance >= 0;
  const isBalanceIncreasing = balanceChange > 0;
  
  // Facteurs économiques
  const inflationRate = economicFactors?.inflation || 2;
  const economicGrowth = economicFactors?.growth || 1.5;
  const taxRate = economicFactors?.taxRate || 5;
  
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Situation économique</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Trésor public</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className={`text-2xl font-bold ${isBalancePositive ? 'text-green-600' : 'text-red-600'}`}>
                  {balance.toLocaleString()} As
                </div>
                <div className="text-xs text-muted-foreground">
                  Balance actuelle
                </div>
              </div>
              <div className={`flex items-center ${isBalanceIncreasing ? 'text-green-600' : 'text-red-600'}`}>
                {isBalanceIncreasing ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                <span className="text-sm font-medium">{Math.abs(balanceChangePercent)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Revenus</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{revenues.toLocaleString()} As</div>
            <div className="text-xs text-muted-foreground">Total des revenus</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Dépenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{depenses.toLocaleString()} As</div>
            <div className="text-xs text-muted-foreground">Total des dépenses</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taux d'imposition</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taxRate}%</div>
            <div className="text-xs text-muted-foreground">Taux moyen</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="h-5 w-5" /> Facteurs économiques
            </CardTitle>
            <CardDescription>
              Indicateurs clés de l'économie
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <div className="flex items-center gap-2">
                  {inflationRate > 3 ? 
                    <TrendingUp className="h-4 w-4 text-red-500" /> : 
                    <TrendingDown className="h-4 w-4 text-green-500" />}
                  <span>Inflation</span>
                </div>
                <span className="font-medium">{inflationRate}%</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <div className="flex items-center gap-2">
                  {economicGrowth > 0 ? 
                    <TrendingUp className="h-4 w-4 text-green-500" /> : 
                    <TrendingDown className="h-4 w-4 text-red-500" />}
                  <span>Croissance</span>
                </div>
                <span className="font-medium">{economicGrowth}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Répartition des dépenses</CardTitle>
            <CardDescription>
              Ventilation des coûts par catégorie
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[200px] flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p>Données de répartition disponibles après plus de transactions.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
