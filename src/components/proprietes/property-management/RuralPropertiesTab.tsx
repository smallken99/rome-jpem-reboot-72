
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PropertyPurchaseDialog } from './dialogs/PropertyPurchaseDialog';
import { RuralCatalogueSection } from './rural/catalogue/RuralCatalogueSection';
import { OwnedRuralPropertiesSection } from './rural/owned/OwnedRuralPropertiesSection';
import { useRuralPropertiesTab } from './rural/hooks/useRuralPropertiesTab';
import { OwnedBuilding, BuildingPurchaseOptions } from '../hooks/building/types';
import { ruralProperties } from '../data/buildings/ruralProperties';

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
    ownedRuralProperties,
    balance,
    toggleMaintenance,
    performMaintenance,
    sellBuilding,
    calculateBuildingValue,
    assignSlaves,
    handlePurchase,
    availableSlaves
  } = useRuralPropertiesTab();

  // Get property details from rural properties catalog
  const propertyDetails = selectedPropertyId 
    ? ruralProperties.find(prop => prop.id === selectedPropertyId) || null 
    : null;

  // Create a synchronous wrapper for the async handlePurchase function
  const adaptedHandlePurchase = (
    buildingId: string, 
    buildingType: "urban" | "rural" | "religious" | "public", 
    location: string, 
    customName?: string
  ): boolean => {
    // Convert the async call to a synchronous one
    const options: BuildingPurchaseOptions = {
      buildingId,
      type: buildingType,
      name: customName || `Propriété ${buildingType}`,
      location,
      initialCost: propertyDetails?.initialCost || 5000,
      maintenanceCost: propertyDetails?.maintenanceCost || 500,
      customName
    };

    // Start the purchase process but return true immediately
    handlePurchase(options);
    return true;
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
            ruralProperties={ruralProperties.reduce((acc, curr) => {
              acc[curr.id] = curr;
              return acc;
            }, {} as Record<string, typeof ruralProperties[0]>)}
            toggleMaintenance={toggleMaintenance}
            performMaintenance={performMaintenance}
            assignSlaves={assignSlaves}
            sellBuilding={sellBuilding}
            calculateBuildingValue={calculateBuildingValue}
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
