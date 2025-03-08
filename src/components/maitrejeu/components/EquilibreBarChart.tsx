
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { EquilibreChartProps } from '../types/maitreJeuTypes';

export const EquilibreBarChart: React.FC<EquilibreChartProps> = ({ equilibre }) => {
  // Format data for use in the chart
  const chartData = [
    {
      name: 'Plébéiens',
      value: equilibre.plebeiens,
      fill: '#f59e0b', // amber
    },
    {
      name: 'Patriciens',
      value: equilibre.patriciens,
      fill: '#9333ea', // purple
    },
    {
      name: 'Armée',
      value: equilibre.armée,
      fill: '#ef4444', // red
    },
    {
      name: 'Religion',
      value: equilibre.religion,
      fill: '#3b82f6', // blue
    },
    {
      name: 'Économie',
      value: equilibre.économie,
      fill: '#22c55e', // green
    },
    {
      name: 'Diplomatie',
      value: equilibre.diplomatie,
      fill: '#14b8a6', // teal
    },
  ];

  return (
    <div className="h-96 w-full">
      <ResponsiveContainer width="100%" height="100%">
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
          <YAxis domain={[0, 100]} />
          <Tooltip
            formatter={(value: number) => [`${value}%`, 'Influence']}
            labelStyle={{ color: '#18181b' }}
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '0.375rem',
              padding: '0.5rem',
            }}
          />
          <Legend />
          <Bar dataKey="value" name="Influence %" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
