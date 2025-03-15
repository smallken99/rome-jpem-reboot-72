
import React, { useState } from 'react';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { OwnedUrbanPropertiesSection } from './urban/owned/OwnedUrbanPropertiesSection';
import { UrbanCatalogueSection } from './urban/catalogue/UrbanCatalogueSection';
import { PropertyPurchaseDialog } from './dialogs/PropertyPurchaseDialog';
import { OwnedBuilding } from '../hooks/building/types';
import { useBuildingManagement } from '../hooks/useBuildingManagement';

export const UrbanPropertiesTab: React.FC = () => {
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
  const patrimoine = usePatrimoine();
  
  const { 
    buildings,
    handleAddProperty,
    sellBuilding,
    calculateBuildingValue,
    urbanBuildings,
    religiousBuildings,
    publicBuildings,
    balance
  } = useBuildingManagement();

  // Filter only urban buildings
  const ownedUrbanBuildings = buildings.filter(building => 
    building.buildingType === "urban" || 
    building.buildingType === "religious" || 
    (building.buildingType === "public" && building.buildingId !== "military")
  );

  // Create a function to get calculated values
  const getEstimatedValue = (building: OwnedBuilding) => {
    return calculateBuildingValue(building);
  };

  // Handle the property sale
  const handleSellProperty = (id: number | string) => {
    // Convert string id to number if needed
    const numericId = typeof id === 'string' ? parseInt(id) : id;
    // Find the building to get its value before selling
    const building = buildings.find(b => b.id === id);
    
    if (building) {
      const value = calculateBuildingValue(building);
      const success = sellBuilding(id);
      
      if (success && patrimoine.buildingSold) {
        patrimoine.buildingSold(building.buildingType, value);
      }
      
      return success;
    }
    
    return false;
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Propriétés Urbaines</h2>
        <Button onClick={() => setPurchaseDialogOpen(true)} className="bg-amber-600 hover:bg-amber-700">
          <Plus className="mr-2 h-4 w-4" />
          Acquérir une nouvelle propriété
        </Button>
      </div>

      {/* Section for owned properties */}
      <OwnedUrbanPropertiesSection 
        buildings={ownedUrbanBuildings}
        onSell={handleSellProperty}
        estimatedValue={getEstimatedValue}
      />

      {/* Section for available properties to purchase */}
      <UrbanCatalogueSection 
        onPurchase={(buildingId, buildingType, location, customName) => 
          handleAddProperty(buildingId, buildingType, location, customName)
        }
        balance={balance}
      />

      {/* Purchase dialog */}
      <PropertyPurchaseDialog
        open={purchaseDialogOpen}
        onOpenChange={setPurchaseDialogOpen}
        buildingType="urban" 
        onPurchase={(buildingId, buildingType, location, customName) => 
          handleAddProperty(buildingId, buildingType, location, customName)
        }
        balance={balance}
      />
    </div>
  );
};
