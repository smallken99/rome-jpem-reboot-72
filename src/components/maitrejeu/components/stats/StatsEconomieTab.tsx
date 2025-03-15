
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMaitreJeu } from '../../context';
import { BarChart, PieChart } from 'lucide-react';

export const StatsEconomieTab: React.FC = () => {
  const { economieRecords, treasury, economicFactors } = useMaitreJeu();
  
  // Calculs pour les revenus et dépenses
  const totalRevenus = economieRecords
    .filter(record => record.type === "income" || record.type === "tax")
    .reduce((sum, record) => sum + record.amount, 0);
  
  const totalDepenses = economieRecords
    .filter(record => record.type === "expense")
    .reduce((sum, record) => sum + record.amount, 0);
  
  const balance = treasury.balance || 0;
  const previousBalance = treasury.previousBalance || 0;
  const balanceChange = balance - previousBalance;
  
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Économie de la République</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taux d'inflation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{economicFactors.inflationRate || 0}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Impact sur l'économie: {(economicFactors.inflationRate || 0) > 5 ? "Élevé" : "Modéré"}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Croissance économique</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{economicFactors.growthRate || 0}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Tendance: {(economicFactors.growthRate || 0) > 0 ? "Positive" : "Négative"}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taux d'imposition moyen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{economicFactors.taxRates?.average || 0}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Perception publique: {(economicFactors.taxRates?.average || 0) > 20 ? "Élevée" : "Acceptable"}
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
              <p>Total des revenus: {totalRevenus} As</p>
              <p>Total des dépenses: {totalDepenses} As</p>
              <p className="mt-2">Balance: {totalRevenus - totalDepenses} As</p>
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
