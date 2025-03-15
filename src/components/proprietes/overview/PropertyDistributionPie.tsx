
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface PropertyDistributionPieProps {
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
    { name: 'Urbaines', value: urbanProperties, color: '#3182CE' },
    { name: 'Rurales', value: ruralProperties, color: '#68D391' },
    { name: 'Autres', value: otherProperties, color: '#F6AD55' },
  ].filter(item => item.value > 0);

  // Si aucune propriété, afficher un message
  if (data.length === 0 || (urbanProperties + ruralProperties + otherProperties) === 0) {
    return (
      <div className="h-[250px] flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Aucune propriété disponible</p>
      </div>
    );
  }

  return (
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
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value} propriété${value > 1 ? 's' : ''}`]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
