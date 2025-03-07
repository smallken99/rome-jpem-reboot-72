
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { PropertyCard } from '../../PropertyCard';
import { OwnedBuilding } from '../../../hooks/useBuildingManagement';
import { BuildingDescription } from '../../../data/types/buildingTypes';

interface OwnedRuralPropertiesSectionProps {
  ownedRuralProperties: OwnedBuilding[];
  ruralProperties: Record<string, BuildingDescription>;
  toggleMaintenance: (buildingId: number, enabled: boolean) => void;
  performMaintenance: (buildingId: number) => boolean;
  assignSlaves: (buildingId: number, slaveCount: number) => void;
  sellBuilding: (buildingId: number, value: number) => boolean;
  calculateBuildingValue: (buildingId: number) => number;
  availableSlaves: number;
  balance: number;
  setPurchaseDialogOpen: (open: boolean) => void;
}

export const OwnedRuralPropertiesSection: React.FC<OwnedRuralPropertiesSectionProps> = ({
  ownedRuralProperties,
  ruralProperties,
  toggleMaintenance,
  performMaintenance,
  assignSlaves,
  sellBuilding,
  calculateBuildingValue,
  availableSlaves,
  balance,
  setPurchaseDialogOpen
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-cinzel text-lg text-rome-navy">Mes Domaines Ruraux</h3>
        
        <Button
          variant="outline"
          size="sm"
          className="roman-btn-outline"
          onClick={() => setPurchaseDialogOpen(true)}
        >
          <PlusCircle className="mr-1 h-4 w-4" />
          Nouvelle acquisition
        </Button>
      </div>
      
      {ownedRuralProperties.length === 0 ? (
        <div className="bg-white border border-rome-gold/30 rounded-md p-8 text-center">
          <p className="text-muted-foreground">
            Vous ne possédez pas encore de domaines ruraux.
          </p>
          <Button 
            className="roman-btn mt-4"
            onClick={() => setPurchaseDialogOpen(true)}
          >
            <PlusCircle className="mr-1 h-4 w-4" />
            Acquérir votre premier domaine
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ownedRuralProperties.map((building) => {
            const buildingDetails = ruralProperties[building.buildingId] || null;
            
            return (
              <PropertyCard
                key={building.id}
                building={building}
                buildingDetails={buildingDetails}
                onToggleMaintenance={toggleMaintenance}
                onPerformMaintenance={performMaintenance}
                onAssignSlaves={assignSlaves}
                onSell={sellBuilding}
                balance={balance}
                totalAvailableSlaves={availableSlaves + building.slaves}
                buildingValue={calculateBuildingValue(building.id)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
