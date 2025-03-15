
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { TrendingUp, TrendingDown, Building, PieChart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PublicBuilding } from '@/components/republique/batiments/types/buildingTypes';
import { ResponsiveBar } from '@nivo/bar';

interface BuildingRevenueProps {
  buildings: PublicBuilding[];
}

export const BuildingRevenue: React.FC<BuildingRevenueProps> = ({ buildings }) => {
  // Calculate revenue and expenses
  const buildingsWithRevenue = buildings.map(building => ({
    ...building,
    revenue: calculateRevenue(building),
    netProfit: calculateRevenue(building) - building.maintenanceCost
  }));
  
  // Sort by net profit (highest first)
  const sortedBuildings = [...buildingsWithRevenue].sort((a, b) => b.netProfit - a.netProfit);
  
  // Calculate totals
  const totalRevenue = buildingsWithRevenue.reduce((sum, b) => sum + b.revenue, 0);
  const totalMaintenance = buildings.reduce((sum, b) => sum + b.maintenanceCost, 0);
  const netProfit = totalRevenue - totalMaintenance;
  
  // Prepare data for chart
  const buildingTypes = Array.from(new Set(buildings.map(b => b.buildingTypeId)));
  const chartData = buildingTypes.map(type => {
    const buildingsOfType = buildingsWithRevenue.filter(b => b.buildingTypeId === type);
    return {
      type,
      revenue: buildingsOfType.reduce((sum, b) => sum + b.revenue, 0),
      maintenance: buildingsOfType.reduce((sum, b) => sum + b.maintenanceCost, 0),
      profit: buildingsOfType.reduce((sum, b) => sum + b.netProfit, 0)
    };
  });
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Revenus totaux
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
              <span className="text-2xl font-bold">{totalRevenue.toLocaleString()} As</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Coûts de maintenance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <TrendingDown className="h-5 w-5 mr-2 text-red-500" />
              <span className="text-2xl font-bold">{totalMaintenance.toLocaleString()} As</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Profit net
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              {netProfit >= 0 ? (
                <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
              ) : (
                <TrendingDown className="h-5 w-5 mr-2 text-red-500" />
              )}
              <span className={`text-2xl font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {netProfit.toLocaleString()} As
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <PieChart className="h-5 w-5 mr-2" />
            Analyse des revenus par type de bâtiment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveBar
              data={chartData}
              keys={['revenue', 'maintenance', 'profit']}
              indexBy="type"
              margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
              padding={0.3}
              colors={{ scheme: 'nivo' }}
              borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Type de bâtiment',
                legendPosition: 'middle',
                legendOffset: 32
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Montant (As)',
                legendPosition: 'middle',
                legendOffset: -40
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              legends={[
                {
                  dataFrom: 'keys',
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 120,
                  translateY: 0,
                  itemsSpacing: 2,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: 'left-to-right',
                  itemOpacity: 0.85,
                  symbolSize: 20
                }
              ]}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bâtiment</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Revenus</TableHead>
                <TableHead>Maintenance</TableHead>
                <TableHead>Profit Net</TableHead>
                <TableHead>Rentabilité</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedBuildings.map((building) => (
                <TableRow key={building.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-2 text-amber-600" />
                      {building.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{building.buildingTypeId}</Badge>
                  </TableCell>
                  <TableCell className="text-green-600">
                    +{building.revenue.toLocaleString()} As
                  </TableCell>
                  <TableCell className="text-red-600">
                    -{building.maintenanceCost.toLocaleString()} As
                  </TableCell>
                  <TableCell>
                    <span className={building.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {building.netProfit >= 0 ? '+' : ''}{building.netProfit.toLocaleString()} As
                    </span>
                  </TableCell>
                  <TableCell>
                    {building.revenue > 0 
                      ? `${Math.round((building.netProfit / building.revenue) * 100)}%`
                      : "Non rentable"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

// Helper function to calculate building revenue based on type, condition, etc.
function calculateRevenue(building: PublicBuilding): number {
  // Base revenue calculation
  let baseRevenue = 0;
  
  switch (building.buildingTypeId) {
    case 'forum':
      baseRevenue = 3000;
      break;
    case 'market':
      baseRevenue = 4500;
      break;
    case 'port':
      baseRevenue = 6000;
      break;
    case 'temple':
      baseRevenue = 2000;
      break;
    case 'bath':
      baseRevenue = 3500;
      break;
    case 'theater':
      baseRevenue = 5000;
      break;
    default:
      baseRevenue = 1000;
      break;
  }
  
  // Adjust revenue based on condition
  const conditionMultiplier = building.condition / 100;
  
  // Adjust revenue based on population
  const populationMultiplier = building.population ? Math.min(2, building.population / 500) : 1;
  
  // Calculate final revenue
  return Math.round(baseRevenue * conditionMultiplier * populationMultiplier);
}
