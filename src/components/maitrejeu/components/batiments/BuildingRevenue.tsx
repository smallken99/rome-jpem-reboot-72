
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils/formatUtils';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { ChevronsUpDown, Download, BarChart2, DollarSign, TrendingUp } from 'lucide-react';
import { useBatimentsManagement } from '@/components/maitrejeu/hooks/useBatimentsManagement';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BuildingRevenueProps {
  currentYear: number;
  currentSeason: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD'];

export const BuildingRevenue: React.FC<BuildingRevenueProps> = ({ 
  currentYear, 
  currentSeason 
}) => {
  const { buildings } = useBatimentsManagement();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  
  // Données pour le graphique par type de bâtiment
  const revenueByType = [
    { name: 'Temples', value: buildings.filter(b => b.type === 'temple').reduce((acc, b) => acc + b.revenue, 0) },
    { name: 'Bâtiments gouvernementaux', value: buildings.filter(b => ['basilica', 'forum'].includes(b.type)).reduce((acc, b) => acc + b.revenue, 0) },
    { name: 'Divertissement', value: buildings.filter(b => ['theater', 'amphitheater', 'circus'].includes(b.type)).reduce((acc, b) => acc + b.revenue, 0) },
    { name: 'Infrastructure', value: buildings.filter(b => ['aqueduct', 'bridge', 'road'].includes(b.type)).reduce((acc, b) => acc + b.revenue, 0) },
    { name: 'Commercial', value: buildings.filter(b => ['market', 'port', 'warehouse'].includes(b.type)).reduce((acc, b) => acc + b.revenue, 0) }
  ];
  
  // Données pour le graphique de revenus par saison
  const revenueBySeasonData = [
    { name: 'Printemps', value: Math.round(buildings.reduce((acc, b) => acc + b.revenue * 0.9, 0)) },
    { name: 'Été', value: Math.round(buildings.reduce((acc, b) => acc + b.revenue * 1.2, 0)) },
    { name: 'Automne', value: Math.round(buildings.reduce((acc, b) => acc + b.revenue * 1.1, 0)) },
    { name: 'Hiver', value: Math.round(buildings.reduce((acc, b) => acc + b.revenue * 0.7, 0)) }
  ];
  
  // Les bâtiments les plus rentables
  const topRevenueBuildingsData = [...buildings]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)
    .map(b => ({
      name: b.name,
      revenue: b.revenue
    }));
  
  // Calcul du total des revenus et coûts d'entretien
  const totalRevenue = buildings.reduce((acc, b) => acc + b.revenue, 0);
  const totalMaintenance = buildings.reduce((acc, b) => acc + b.maintenanceCost, 0);
  const profitMargin = totalRevenue > 0 ? ((totalRevenue - totalMaintenance) / totalRevenue) * 100 : 0;
  
  const years = Array.from(new Array(10), (_, i) => currentYear - i);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-medium">Revenus des bâtiments publics</h3>
          <p className="text-sm text-muted-foreground">
            Analyse et suivi des revenus générés par les bâtiments
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Année" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year} AUC
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Exporter
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-green-500" />
              Revenus totaux
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">Par an</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <ChevronsUpDown className="h-4 w-4 mr-2 text-orange-500" />
              Coûts d'entretien
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalMaintenance)}</div>
            <p className="text-xs text-muted-foreground">Par an</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-blue-500" />
              Marge bénéficiaire
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2">
              <div className="text-2xl font-bold">{profitMargin.toFixed(1)}%</div>
              <Progress value={profitMargin} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Revenus par type de bâtiment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueByType}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {revenueByType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Revenus par saison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueBySeasonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Bar dataKey="value" fill="#4f46e5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Bâtiments les plus rentables</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topRevenueBuildingsData}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
                <Bar dataKey="revenue" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Détail des revenus annuels</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-2 font-medium">Bâtiment</th>
                  <th className="pb-2 font-medium">Type</th>
                  <th className="pb-2 font-medium text-right">Revenu annuel</th>
                  <th className="pb-2 font-medium text-right">Coût d'entretien</th>
                  <th className="pb-2 font-medium text-right">Bénéfice net</th>
                </tr>
              </thead>
              <tbody>
                {buildings.map((building) => {
                  const netProfit = building.revenue - building.maintenanceCost;
                  return (
                    <tr key={building.id} className="border-b border-muted">
                      <td className="py-3">{building.name}</td>
                      <td className="py-3 capitalize">{building.type}</td>
                      <td className="py-3 text-right">{formatCurrency(building.revenue)}</td>
                      <td className="py-3 text-right">{formatCurrency(building.maintenanceCost)}</td>
                      <td className={`py-3 text-right ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(netProfit)}
                      </td>
                    </tr>
                  )}
                )}
              </tbody>
            </table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuildingRevenue;
