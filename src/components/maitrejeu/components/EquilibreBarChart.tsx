
import React from 'react';
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Equilibre } from '../types/equilibre';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface EquilibreBarChartProps {
  equilibre: Equilibre;
  title: string;
  description?: string;
}

export const EquilibreBarChart: React.FC<EquilibreBarChartProps> = ({ 
  equilibre,
  title,
  description
}) => {
  const militaryData = [
    { name: 'Armée', value: equilibre.armée ?? equilibre.facteurMilitaire ?? 50 },
    { name: 'Économie', value: equilibre.économie ?? equilibre.economicStability ?? 50 },
    { name: 'Morale', value: equilibre.morale ?? 50 },
    { name: 'Loyauté', value: equilibre.loyauté ?? 50 }
  ];
  
  const factionsData = [
    { name: 'Patriciens', value: equilibre.patriciens ?? equilibre.facteurPatriciens ?? 50 },
    { name: 'Plébéiens', value: equilibre.plébéiens ?? equilibre.facteurPlebs ?? 50 },
    { name: 'Optimates', value: equilibre.optimates },
    { name: 'Populares', value: equilibre.populaires }, // Changed from 'populares' to 'populaires'
    { name: 'Modérés', value: equilibre.neutrales ?? equilibre.moderates ?? 50 }
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <p className="text-muted-foreground text-sm">{description}</p>}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-64">
            <h3 className="text-sm font-medium mb-2">État de la République</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={militaryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis type="category" dataKey="name" />
                <Tooltip formatter={(value) => [`${value}%`, 'Valeur']} />
                <Bar dataKey="value" fill="#8884d8" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="h-64">
            <h3 className="text-sm font-medium mb-2">Équilibre politique</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={factionsData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis type="category" dataKey="name" />
                <Tooltip formatter={(value) => [`${value}%`, 'Influence']} />
                <Bar dataKey="value" fill="#82ca9d" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
