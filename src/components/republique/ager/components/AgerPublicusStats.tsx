
import React from 'react';
import { LandParcel } from '../types';
import { StatBox } from '@/components/ui-custom/StatBox';
import { Map, Wheat, CircleDollarSign, Users, UserCog, Warehouse, Tractor, GlassWater, Grape } from 'lucide-react';
import { ruralProperties } from '@/components/proprietes/data/buildings';

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
  
  // Statistiques par type de domaine
  const domainesCereales = parcels.filter(p => p.buildingType === 'domaine_cereales').length;
  const domainesVignobles = parcels.filter(p => p.buildingType === 'domaine_vignoble').length;
  const domainesOliviers = parcels.filter(p => p.buildingType === 'domaine_oliviers').length;
  const elevagesEquides = parcels.filter(p => p.buildingType === 'paturage_equides').length;
  const elevagesBovins = parcels.filter(p => p.buildingType === 'paturage_bovins').length;
  const elevagesMoutons = parcels.filter(p => p.buildingType === 'paturage_moutons').length;
  
  // Statistiques pour la main d'œuvre
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
  
  // Calcul des revenus par type de bâtiment
  const calculateBuildingTypeRevenue = (buildingType: string) => {
    const buildingDetails = ruralProperties[buildingType];
    if (!buildingDetails) return 0;
    
    const buildings = parcels.filter(p => p.buildingType === buildingType);
    return buildings.reduce((sum, building) => {
      const efficiency = building.workforce?.efficiency || 0;
      const baseIncome = buildingDetails.income || 0;
      return sum + (baseIncome * efficiency / 100);
    }, 0);
  };
  
  const cerealIncome = calculateBuildingTypeRevenue('domaine_cereales');
  const vineIncome = calculateBuildingTypeRevenue('domaine_vignoble');
  const oliveIncome = calculateBuildingTypeRevenue('domaine_oliviers');
  const equideIncome = calculateBuildingTypeRevenue('paturage_equides');
  const bovinIncome = calculateBuildingTypeRevenue('paturage_bovins');
  const moutonIncome = calculateBuildingTypeRevenue('paturage_moutons');
  
  const totalIncome = cerealIncome + vineIncome + oliveIncome + equideIncome + bovinIncome + moutonIncome;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatBox
        title="Domaines publics"
        value={isLoading ? '...' : totalParcels.toString()}
        icon={<Tractor className="h-5 w-5 text-rome-gold" />}
        trend="neutral"
        trendValue="—"
        description="Nombre total de domaines"
      />
      
      <StatBox
        title="Surface totale"
        value={isLoading ? '...' : `${totalArea.toLocaleString()} iugera`}
        icon={<Map className="h-5 w-5 text-green-600" />}
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
        description={`${allocatedParcels} domaines attribués`}
      />
      
      {/* Types de domaines */}
      <StatBox
        title="Domaines céréaliers"
        value={isLoading ? '...' : `${domainesCereales}`}
        icon={<Wheat className="h-5 w-5 text-amber-600" />}
        trend="neutral"
        trendValue={`${Math.round(cerealIncome).toLocaleString()} as`}
        description="Revenus annuels estimés"
      />
      
      <StatBox
        title="Vignobles"
        value={isLoading ? '...' : `${domainesVignobles}`}
        icon={<Grape className="h-5 w-5 text-purple-600" />}
        trend="up"
        trendValue={`${Math.round(vineIncome).toLocaleString()} as`}
        description="Revenus annuels estimés"
      />
      
      <StatBox
        title="Oliveraies"
        value={isLoading ? '...' : `${domainesOliviers}`}
        icon={<GlassWater className="h-5 w-5 text-green-600" />}
        trend="neutral"
        trendValue={`${Math.round(oliveIncome).toLocaleString()} as`}
        description="Revenus annuels estimés"
      />
      
      <StatBox
        title="Pâturages"
        value={isLoading ? '...' : `${elevagesEquides + elevagesBovins + elevagesMoutons}`}
        icon={<Users className="h-5 w-5 text-emerald-600" />}
        trend="up"
        trendValue={`${Math.round(equideIncome + bovinIncome + moutonIncome).toLocaleString()} as`}
        description="Revenus annuels estimés"
      />
      
      {/* Statistiques pour la main d'œuvre */}
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
        trendValue={totalPublicSlaves > 0 ? `~${Math.round(totalPublicSlaves/totalParcels)} par domaine` : "—"}
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
        title="Revenu total"
        value={isLoading ? '...' : `${totalIncome.toLocaleString()} as`}
        icon={<Warehouse className="h-5 w-5 text-orange-600" />}
        trend="up"
        trendValue="+5% cette année"
        description="Revenus annuels estimés"
      />
    </div>
  );
};
