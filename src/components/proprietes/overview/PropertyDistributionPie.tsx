
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatMoney } from '@/utils/formatUtils';

export interface PropertyDistributionPieProps {
  urbanProperties: number;
  ruralProperties: number;
  otherProperties: number;
}

export const PropertyDistributionPie: React.FC<PropertyDistributionPieProps> = ({
  urbanProperties,
  ruralProperties,
  otherProperties
}) => {
  const data = [
    { name: 'Propriétés urbaines', value: urbanProperties, color: '#10b981' },
    { name: 'Propriétés rurales', value: ruralProperties, color: '#6366f1' },
    { name: 'Autres propriétés', value: otherProperties, color: '#f59e0b' },
  ];

  const total = urbanProperties + ruralProperties + otherProperties;

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
