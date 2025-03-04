
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const RevenueChart: React.FC = () => {
  const data = [
    {
      name: 'Jan',
      revenus: 35000,
      depenses: 28000,
    },
    {
      name: 'Fév',
      revenus: 38000,
      depenses: 29000,
    },
    {
      name: 'Mar',
      revenus: 40000,
      depenses: 30000,
    },
    {
      name: 'Avr',
      revenus: 42000,
      depenses: 30000,
    },
    {
      name: 'Mai',
      revenus: 45000,
      depenses: 32000,
    },
    {
      name: 'Juin',
      revenus: 47000,
      depenses: 32500,
    },
  ];

  return (
    <div className="h-[300px] w-full p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
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
          />
          <Legend />
          <Bar dataKey="revenus" name="Revenus" fill="#7A9E7E" />
          <Bar dataKey="depenses" name="Dépenses" fill="#CF5C36" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
