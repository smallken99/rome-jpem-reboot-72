
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatMoney } from '@/utils/formatUtils';

export interface PropertyDistributionPieProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export const PropertyDistributionPie: React.FC<PropertyDistributionPieProps> = ({
  data
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const formatTooltip = (value: number) => {
    return [formatMoney(value), `${((value / total) * 100).toFixed(1)}%`];
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Distribution des propriétés</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
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
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={formatTooltip} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
