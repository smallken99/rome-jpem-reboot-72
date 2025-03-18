
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { useBuildingManagement } from '../hooks/useBuildingManagement';
import { BarChart, Building, Coins, Map, Users, FileBarChart, Landmark, Farm, CircleDollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { formatCurrency } from '@/utils/currencyUtils';
import { PatrimoineValueChart } from './PatrimoineValueChart';
import { PropertyDistributionPie } from './PropertyDistributionPie';
import { RecentTransactions } from './RecentTransactions';

export const PatrimoineOverview: React.FC = () => {
  const { balance, transactions, properties } = usePatrimoine();
  const { 
    buildings, 
    urbanBuildings, 
    ruralBuildings, 
    religiousBuildings, 
    calculateTotalPropertyValue, 
    calculateAnnualIncome,
    getPropertyStats 
  } = useBuildingManagement();
  
  // Get property statistics
  const propertyStats = getPropertyStats();
  
  // Calculate total net worth
  const netWorth = balance + propertyStats.totalValue;
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Valeur Nette</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(netWorth)}</div>
            <p className="text-xs text-muted-foreground">Total des avoirs</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Propriétés</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{properties.length + buildings.length}</div>
            <p className="text-xs text-muted-foreground">
              {propertyStats.urbanCount} urbaines, {propertyStats.ruralCount} rurales
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Liquidités</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(balance)}</div>
            <p className="text-xs text-muted-foreground">Disponible immédiatement</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Revenu Annuel</CardTitle>
            <FileBarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{formatCurrency(propertyStats.annualIncome)}</div>
            <p className="text-xs text-muted-foreground">Estimation</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Évolution du patrimoine</CardTitle>
          </CardHeader>
          <CardContent>
            <PatrimoineValueChart />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Distribution des propriétés</CardTitle>
          </CardHeader>
          <CardContent>
            <PropertyDistributionPie 
              urbanProperties={propertyStats.urbanCount} 
              ruralProperties={propertyStats.ruralCount} 
              otherProperties={propertyStats.religiousCount + propertyStats.publicCount} 
            />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Propriétés en alerte</CardTitle>
            <Button asChild variant="outline" size="sm" className="gap-1">
              <Link to="/patrimoine/proprietes">
                <Building className="h-4 w-4" />
                <span>Gérer</span>
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {propertyStats.propertyNeedingMaintenance > 0 ? (
              <div className="space-y-4">
                <div className="p-4 bg-amber-50 text-amber-800 rounded-md border border-amber-200">
                  <h3 className="font-medium mb-1">Maintenance requise</h3>
                  <p className="text-sm">{propertyStats.propertyNeedingMaintenance} propriété(s) nécessite(nt) de l'entretien.</p>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-green-50 text-green-800 rounded-md border border-green-200">
                <h3 className="font-medium mb-1">Aucune alerte</h3>
                <p className="text-sm">Toutes vos propriétés sont en bon état.</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Transactions récentes</CardTitle>
            <Button asChild variant="outline" size="sm" className="gap-1">
              <Link to="/patrimoine/economie">
                <FileBarChart className="h-4 w-4" />
                <span>Voir tout</span>
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <RecentTransactions transactions={transactions.slice(0, 3)} />
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <Button asChild className="flex-1 gap-2">
          <Link to="/patrimoine/proprietes">
            <Building className="h-4 w-4" />
            <span>Gérer mes propriétés</span>
          </Link>
        </Button>
        
        <Button asChild variant="outline" className="flex-1 gap-2">
          <Link to="/patrimoine/carte">
            <Map className="h-4 w-4" />
            <span>Voir la carte</span>
          </Link>
        </Button>
        
        <Button asChild variant="outline" className="flex-1 gap-2">
          <Link to="/patrimoine/economie">
            <Coins className="h-4 w-4" />
            <span>Gestion financière</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};
