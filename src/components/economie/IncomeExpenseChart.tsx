
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Données de démonstration
const mockData = [
  { name: 'Jan', Revenus: 20000, Dépenses: 15000 },
  { name: 'Fév', Revenus: 25000, Dépenses: 16000 },
  { name: 'Mar', Revenus: 30000, Dépenses: 20000 },
  { name: 'Avr', Revenus: 27000, Dépenses: 18000 },
  { name: 'Mai', Revenus: 32000, Dépenses: 21000 },
  { name: 'Jun', Revenus: 35000, Dépenses: 22000 }
];

// Personnalisation du tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border rounded shadow-sm">
        <p className="font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()} As
          </p>
        ))}
      </div>
    );
  }
  
  return null;
};

export const IncomeExpenseChart: React.FC = () => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={mockData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="Revenus" fill="#22c55e" />
          <Bar dataKey="Dépenses" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
