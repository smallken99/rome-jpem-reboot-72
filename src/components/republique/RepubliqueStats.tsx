
import React from 'react';
import { StatBox } from '@/components/ui-custom/StatBox';
import { Landmark, Coins, Users, Scale, ChevronsUp } from 'lucide-react';

export const RepubliqueStats: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <StatBox 
        title="Trésor Public"
        value="3,450,000 As"
        icon={<Coins className="w-5 h-5" />}
        trend="up"
        trendValue="+2.4%"
        description="Solde actuel"
      />
      
      <StatBox 
        title="Population"
        value="450,000"
        icon={<Users className="w-5 h-5" />}
        trend="up"
        trendValue="+1.2%"
        description="Citoyens romains"
      />
      
      <StatBox 
        title="Stabilité"
        value="Élevée"
        icon={<Scale className="w-5 h-5" />}
        trend="neutral"
        trendValue="0%"
        description="État actuel"
      />
      
      <StatBox 
        title="Magistrats"
        value="24 actifs"
        icon={<Landmark className="w-5 h-5" />}
        trend="down"
        trendValue="-2"
        description="Postes occupés"
      />
      
      <StatBox 
        title="Influence"
        value="70%"
        icon={<ChevronsUp className="w-5 h-5" />}
        trend="up"
        trendValue="+5%"
        description="Prestige de Rome"
      />
    </div>
  );
};
