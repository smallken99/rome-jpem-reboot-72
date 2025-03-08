
import React from 'react';
import { LandParcel } from '../types';
import { StatBox } from '@/components/ui-custom/StatBox';
import { Map, Leaf, CircleDollarSign, Users, UserCog, Warehouse } from 'lucide-react';

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
  
  // Nouvelles statistiques pour la main d'œuvre
  const totalMagistrates = parcels.reduce((sum, parcel) => sum + (parcel.workforce?.magistrates || 0), 0);
  const totalOverseers = parcels.reduce((sum, parcel) => sum + (parcel.workforce?.overseers || 0), 0);
  const totalPublicSlaves = parcels.reduce((sum, parcel) => sum + (parcel.workforce?.publicSlaves || 0), 0);
  
  // Calcul de l'efficacité moyenne
  const parcelsWithWorkforce = parcels.filter(parcel => parcel.workforce?.efficiency !== undefined);
  const averageEfficiency = parcelsWithWorkforce.length > 0
    ? Math.round(parcelsWithWorkforce.reduce((sum, parcel) => sum + (parcel.workforce?.efficiency || 0), 0) / parcelsWithWorkforce.length)
    : 0;
  
  // Estimation de la production
  const totalProduction = parcels.reduce((sum, parcel) => sum + (parcel.production?.amount || 0), 0);

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
      
      {/* Nouvelles statistiques pour la main d'œuvre */}
      <StatBox
        title="Fonctionnaires"
        value={isLoading ? '...' : `${totalMagistrates + totalOverseers}`}
        icon={<UserCog className="h-5 w-5 text-indigo-600" />}
        trend="neutral"
        trendValue={`${totalMagistrates} mag. / ${totalOverseers} cont.`}
        description="Magistrats et contremaîtres assignés"
      />
      
      <StatBox
        title="Esclaves publics"
        value={isLoading ? '...' : totalPublicSlaves.toString()}
        icon={<Users className="h-5 w-5 text-amber-700" />}
        trend={totalPublicSlaves > 100 ? "up" : "neutral"}
        trendValue={totalPublicSlaves > 0 ? `~${Math.round(totalPublicSlaves/totalParcels)} par parcelle` : "—"}
        description="Servi publici affectés aux terres"
      />
      
      <StatBox
        title="Efficacité"
        value={isLoading ? '...' : `${averageEfficiency}%`}
        icon={<UserCog className="h-5 w-5 text-emerald-600" />}
        trend={averageEfficiency > 70 ? "up" : averageEfficiency > 40 ? "neutral" : "down"}
        trendValue={averageEfficiency > 70 ? "Excellente" : averageEfficiency > 40 ? "Correcte" : "Insuffisante"}
        description="Efficacité moyenne de la main d'œuvre"
      />
      
      <StatBox
        title="Production"
        value={isLoading ? '...' : `${totalProduction.toLocaleString()}`}
        icon={<Warehouse className="h-5 w-5 text-orange-600" />}
        trend="up"
        trendValue="+5% cette année"
        description="Production totale estimée"
      />
    </div>
  );
};
