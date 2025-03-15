
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useEconomieManagement } from './useEconomieManagement';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const mockChartData = [
  { name: 'Hiems 705', Revenus: 25000, Dépenses: 18000, Balance: 7000 },
  { name: 'Ver 706', Revenus: 30000, Dépenses: 22000, Balance: 8000 },
  { name: 'Aestas 706', Revenus: 35000, Dépenses: 28000, Balance: 7000 },
  { name: 'Autumnus 706', Revenus: 32000, Dépenses: 30000, Balance: 2000 },
  { name: 'Hiems 706', Revenus: 28000, Dépenses: 25000, Balance: 3000 },
  { name: 'Ver 707', Revenus: 33000, Dépenses: 27000, Balance: 6000 },
];

export const TransactionManagement: React.FC = () => {
  const economie = useEconomieManagement();

  // Calculer les statistiques
  const totalRevenues = economie.economieRecords
    .filter(r => r.type === 'income')
    .reduce((sum, r) => sum + r.amount, 0);

  const totalExpenses = economie.economieRecords
    .filter(r => r.type === 'expense')
    .reduce((sum, r) => sum + r.amount, 0);

  const balance = totalRevenues - totalExpenses;

  // Calculer les catégories principales
  const categoryData = economie.economieRecords.reduce((acc, record) => {
    const category = record.category || 'Non catégorisé';
    if (!acc[category]) {
      acc[category] = { income: 0, expense: 0 };
    }
    if (record.type === 'income') {
      acc[category].income += record.amount;
    } else {
      acc[category].expense += record.amount;
    }
    return acc;
  }, {} as Record<string, { income: number; expense: number; }>);

  const categoryChartData = Object.entries(categoryData).map(([name, data]) => ({
    name,
    Revenus: data.income,
    Dépenses: data.expense,
    Solde: data.income - data.expense
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Revenus Totaux</CardTitle>
            <CardDescription>Cumul de toutes les transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRevenues.toLocaleString()} deniers</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Dépenses Totales</CardTitle>
            <CardDescription>Cumul de toutes les transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalExpenses.toLocaleString()} deniers</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Solde Actuel</CardTitle>
            <CardDescription>Revenus - Dépenses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {balance.toLocaleString()} deniers
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Évolution Temporelle</CardTitle>
            <CardDescription>
              Tendances des revenus et dépenses au fil du temps
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={mockChartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Revenus" fill="#4ade80" />
                  <Bar dataKey="Dépenses" fill="#f87171" />
                  <Bar dataKey="Balance" fill="#60a5fa" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Répartition par Catégorie</CardTitle>
            <CardDescription>
              Distribution des revenus et dépenses par type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoryChartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Revenus" fill="#4ade80" />
                  <Bar dataKey="Dépenses" fill="#f87171" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
