
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PropertyPurchaseDialog } from './dialogs/PropertyPurchaseDialog';
import { RuralCatalogueSection } from './rural/catalogue/RuralCatalogueSection';
import { OwnedRuralPropertiesSection } from './rural/owned/OwnedRuralPropertiesSection';
import { useRuralPropertiesTab } from './rural/hooks/useRuralPropertiesTab';
import { OwnedBuilding, BuildingPurchaseOptions } from '../hooks/building/types';

export const RuralPropertiesTab: React.FC = () => {
  const {
    selectedPropertyId,
    setSelectedPropertyId,
    purchaseDialogOpen,
    setPurchaseDialogOpen,
    propertySize,
    setPropertySize,
    propertyLocation,
    setPropertyLocation,
    propertyDetails,
    ownedRuralProperties,
    ruralProperties,
    balance,
    toggleMaintenance,
    performMaintenance,
    sellBuilding,
    calculateBuildingValue,
    assignSlaves,
    handlePurchase,
    availableSlaves
  } = useRuralPropertiesTab();

  // Create adapters for function signatures
  const handleToggleMaintenance = (buildingId: number) => {
    return toggleMaintenance(buildingId, true);
  };

  const handlePerformMaintenance = (buildingId: number) => {
    return performMaintenance(buildingId);
  };

  const handleSellBuilding = (buildingId: number, value: number) => {
    return sellBuilding(buildingId);
  };

  const handleCalculateBuildingValue = (buildingId: number) => {
    // Find the building by ID
    const building = ownedRuralProperties.find(b => Number(b.id) === buildingId);
    if (building) {
      return calculateBuildingValue(building);
    }
    return 0;
  };

  const adaptedHandlePurchase = (buildingId: string, buildingType: "urban" | "rural" | "religious" | "public", location: string, customName?: string) => {
    // Adapt to BuildingPurchaseOptions
    const options: BuildingPurchaseOptions = {
      buildingId,
      type: buildingType,
      name: customName || `Propriété ${buildingType}`,
      location,
      initialCost: 5000, // Default value
      maintenanceCost: 500, // Default value
      customName
    };

    return handlePurchase(options);
  };

  return (
    <div>
      <Tabs defaultValue="catalogue" className="space-y-4">
        <TabsList className="border border-rome-gold/30 bg-white">
          <TabsTrigger value="catalogue">Catalogue</TabsTrigger>
          <TabsTrigger value="owned">Mes Propriétés</TabsTrigger>
        </TabsList>
        
        {/* Catalogue de propriétés rurales */}
        <TabsContent value="catalogue">
          <RuralCatalogueSection 
            selectedPropertyId={selectedPropertyId}
            setSelectedPropertyId={setSelectedPropertyId}
            propertyDetails={propertyDetails}
            purchaseDialogOpen={purchaseDialogOpen}
            setPurchaseDialogOpen={setPurchaseDialogOpen}
            propertySize={propertySize}
            setPropertySize={setPropertySize}
            propertyLocation={propertyLocation}
            setPropertyLocation={setPropertyLocation}
          />
        </TabsContent>
        
        {/* Propriétés rurales possédées */}
        <TabsContent value="owned">
          <OwnedRuralPropertiesSection 
            ownedRuralProperties={ownedRuralProperties}
            ruralProperties={ruralProperties}
            toggleMaintenance={handleToggleMaintenance}
            performMaintenance={handlePerformMaintenance}
            assignSlaves={assignSlaves}
            sellBuilding={handleSellBuilding}
            calculateBuildingValue={handleCalculateBuildingValue}
            availableSlaves={availableSlaves}
            balance={balance}
            setPurchaseDialogOpen={setPurchaseDialogOpen}
          />
        </TabsContent>
      </Tabs>
      
      {/* Dialogue d'achat */}
      {propertyDetails && selectedPropertyId && (
        <PropertyPurchaseDialog
          open={purchaseDialogOpen}
          onOpenChange={setPurchaseDialogOpen}
          building={propertyDetails}
          buildingId={selectedPropertyId}
          buildingType="rural"
          onPurchase={adaptedHandlePurchase}
          balance={balance}
        />
      )}
    </div>
  );
};
