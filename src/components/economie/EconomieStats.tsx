
import React from 'react';
import { StatBox } from '@/components/ui-custom/StatBox';
import { TrendingUp, TrendingDown, Wallet, Landmark } from 'lucide-react';

export const EconomieStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatBox 
        title="Revenus mensuels" 
        value="125,000 As" 
        description="En hausse ce trimestre"
        icon={<TrendingUp className="h-6 w-6" />}
        trend="up"
        trendValue="+8%"
      />
      <StatBox 
        title="Dépenses mensuelles" 
        value="85,000 As" 
        description="En hausse ce trimestre"
        icon={<TrendingDown className="h-6 w-6" />}
        trend="up"
        trendValue="+5%"
      />
      <StatBox 
        title="Fortune totale" 
        value="3,450,000 As" 
        description="Stable ce semestre"
        icon={<Wallet className="h-6 w-6" />}
        trend="neutral"
        trendValue="0%"
      />
      <StatBox 
        title="Impôts annuels" 
        value="45,000 As" 
        description="Réduction fiscale obtenue"
        icon={<Landmark className="h-6 w-6" />}
        trend="up"
        trendValue="-3%"
      />
    </div>
  );
};
