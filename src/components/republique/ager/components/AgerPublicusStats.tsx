
import React from 'react';
import { LandParcel } from '../types';
import { StatBox } from '@/components/ui-custom/StatBox';
import { Map, Leaf, CircleDollarSign, Users } from 'lucide-react';

interface AgerPublicusStatsProps {
  parcels: LandParcel[];
  isLoading: boolean;
}

export const AgerPublicusStats: React.FC<AgerPublicusStatsProps> = ({ parcels, isLoading }) => {
  // Calculate stats from parcel data
  const totalParcels = parcels.length;
  const totalArea = parcels.reduce((sum, parcel) => sum + parcel.size, 0);
  const totalValue = parcels.reduce((sum, parcel) => sum + parcel.value, 0);
  const allocatedParcels = parcels.filter(parcel => parcel.status === 'allocated').length;
  const allocationPercentage = totalParcels > 0 
    ? Math.round((allocatedParcels / totalParcels) * 100) 
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatBox
        title="Parcelles totales"
        value={isLoading ? '...' : totalParcels.toString()}
        icon={<Map className="h-5 w-5 text-rome-gold" />}
        trend="neutral"
        trendValue="—"
        description="Nombre total de parcelles"
      />
      
      <StatBox
        title="Surface totale"
        value={isLoading ? '...' : `${totalArea.toLocaleString()} iugera`}
        icon={<Leaf className="h-5 w-5 text-green-600" />}
        trend="neutral"
        trendValue="—"
        description="Surface totale des terres publiques"
      />
      
      <StatBox
        title="Valeur estimée"
        value={isLoading ? '...' : `${totalValue.toLocaleString()} as`}
        icon={<CircleDollarSign className="h-5 w-5 text-amber-600" />}
        trend="up"
        trendValue="+2%"
        description="Valeur totale estimée"
      />
      
      <StatBox
        title="Terres allouées"
        value={isLoading ? '...' : `${allocationPercentage}%`}
        icon={<Users className="h-5 w-5 text-blue-600" />}
        trend={allocationPercentage > 50 ? "up" : "neutral"}
        trendValue={`${allocatedParcels}/${totalParcels}`}
        description={`${allocatedParcels} parcelles attribuées`}
      />
    </div>
  );
};
