
import React from 'react';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { StatBox } from '@/components/ui-custom/StatBox';
import { Building, Coins, Wrench, PieChart } from 'lucide-react';
import { formatCurrency } from '@/utils/currencyUtils';

export const PatrimoineOverviewStats: React.FC = () => {
  const { properties, balance, getPropertyStats } = usePatrimoine();
  const stats = getPropertyStats();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatBox 
        title="Valeur Totale" 
        value={formatCurrency(stats.totalValue)} 
        icon={<Building className="h-5 w-5" />}
        trend="up"
        trendValue="+5%"
        description="Estimation de la valeur du patrimoine"
      />
      
      <StatBox 
        title="Revenus Mensuels" 
        value={formatCurrency(stats.totalIncome)} 
        icon={<Coins className="h-5 w-5" />}
        trend="neutral"
        trendValue="0"
        description="Revenus générés par vos propriétés"
      />
      
      <StatBox 
        title="Coûts d'Entretien" 
        value={formatCurrency(stats.totalMaintenance)} 
        icon={<Wrench className="h-5 w-5" />}
        trend="down"
        trendValue="-2%"
        description="Dépenses mensuelles pour l'entretien"
      />
      
      <StatBox 
        title="Propriétés" 
        value={`${stats.propertyCount}`} 
        icon={<PieChart className="h-5 w-5" />}
        trend="up"
        trendValue="+1"
        description="Nombre total de propriétés"
      />
    </div>
  );
};
