
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { FactionPolitique } from '../types/maitreJeuTypes';

interface PartisGraphProps {
  factions: FactionPolitique[];
}

export const PartisGraph: React.FC<PartisGraphProps> = ({ factions }) => {
  // Préparation des données pour le graphique
  const data = factions.map(faction => ({
    name: faction.nom,
    value: faction.influence,
    color: getColorForFaction(faction.nom),
    membres: faction.membres.length
  }));

  // Fonction pour attribuer une couleur à chaque faction
  function getColorForFaction(nom: string): string {
    const colors: Record<string, string> = {
      'Populares': '#e63946',
      'Optimates': '#1d3557',
      'Equites': '#f9c74f',
      'Militaires': '#90be6d',
      'Traditionalistes': '#6d6875',
      // Ajouter d'autres couleurs au besoin
    };

    return colors[nom] || '#457b9d'; // Couleur par défaut
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Répartition des Forces Politiques</CardTitle>
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
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name, props) => [`Influence: ${value}, Membres: ${props.payload.membres}`, name]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>Influence totale des factions: {data.reduce((sum, entry) => sum + entry.value, 0)}</p>
          <p>Sénateurs affiliés: {data.reduce((sum, entry) => sum + entry.membres, 0)}</p>
        </div>
      </CardContent>
    </Card>
  );
};
