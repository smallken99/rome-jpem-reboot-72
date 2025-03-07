
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BuildingData } from '../types/profitabilityTypes';

interface RevenueExpenseChartProps {
  data: BuildingData[];
  activeView: 'yearly' | 'monthly';
}

export const RevenueExpenseChart: React.FC<RevenueExpenseChartProps> = ({ 
  data,
  activeView
}) => {
  // Formatage des données pour l'affichage mensuel/annuel
  const formatData = (data: BuildingData[]) => {
    if (activeView === 'monthly') {
      return data.map(item => ({
        ...item,
        revenus: Math.round(item.revenus / 12),
        depenses: Math.round(item.depenses / 12),
      }));
    }
    return data;
  };

  return (
    <div className="border border-rome-gold/30 rounded-md p-4 bg-white">
      <h4 className="font-cinzel text-rome-navy mb-4">Revenus et Dépenses par Type</h4>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={formatData(data)}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f2e9d8" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#1F487E' }} 
              axisLine={{ stroke: '#EEA243' }}
            />
            <YAxis 
              tick={{ fill: '#1F487E' }} 
              axisLine={{ stroke: '#EEA243' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#F8F4E3',
                borderColor: '#EEA243',
                fontFamily: '"Cinzel", serif'
              }}
              formatter={(value) => [`${value} As`, null]}
            />
            <Legend />
            <Bar dataKey="revenus" name="Revenus" fill="#7A9E7E" />
            <Bar dataKey="depenses" name="Dépenses" fill="#CF5C36" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
