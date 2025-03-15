import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMaitreJeu } from '../../context';
import { BarChart, PieChart } from 'lucide-react';

export const StatsEconomieTab: React.FC = () => {
  const { economieRecords, treasury, economicFactors } = useMaitreJeu();
  
  const revenus = economieRecords.filter(r => r.type === "income").reduce((sum, r) => sum + r.amount, 0);
  const depenses = economieRecords.filter(r => r.type === "expense").reduce((sum, r) => sum + Math.abs(r.amount), 0);
  const impots = economieRecords.filter(r => r.type === "income" && r.category === "Impôts").reduce((sum, r) => sum + r.amount, 0);
  
  const balancePrecedente = treasury.previousBalance || (treasury.balance - (revenus - depenses));
  const variationBalance = treasury.balance - balancePrecedente;
  
  const donneesRevenues = [
    { name: 'Impôts', value: impots },
    { name: 'Commerce', value: economieRecords.filter(r => r.type === "income" && r.category === "Commerce").reduce((sum, r) => sum + r.amount, 0) },
    { name: 'Provinces', value: economieRecords.filter(r => r.type === "income" && r.source.includes("province")).reduce((sum, r) => sum + r.amount, 0) },
    { name: 'Autre', value: revenus - impots - 
      economieRecords.filter(r => r.type === "income" && r.category === "Commerce").reduce((sum, r) => sum + r.amount, 0) -
      economieRecords.filter(r => r.type === "income" && r.source.includes("province")).reduce((sum, r) => sum + r.amount, 0)
    }
  ];
  
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Économie de la République</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taux d'Inflation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {economicFactors.inflationRate !== undefined ? economicFactors.inflationRate.toFixed(1) : "0.0"}%
            </div>
            <p className="text-xs text-muted-foreground">
              {economicFactors.inflationRate !== undefined && economicFactors.inflationRate > 2.5 ? 'Élevé' : 'Stable'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Croissance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {economicFactors.growthRate !== undefined ? economicFactors.growthRate.toFixed(1) : "0.0"}%
            </div>
            <p className="text-xs text-muted-foreground">
              {economicFactors.growthRate !== undefined && economicFactors.growthRate < 1.0 ? 'Faible' : 'Positive'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taux d'Imposition</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {economicFactors.taxRates ? Object.values(economicFactors.taxRates)[0] : treasury.taxRate}%
            </div>
            <p className="text-xs text-muted-foreground">
              {economicFactors.taxRates ? 'Taux standard' : 'Taux unique'}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenus et Dépenses</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <BarChart className="h-16 w-16 mx-auto mb-4 opacity-20" />
              <p>Total des revenus: {revenus} As</p>
              <p>Total des dépenses: {depenses} As</p>
              <p className="mt-2">Balance: {variationBalance} As</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Répartition des dépenses</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <PieChart className="h-16 w-16 mx-auto mb-4 opacity-20" />
              <p>Les données de répartition des dépenses seront affichées ici</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
