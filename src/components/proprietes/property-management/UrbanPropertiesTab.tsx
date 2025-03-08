
import React from 'react';
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
    selectedBuilding,
    filteredBuildings,
    handleBuildingTypeChange,
    handleBuildingSelect,
    isViewingCatalogue,
    setIsViewingCatalogue,
  } = useUrbanPropertiesTab();

  return (
    <TabsContent value="urban" className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left panel: Building selector */}
        <div className="lg:col-span-1 space-y-6">
          <UrbanPropertySelector
            selectedBuildingType={selectedBuildingType as AllowedBuildingType}
            onBuildingTypeChange={handleBuildingTypeChange}
            isViewingCatalogue={isViewingCatalogue}
            setIsViewingCatalogue={setIsViewingCatalogue}
          />
          
          {isViewingCatalogue ? (
            <UrbanCatalogueSection 
              buildingType={selectedBuildingType as AllowedBuildingType} 
              onBuildingSelect={handleBuildingSelect}
            />
          ) : (
            <OwnedUrbanPropertiesSection
              buildingType={selectedBuildingType as AllowedBuildingType}
              onBuildingSelect={handleBuildingSelect}
              selectedBuildingId={selectedBuilding?.id}
            />
          )}
        </div>
        
        {/* Right panel: Building details */}
        <div className="lg:col-span-2">
          {selectedBuilding ? (
            <UrbanPropertyDetails 
              building={selectedBuilding} 
              buildingCategory={selectedBuildingType as UrbanBuildingCategory}
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
