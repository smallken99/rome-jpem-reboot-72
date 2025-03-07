
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { RevenueSource } from '../types/profitabilityTypes';

interface RevenueSourcesChartProps {
  data: RevenueSource[];
}

export const RevenueSourcesChart: React.FC<RevenueSourcesChartProps> = ({ data }) => {
  return (
    <div className="border border-rome-gold/30 rounded-md p-4 bg-white">
      <h4 className="font-cinzel text-rome-navy mb-4">Sources de Revenus</h4>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={300}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={true}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#F8F4E3',
                borderColor: '#EEA243',
                fontFamily: '"Cinzel", serif'
              }}
              formatter={(value) => [`${value}%`, null]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
