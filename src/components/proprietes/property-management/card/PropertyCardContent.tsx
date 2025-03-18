
import React from 'react';
import { OwnedBuilding } from '../../hooks/building/types';
import { formatCurrency } from '@/utils/currencyUtils';
import { InfoItem } from './InfoItem';
import { StatusBadge } from '@/components/republique/batiments/components/StatusBadge';
import { 
  Building,
  MapPin,
  Calendar,
  Sparkles,
  Users
} from 'lucide-react';

interface PropertyCardContentProps {
  building: OwnedBuilding;
  buildingValue: number;
  hasSlavesManagement: boolean;
  optimalSlaves?: number;
}

export const PropertyCardContent: React.FC<PropertyCardContentProps> = ({
  building,
  buildingValue,
  hasSlavesManagement,
  optimalSlaves
}) => {
  // Get building status
  const getStatusType = () => {
    if (building.condition < 30) return 'ruined';
    if (building.condition < 50) return 'damaged';
    if (building.condition < 70) return 'abandoned';
    return 'completed';
  };
  
  // Format purchase date
  const formattedDate = building.purchaseDate 
    ? new Date(building.purchaseDate).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Date inconnue';
  
  // Get slave efficiency 
  const getSlaveEfficiency = () => {
    if (!hasSlavesManagement || !optimalSlaves || optimalSlaves === 0) return null;
    
    const efficiency = (building.slaves / optimalSlaves) * 100;
    
    if (efficiency >= 100) return 'Optimal';
    if (efficiency >= 80) return 'Bon';
    if (efficiency >= 50) return 'Moyen';
    if (efficiency > 0) return 'Insuffisant';
    return 'Aucun';
  };
  
  // Get efficiency color
  const getEfficiencyColor = () => {
    if (!hasSlavesManagement || !optimalSlaves || optimalSlaves === 0) return '';
    
    const efficiency = (building.slaves / optimalSlaves) * 100;
    
    if (efficiency >= 100) return 'text-green-600';
    if (efficiency >= 80) return 'text-emerald-600';
    if (efficiency >= 50) return 'text-amber-600';
    if (efficiency > 0) return 'text-orange-600';
    return 'text-red-600';
  };
  
  return (
    <div className="px-4 pb-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-2">
        <div className="flex items-center">
          <StatusBadge status={getStatusType()} showIcon />
          <span className="ml-2 text-sm">{building.condition}% condition</span>
        </div>
        <div className="font-medium text-sm">{formatCurrency(buildingValue)}</div>
      </div>
      
      <div className="space-y-2 mb-3">
        <InfoItem 
          icon={<Building className="h-4 w-4 text-gray-500" />}
          label="Type"
          value={building.buildingType.charAt(0).toUpperCase() + building.buildingType.slice(1)}
        />
        
        <InfoItem 
          icon={<MapPin className="h-4 w-4 text-gray-500" />}
          label="Localisation"
          value={building.location}
        />
        
        <InfoItem 
          icon={<Calendar className="h-4 w-4 text-gray-500" />}
          label="Acquisition"
          value={formattedDate}
        />
        
        <InfoItem 
          icon={<Sparkles className="h-4 w-4 text-gray-500" />}
          label="Maintenance"
          value={building.maintenanceEnabled ? 'Activée' : 'Désactivée'}
          valueClass={building.maintenanceEnabled ? 'text-green-600' : 'text-red-600'}
        />
        
        {hasSlavesManagement && (
          <InfoItem 
            icon={<Users className="h-4 w-4 text-gray-500" />}
            label="Esclaves"
            value={`${building.slaves}${optimalSlaves ? `/${optimalSlaves}` : ''} ${getSlaveEfficiency() ? `(${getSlaveEfficiency()})` : ''}`}
            valueClass={getEfficiencyColor()}
          />
        )}
      </div>
    </div>
  );
};
