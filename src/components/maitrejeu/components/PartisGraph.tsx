
// Mise à jour des imports pour PartisGraph
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { PartisGraphProps } from '../types/equilibre';

export const PartisGraph: React.FC<PartisGraphProps> = ({ populaires, optimates, moderates, factions }) => {
  // Si on a reçu factions directement, utiliser ces données
  const data = factions || [
    { name: 'Populares', value: populaires || 35, color: '#ef4444' },
    { name: 'Optimates', value: optimates || 40, color: '#3b82f6' },
    { name: 'Moderates', value: moderates || 25, color: '#a855f7' },
  ];
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Équilibre des factions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Influence']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
