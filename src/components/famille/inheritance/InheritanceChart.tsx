
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface InheritanceDistribution {
  name: string;
  value: number;
  amount: number;
}

interface InheritanceChartProps {
  data: InheritanceDistribution[];
}

export const InheritanceChart: React.FC<InheritanceChartProps> = ({ data }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28FD0', '#FF6B6B'];
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border shadow-sm rounded-md">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm text-muted-foreground">{`${payload[0].value}%`}</p>
          <p className="font-medium">{`${payload[0].payload.amount.toLocaleString()} As`}</p>
        </div>
      );
    }
  
    return null;
  };
  
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
