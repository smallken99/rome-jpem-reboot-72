
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    period: 'Printemps 45',
    impotActuel: 220000,
    impotPrevisionnel: 230000,
  },
  {
    period: 'Été 45',
    impotActuel: 240000,
    impotPrevisionnel: 260000,
  },
  {
    period: 'Automne 45',
    impotActuel: 210000,
    impotPrevisionnel: 240000,
  },
  {
    period: 'Hiver 45',
    impotActuel: 180000,
    impotPrevisionnel: 200000,
  },
  {
    period: 'Printemps 44',
    impotActuel: null,
    impotPrevisionnel: 250000,
  },
  {
    period: 'Été 44',
    impotActuel: null,
    impotPrevisionnel: 275000,
  },
  {
    period: 'Automne 44',
    impotActuel: null,
    impotPrevisionnel: 260000,
  },
  {
    period: 'Hiver 44',
    impotActuel: null,
    impotPrevisionnel: 220000,
  },
];

export const ImpotsForecast: React.FC = () => {
  return (
    <div className="space-y-6">
      <p className="text-muted-foreground mb-4">
        Projections des revenus fiscaux pour les huit prochaines saisons, basées sur les tendances historiques et les prévisions économiques.
      </p>
      
      <div className="h-[400px] border rounded-md p-4 bg-white">
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
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="period" tick={{ fontSize: 12 }} />
            <YAxis 
              tickFormatter={(value) => `${value / 1000}k`} 
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value) => [`${value.toLocaleString()} As`, ""]}
              labelFormatter={(label) => `Période: ${label}`}
            />
            <Legend />
            <Bar 
              name="Impôts collectés" 
              dataKey="impotActuel" 
              fill="#4f46e5" 
              opacity={0.8} 
            />
            <Bar 
              name="Prévisions" 
              dataKey="impotPrevisionnel" 
              fill="#f97316" 
              opacity={0.6} 
              stroke="#c2410c"
              strokeWidth={1}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="border rounded-md p-4 bg-amber-50">
          <h3 className="font-semibold mb-1">Tendance annuelle</h3>
          <p className="text-sm text-muted-foreground">Augmentation de 8.5% prévue pour l'année prochaine</p>
        </div>
        <div className="border rounded-md p-4 bg-blue-50">
          <h3 className="font-semibold mb-1">Facteurs d'influence</h3>
          <p className="text-sm text-muted-foreground">Conquêtes récentes et expansion du commerce</p>
        </div>
        <div className="border rounded-md p-4 bg-green-50">
          <h3 className="font-semibold mb-1">Opportunités</h3>
          <p className="text-sm text-muted-foreground">Réforme des impôts provinciaux (+15% potentiel)</p>
        </div>
        <div className="border rounded-md p-4 bg-red-50">
          <h3 className="font-semibold mb-1">Risques</h3>
          <p className="text-sm text-muted-foreground">Instabilité politique, révoltes dans les provinces</p>
        </div>
      </div>
    </div>
  );
};
