
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PartisGraphProps } from '../types/maitreJeuTypes';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export const PartisGraph: React.FC<PartisGraphProps> = ({ factions }) => {
  // Préparer les données pour le graphique
  const data = factions.map(faction => ({
    name: faction.nom,
    value: faction.influence,
    color: faction.couleur
  }));
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Équilibre des factions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Influence']}
                labelFormatter={(name) => `Faction: ${name}`}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {factions.map(faction => (
            <div key={faction.id} className="p-3 rounded-md border" style={{ borderColor: faction.couleur }}>
              <div className="font-medium text-sm" style={{ color: faction.couleur }}>{faction.nom}</div>
              <div className="text-xs text-muted-foreground mb-2">{faction.description}</div>
              <div className="text-xs">
                <span className="font-medium">Objectifs:</span>
                <ul className="list-disc list-inside mt-1">
                  {faction.objectifs.map((objectif, index) => (
                    <li key={index}>{objectif}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
