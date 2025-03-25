
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PropertyCard } from '../PropertyCard';
import { useBuildingSale } from '../../hooks/building/useBuildingSale';
import { useBuildingMaintenance } from '../../hooks/building/useBuildingMaintenance';
import { useSlaveAssignment } from '../../hooks/building/useSlaveAssignment';
import { useBuildings } from '../../hooks/useBuildings';
import { Plus, Filter } from 'lucide-react';
import { SlavePurchaseButton } from '../slaves/SlavePurchaseButton';
import { IncomeCollectionButton } from '../IncomeCollectionButton';
import { usePatrimoine } from '@/hooks/usePatrimoine';

interface UrbanPropertyListProps {
  onAddNew: () => void;
  onViewDetails: (buildingId: string | number) => void;
  onAssignSlaves: (buildingId: string | number) => void;
  buildingFilter?: string;
}

export const UrbanPropertyList: React.FC<UrbanPropertyListProps> = ({
  onAddNew,
  onViewDetails,
  onAssignSlaves,
  buildingFilter = 'urban'
}) => {
  const { buildings } = useBuildings();
  const { calculateBuildingValueById, sellBuilding } = useBuildingSale();
  const { 
    toggleMaintenance, 
    performMaintenance, 
    canPerformMaintenance 
  } = useBuildingMaintenance();
  const { balance } = usePatrimoine();
  
  // Filtrer les bâtiments urbains
  const urbanBuildings = buildings.filter(b => 
    b.buildingType === buildingFilter
  );
  
  if (urbanBuildings.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium mb-2">Aucune propriété urbaine</h3>
        <p className="text-muted-foreground mb-6">
          Vous ne possédez actuellement aucune propriété urbaine. 
          Commencez par en acquérir une pour développer votre patrimoine.
        </p>
        <Button onClick={onAddNew}>
          <Plus className="h-4 w-4 mr-2" /> 
          Acquérir une propriété
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 justify-between items-center">
        <div className="flex flex-wrap gap-3">
          <Button onClick={onAddNew}>
            <Plus className="h-4 w-4 mr-2" /> 
            Nouvelle propriété
          </Button>
          
          <SlavePurchaseButton />
          
          <IncomeCollectionButton />
        </div>
        
        <Button variant="ghost" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filtrer
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {urbanBuildings.map(building => (
          <PropertyCard
            key={building.id}
            building={building}
            estimatedValue={calculateBuildingValueById(building.id)}
            onViewDetails={() => onViewDetails(building.id)}
            onPerformMaintenance={() => performMaintenance(building.id)}
            onToggleMaintenance={(enabled) => toggleMaintenance(building.id, enabled)}
            onAssignSlaves={() => onAssignSlaves(building.id)}
            onSell={() => sellBuilding(building.id)}
            maintenanceEnabled={building.maintenanceEnabled || false}
            canPerformMaintenance={canPerformMaintenance(building.id)}
          />
        ))}
      </div>
    </div>
  );
};
