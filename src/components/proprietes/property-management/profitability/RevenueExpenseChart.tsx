
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { RevenueExpenseChartProps } from './types/profitabilityTypes';

export const RevenueExpenseChart: React.FC<RevenueExpenseChartProps> = ({ data, activeView }) => {
  // Adapter les données selon la vue
  const chartData = data.slice(0, activeView === 'monthly' ? 12 : activeView === 'quarterly' ? 4 : 1);

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => [`${value} As`, '']} />
          <Legend />
          <Bar dataKey="revenue" name="Revenus" fill="#22c55e" />
          <Bar dataKey="expenses" name="Dépenses" fill="#ef4444" />
          <Bar dataKey="profit" name="Profit" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
