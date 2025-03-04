
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { ResourcesTable } from '@/components/economie/ResourcesTable';
import { StatBox } from '@/components/ui-custom/StatBox';
import { Wheat, Coins, Warehouse, Package } from 'lucide-react';

export const StorageManagement: React.FC = () => {
  return (
    <RomanCard className="mb-6">
      <RomanCard.Header>
        <h3 className="font-cinzel text-lg text-rome-navy">Greniers et Stockage</h3>
      </RomanCard.Header>
      <RomanCard.Content>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatBox 
            title="Capacité de stockage"
            value="2,500 modii"
            description="Capacité totale des greniers"
            icon={<Warehouse className="h-5 w-5" />}
          />
          <StatBox 
            title="Stockage utilisé"
            value="1,830 modii"
            description="73% de la capacité utilisée"
            icon={<Package className="h-5 w-5" />}
          />
          <StatBox 
            title="Valeur des stocks"
            value="146,400 As"
            description="Valeur marchande estimée"
            icon={<Coins className="h-5 w-5" />}
            trend="up"
            trendValue="+5%"
          />
        </div>
        
        <ResourcesTable />
      </RomanCard.Content>
    </RomanCard>
  );
};
