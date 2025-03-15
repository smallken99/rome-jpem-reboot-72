
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { OwnedBuilding } from '../hooks/building/types';
import { MaintenanceDialog } from './dialogs/MaintenanceDialog';
import { SlaveAssignmentDialog } from './dialogs/SlaveAssignmentDialog';
import { PropertySaleDialog } from './dialogs/PropertySaleDialog';
import { BuildingDescription as DataBuildingDescription } from '../data/types/buildingTypes';
import { BuildingDescription as HookBuildingDescription } from '../hooks/building/types';
import { PropertyCardHeader } from './card/PropertyCardHeader';
import { PropertyCardContent } from './card/PropertyCardContent';
import { PropertyCardActions } from './card/PropertyCardActions';
import { adaptBuildingDescription } from './card/buildingAdapter';

interface PropertyCardProps {
  building: OwnedBuilding;
  buildingDetails: DataBuildingDescription | HookBuildingDescription | null;
  onToggleMaintenance: (buildingId: number | string, enabled: boolean) => void;
  onPerformMaintenance: (buildingId: number | string) => boolean;
  onAssignSlaves: (buildingId: number | string, slaveCount: number) => void;
  onSell: (buildingId: number | string, value: number) => boolean;
  balance: number;
  totalAvailableSlaves: number;
  buildingValue: number;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  building,
  buildingDetails,
  onToggleMaintenance,
  onPerformMaintenance,
  onAssignSlaves,
  onSell,
  balance,
  totalAvailableSlaves,
  buildingValue
}) => {
  const [maintenanceDialogOpen, setMaintenanceDialogOpen] = useState(false);
  const [slaveDialogOpen, setSlaveDialogOpen] = useState(false);
  const [saleDialogOpen, setSaleDialogOpen] = useState(false);
  
  const adaptedBuildingDetails = adaptBuildingDescription(buildingDetails);
  const hasSlaveManagement = !!adaptedBuildingDetails?.slaves;
  
  return (
    <>
      <Card className="border-rome-gold/30">
        <PropertyCardHeader 
          name={building.name}
          onOpenMaintenanceDialog={() => setMaintenanceDialogOpen(true)}
          onOpenSlaveDialog={() => setSlaveDialogOpen(true)}
          onOpenSaleDialog={() => setSaleDialogOpen(true)}
          showSlaveManagement={hasSlaveManagement}
        />
        
        <PropertyCardContent 
          building={building}
          buildingValue={buildingValue}
          hasSlavesManagement={hasSlaveManagement}
          optimalSlaves={adaptedBuildingDetails?.slaves?.optimal}
        />
        
        <div className="px-4 pb-4">
          <PropertyCardActions 
            onOpenMaintenanceDialog={() => setMaintenanceDialogOpen(true)}
            onOpenSlaveDialog={() => setSlaveDialogOpen(true)}
            onOpenSaleDialog={() => setSaleDialogOpen(true)}
            showSlaveManagement={hasSlaveManagement}
          />
        </div>
      </Card>
      
      <MaintenanceDialog 
        open={maintenanceDialogOpen}
        onOpenChange={setMaintenanceDialogOpen}
        building={building}
        onToggleMaintenance={onToggleMaintenance}
        onPerformMaintenance={onPerformMaintenance}
        balance={balance}
      />
      
      {adaptedBuildingDetails?.slaves && (
        <SlaveAssignmentDialog 
          open={slaveDialogOpen}
          onOpenChange={setSlaveDialogOpen}
          building={building}
          onAssignSlaves={onAssignSlaves}
          totalAvailableSlaves={totalAvailableSlaves}
        />
      )}
      
      <PropertySaleDialog 
        open={saleDialogOpen}
        onOpenChange={setSaleDialogOpen}
        building={building}
        estimatedValue={buildingValue}
        onSell={onSell}
      />
    </>
  );
};
