
import React, { useState } from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { UrbanPropertySelector } from './urban/UrbanPropertySelector';
import { UrbanPropertyDetails } from './urban/UrbanPropertyDetails';
import { OwnedUrbanPropertiesSection } from './urban/owned/OwnedUrbanPropertiesSection';
import { UrbanCatalogueSection } from './urban/catalogue/UrbanCatalogueSection';
import { useUrbanPropertiesTab } from './urban/hooks/useUrbanPropertiesTab';
import { BuildingDescription } from '../data/types/buildingTypes';
import { OwnedBuilding } from '../hooks/building/types';

// For type safety, define the allowed building types
type AllowedBuildingType = 'residential' | 'religious' | 'public' | 'military';

const UrbanPropertiesTab = () => {
  const {
    selectedBuildingType,
    setSelectedBuildingType,
    selectedBuildingId,
    setSelectedBuildingId,
    selectedBuildingDetails,
    isPurchaseDialogOpen,
    setIsPurchaseDialogOpen,
    balance,
    availableSlaves,
    filteredOwnedBuildings,
    sellBuilding: handleSellBuilding,
    calculateBuildingValue: handleCalcBuildingValue,
    toggleMaintenance: handleToggleMaintenance,
    performMaintenance: handlePerformMaintenance,
    assignSlaves: handleAssignSlaves,
  } = useUrbanPropertiesTab();

  const [isViewingCatalogue, setIsViewingCatalogue] = useState(false);

  // Create properly typed adapter functions
  const handleBuildingTypeChange = (type: AllowedBuildingType) => {
    setSelectedBuildingType(type as any);
  };

  const handleBuildingSelect = (id: string) => {
    setSelectedBuildingId(id);
  };

  const toggleMaintenance = (buildingId: number): boolean => {
    handleToggleMaintenance(buildingId, true);
    return true;
  };

  const performMaintenance = (buildingId: number): boolean => {
    handlePerformMaintenance(buildingId);
    return true;
  };

  const sellBuilding = (buildingId: number, estimatedValue: number): boolean => {
    handleSellBuilding(buildingId);
    return true;
  };

  const calculateBuildingValue = (buildingId: number): number => {
    // Find the building by ID
    const building = filteredOwnedBuildings.find(b => Number(b.id) === buildingId);
    if (building) {
      return handleCalcBuildingValue(building);
    }
    return 0;
  };

  const assignSlaves = (buildingId: number, slaveCount: number): void => {
    handleAssignSlaves(buildingId, slaveCount);
  };

  // Extract building details for compatibility
  const getBuildingDetailsForDisplay = (building: OwnedBuilding): BuildingDescription => {
    return {
      id: building.buildingId,
      name: building.name,
      description: `Description for ${building.name}`,
      basePrice: 10000,
      maintenanceCost: building.maintenanceCost,
      type: building.buildingType,
      advantages: ['Advantage 1', 'Advantage 2'],
      initialCost: 10000,
      prestige: 5,
      slaves: {
        required: 2,
        optimal: 5,
        maxProfit: 10
      }
    };
  };

  const adaptedSelectedBuildingDetails = selectedBuildingDetails 
    ? getBuildingDetailsForDisplay(selectedBuildingDetails as OwnedBuilding)
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
              purchaseDialogOpen={isPurchaseDialogOpen}
              setPurchaseDialogOpen={setIsPurchaseDialogOpen}
            />
          ) : (
            <OwnedUrbanPropertiesSection
              selectedBuildingType={selectedBuildingType as "religious" | "public" | "residential" | "military"}
              filteredOwnedBuildings={filteredOwnedBuildings || []}
              balance={balance}
              availableSlaves={availableSlaves}
              setPurchaseDialogOpen={setIsPurchaseDialogOpen}
              toggleMaintenance={toggleMaintenance}
              performMaintenance={performMaintenance}
              assignSlaves={assignSlaves}
              sellBuilding={sellBuilding}
              calculateBuildingValue={calculateBuildingValue}
            />
          )}
        </div>
        
        {/* Right panel: Building details */}
        <div className="lg:col-span-2">
          {adaptedSelectedBuildingDetails ? (
            <UrbanPropertyDetails 
              buildingDetails={adaptedSelectedBuildingDetails as any}
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
