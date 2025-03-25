
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { OwnedBuilding } from '../hooks/building/types';
import { Coins, Calendar, Map, Wrench, Users } from 'lucide-react'; 
import { PropertyCardActions } from './card/PropertyCardActions';
import { formatCurrency, formatCompactCurrency } from '@/utils/currencyUtils';

interface PropertyCardProps {
  building: OwnedBuilding;
  estimatedValue: number;
  onViewDetails: () => void;
  onPerformMaintenance: () => void;
  onToggleMaintenance: (enabled: boolean) => void;
  onAssignSlaves: () => void;
  onSell: () => void;
  maintenanceEnabled: boolean;
  canPerformMaintenance: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  building,
  estimatedValue,
  onViewDetails,
  onPerformMaintenance,
  onToggleMaintenance,
  onAssignSlaves,
  onSell,
  maintenanceEnabled,
  canPerformMaintenance
}) => {
  // Fonction pour obtenir la classe CSS de couleur en fonction de la condition
  const getConditionColor = (condition: number) => {
    if (condition >= 80) return "text-green-600";
    if (condition >= 60) return "text-amber-600";
    if (condition >= 40) return "text-orange-500";
    return "text-red-600";
  };
  
  // Fonction pour obtenir la classe CSS de couleur pour la barre de progression
  const getProgressColor = (condition: number) => {
    if (condition >= 80) return "bg-green-600";
    if (condition >= 60) return "bg-amber-600";
    if (condition >= 40) return "bg-orange-500";
    return "bg-red-600";
  };
  
  // Fonction pour formater la date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  return (
    <Card className="h-full flex flex-col border-t-4 hover:shadow-md transition-shadow" 
      style={{ borderTopColor: building.condition >= 60 ? '#22c55e' : '#f97316' }}>
      <CardHeader className="pb-2">
        <CardTitle className="font-cinzel text-lg">{building.name}</CardTitle>
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center">
            <Map className="h-4 w-4 mr-1" />
            <span>{building.location}</span>
          </div>
          <Badge variant="outline" className="capitalize">
            {building.buildingType}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2 flex-grow">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">Valeur estimée</span>
              <span className="font-bold">
                {formatCompactCurrency(estimatedValue)}
              </span>
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">Maintenance</span>
              <span className="font-bold">
                {formatCompactCurrency(building.maintenanceCost)}
              </span>
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">Esclaves</span>
              <span className="font-bold flex items-center">
                <Users className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                {building.slaves}
              </span>
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">Acquisition</span>
              <span className="font-bold text-sm">
                {formatDate(building.purchaseDate)}
              </span>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-sm">État</span>
              <span className={`text-sm font-bold ${getConditionColor(building.condition)}`}>
                {building.condition}%
              </span>
            </div>
            <Progress value={building.condition} className={getProgressColor(building.condition)} />
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        <PropertyCardActions 
          building={building}
          onViewDetails={onViewDetails}
          onPerformMaintenance={onPerformMaintenance}
          onAssignSlaves={onAssignSlaves}
          onToggleMaintenance={onToggleMaintenance}
          onSell={onSell}
          maintenanceEnabled={maintenanceEnabled}
          canPerformMaintenance={canPerformMaintenance}
        />
      </CardFooter>
    </Card>
  );
};
