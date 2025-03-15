
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Données fictives pour l'évolution du patrimoine
const patrimoineData = [
  { mois: 'Jan', valeur: 100000 },
  { mois: 'Fév', valeur: 110000 },
  { mois: 'Mar', valeur: 105000 },
  { mois: 'Avr', valeur: 120000 },
  { mois: 'Mai', valeur: 140000 },
  { mois: 'Juin', valeur: 135000 },
  { mois: 'Juil', valeur: 150000 },
];

export const PatrimoineValueChart: React.FC = () => {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={patrimoineData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis dataKey="mois" />
          <YAxis tickFormatter={value => `${value / 1000}k`} />
          <Tooltip formatter={(value) => [`${value} As`, 'Valeur']} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="valeur" 
            stroke="#8884d8" 
            activeDot={{ r: 8 }} 
            strokeWidth={2}
            name="Valeur du patrimoine"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
