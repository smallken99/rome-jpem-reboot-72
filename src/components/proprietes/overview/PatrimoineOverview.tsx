
import React from 'react';
import { PatrimoineOverviewStats } from './PatrimoineOverviewStats';
import { PropertiesTable } from './PropertiesTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Download, RefreshCw } from 'lucide-react';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { formatCurrency } from '@/utils/currencyUtils';

export const PatrimoineOverview: React.FC = () => {
  const { balance, getPropertyStats } = usePatrimoine();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-cinzel mb-1">Mon Patrimoine</h2>
          <p className="text-muted-foreground">
            Vue d'ensemble de vos possessions et finances
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg">
            Solde: {formatCurrency(balance)}
          </span>
          <Button variant="outline" size="sm" className="gap-1">
            <RefreshCw className="h-4 w-4" />
            <span>Actualiser</span>
          </Button>
        </div>
      </div>
      
      <PatrimoineOverviewStats />
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Mes Propriétés</CardTitle>
          <Button className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            <span>Nouvelle Propriété</span>
          </Button>
        </CardHeader>
        <CardContent>
          <PropertiesTable />
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenus et Dépenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              Graphique des revenus et dépenses mensuels
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Répartition du Patrimoine</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              Graphique de répartition des types de propriétés
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
