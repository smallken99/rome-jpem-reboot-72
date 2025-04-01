
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Building, House, Coins, Wrench, Users } from 'lucide-react';
import { OwnedBuilding } from '@/components/proprietes/types/property';
import { calculateBuildingIncome, calculateMaintenanceCost } from '@/utils/buildingUtils';

interface BuildingStatsProps {
  buildings: OwnedBuilding[];
  className?: string;
}

const BuildingStats: React.FC<BuildingStatsProps> = ({ buildings, className = '' }) => {
  // Calculer les statistiques globales
  const totalBuildings = buildings.length;
  const totalValue = buildings.reduce((sum, b) => sum + (b.value || 0), 0);
  const totalIncome = buildings.reduce((sum, b) => sum + calculateBuildingIncome(b), 0);
  const totalMaintenance = buildings.reduce((sum, b) => sum + calculateMaintenanceCost(b), 0);
  const averageCondition = totalBuildings > 0
    ? buildings.reduce((sum, b) => sum + b.condition, 0) / totalBuildings
    : 0;
  
  // Compter les bâtiments par type
  const buildingsByType = buildings.reduce((acc, building) => {
    const type = building.buildingType || 'other';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Obtenir les types de bâtiments principaux (limiter à 4)
  const mainTypes = Object.entries(buildingsByType)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);
  
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Building className="h-4 w-4 mr-2" />
            Propriétés
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalBuildings}</div>
          <div className="text-xs text-muted-foreground mt-1">
            {mainTypes.map(([type, count]) => (
              <span key={type} className="mr-2">
                {type}: {count}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Coins className="h-4 w-4 mr-2" />
            Valeur / Revenus
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalValue.toLocaleString()} as</div>
          <div className="text-xs text-muted-foreground mt-1">
            Revenus mensuels: {totalIncome.toLocaleString()} as
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Wrench className="h-4 w-4 mr-2" />
            Maintenance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalMaintenance.toLocaleString()} as</div>
          <div className="text-xs text-muted-foreground mt-1">
            Bénéfice net: {(totalIncome - totalMaintenance).toLocaleString()} as
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <House className="h-4 w-4 mr-2" />
            État moyen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{Math.round(averageCondition)}%</div>
          <Progress 
            value={averageCondition} 
            className="h-2 mt-2" 
            indicatorClassName={
              averageCondition > 75 ? "bg-green-500" : 
              averageCondition > 50 ? "bg-amber-500" : 
              "bg-red-500"
            }
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default BuildingStats;
