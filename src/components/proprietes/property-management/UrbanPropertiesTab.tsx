
import React, { useState } from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { UrbanPropertySelector } from './urban/UrbanPropertySelector';
import { UrbanPropertyDetails } from './urban/UrbanPropertyDetails';
import { OwnedUrbanPropertiesSection } from './urban/owned/OwnedUrbanPropertiesSection';
import { UrbanCatalogueSection } from './urban/catalogue/UrbanCatalogueSection';
import { useUrbanPropertiesTab } from './urban/hooks/useUrbanPropertiesTab';
import { BuildingDescription, OwnedBuilding } from '../hooks/building/types';

// For type safety, define the allowed building types
type AllowedBuildingType = 'residential' | 'religious' | 'public' | 'military';

const UrbanPropertiesTab = () => {
  const {
    selectedBuildingType,
    setSelectedBuildingType,
    selectedBuildingId,
    setSelectedBuildingId,
    selectedBuildingDetails,
    purchaseDialogOpen,
    setPurchaseDialogOpen,
    balance,
    availableSlaves,
    filteredOwnedBuildings,
    sellBuilding,
    calculateBuildingValue,
    toggleMaintenance,
    performMaintenance,
    assignSlaves,
  } = useUrbanPropertiesTab();

  const [isViewingCatalogue, setIsViewingCatalogue] = useState(false);

  // Create properly typed adapter functions
  const handleBuildingTypeChange = (type: AllowedBuildingType) => {
    setSelectedBuildingType(type);
  };

  const handleBuildingSelect = (id: string) => {
    setSelectedBuildingId(id);
  };

  const handleToggleMaintenance = (buildingId: number) => {
    return toggleMaintenance(buildingId, true);
  };

  const handlePerformMaintenance = (buildingId: number) => {
    return performMaintenance(buildingId);
  };

  const handleSellBuilding = (buildingId: number, estimatedValue: number) => {
    return sellBuilding(buildingId);
  };

  const handleCalculateBuildingValue = (buildingId: number) => {
    // Find the building by ID
    const building = filteredOwnedBuildings.find(b => Number(b.id) === buildingId);
    if (building) {
      return calculateBuildingValue(building);
    }
    return 0;
  };

  // Extract building details as BuildingDescription for compatibility
  const getBuildingDescription = (building: OwnedBuilding): BuildingDescription => {
    return {
      id: building.buildingId,
      name: building.name,
      description: `Description for ${building.name}`,
      basePrice: 10000,
      maintenanceCost: building.maintenanceCost,
      type: building.buildingType,
      advantages: [],
      initialCost: 10000,
      prestige: 5
    };
  };

  const adaptedSelectedBuildingDetails = selectedBuildingDetails 
    ? getBuildingDescription(selectedBuildingDetails as OwnedBuilding)
    : null;

  return (
    <TabsContent value="urban" className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left panel: Building selector */}
        <div className="lg:col-span-1 space-y-6">
          <UrbanPropertySelector
            buildingType={selectedBuildingType as AllowedBuildingType}
            selectedId={selectedBuildingId || ''}
            onSelect={handleBuildingSelect}
            isViewingCatalogue={isViewingCatalogue}
            setIsViewingCatalogue={setIsViewingCatalogue}
          />
          
          {isViewingCatalogue ? (
            <UrbanCatalogueSection 
              selectedBuildingType={selectedBuildingType as AllowedBuildingType}
              setSelectedBuildingType={handleBuildingTypeChange}
              selectedBuildingId={selectedBuildingId}
              setSelectedBuildingId={handleBuildingSelect}
              selectedBuildingDetails={adaptedSelectedBuildingDetails}
              purchaseDialogOpen={purchaseDialogOpen}
              setPurchaseDialogOpen={setPurchaseDialogOpen}
            />
          ) : (
            <OwnedUrbanPropertiesSection
              selectedBuildingType={selectedBuildingType as "religious" | "public" | "residential" | "military" || "urban"}
              filteredOwnedBuildings={filteredOwnedBuildings || []}
              balance={balance}
              availableSlaves={availableSlaves}
              setPurchaseDialogOpen={setPurchaseDialogOpen}
              toggleMaintenance={handleToggleMaintenance}
              performMaintenance={handlePerformMaintenance}
              assignSlaves={assignSlaves}
              sellBuilding={handleSellBuilding}
              calculateBuildingValue={handleCalculateBuildingValue}
            />
          )}
        </div>
        
        {/* Right panel: Building details */}
        <div className="lg:col-span-2">
          {adaptedSelectedBuildingDetails ? (
            <UrbanPropertyDetails 
              buildingDetails={adaptedSelectedBuildingDetails}
            />
          ) : (
            <div className="border rounded-lg p-6 bg-card text-center text-muted-foreground">
              <p>Sélectionnez une propriété pour voir les détails</p>
            </div>
          )}
        </div>
      </div>
    </TabsContent>
  );
};

export default UrbanPropertiesTab;
