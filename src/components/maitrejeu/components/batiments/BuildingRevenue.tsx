
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBuildingManagement } from '../../hooks/useBuildingManagement';
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useMaitreJeu } from '../../context';

// Helper function to adapt season names
const adaptSeason = (season: string): string => {
  const seasonMap: Record<string, string> = {
    'Ver': 'Printemps',
    'Aes': 'Été',
    'Aut': 'Automne',
    'Hie': 'Hiver',
    'Spring': 'Printemps',
    'Summer': 'Été',
    'Fall': 'Automne',
    'Autumn': 'Automne',
    'Winter': 'Hiver',
    'SPRING': 'Printemps',
    'SUMMER': 'Été',
    'AUTUMN': 'Automne',
    'WINTER': 'Hiver',
    'spring': 'Printemps',
    'summer': 'Été',
    'autumn': 'Automne',
    'fall': 'Automne',
    'winter': 'Hiver'
  };
  return seasonMap[season] || season;
};

interface BuildingRevenueProps {
  buildingId: string;
}

const BuildingRevenue: React.FC<BuildingRevenueProps> = ({ buildingId }) => {
  const { buildings, collectBuildingRevenues } = useBuildingManagement();
  const { currentDate, treasury } = useMaitreJeu();
  const [revenueHistory, setRevenueHistory] = useState<any[]>([]);
  
  // Simulated data for the chart
  useEffect(() => {
    const generateData = () => {
      const history = [];
      const currentYear = currentDate.year;
      
      // Create sample data for the current year
      for (let i = 0; i < 4; i++) {
        const season = ['Ver', 'Aes', 'Aut', 'Hie'][i];
        const seasonName = ['Printemps', 'Été', 'Automne', 'Hiver'][i];
        
        history.push({
          date: `${seasonName} ${currentYear}`,
          revenue: Math.floor(Math.random() * 5000) + 2000,
          expenses: Math.floor(Math.random() * 2000) + 500,
          profit: Math.floor(Math.random() * 3000) + 1000,
        });
      }
      
      // Add data for previous year
      for (let i = 0; i < 4; i++) {
        const season = ['Ver', 'Aes', 'Aut', 'Hie'][i];
        const seasonName = ['Printemps', 'Été', 'Automne', 'Hiver'][i];
        
        history.unshift({
          date: `${seasonName} ${currentYear - 1}`,
          revenue: Math.floor(Math.random() * 4000) + 1500,
          expenses: Math.floor(Math.random() * 1500) + 300,
          profit: Math.floor(Math.random() * 2500) + 800,
        });
      }
      
      return history;
    };
    
    setRevenueHistory(generateData());
  }, [currentDate.year]);
  
  // Get building data
  const building = buildings.find(b => b.id === buildingId);
  
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Revenus annuels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueHistory} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => `${value} as`} />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stackId="1" 
                  stroke="#10b981" 
                  fill="#10b981" 
                  name="Revenus"
                />
                <Area 
                  type="monotone" 
                  dataKey="expenses" 
                  stackId="2" 
                  stroke="#ef4444" 
                  fill="#ef4444" 
                  name="Dépenses"
                />
                <Area 
                  type="monotone" 
                  dataKey="profit" 
                  stackId="3" 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  name="Profit"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Revenue actuel</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              {building ? building.revenue.toLocaleString() : 0} as/an
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Basé sur l'occupation et les tarifs actuels
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Coûts d'entretien</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">
              {building ? building.maintenanceCost.toLocaleString() : 0} as/an
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Inclut personnel, réparations et taxes
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Profit net</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-3xl font-bold ${building && building.revenue > building.maintenanceCost ? 'text-blue-600' : 'text-red-600'}`}>
              {building ? (building.revenue - building.maintenanceCost).toLocaleString() : 0} as/an
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {building && building.revenue > building.maintenanceCost 
                ? 'Ce bâtiment est rentable' 
                : 'Ce bâtiment est déficitaire'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BuildingRevenue;
