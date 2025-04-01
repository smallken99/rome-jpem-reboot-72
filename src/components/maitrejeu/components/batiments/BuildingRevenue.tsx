
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBuildingManagement } from '../../hooks/useBuildingManagement';
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useTheme } from "@/components/ui/theme-provider";
import { useMaitreJeu } from '../../context';
import { adaptSeason } from '../../types/common';

interface BuildingRevenueProps {
  buildingId: string;
}

const BuildingRevenue: React.FC<BuildingRevenueProps> = ({ buildingId }) => {
  const { theme } = useTheme();
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
          revenu: Math.floor(Math.random() * 3000) + 2000,
          maintenance: Math.floor(Math.random() * 1000) + 500,
          profit: Math.floor(Math.random() * 2000) + 1000,
          season,
          year: currentYear
        });
      }
      
      return history;
    };
    
    setRevenueHistory(generateData());
  }, [currentDate]);
  
  // Function to collect revenue for the current season
  const handleCollectRevenue = () => {
    if (buildingId) {
      const result = collectBuildingRevenues(currentDate);
      console.log("Revenue collected:", result);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-medium">Revenus des Bâtiments</h2>
          <p className="text-sm text-muted-foreground">
            Suivi des revenus et dépenses pour tous les bâtiments
          </p>
        </div>
        <button 
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={handleCollectRevenue}
        >
          Collecter les revenus
        </button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Revenu total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(treasury?.income || 0).toLocaleString()} As
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              +{Math.floor(Math.random() * 15) + 5}% par rapport à la saison précédente
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Coûts de maintenance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(treasury?.expenses || 0).toLocaleString()} As
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Coûts d'entretien pour cette saison
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Profit net</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((treasury?.income || 0) - (treasury?.expenses || 0)).toLocaleString()} As
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Revenu après déduction des coûts
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Évolution des revenus</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueHistory}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="revenu" 
                  stackId="1"
                  stroke="#4ade80" 
                  fill="#4ade80" 
                />
                <Area 
                  type="monotone" 
                  dataKey="maintenance" 
                  stackId="2"
                  stroke="#f43f5e" 
                  fill="#f43f5e" 
                />
                <Area 
                  type="monotone" 
                  dataKey="profit" 
                  stackId="3"
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuildingRevenue;
