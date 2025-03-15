
import React from 'react';
import { CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { OwnedBuilding } from '../../hooks/building/types';
import { PropertyCondition } from './PropertyCondition';

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
  return (
    <CardContent>
      <div className="text-sm text-muted-foreground mb-3">{building.location}</div>
      
      <div className="flex justify-between items-center mb-3">
        <PropertyCondition condition={building.condition} />
        
        {building.maintenanceEnabled ? (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            Entretien actif
          </Badge>
        ) : (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
            Sans entretien
          </Badge>
        )}
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Coût d'entretien:</span>
          <span className="font-medium">{building.maintenanceCost.toLocaleString()} As/an</span>
        </div>
        
        {hasSlavesManagement && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Esclaves assignés:</span>
            <span className="font-medium">
              {building.slaves} / {optimalSlaves || 0}
            </span>
          </div>
        )}
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Valeur estimée:</span>
          <span className="font-medium">{buildingValue.toLocaleString()} As</span>
        </div>
      </div>
    </CardContent>
  );
};
