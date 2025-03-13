
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatMoney } from '@/utils/formatUtils';

interface PatrimoineValueChartProps {
  propertyValue: number;
  liquidValue: number;
}

export const PatrimoineValueChart: React.FC<PatrimoineValueChartProps> = ({ 
  propertyValue, 
  liquidValue 
}) => {
  const data = [
    {
      name: 'Propriétés',
      value: propertyValue,
      fill: '#8884d8'
    },
    {
      name: 'Liquidités',
      value: liquidValue,
      fill: '#4CAF50'
    }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-sm rounded-md">
          <p className="font-medium">{`${label}`}</p>
          <p className="text-sm text-rome-navy">{`Valeur: ${formatMoney(payload[0].value)}`}</p>
        </div>
      );
    }
  
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis 
          tickFormatter={(value) => `${value / 1000}K`} 
          width={40}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="value" name="Valeur" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};
