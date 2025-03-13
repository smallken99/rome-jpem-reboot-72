
import React from 'react';
import { StatBox } from '@/components/ui-custom/StatBox';
import { Coins, ArrowUpDown, Building, Scale, TrendingUp } from 'lucide-react';

export const TresorStats: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <StatBox 
        title="Solde Actuel"
        value="12.5M As"
        icon={<Coins className="w-5 h-5" />}
        trend="up"
        trendValue="+2.3%"
        description="Trésor public"
      />
      
      <StatBox 
        title="Flux Mensuel"
        value="1.2M As"
        icon={<ArrowUpDown className="w-5 h-5" />}
        trend="up"
        trendValue="+150K"
        description="Excédent moyen"
      />
      
      <StatBox 
        title="Actifs"
        value="32.7M As"
        icon={<Building className="w-5 h-5" />}
        trend="up"
        trendValue="+3.1%"
        description="Propriétés publiques"
      />
      
      <StatBox 
        title="Dette Publique"
        value="4.2M As"
        icon={<Scale className="w-5 h-5" />}
        trend="down"
        trendValue="-200K"
        description="En baisse"
      />
      
      <StatBox 
        title="Tendance"
        value="Positive"
        icon={<TrendingUp className="w-5 h-5" />}
        trend="up"
        trendValue="+5.4%"
        description="Croissance annuelle"
      />
    </div>
  );
};
