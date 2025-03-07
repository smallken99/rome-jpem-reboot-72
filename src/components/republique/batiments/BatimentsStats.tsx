
import React from 'react';
import { StatBox } from '@/components/ui-custom/StatBox';
import { Building, Landmark, LayoutGrid, Hammer, Droplet } from 'lucide-react';

export const BatimentsStats: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <StatBox 
        title="Édifices Publics"
        value="78"
        icon={<Building className="w-5 h-5" />}
        trend="up"
        trendValue="+3"
        description="Total"
      />
      
      <StatBox 
        title="Temples"
        value="24"
        icon={<Landmark className="w-5 h-5" />}
        trend="up"
        trendValue="+1"
        description="Total"
      />
      
      <StatBox 
        title="Aqueducs"
        value="4"
        icon={<Droplet className="w-5 h-5" />}
        trend="neutral"
        trendValue="0"
        description="Opérationnels"
      />
      
      <StatBox 
        title="Constructions"
        value="7"
        icon={<Hammer className="w-5 h-5" />}
        trend="up"
        trendValue="+2"
        description="En cours"
      />
      
      <StatBox 
        title="Zones Urbaines"
        value="14"
        icon={<LayoutGrid className="w-5 h-5" />}
        trend="up"
        trendValue="+1"
        description="Développées"
      />
    </div>
  );
};
