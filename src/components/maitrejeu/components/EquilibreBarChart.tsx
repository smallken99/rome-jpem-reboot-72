
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { EquilibreChartProps } from '../types/equilibre';

export const EquilibreBarChart: React.FC<EquilibreChartProps> = ({ equilibre }) => {
  const data = [
    { name: 'Populares', value: equilibre.populaires, color: '#ef4444' },
    { name: 'Optimates', value: equilibre.optimates, color: '#3b82f6' },
    { name: 'Moderates', value: equilibre.moderates, color: '#a855f7' },
    { name: 'Morale', value: equilibre.morale || 50, color: '#10b981' },
    { name: 'Loyauté', value: equilibre.loyauté || 50, color: '#f59e0b' },
    { name: 'Armée', value: equilibre.armée / 200, color: '#6366f1' },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill={(entry) => entry.color} />
      </BarChart>
    </ResponsiveContainer>
  );
};
