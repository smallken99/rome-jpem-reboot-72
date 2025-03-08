
import React from 'react';
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Equilibre } from '../types';

export interface EquilibreChartProps {
  equilibre: Equilibre;
}

export const EquilibreBarChart: React.FC<EquilibreChartProps> = ({ equilibre }) => {
  // Préparer les données pour le graphique
  const chartData = [
    { name: 'Moral', value: equilibre.moral || 0 },
    { name: 'Loyauté', value: equilibre.loyaute || 0 },
    { name: 'Populaires', value: equilibre.populaires || 0 },
    { name: 'Optimates', value: equilibre.optimates || 0 },
    { name: 'Modérés', value: equilibre.moderates || 0 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" name="Valeur" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};
