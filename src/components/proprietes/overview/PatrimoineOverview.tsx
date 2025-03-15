
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { useBuildingInventory } from '../hooks/building/useBuildingInventory';
import { BarChart, Building, Coins, Map, Users, FileBarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { formatMoney } from '@/utils/formatUtils';
import { PatrimoineValueChart } from './PatrimoineValueChart';
import { PropertyDistributionPie } from './PropertyDistributionPie';
import { RecentTransactions } from './RecentTransactions';

export const PatrimoineOverview: React.FC = () => {
  const { balance, transactions } = usePatrimoine();
  const { ownedBuildings } = useBuildingInventory();
  
  // Calculate total property value (simplified)
  const totalPropertyValue = ownedBuildings.reduce((sum, building) => 
    sum + (building.maintenanceCost * 10), 0); // Approximate value based on maintenance cost
  
  // Total net worth
  const netWorth = balance + totalPropertyValue;
  
  // Count property types
  const urbanProperties = ownedBuildings.filter(b => b.buildingType === 'urban').length;
  const ruralProperties = ownedBuildings.filter(b => b.buildingType === 'rural').length;
  const otherProperties = ownedBuildings.length - urbanProperties - ruralProperties;
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Valeur Nette</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatMoney(netWorth)}</div>
            <p className="text-xs text-muted-foreground">Total des avoirs</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Propriétés</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ownedBuildings.length}</div>
            <p className="text-xs text-muted-foreground">Biens immobiliers</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Liquidités</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatMoney(balance)}</div>
            <p className="text-xs text-muted-foreground">Disponible immédiatement</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <FileBarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{transactions.length}</div>
            <p className="text-xs text-muted-foreground">Enregistrées</p>
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
              urbanProperties={urbanProperties} 
              ruralProperties={ruralProperties} 
              otherProperties={otherProperties} 
            />
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Transactions récentes</CardTitle>
          <Button asChild variant="outline" size="sm" className="gap-1">
            <Link to="/patrimoine/economie">
              <FileBarChart className="h-4 w-4" />
              <span>Toutes les transactions</span>
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <RecentTransactions transactions={transactions.slice(0, 5)} />
        </CardContent>
      </Card>
      
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
      </div>
    </div>
  );
};
