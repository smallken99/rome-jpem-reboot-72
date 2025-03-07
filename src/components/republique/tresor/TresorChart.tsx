
import React from 'react';
import { BarChart } from '@/components/ui/chart';

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
      <BarChart 
        data={data}
        index="name"
        categories={['revenus', 'dépenses']}
        colors={['#84cc16', '#ef4444']}
        valueFormatter={(value) => `${value.toLocaleString()} As`}
        yAxisWidth={60}
      />
    </div>
  );
};
