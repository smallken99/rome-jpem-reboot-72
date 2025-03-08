import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PropertyPurchaseDialog } from './dialogs/PropertyPurchaseDialog';
import { OwnedUrbanPropertiesSection } from './urban/owned/OwnedUrbanPropertiesSection';
import { UrbanCatalogueSection } from './urban/catalogue/UrbanCatalogueSection';
import { useUrbanPropertiesTab } from './urban/hooks/useUrbanPropertiesTab';

const UrbanPropertiesTab: React.FC = () => {
  const {
    selectedBuildingType,
    setSelectedBuildingType,
    selectedBuildingId,
    setSelectedBuildingId,
    purchaseDialogOpen,
    setPurchaseDialogOpen,
    selectedBuildingDetails,
    filteredOwnedBuildings,
    handlePurchase,
    balance,
    toggleMaintenance,
    performMaintenance,
    sellBuilding,
    calculateBuildingValue,
    assignSlaves,
    availableSlaves
  } = useUrbanPropertiesTab();

  return (
    <Tabs defaultValue="owned" className="w-full">
      <div className="flex justify-between mb-4">
        <div className="space-x-1">
          <TabsList>
            <TabsTrigger value="owned">Mes propriétés</TabsTrigger>
            <TabsTrigger value="catalogue">Catalogue</TabsTrigger>
          </TabsList>
        </div>
      </div>

      <TabsContent value="owned" className="mt-0">
        <OwnedUrbanPropertiesSection 
          selectedBuildingType={selectedBuildingType}
          filteredOwnedBuildings={filteredOwnedBuildings}
          balance={balance}
          availableSlaves={availableSlaves}
          setPurchaseDialogOpen={setPurchaseDialogOpen}
          toggleMaintenance={toggleMaintenance}
          performMaintenance={performMaintenance}
          assignSlaves={assignSlaves}
          sellBuilding={sellBuilding}
          calculateBuildingValue={calculateBuildingValue}
        />
      </TabsContent>

      <TabsContent value="catalogue" className="mt-0">
        <UrbanCatalogueSection 
          selectedBuildingType={selectedBuildingType}
          setSelectedBuildingType={setSelectedBuildingType}
          selectedBuildingId={selectedBuildingId}
          setSelectedBuildingId={setSelectedBuildingId}
          selectedBuildingDetails={selectedBuildingDetails}
          purchaseDialogOpen={purchaseDialogOpen}
          setPurchaseDialogOpen={setPurchaseDialogOpen}
        />
      </TabsContent>

      {/* Dialogue d'achat */}
      {selectedBuildingDetails && (
        <PropertyPurchaseDialog 
          open={purchaseDialogOpen} 
          onOpenChange={setPurchaseDialogOpen}
          buildingDetails={selectedBuildingDetails}
          buildingId={selectedBuildingId || ''}
          buildingType={
            selectedBuildingType === 'residential' ? 'urban' : 
            selectedBuildingType as 'religious' | 'public' | 'military'
          }
          onPurchase={handlePurchase}
          balance={balance}
        />
      )}
    </Tabs>
  );
};

export default UrbanPropertiesTab;
