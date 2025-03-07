
import React from 'react';
import { StatBox } from '@/components/ui-custom/StatBox';
import { Coins, Building, Calculator, TrendingUp, Receipt } from 'lucide-react';

export const ImpotsStats: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <StatBox 
        title="Revenus Fiscaux"
        value="850,000 As"
        icon={<Coins className="w-5 h-5" />}
        trend="up"
        trendValue="+5.2%"
        description="Trimestre courant"
      />
      
      <StatBox 
        title="Taxes Foncières"
        value="320,000 As"
        icon={<Building className="w-5 h-5" />}
        trend="up"
        trendValue="+2.1%"
        description="Propriétés urbaines"
      />
      
      <StatBox 
        title="Tribut Provincial"
        value="405,000 As"
        icon={<Calculator className="w-5 h-5" />}
        trend="down"
        trendValue="-1.3%"
        description="Provinces romaines"
      />
      
      <StatBox 
        title="Croissance"
        value="4.5%"
        icon={<TrendingUp className="w-5 h-5" />}
        trend="up"
        trendValue="+0.8%"
        description="Annuel"
      />
      
      <StatBox 
        title="Collecte"
        value="92%"
        icon={<Receipt className="w-5 h-5" />}
        trend="up"
        trendValue="+3%"
        description="Taux de succès"
      />
    </div>
  );
};
