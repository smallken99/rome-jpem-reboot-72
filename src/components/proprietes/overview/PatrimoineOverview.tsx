
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
            <p className="text-xs text-muted-foreground">Patrimoine total estimé</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Liquidités</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatMoney(balance)}</div>
            <p className="text-xs text-muted-foreground">Argent disponible</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Propriétés</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ownedBuildings.length}</div>
            <p className="text-xs text-muted-foreground">{urbanProperties} urbaines, {ruralProperties} rurales</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Esclaves</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {ownedBuildings.reduce((sum, b) => sum + b.slaves, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Répartis sur vos propriétés</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribution du patrimoine</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-80">
              <PatrimoineValueChart 
                propertyValue={totalPropertyValue} 
                liquidValue={balance} 
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Types de propriétés</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-80">
              <PropertyDistributionPie 
                urbanCount={urbanProperties}
                ruralCount={ruralProperties}
                otherCount={otherProperties}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Transactions récentes</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentTransactions transactions={transactions.slice(0, 5)} />
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button asChild className="roman-btn flex gap-2 h-auto py-3 px-4">
          <Link to="/patrimoine/proprietes">
            <Building className="h-5 w-5" />
            <div className="flex flex-col items-start">
              <span>Gérer les propriétés</span>
              <span className="text-xs opacity-80">Acheter, vendre, construire</span>
            </div>
          </Link>
        </Button>
        
        <Button asChild variant="outline" className="roman-btn-outline flex gap-2 h-auto py-3 px-4">
          <Link to="/patrimoine/economie">
            <FileBarChart className="h-5 w-5" />
            <div className="flex flex-col items-start">
              <span>Finances</span>
              <span className="text-xs opacity-80">Revenus et dépenses</span>
            </div>
          </Link>
        </Button>
        
        <Button asChild variant="outline" className="roman-btn-outline flex gap-2 h-auto py-3 px-4">
          <Link to="/patrimoine/carte">
            <Map className="h-5 w-5" />
            <div className="flex flex-col items-start">
              <span>Voir la carte</span>
              <span className="text-xs opacity-80">Localisation des propriétés</span>
            </div>
          </Link>
        </Button>
      </div>
    </div>
  );
};
