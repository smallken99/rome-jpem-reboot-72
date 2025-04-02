
import React from 'react';
import { useMaitreJeu } from '../../context';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const StatsResourcesTab: React.FC = () => {
  // Example resources data - in a real app, this would come from context or API
  const resourcesData = [
    { name: 'Blé', quantity: 1200, value: 12000, type: 'Nourriture' },
    { name: 'Vin', quantity: 800, value: 24000, type: 'Nourriture' },
    { name: 'Huile', quantity: 500, value: 15000, type: 'Nourriture' },
    { name: 'Bois', quantity: 1500, value: 7500, type: 'Matériaux' },
    { name: 'Pierre', quantity: 900, value: 9000, type: 'Matériaux' },
    { name: 'Fer', quantity: 300, value: 15000, type: 'Matériaux' },
    { name: 'Or', quantity: 50, value: 50000, type: 'Luxe' },
    { name: 'Soie', quantity: 100, value: 20000, type: 'Luxe' },
  ];

  // Group by type for summary
  const resourcesByType = resourcesData.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = { totalQuantity: 0, totalValue: 0 };
    }
    acc[item.type].totalQuantity += item.quantity;
    acc[item.type].totalValue += item.value;
    return acc;
  }, {});

  // Prepare for summary chart
  const summaryData = Object.keys(resourcesByType).map(type => ({
    name: type,
    value: resourcesByType[type].totalValue,
    quantity: resourcesByType[type].totalQuantity
  }));

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Répartition des ressources par type</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={summaryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Valeur (As)" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Détail des ressources disponibles</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ressource</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantité</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valeur (As)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {resourcesData.map((resource, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{resource.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{resource.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{resource.quantity.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{resource.value.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
