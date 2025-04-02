
import React from 'react';
import { useMaitreJeu } from '../../context';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

export const StatsRepartitionTab: React.FC = () => {
  const { equilibre } = useMaitreJeu();

  // Prepare data for political balance
  const politicalData = [
    { name: 'Optimates', value: equilibre.politique.optimates },
    { name: 'Populares', value: equilibre.politique.populares },
    { name: 'Modérés', value: 100 - equilibre.politique.optimates - equilibre.politique.populares }
  ];

  // Colors for the chart
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c'];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Répartition des forces politiques</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={politicalData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {politicalData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Puissance relative des factions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-background border rounded-lg p-4 text-center">
            <h4 className="font-medium text-blue-600">Optimates</h4>
            <div className="text-3xl font-bold">{equilibre.politique.optimates}</div>
          </div>
          <div className="bg-background border rounded-lg p-4 text-center">
            <h4 className="font-medium text-neutral-600">Modérés</h4>
            <div className="text-3xl font-bold">{100 - equilibre.politique.optimates - equilibre.politique.populares}</div>
          </div>
          <div className="bg-background border rounded-lg p-4 text-center">
            <h4 className="font-medium text-red-600">Populares</h4>
            <div className="text-3xl font-bold">{equilibre.politique.populares}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
