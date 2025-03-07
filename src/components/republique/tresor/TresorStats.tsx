
import React from 'react';
import { StatBox } from '@/components/ui-custom/StatBox';
import { Coins, Building, Swords, Ship, LandPlot } from 'lucide-react';

export const TresorStats: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <StatBox 
        title="Solde"
        value="3,450,000 As"
        icon={<Coins className="w-5 h-5" />}
        trend="up"
        trendValue="+2.4%"
        description="Balance actuelle"
        onClick={() => {}} 
      />
      
      <StatBox 
        title="Impôts directs"
        value="1,250,000 As"
        icon={<LandPlot className="w-5 h-5" />}
        trend="up"
        trendValue="+1.1%"
        description="Tributum"
        onClick={() => {}} 
      />
      
      <StatBox 
        title="Travaux publics"
        value="850,000 As"
        icon={<Building className="w-5 h-5" />}
        trend="down"
        trendValue="-5.2%"
        description="Dépenses"
        onClick={() => {}} 
      />
      
      <StatBox 
        title="Armée"
        value="1,200,000 As"
        icon={<Swords className="w-5 h-5" />}
        trend="up"
        trendValue="+12.3%"
        description="Dépenses"
        onClick={() => {}} 
      />
      
      <StatBox 
        title="Commerce"
        value="980,000 As"
        icon={<Ship className="w-5 h-5" />}
        trend="up"
        trendValue="+8.7%"
        description="Portorium"
        onClick={() => {}} 
      />
    </div>
  );
};
