
import React from 'react';
import { ArrowRight, TrendingDown, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProfitableProperty } from '../types/profitabilityTypes';

interface ProfitablePropertiesTableProps {
  properties: ProfitableProperty[];
  activeView: 'yearly' | 'monthly';
}

export const ProfitablePropertiesTable: React.FC<ProfitablePropertiesTableProps> = ({
  properties,
  activeView
}) => {
  // Fonction pour obtenir l'icône de tendance
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <ArrowRight className="h-4 w-4 text-yellow-600" />;
    }
  };

  return (
    <div className="border border-rome-gold/30 rounded-md p-4 bg-white">
      <h4 className="font-cinzel text-rome-navy mb-4">Propriétés les Plus Rentables</h4>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-rome-gold/10 text-left">
              <th className="p-3 font-cinzel">Propriété</th>
              <th className="p-3 font-cinzel">Type</th>
              <th className="p-3 font-cinzel">Revenus ({activeView === 'yearly' ? 'Annuel' : 'Mensuel'})</th>
              <th className="p-3 font-cinzel">Dépenses ({activeView === 'yearly' ? 'Annuel' : 'Mensuel'})</th>
              <th className="p-3 font-cinzel">ROI (%)</th>
              <th className="p-3 font-cinzel">Tendance</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property, index) => (
              <tr 
                key={index} 
                className={index % 2 === 0 ? 'bg-white' : 'bg-rome-marble/30'}
              >
                <td className="p-3 font-medium">{property.name}</td>
                <td className="p-3 text-sm">{property.type}</td>
                <td className="p-3 text-green-600 font-medium">
                  {activeView === 'yearly' 
                    ? property.revenue.toLocaleString() 
                    : Math.round(property.revenue / 12).toLocaleString()
                  } As
                </td>
                <td className="p-3 text-red-600">
                  {activeView === 'yearly' 
                    ? property.expenses.toLocaleString() 
                    : Math.round(property.expenses / 12).toLocaleString()
                  } As
                </td>
                <td className="p-3 font-bold">{property.roi}%</td>
                <td className="p-3">{getTrendIcon(property.trend)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex justify-end">
        <Button 
          variant="outline" 
          className="text-xs roman-btn-outline"
          onClick={() => window.alert("Fonction en développement.")}
        >
          Rapport complet
        </Button>
      </div>
    </div>
  );
};
