
import React from 'react';
import { Property } from '@/types/proprietes';
import { formatCurrency } from '@/utils/currencyUtils';

export interface PropertyStatsProps {
  property: Property;
}

const PropertyStats: React.FC<PropertyStatsProps> = ({ property }) => {
  // Calculer les statistiques financières
  const income = property.income || property.incomePerYear || 0;
  const maintenance = property.maintenance || property.maintenanceCost || 0;
  const netProfit = income - maintenance;

  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <div className="text-sm text-muted-foreground mb-1">Revenu Annuel</div>
        <div className={`text-lg font-medium ${income > 0 ? 'text-green-600' : 'text-muted-foreground'}`}>
          {formatCurrency(income)}
        </div>
      </div>
      
      <div>
        <div className="text-sm text-muted-foreground mb-1">Entretien</div>
        <div className="text-lg font-medium text-red-600">
          {formatCurrency(maintenance)}
        </div>
      </div>
      
      <div>
        <div className="text-sm text-muted-foreground mb-1">Profit Net</div>
        <div className={`text-lg font-medium ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {formatCurrency(netProfit)}
        </div>
      </div>
    </div>
  );
};

export default PropertyStats;
