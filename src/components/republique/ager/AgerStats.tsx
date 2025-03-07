
import React from 'react';
import { StatBox } from '@/components/ui-custom/StatBox';
import { Map, Wheat, Coins, Users, LandPlot } from 'lucide-react';

export const AgerStats: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <StatBox 
        title="Terres Totales"
        value="35,000 jugera"
        icon={<Map className="w-5 h-5" />}
        trend="up"
        trendValue="+5,000"
        description="Ager publicus"
      />
      
      <StatBox 
        title="Production"
        value="8,500 modii"
        icon={<Wheat className="w-5 h-5" />}
        trend="up"
        trendValue="+12%"
        description="Céréales"
      />
      
      <StatBox 
        title="Revenus"
        value="425,000 As"
        icon={<Coins className="w-5 h-5" />}
        trend="up"
        trendValue="+8.5%"
        description="Annuel"
      />
      
      <StatBox 
        title="Bénéficiaires"
        value="235"
        icon={<Users className="w-5 h-5" />}
        trend="up"
        trendValue="+15"
        description="Citoyens"
      />
      
      <StatBox 
        title="Disponibles"
        value="12,500 jugera"
        icon={<LandPlot className="w-5 h-5" />}
        trend="down"
        trendValue="-2,000"
        description="À attribuer"
      />
    </div>
  );
};
