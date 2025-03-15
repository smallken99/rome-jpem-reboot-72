
import React, { useState } from 'react';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { OwnedRuralPropertiesSection } from './rural/owned/OwnedRuralPropertiesSection';
import { RuralCatalogueSection } from './rural/catalogue/RuralCatalogueSection';
import { PropertyPurchaseDialog } from './dialogs/PropertyPurchaseDialog';
import { OwnedBuilding } from '../hooks/building/types';
import { useBuildingManagement } from '../hooks/useBuildingManagement';

export const RuralPropertiesTab: React.FC = () => {
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
  const patrimoine = usePatrimoine();
  
  const { 
    buildings,
    handleAddProperty,
    sellBuilding,
    calculateBuildingValue,
    ruralBuildings,
    balance
  } = useBuildingManagement();

  // Filter only rural properties
  const ownedRuralBuildings = buildings.filter(building => 
    building.buildingType === "rural"
  );

  // Create a function to get calculated values
  const getEstimatedValue = (building: OwnedBuilding) => {
    return calculateBuildingValue(building);
  };

  // Handle the property sale
  const handleSellProperty = (id: number | string) => {
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
        <h2 className="text-2xl font-semibold">Propriétés Rurales</h2>
        <Button onClick={() => setPurchaseDialogOpen(true)} className="bg-green-700 hover:bg-green-800">
          <Plus className="mr-2 h-4 w-4" />
          Acquérir un nouveau domaine
        </Button>
      </div>

      {/* Section for owned properties */}
      <OwnedRuralPropertiesSection 
        buildings={ownedRuralBuildings}
        onSell={handleSellProperty}
        estimatedValue={getEstimatedValue}
      />

      {/* Section for available properties to purchase */}
      <RuralCatalogueSection 
        selectedPropertyId={null}
        setSelectedPropertyId={() => {}}
        propertyDetails={null}
        purchaseDialogOpen={false}
        setPurchaseDialogOpen={() => {}}
        propertySize="moyen"
        setPropertySize={() => {}}
        propertyLocation="latium"
        setPropertyLocation={() => {}}
      />

      {/* Purchase dialog */}
      <PropertyPurchaseDialog
        open={purchaseDialogOpen}
        onOpenChange={setPurchaseDialogOpen}
        buildingType="rural"
        building={null}
        buildingId=""
        onPurchase={(buildingId, buildingType, location, customName) => 
          handleAddProperty(buildingId, buildingType, location, customName)
        }
        balance={balance}
      />
    </div>
  );
};
