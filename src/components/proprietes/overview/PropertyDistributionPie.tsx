
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface PropertyDistributionPieProps {
  urbanCount: number;
  ruralCount: number;
  otherCount: number;
}

export const PropertyDistributionPie: React.FC<PropertyDistributionPieProps> = ({
  urbanCount,
  ruralCount,
  otherCount
}) => {
  const data = useMemo(() => {
    const result = [];
    
    if (urbanCount > 0) {
      result.push({ name: 'Urbaines', value: urbanCount });
    }
    
    if (ruralCount > 0) {
      result.push({ name: 'Rurales', value: ruralCount });
    }
    
    if (otherCount > 0) {
      result.push({ name: 'Autres', value: otherCount });
    }
    
    return result;
  }, [urbanCount, ruralCount, otherCount]);
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-sm rounded-md">
          <p className="font-medium">{`${payload[0].name}`}</p>
          <p className="text-sm text-rome-navy">{`Quantité: ${payload[0].value}`}</p>
        </div>
      );
    }
  
    return null;
  };
  
  return (
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
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};
