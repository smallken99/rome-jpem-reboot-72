
import React, { useState } from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { UrbanPropertySelector } from './urban/UrbanPropertySelector';
import { UrbanPropertyDetails } from './urban/UrbanPropertyDetails';
import { OwnedUrbanPropertiesSection } from './urban/owned/OwnedUrbanPropertiesSection';
import { UrbanCatalogueSection } from './urban/catalogue/UrbanCatalogueSection';
import { useUrbanPropertiesTab } from './urban/hooks/useUrbanPropertiesTab';

// For type safety, define the allowed building types
type AllowedBuildingType = 'residential' | 'religious' | 'public' | 'military';
type UrbanBuildingCategory = 'religious' | 'public' | 'urban' | 'rural';

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

  const handleBuildingTypeChange = (type: AllowedBuildingType) => {
    setSelectedBuildingType(type);
  };

  const handleBuildingSelect = (id: string) => {
    setSelectedBuildingId(id);
  };

  return (
    <TabsContent value="urban" className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left panel: Building selector */}
        <div className="lg:col-span-1 space-y-6">
          <UrbanPropertySelector
            buildingType={selectedBuildingType}
            selectedId={selectedBuildingId || ''}
            onSelect={handleBuildingSelect}
            isViewingCatalogue={isViewingCatalogue}
            setIsViewingCatalogue={setIsViewingCatalogue}
          />
          
          {isViewingCatalogue ? (
            <UrbanCatalogueSection 
              selectedBuildingType={selectedBuildingType}
              setSelectedBuildingType={handleBuildingTypeChange}
              selectedBuildingId={selectedBuildingId}
              setSelectedBuildingId={handleBuildingSelect}
              selectedBuildingDetails={selectedBuildingDetails}
              purchaseDialogOpen={purchaseDialogOpen}
              setPurchaseDialogOpen={setPurchaseDialogOpen}
            />
          ) : (
            <OwnedUrbanPropertiesSection
              selectedBuildingType={selectedBuildingType === 'military' ? 'public' : selectedBuildingType}
              filteredOwnedBuildings={filteredOwnedBuildings || []}
              balance={balance}
              availableSlaves={availableSlaves}
              setPurchaseDialogOpen={setPurchaseDialogOpen}
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
          {selectedBuildingDetails ? (
            <UrbanPropertyDetails 
              buildingDetails={selectedBuildingDetails}
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
