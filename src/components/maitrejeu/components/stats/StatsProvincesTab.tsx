
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useMaitreJeu } from '../../context';
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
import { cn } from '@/utils/cn';
import { Province } from '../../types/provinces';

export const StatsProvincesTab: React.FC = () => {
  const { provinces } = useMaitreJeu();

  // Conversion des données pour les graphiques
  const provincesByRegion = provinces.reduce((acc: Record<string, number>, province: Province) => {
    acc[province.région] = (acc[province.région] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(provincesByRegion).map(([name, value]) => ({ name, value }));
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  // Calcul des statistiques globales
  const totalRevenue = provinces.reduce((sum, province) => sum + province.revenue, 0);
  const totalPopulation = provinces.reduce((sum, province) => sum + province.population, 0);
  const avgStability = provinces.length 
    ? provinces.reduce((sum, province) => sum + province.stabilite, 0) / provinces.length 
    : 0;
  const avgLoyalty = provinces.length 
    ? provinces.reduce((sum, province) => sum + province.loyauté, 0) / provinces.length 
    : 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Nombre de Provinces</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{provinces.length}</div>
            <p className="text-xs text-muted-foreground">
              {provinces.filter(p => p.status === 'Pacifiée').length} pacifiées
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Revenu Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRevenue.toLocaleString()} deniers</div>
            <p className="text-xs text-muted-foreground">
              {(totalRevenue / provinces.length).toFixed(0)} deniers par province
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Population Totale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPopulation.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Répartie sur {provinces.length} provinces
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Stabilité Moyenne</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgStability.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Loyauté moyenne: {avgLoyalty.toFixed(1)}%
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Répartition par Région</CardTitle>
            <CardDescription>
              Distribution des provinces par région géographique
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Revenus par Province</CardTitle>
            <CardDescription>
              Top 5 des provinces les plus rentables
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={provinces.sort((a, b) => b.revenue - a.revenue).slice(0, 5)}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="nom" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#8884d8" name="Revenus (deniers)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
