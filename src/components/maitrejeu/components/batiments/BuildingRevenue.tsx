
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BarChart3, PieChart, TrendingUp, Filter, CalendarRange, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BuildingRevenueProps {
  currentYear: number;
  currentSeason: string;
}

interface BuildingRevenue {
  id: string;
  buildingId: string;
  buildingName: string;
  buildingType: string;
  year: number;
  season: string;
  amount: number;
  trend: 'up' | 'down' | 'stable';
  source: string;
  taxRate: number;
}

export const BuildingRevenue: React.FC<BuildingRevenueProps> = ({
  currentYear,
  currentSeason
}) => {
  const [activeTab, setActiveTab] = useState('details');
  const [selectedYear, setSelectedYear] = useState(currentYear);

  // Données fictives pour la démonstration
  const revenueData: BuildingRevenue[] = [
    {
      id: '1',
      buildingId: '1',
      buildingName: 'Temple de Jupiter',
      buildingType: 'Temple',
      year: 721,
      season: 'Ver',
      amount: 3200,
      trend: 'up',
      source: 'Dons',
      taxRate: 0
    },
    {
      id: '2',
      buildingId: '2',
      buildingName: 'Basilique Aemilia',
      buildingType: 'Basilique',
      year: 721,
      season: 'Ver',
      amount: 6500,
      trend: 'stable',
      source: 'Loyers commerciaux',
      taxRate: 5
    },
    {
      id: '3',
      buildingId: '3',
      buildingName: 'Aqueduc Appien',
      buildingType: 'Aqueduc',
      year: 721,
      season: 'Ver',
      amount: 8900,
      trend: 'up',
      source: 'Taxes hydrauliques',
      taxRate: 8
    },
    {
      id: '4',
      buildingId: '4',
      buildingName: 'Bains publics',
      buildingType: 'Bains',
      year: 721,
      season: 'Ver',
      amount: 5200,
      trend: 'down',
      source: 'Entrées',
      taxRate: 3
    }
  ];

  const chartData = [
    { name: 'Ver', Temple: 3200, Basilique: 6500, Aqueduc: 8900, Bains: 5200 },
    { name: 'Aestas', Temple: 2800, Basilique: 6500, Aqueduc: 9500, Bains: 4800 },
    { name: 'Autumnus', Temple: 3500, Basilique: 6300, Aqueduc: 9200, Bains: 5100 },
    { name: 'Hiems', Temple: 4000, Basilique: 6100, Aqueduc: 8700, Bains: 4500 }
  ];

  const summaryByType = {
    Temple: 3200,
    Basilique: 6500,
    Aqueduc: 8900,
    Bains: 5200,
    Marché: 7300,
    'Maison du Sénat': 2100
  };

  const getTrendBadge = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <Badge variant="outline" className="bg-green-100 text-green-800">↑ Hausse</Badge>;
      case 'down':
        return <Badge variant="outline" className="bg-red-100 text-red-800">↓ Baisse</Badge>;
      case 'stable':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">→ Stable</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  // Calculer le revenu total
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-xl font-semibold">Revenus des bâtiments</h2>
        </div>
        
        <div className="flex items-center gap-2">
          <CalendarRange className="h-4 w-4 text-muted-foreground" />
          <Select 
            value={selectedYear.toString()} 
            onValueChange={(value) => setSelectedYear(parseInt(value))}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Année" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="719">719 AUC</SelectItem>
              <SelectItem value="720">720 AUC</SelectItem>
              <SelectItem value="721">721 AUC</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="ml-2">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Revenu total (Ver)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRevenue} as</div>
            <p className="text-xs text-muted-foreground mt-1">
              +12% par rapport à l'année précédente
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Bâtiment le plus rentable
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Aqueduc Appien</div>
            <p className="text-xs text-muted-foreground mt-1">
              8,900 as par saison
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Projections annuelles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95,000 as</div>
            <p className="text-xs text-muted-foreground mt-1">
              Basé sur les tendances actuelles
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="details" className="flex items-center gap-2">
            <Table className="h-4 w-4" />
            Détails
          </TabsTrigger>
          <TabsTrigger value="charts" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Graphiques
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bâtiment</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Taux</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Tendance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {revenueData.map(revenue => (
                    <TableRow key={revenue.id}>
                      <TableCell className="font-medium">{revenue.buildingName}</TableCell>
                      <TableCell>{revenue.buildingType}</TableCell>
                      <TableCell>{revenue.source}</TableCell>
                      <TableCell>{revenue.taxRate}%</TableCell>
                      <TableCell className="font-semibold">{revenue.amount} as</TableCell>
                      <TableCell>{getTrendBadge(revenue.trend)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="charts" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenus saisonniers par type de bâtiment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Temple" fill="#8884d8" />
                    <Bar dataKey="Basilique" fill="#82ca9d" />
                    <Bar dataKey="Aqueduc" fill="#ffc658" />
                    <Bar dataKey="Bains" fill="#ff8042" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
