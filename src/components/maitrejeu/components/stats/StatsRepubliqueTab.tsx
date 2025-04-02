
import React from 'react';
import { useMaitreJeu } from '../../context';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const StatsRepubliqueTab: React.FC = () => {
  const { equilibre } = useMaitreJeu();
  
  // Mock historical data - in a real app, this would come from context or an API
  const historicalData = [
    { year: 'AUC 720', politique: 70, economie: 65, militaire: 80 },
    { year: 'AUC 721', politique: 65, economie: 70, militaire: 75 },
    { year: 'AUC 722', politique: 60, economie: 75, militaire: 70 },
    { year: 'AUC 723', politique: 55, economie: 80, militaire: 65 },
    { year: 'AUC 724', politique: 50, economie: 75, militaire: 60 },
    { year: 'AUC 725', politique: 55, economie: 70, militaire: 65 },
    { year: 'AUC 726', politique: 60, economie: 65, militaire: 70 },
    { year: 'AUC 727', politique: 65, economie: 60, militaire: 75 },
    { year: 'AUC 728', politique: 70, economie: 65, militaire: 80 }
  ];

  // Prepare derived data
  const overallStability = [
    { year: 'AUC 720', stabilité: 75 },
    { year: 'AUC 721', stabilité: 70 },
    { year: 'AUC 722', stabilité: 65 },
    { year: 'AUC 723', stabilité: 60 },
    { year: 'AUC 724', stabilité: 55 },
    { year: 'AUC 725', stabilité: 60 },
    { year: 'AUC 726', stabilité: 65 },
    { year: 'AUC 727', stabilité: 70 },
    { year: 'AUC 728', stabilité: 75 }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Évolution de la République</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="politique" stroke="#8884d8" activeDot={{ r: 8 }} name="Équilibre Politique" />
              <Line type="monotone" dataKey="economie" stroke="#82ca9d" name="Économie" />
              <Line type="monotone" dataKey="militaire" stroke="#ffc658" name="Force Militaire" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Stabilité globale</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={overallStability}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="stabilité" stroke="#ff7300" activeDot={{ r: 8 }} name="Stabilité Globale" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">État actuel</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-background border rounded-lg p-4">
            <h4 className="font-medium text-gray-500">Politique</h4>
            <div className="text-2xl font-bold">{equilibre.politique.optimates}/100</div>
          </div>
          <div className="bg-background border rounded-lg p-4">
            <h4 className="font-medium text-gray-500">Économie</h4>
            <div className="text-2xl font-bold">{equilibre.economie.value}/100</div>
          </div>
          <div className="bg-background border rounded-lg p-4">
            <h4 className="font-medium text-gray-500">Militaire</h4>
            <div className="text-2xl font-bold">{equilibre.militaire.morale}/100</div>
          </div>
          <div className="bg-background border rounded-lg p-4">
            <h4 className="font-medium text-gray-500">Religion</h4>
            <div className="text-2xl font-bold">{equilibre.religion.piete}/100</div>
          </div>
        </div>
      </div>
    </div>
  );
};
