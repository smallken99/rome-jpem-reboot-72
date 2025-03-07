
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const TresorChart: React.FC = () => {
  // Données pour le graphique (en milliers d'As)
  const data = [
    { name: 'Jan', revenus: 280, dépenses: 210 },
    { name: 'Fév', revenus: 300, dépenses: 240 },
    { name: 'Mar', revenus: 320, dépenses: 290 },
    { name: 'Avr', revenus: 290, dépenses: 260 },
    { name: 'Mai', revenus: 340, dépenses: 270 },
    { name: 'Jun', revenus: 380, dépenses: 310 },
    { name: 'Jul', revenus: 350, dépenses: 330 },
    { name: 'Aoû', revenus: 390, dépenses: 320 },
    { name: 'Sep', revenus: 370, dépenses: 345 },
    { name: 'Oct', revenus: 400, dépenses: 360 },
    { name: 'Nov', revenus: 420, dépenses: 370 },
    { name: 'Déc', revenus: 450, dépenses: 390 },
  ];

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => `${value.toLocaleString()} As`} />
          <Legend />
          <Bar dataKey="revenus" fill="#84cc16" />
          <Bar dataKey="dépenses" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
